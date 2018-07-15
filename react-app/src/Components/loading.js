import React, { Component } from 'react';
import logo from '../logo.png';
import '../App.css';



class PageLoading extends Component {
  render() {
    return (
      <div className="Page">
        <p>
          <img src="/static/media/logo.12a6f28b.png" class="App-logo" alt="husky1"/>
        </p>
        <p align="center"> Loading... </p>
        <p align="center">Your page is being prepared by our expert husky</p>
      </div>
    )
  }
}

export default my404Component;
