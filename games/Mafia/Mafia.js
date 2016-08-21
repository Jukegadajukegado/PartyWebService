import Mafias from './Mafia';
import _ from'lodash';
export default class Mafia{
    get name(){
        return "Mafia";
    }
    get description(){
        return 'In Mafia, there are "Mafia" members who kill people every night. Investigators try to figure out who is killing everyone. Then, at sunset, the collective votes to kill the suspects.'
    }
    createGame(session){ //{gameData, }
        this.games[session.id] = {
            roleTBH :{} = Mafias, //import role list for later use
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
              //  game.location = Math.floor(Math.random()*Locations.length);
              var players = _.keys(game.roles);
            //  var Mafia = _.sample(players);
            //  game.roles[spy] = "Spy";
              for (var player in game.roles.length *0.3){ //pick 30% of the player to be Mafia
              while(1==1){
                if(player != Mafia){
                var Mafia = _.sample(players);
                game.roles[Mafia] = "Mafia"
               break;
              }
            }

              }

              for(var player in game.roles){ //random role for other else //if u can make docotr and invest only unique plz
                while(1==1){
                  if(player != Mafia){
                   game.roles[player] = _.sample(game.roleTBH);
                 break;
                }
              }
              break;
        }
    }}
    getUserMessages(session, userId){

        var game = this.games[session.id];

        if(game.started){

            var role = game.roles[userId];

            var message = [{text:"Hello" + session.members[userId]+"! You are a "+role, actions: []}];
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
