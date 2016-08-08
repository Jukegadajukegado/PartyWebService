import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }
  render() {
    return (
      <Card>
          <CardTitle title="Join a game" />
          <CardText style={{paddingTop: 0}}>

          </CardText>
      </Card>
    );
  }
}
