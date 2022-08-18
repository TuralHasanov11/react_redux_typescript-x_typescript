import React, { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

export default function Home() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debouncedSearch = useDebounce(search)
  const {isLoading, isError, data: users} = useSearchUsersQuery(debouncedSearch, {
    skip: debouncedSearch.length < 3,
    refetchOnFocus: true
  })

  const [fetchRepos, { isLoading: reposLoading, data: repos }] = useLazyGetUserReposQuery()

  useEffect(()=>{
    setDropdown(debouncedSearch.length > 3 && users?.length! >0)
  }, [debouncedSearch, users])

  function clickHandler(username: string){
    fetchRepos(username)
    setDropdown(false)
  }

  return <div>
    {isError && <p>Error</p>}

    <div>
      <input type="text" placeholder='Search for GitHub username' value={search} onChange={e => setSearch(e.target.value)}/>
      { dropdown && <ul>
        { isLoading && <p>Loading</p> }
        { users?.map( user => (
          <li 
            key={user.id}
            onClick={() => clickHandler(user.login)}
          >
            { user.login }
          </li>
        ))}
      </ul> }
    </div>

    <div className="container">
      {reposLoading && <p>Loading</p>}
      { repos?.map(repo => (
        <RepoCard key={repo.id} repo={repo} />
      )) }
    </div>

  </div>;
}
