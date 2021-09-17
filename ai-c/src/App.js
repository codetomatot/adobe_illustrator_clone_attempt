import React from 'react';
import './App.css';
import MainRoutes from './MainRoutes';
import firebase, { db } from './firebase-config';
import { googleLogin } from './auth/authMethod';
import { githubLogin } from './auth/authMethod';
import Services from './auth/services';
import Loading from './components/Loading';
import * as io5 from 'react-icons/io5';
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      menu: false
    }
    this.handleAuth = this.handleAuth.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
        console.log("not logged in");
      } else {
        this.setState({
          loggedIn: true,
          username: user.displayName,
          profile: user.photoURL,
          loaded: true,
        });
        console.log(this.state.username);
        if(this.state.username === null) {
          this.setState({username: "user"})
        }
      }
    })
  }

  handleAuth = async (service) => {
    let res = await Services(service);
  }
  handleLogOut = () => {
    firebase.auth().signOut();
  }
  openMenu = () => {
    this.setState({menu: !this.state.menu})
  }

  render() {
    const { loaded, loggedIn, menu } = this.state;
    if(!loaded) {
      return (
        <Loading />
      )
    }
    if(!loggedIn) {
      return (
        <div className="App">
          <h1>Not logged in</h1>
          <button onClick={() => this.handleAuth(githubLogin)}>github</button>
          <button onClick={() => this.handleAuth(googleLogin)}>google</button>
        </div>
      )
    }
    return (
      <div className="App">
        <nav>
          <div className="wrapper">
            <img src={this.state.profile} alt="profile" onClick={this.openMenu}/>
          </div>
        </nav>
        {menu ? <div className="options-panel">
          <button>Settings</button>
          <button>Profile</button>
          </div> : null}
        <MainRoutes />
      </div>
    )
  }
}

export default App;