import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return <div>
    <Link to='/' >Home</Link>
    <Link to='/favorites' >Favorites</Link>
  </div>;
}
