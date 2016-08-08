import Constants from '../constants';
import _ from 'lodash';
const defaultState = {
  games: []
};
export default function games(state = defaultState, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case Constants.games.UPDATE_GAMES:
      state.games = action.data;
      break;
    case 'DECREMENT':
      return state - 1
  }
  return state;
}