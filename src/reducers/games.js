import Constants from '../constants';
import _ from 'lodash';
import { browserHistory } from 'react-router'

const defaultState = {
  games: [],
  game: {
    meta: {
      name: "",
      description: ""
    },
    members: {}
  },
  session: ""
};
export default function games(state = defaultState, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case Constants.games.UPDATE:
      state.games = action.payload;
      break;
    case Constants.games.UPDATE_GAME:
      state.game = action.payload;
      break;
    case Constants.games.JOIN:
      state.session = action.payload;
      browserHistory.push('/game')
      break;
    case Constants.games.GOTO_JOIN:
      state.session = action.payload;
      browserHistory.push('/join')
      break;
    case Constants.games.SET: 
      state = _.merge(state, action.payload);
      break;
    case 'DECREMENT':
      return state - 1
  }
  return state;
}