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

const App = (props) => {
  const [currentUser, setcurrentUser] = useState(null);

  const setUser = (user) => {
    setcurrentUser({ id: user.id, name: user.username, email: user.email });
    props.history.push("/")
  }

  const handleLogout = () => {
    setcurrentUser(null);
    localStorage.removeItem('authToken');
  }
  const verify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }
  useEffect(() => {
    verify();
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
        {/* <Route exact path="/movies/:movieId" render={(props) => <Movie id={props.match.params.movieId} />} /> */}
        <Route exact path="/item-details/:itemId" render={(props) =>
          <ItemDetails
            itemId={props.match.params.itemId}
            currentUser={currentUser}
          />} />
      </main >
      <Footer />
    </div>
  );
}

export default withRouter(App);