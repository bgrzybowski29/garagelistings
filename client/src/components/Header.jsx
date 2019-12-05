import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';

export default function Header(props) {
  return (
    <header>
      <Link to="/"><p id="app-title"><span id="title1">Garage</span> <span id="title2">Listings</span></p></Link>
      <p id="vr"/>
      <p id="sub-title">Your source for everything auto clasifieds.</p>
      <nav>
        {
          props.currentUser
            ?
            <>
              <i class="im im-user-circle"></i>
              <DropdownButton
                alignRight
                title={props.currentUser.firstname}
                id="dropdown-menu-align-right">
                <Dropdown.Item disabled eventKey="1">View Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={props.handleLogout}>Logout</Dropdown.Item>
              </DropdownButton>
            </>
            :
            <Link to="/login"><Button variant="primary">Login</Button></Link>
        }
      </nav>
    </header >
  )
}
