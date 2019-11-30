import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Comments from './components/Comments';
import { withRouter } from 'react-router';
import { verifyUser } from './services/api-helper';
import AddItem from './components/AddItem';
import MyItems from './components/MyItems';
import SavedItems from './components/SavedItems';
import AllItems from './components/AllItems';

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
            <>
              <Comments />
              <AddItem />
              <MyItems currentUser={currentUser} />
              <SavedItems currentUser={currentUser} />
              <AllItems currentUser={currentUser} />
            </>
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
      </main >
      <Footer />
    </div>
  );
}

export default withRouter(App);