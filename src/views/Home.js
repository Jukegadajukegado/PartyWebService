import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card,CardTitle,CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
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
        <h1>Party Web Service</h1>

        <p> Click on the menu to perform an action </p>
            <p> KNOWN BUG -Spyfall: roles can be repeated, sometimes the lobby will crash </br>if someone join after the game has been starter</p>

      </div>
    );
  }
}

export default map(Home);
