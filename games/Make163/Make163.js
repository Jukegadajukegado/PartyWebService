import _ from'lodash';
export default class Make163{
    get name(){
        return "Make163";
    }
    get description(){
        return 'Can you make 163 with the 6 given cards?'
    }
    createGame(session){ //{gameData, }
        this.games[session.id] = {
            card: {},
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
        if(this.games[session.id].card[userId]) return; //don't make existing users blank
        if(Object.keys(this.games[session.id].card).length == 0){
            this.games[session.id].admin = userId;
        }
        this.games[session.id].card[userId] = "";
    }
    removeUser(session, user){
        delete this.games[session.id].card[user];
    }
    receiveMessage(session, userId, action){
        var game = this.games[session.id];
        switch(action){
            case this.actions.START:  //START GAME MESSAGE RECEIVED
                game.started = true;
                var players = _.keys(game.card);
                for(var player in game.card){

                        game.card[player] = Math.floor(13*Math.random())+1;
                }
                break;
        }
    }

    getUserMessages(session, userId){

        var game = this.games[session.id];

        if(game.started){

            var cards = game.card[userId].toString();


            var message = [{text:cards, actions: []}];
            if(game.admin == userId) message.push({text: "You are the game admin. Press 'New Game' when you want to begin a new game.", actions: [{id: this.actions.START, text: "New Game"}]});

            return message;


        }else{
            var waiting = [{text: "waiting for other player to enter", actions: []}];
            if(game.admin == userId) waiting.push({text: "You are the game admin. Press 'Start Game' when you want to begin.", actions: [{id: this.actions.START, text: "Start Game"}]});
            return waiting;
        }
    }
    constructor(engine){
        this.engine = engine;
        this.games = {};
    }
  }
