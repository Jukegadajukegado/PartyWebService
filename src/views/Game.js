import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'
import {Card,CardTitle,CardText,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import map from '../map';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {menuOpen: false, tab: 'game'};

  }

  handleAction(action){
    this.props.dispatch.games.action(this.props.games.game.id, action);
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
                <div>
                  <Divider />
                  <CardText key={"message-"+key}>
                    {message.text}<br/>
                    {message.actions.length ? <br/> : null}
                    {_.map(message.actions, (action, actionKey) => (
                      <RaisedButton onClick={this.handleAction.bind(this, action.id)} primary={true} key={"message-"+key+"-"+actionKey} label={action.text}/>
                    ))} 
                  </CardText>
                </div>
              ))}
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
