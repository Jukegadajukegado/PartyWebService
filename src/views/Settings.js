import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import map from '../map';
import {Converter as sdconvert} from 'showdown';

const showdown = new sdconvert();

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  } 
  render() {
    const md = showdown.makeHtml(this.props.settings.patch);
    return (
      <div>
        <Card>
            <CardTitle title="General" />
            <CardText style={{paddingTop: 0}}>
                <Toggle label="Play Background Music" onToggle={this.props.dispatch.settings.toggleAudio} toggled={this.props.settings.audio} labelPosition="right" />
            </CardText>
        </Card>
        <br/>
        <Card>
            <CardTitle title="Version Information" />
            <CardText style={{paddingTop: 0}}>
              <pre style={{marginTop:0, marginBottom: 0}}>Patch <a target="_blank" href={"https://github.com/Jukegadajukegado/PartyWebService/commit/"+window.commit.hash}>{window.commit.hash}</a></pre>
              <div dangerouslySetInnerHTML={{__html: md}}/>
            </CardText>
        </Card>
        <p>Settings Automatically Save</p>
      </div>
    );
  }
}

export default map(Settings);