import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card,CardTitle,CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import map from '../map';
import Chip from 'material-ui/Chip';
import RaisedButton  from 'material-ui/RaisedButton';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {menuOpen: false, tab: 'game'};

  }
  startgame(){
  }
  @autobind
  tabChange(tab){
    this.setState({
      tab: tab,
    });
  };


  render() {
    const game = this.props.games.game;
    return (
      <div>
        <Card>
          <CardTitle title={game.meta.name + " ("+this.props.games.session+")"}/>
          <Tabs value={this.state.tab} onChange={this.tabChange} >
            <Tab label="Game" value="game">
              <CardText style={{background:'#FAFAFA'}}>
                <strong>Description:</strong><br/>{game.meta.description}
              </CardText>

              {_.map(game.messages, (message, key) => (
                <CardText key={"message-"+key}>
                  {message.text}
                  {_.map(message.actions, (action, actionKey) => (
                    <button onClick={action.method} key={"message-"+key+"-"+actionKey}>{action.text}</button>
                  ))}
                </CardText>
              ))}

              <RaisedButton label="startgame" primary={true}/>
            </Tab>
            <Tab label={"Players ("+Object.keys(game.members).length+")"} value="players">
              <div>
                <List>
                  {_.map(game.members, (member, key) => (
                    <ListItem key={"member-"+member} primaryText={member} />
                  ))}
                </List>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>


    );

  }
}

export default map(Game);
