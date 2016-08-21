import * as games from './games/games.js';
import Constants from './src/constants.js';
import ShortID from 'shortid';
import _ from 'lodash';
export default class GameEngine{
    get games(){
        var games = [];
        for(var game in this.gameServers){
            var gameObject = this.gameServers[game];
            games.push(gameObject.meta);
        }
        return games;
    }
    register(games){
        this.gameServers = {};
        for(var game in games){
            this.gameServers[game] = new games[game];
            this.gameServers[game].meta = {
                name: this.gameServers[game].name,
                description: this.gameServers[game].description,
                id: game
            }
        }
    }
    process(id, callback){
        try{
            callback();
        }catch(e){
            this.message(id, Constants.error.SHOW, e.message);
        }
    }
    saveData(session, data){

    }
    loadData(session){
        
    }
    addUserToSession(user, sessionId){ // user: {name, id}, sessionId: string
        user.name = user.name.trim();
        if(user.name.length == 0) throw new Error("Please enter a name!");
        if(user.name.length > 32) throw new Error("Please give us a shorter name!");
        if(this.sessions[sessionId]){
            var session = this.sessions[sessionId];
            session.members[user.id] = user.name;
            this.userRooms[user.id] = sessionId;
            this.gameServers[session.meta.name].addUser(session, user.id);
            this.notify(sessionId, user.name+" has joined the game.");
        }else   
            throw new Error("Session not found!");
    }
    removeUserFromSession(id, sessionId){
        if(this.sessions[sessionId]){
            this.notify(sessionId, this.sessions[sessionId].members[id]+" has left the game.");
            delete this.userRooms[id];
            delete this.sessions[sessionId].members[id];
        }
    }
    updateSession(sessionId){
        var session = this.sessions[sessionId];
        for(var member in session.members){
            var memberPayload = _.cloneDeep(session);
            memberPayload.messages = this.gameServers[session.meta.name].getUserMessages(session, member);
            this.message(member, Constants.games.UPDATE_GAME, memberPayload);
        }
    }
    handleRequest(socket, action, payload){
        var instance = this;
        this.process(socket.id, function(){ //enable error throwing
            switch(action){
                case Constants.games.CREATE:
                    var id = ShortID.generate();
                    instance.sessions[id] = {
                        meta: instance.gameServers[payload.game].meta,
                        id: id,
                        members: {},
                        data: {}
                    };
                    instance.gameServers[payload.game].createGame(instance.sessions[id]);
                    instance.message(socket.id, Constants.games.GOTO_JOIN, id);
                    break; 
                case Constants.games.JOIN:
                        instance.addUserToSession({id: socket.id, name: payload.name}, payload.session);
                        socket.join(payload.session);
                        instance.message(socket.id, Constants.games.JOIN, payload.session);
                        instance.updateSession(payload.session);
                    break; 
                case Constants.games.ACTION:
                    var session = instance.sessions[payload.session];
                    instance.gameServers[session.meta.name].receiveMessage(session, socket.id, payload.action);
                    instance.updateSession(payload.session);
                    break;
            }
        });
    }
    handleDisconnect(socket){
        if(this.userRooms[socket.id]){
            var room = this.userRooms[socket.id];
            this.removeUserFromSession(socket.id, room);
            this.updateSession(room);
        }
    }
    messageAll(action, payload){
        this.io.emit('action', {type: action, payload: payload});
    }
    notify(id, message){
        this.message(id, Constants.error.SHOW, message);
    }
    message(id, action, payload){
        this.io.to(id).emit('action', {type: action, payload: payload});
    }
    constructor(io){
        this.sessions = {};
        this.userRooms = {};
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