import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';  

export default function RepoCard({ repo }: {repo: IRepo}) {

  const {addFavorite, removeFavorite} = useActions()
  const {favorites} = useAppSelector(state=> state.github)

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

  function addToFavorites(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    addFavorite(repo.html_url)
    setIsFav(true)
  }

  function removeFromFavorites(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    removeFavorite(repo.html_url)
    setIsFav(false)
  }

  return <div>
    <a target='_blank' href={repo.html_url} rel="noreferrer">
      <h2>{repo.full_name}</h2>
      <p>
        Forks: {repo.forks}
        Watchers: {repo.watchers}
      </p>
      <p>{repo?.description}</p>

      {isFav && <button 
        onClick={removeFromFavorites}
      >Remove</button>}

      {!isFav && <button 
        onClick={addToFavorites}
      >Add</button>}
      
    </a>
  </div>;
}
