export default class Mafia{
    get name(){
        return "Mafia";
    }
    get description(){
        return 'In Mafia, there are "Mafia" members who kill people every night. Investigators try to figure out who is killing everyone. Then, at sunset, the collective votes to kill the suspects.'
    }
    createGame(session){ //{gameData, }
        this.games[session.id] = {
            roles: {



            },
            admin: "",
            started: false,
            location: -1,

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
                game.location = Math.floor(Math.random()*Locations.length);

                game.roles[userId] = "Janitor";

                break;
        }
    }
    getUserMessages(session, userId){

        if(this.games[session.id].started){

           if(this.games[session.id].roles[userId]="Spy"){


             return [{text:"Location: ???"

               , actions: []}];

           }
             else{
              return [{text: Locations[this.games[session.id].location].name

                , actions: []}];
              }

        }else{
            var waiting = [{text: "Waiting for players to join...", actions: []}];
            if(this.games[session.id].admin == userId) waiting.push({text: "You are the game admin. Press 'Start Game' when you want to begin.", actions: [{id: this.actions.START, text: "Start Game"}]});
            return waiting;
        }
    }
    constructor(engine){
        this.engine = engine;
        this.games = {};
    }
}
