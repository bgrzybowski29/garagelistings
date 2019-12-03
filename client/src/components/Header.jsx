import React from 'react';
import { Link } from 'react-router-dom';
export default function Header(props) {

  return (
    <header>
      {/* <h1>garagelistings</h1> */}
      <Link to="/"><h1>garagelistings</h1></Link>
      <nav>
        {
          props.currentUser
            ?
            <h2>Welcome, {props.currentUser.name}!</h2>
            :
            <></>
        }
        {
          !props.currentUser
            ?
            < Link to="/login">Login</Link>
            :
            < Link to="/" onClick={props.handleLogout}>Logout</Link>
        }
      </nav>
    </header >
  )
}