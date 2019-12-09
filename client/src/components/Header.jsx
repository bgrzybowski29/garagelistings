import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import ProfileDetailsModal from './ProfileDetailsModal';
import { slide as Menu } from 'react-burger-menu'

export default function Header(props) {
  const [modalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState({ menuOpen: false });

  useEffect(() => {
    setIsOpen({ menuOpen: false });
  }, []);

  const closeAllMenusOnEsc = (e) => {
    e = e || window.event;
    if (e.key === 'Escape' || e.keyCode === 27) {
      setIsOpen({ menuOpen: false });
    }
  };;
  const closeMenu = () => {
    setIsOpen({ menuOpen: false });
  }
  return (
    <header>
      <Link to="/"><p id="app-title"><span id="title1">Garage</span> <span id="title2">Listings</span></p></Link>
      <p id="vr" />
      <p id="sub-title">Your source for everything auto clasifieds.</p>
      <nav>
        {
          props.currentUser
            ?
            <>
              <i class="im im-user-circle"></i>
              <DropdownButton
                alignRight
                // title={<i class="im im-menu"></i>}
                title={props.currentUser.firstname}
                id="dropdown-menu-align-right">
                <Dropdown.Item eventKey="1" onClick={() => {
                  setModalShow(true);
                  window.history.replaceState(null, null, '/shay');
                }
                }>View Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={props.handleLogout}>Logout</Dropdown.Item>
              </DropdownButton>
            </>
            :
            <Link to="/login"><Button variant="primary">Login</Button></Link>
        }
      </nav>
      <ProfileDetailsModal
        currentUser={props.currentUser}
        show={modalShow}
        onHide={() => {
          window.history.replaceState(null, null, '/');
          setModalShow(false)
        }
        }
      />
      <div className="burger">
        <Menu customOnKeyDown={closeAllMenusOnEsc} isOpen={isOpen}>
          <Link onClick={() => closeMenu()} to="/alllistings">All Listings</Link>
          <Link onClick={() => closeMenu()} to="/mylistings">My Listings</Link>
          <Link onClick={() => closeMenu()} to="/savedlistings">Saved Listings</Link>
          <Link onClick={() => closeMenu()} to="/addlisting">Add Listing</Link>
        </Menu>
      </div>
    </header >
  )
}