import React from 'react';
import { useAppSelector } from '../hooks/redux';

export default function Favorites() {

  const { favorites } = useAppSelector(state => state.github)

  if(favorites.length === 0) return <p>No items</p>

  return <div>
    <ul>
      { favorites.map(fav => (
        <li
          key={fav}
        >
          <a href={fav} target="_blank" rel="noreferrer">{fav}</a>
        </li>
      ))}
    </ul>
  </div>;
}
