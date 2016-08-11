import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card,CardTitle,CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import map from '../map';
import Chip from 'material-ui/Chip';
import RaisedButton  from 'material-ui/RaisedButton';


function removeplayer(){


}

class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {menuOpen: false};
  }
startgame(){

}

  render() {
    return (
      <div>


        <Card>

        <CardTitle title={this.props.games.name}/>
        <CardTitle subtitle = {"Room ID:  " + this.props.games.session}/>


       <List>
       <ListItem
              primaryText="player1"
            />


       <ListItem
              primaryText="player2"
            />


       <ListItem
              primaryText="player3"
            />

       </List>
        <RaisedButton  label="Start Game " primary={true} onClick={this.startgame} />
      </Card>
      </div>


    );
  }
}

export default map(Game);
