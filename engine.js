import * as games from './games/games.js';
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
    constructor(){
        this.register(games);
    }
}