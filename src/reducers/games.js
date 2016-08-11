import Constants from '../constants';
import _ from 'lodash';
import { browserHistory } from 'react-router'

const defaultState = {
  games: [],
  session: null
};
export default function games(state = defaultState, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case Constants.games.UPDATE:
      state.games = action.payload;
      break;
    case Constants.games.JOIN:
      state.session = action.payload;
      browserHistory.push('/game')
      break;
    case Constants.games.GOTO_JOIN:
      state.session = action.payload;
      browserHistory.push('/join')
      break;
    case 'DECREMENT':
      return state - 1
  }
  return state;
}