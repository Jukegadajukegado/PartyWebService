import { connect } from 'react-redux';
import Constants from './constants';

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            settings: {
                toggleAudio: () => {
                    dispatch({type: Constants.settings.TOGGLE_AUDIO})
                }
            }
        }
    }
};

export default function(Component){
    return connect(mapStateToProps,mapDispatchToProps)(Component);
}