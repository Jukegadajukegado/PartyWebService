import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  } 
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

