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
        <Card>
            <CardTitle title="Patch Note" />
            <CardText style={{paddingTop: 0}}>
            </CardText>
        </Card>

      </div>
    );
  }
}

export default map(Home);
