import Constants from '../constants';
import _ from 'lodash';
const defaultSettings = {
  audio: true
};
export default function settings(state = defaultSettings, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case Constants.settings.TOGGLE_AUDIO:
      state.audio = !state.audio;
      break;
    case 'DECREMENT':
      return state - 1
  }
  return state;
}