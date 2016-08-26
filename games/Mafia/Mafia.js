import Classic from './Classic';
import _ from'lodash';
export default class Mafia{
    get name(){
        return "Mafia";
    }
    get description(){
        return '[THIS GAME CURRENTLY DOES NOT WORK] In Mafia, there are "Mafia" members who kill people every night. Investigators try to figure out who is killing everyone. Then, at sunset, the collective votes to kill the suspects.'
    }
    createGame(session){ //{gameData, }
        this.games[session.id] = {

            roles: {},
            admin: "",
            started: false,

        };
        this.actions = {
            START: 'start_game'
        };
    }
    destroyGame(session){
        delete this.games[session.id];
    }
    addUser(session, userId){
        if(this.games[session.id].roles[userId]) return; //don't make existing users blank
        if(Object.keys(this.games[session.id].roles).length == 0){
            this.games[session.id].admin = userId;
        }
        this.games[session.id].roles[userId] = "";
    }
    removeUser(session, user){
        delete this.games[session.id].roles[user];
    }
    receiveMessage(session, userId, action){
        var game = this.games[session.id];

        switch(action){
          case this.actions.START:  //START GAME MESSAGE RECEIVED
              game.started = true;


              game.role = _.shuffle(game.roles); //shuffle the player order <- someone plz shuffle this

              var i = 0;
              for(var player in game.roles){


                      game.roles[player] = Classic[i].name; //???????
                      i++;

              }


              break;
      }

    }

    getUserMessages(session, userId){

        var game = this.games[session.id];

        if(game.started){

            var role = game.roles[userId];

            var message = [{text:"Hello "+game.roles[0].player + session.members[userId]+"! You are a "+role, actions: []}];
            if(game.admin == userId) message.push({text: "You are the game admin. Press 'New Game' when you want to begin a new game.", actions: [{id: this.actions.START, text: "New Game"}]});

            return message;


        }else{
            var waiting = [{text: "Waiting for players to join...", actions: []}];
            if(game.admin == userId) waiting.push({text: "You are the game admin. Press 'Start Game' when you want to begin.", actions: [{id: this.actions.START, text: "Start Game"}]});
            return waiting;
        }
    }
    constructor(engine){
        this.engine = engine;
        this.games = {};
    }
  }
