import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import map from '../map';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
    console.log(this.props.dispatch);
  } 
  render() {
    return (
      <div>
        <Card>
            <CardTitle title="General" />
            <CardText style={{paddingTop: 0}}>
                <Toggle label="Play Background Music" onToggle={this.props.dispatch.settings.toggleAudio} toggled={this.props.settings.audio} labelPosition="right" />
            </CardText>
        </Card>
      </div>
    );
  }
}

export default map(Settings);