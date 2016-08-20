import * as games from './games/games.js';
import Constants from './src/constants.js';
import ShortID from 'shortid';
export default class GameEngine{
    get games(){
        var games = [];
        for(var game in this.gameServers){
            var gameObject = this.gameServers[game];
            games.push({name: gameObject.name, id: game, description: gameObject.description});
        }
        return games;
    }
    register(games){
        this.gameServers = {};
        for(var game in games){
            this.gameServers[game] = new games[game];
        }
    }
    process(id, callback){
        try{
            callback();
        }catch(e){
            this.messageUser(id, Constants.error.SHOW, e.message);
        }
    }
    saveData(session, data){

    }
    loadData(session){
        
    }
    addUserToSession(user, sessionId){ // user: {name, id}, sessionId: string
        if(this.sessions[sessionId])
            this.sessions[sessionId].members[user.id] = user.name;
        else   
            throw new Error("Session not found!");
    }
    handleRequest(socket, action, payload){
        var instance = this;
        this.process(socket.id, function(){ //enable error throwing
            switch(action){
                case Constants.games.CREATE:
                    var id = ShortID.generate();
                    instance.sessions[id] = {
                        game: payload.game,
                        members: {},
                        data: {}
                    };
                    instance.messageUser(socket.id, Constants.games.GOTO_JOIN, id);
                    break; 
                case Constants.games.JOIN:
                        instance.addUserToSession({id: socket.id, name: payload.name}, payload.session);
                        socket.join(payload.session);
                        instance.messageUser(socket.id, Constants.games.JOIN, payload.session);
                        instance.messageAll(Constants.games.UPDATE_GAME, instance.sessions[payload.session]);
                    break; 
            }
        });
    }
    messageAll(action, payload){
        this.io.emit('action', {type: action, payload: payload});
    }
    messageUser(id, action, payload){
        this.io.to(id).emit('action', {type: action, payload: payload});
    }
    constructor(io){
        this.sessions = {};
        this.io = io;
        this.register(games);
    }

    /* API Design

        -- INGRESS --

            Create Session: /create {name, game} | Returns: {session}
            Join Session: /join {name, code} | Returns: {session}

            Receive message: /message {session, payload} | Returns: void

        -- EGRESS -- 

            Message User: /messageUser {user, session, payload}

            Message Session: /messageSession {session, payload} 


    */
}