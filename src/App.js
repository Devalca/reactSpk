import React, { Component } from "react";
import "./App.css";
import firebase from "./Firebase";
import Homes from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Create from './components/Create';
import Show from './components/Show';
import Result from './components/Result'
import Data from './components/Data'
import ShowKrit from './components/ShowKrit'
import Login from './components/Login'

class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.user ? (<Home/>) : (<Login/>)}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path='/' component={Homes} />
        <Route path='/result' component={Result}/>
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/showkrit/:id' component={ShowKrit} />
        <Route path='/data' component={Data}/>
      </div>
  </Router>
    )
  }
}

export default App;
