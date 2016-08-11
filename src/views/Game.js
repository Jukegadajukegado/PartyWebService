import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card,CardTitle,CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import map from '../map';

class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {menuOpen: false};
  }
  render() {
    return (
      <div>


        <Card>

        <CardTitle title={this.props.games.name}/>
        <CardTitle subtitle = {"Room ID:  " + this.props.games.session}/>

        </Card>

      </div>
    );
  }
}

export default map(Game);
