// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import axios from 'axios';

// Use a class component, 
// because a functional component doesn’t have its own state
export default class App extends React.Component {
  state = {data: null};
  
  componentDidMount() {
    axios.get(`http://localhost:8000/`)
    .then(response => this.setState({data:response.data}))
    .catch(function(error) {
     console.log('Fetch error: ' + error.message);
   })
  }
  


  render() {

    const data = this.state.data;

    var message = "Default frontend message";

    console.log(data);

    // Assign the payload value if it exists
    if (this.state.data !== null) {
      message = this.state.data.message;
    }

    return (
      <div>
      <strong>Message</strong>: {message}<br/><br/>
      </div>
      )
    }
  }