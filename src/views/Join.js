import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton  from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import map from '../map';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }
  @autobind
  joinGame(){
    this.props.dispatch.games.join(this.refs.sessionInput.input.value, this.refs.nameInput.input.value);
  }
  render() {
    return (
      <Card>
          <CardTitle title="Join a game" />
          <CardText style={{paddingTop: 0}}>
            <TextField hintText="Room ID" ref="sessionInput" fullWidth={true} defaultValue={this.props.games.session}/><br/>
            <TextField hintText="Your Name" ref="nameInput" fullWidth={true}/><br/><br/>
            <RaisedButton label="Join Game" primary={true} onClick={this.joinGame} />
          </CardText>
      </Card>
    );
  }
}

export default map(Join);
