import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';
import map from '../map';
import {List, ListItem} from 'material-ui/List';
import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }
  render() {
    return (
      <Card>
        <List>
          <Subheader>Create a Game</Subheader>
          {this.props.games.games.map((game, index) => (
            <ListItem
              leftAvatar={<Avatar src={"/img/games/"+game.name+".jpg"} />}
              primaryText={game.name}
              secondaryText={<p>{game.description}</p>}
              secondaryTextLines={2}
            />
          ))}
        </List>
      </Card>
    );
  }
}

export default map(Create);