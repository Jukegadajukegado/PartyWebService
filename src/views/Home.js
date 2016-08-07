import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import map from '../map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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

export default map(Home);