import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { withRouter } from 'react-router';
import { verifyUser } from './services/api-helper';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import EditItem from './components/EditItem';
import MyItems from './components/MyItems';
import SavedItems from './components/SavedItems';
import AllItems from './components/AllItems';
import AddItem from './components/AddItem';

const App = (props) => {
  const [currentUser, setcurrentUser] = useState(null);

  const setUser = (user) => {
    setcurrentUser(user);
    props.history.push("/")
  }

  const handleLogout = () => {
    setcurrentUser(null);
    localStorage.removeItem('authToken');
    props.history.push("/login");
  }
  const verify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }
  useEffect(() => {
    verify();
    if (!currentUser) props.history.push("/login");
  }, []);


  return (
    <div className="app" >
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <main className="main">
        {
          currentUser ?
            <Route exact path="/" render={() => <Home currentUser={currentUser} />} />
            :
            <></>
        }
        <Route path="/login" render={() => (
          <LoginForm
            setUser={setUser} />
        )} />
        <Route path="/register" render={() => (
          <RegisterForm
            setUser={setUser}
          />)} />
        <Route exact path="/item-details/:itemId" render={(props) =>
          <ItemDetails
            itemId={props.match.params.itemId}
            currentUser={currentUser}
          />} />
        <Route exact path="/edit-item/:itemId" render={(props) =>
          <EditItem
            itemId={props.match.params.itemId}
            currentUser={currentUser}
          />} />
        <Route exact path="/alllistings" render={(props) => <AllItems currentUser={currentUser} />} />
        <Route exact path="/mylistings" render={(props) => <MyItems currentUser={currentUser} />} />
        <Route exact path="/savedlistings" render={(props) => <SavedItems currentUser={currentUser} />} />
        <Route exact path="/addlisting" render={(props) => <AddItem />} />
      </main >
      <Footer />
    </div>
  );
}

export default withRouter(App);