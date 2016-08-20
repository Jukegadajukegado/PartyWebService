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

              <CardText style={{background:'#FAFAFA'}}>
                <strong>Roles:</strong>
                {(() => {
             switch (game.meta.name ) {
             case "Mafia":   return "Mafia";
             case "Spyfall":

             var roles = [];
             for(var i=0;i <Object.keys(game.members).length;i++){
               var role =["Spy","???"];
               roles[i] = role[i];

             }
              return    <List><ListItem primaryText = {roles}/></List>  ;

             default:      return "Error";
         }
        })()}
              </CardText>

              <RaisedButton label="startgame" primary={true}/>
            </Tab>
            <Tab label={"Players ("+Object.keys(game.members).length+")"} value="players">
              <div>
                <List>
                  {_.map(game.members, (member, key) => (
                    <ListItem primaryText={member} />
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
