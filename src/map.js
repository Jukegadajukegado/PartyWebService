import { connect } from 'react-redux';
import Constants from './constants';

const mapStateToProps = (state) => (state);

function server(type){
    return "server/"+type;
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            app: {
                closeError: () => {
                    dispatch({type: Constants.error.CLOSE, payload: null});
                }
            },
            settings: {
                toggleAudio: () => {
                    dispatch({type: Constants.settings.TOGGLE_AUDIO})
                },
                updatePatch: (patch) => {
                    dispatch({type: Constants.settings.UPDATE_PATCH, payload: patch})
                }
            },
            games: {
                set: (value) => {
                    dispatch({type: Constants.games.SET, payload: value});
                },
                action: (session, action) => {
                    dispatch({type: server(Constants.games.ACTION), payload: {session: session, action: action}})
                },
                join: (session, name) => {
                    dispatch({type: server(Constants.games.JOIN), payload: {session: session, name: name}})
                },
                create: (game) => {
                    dispatch({type: server(Constants.games.CREATE), payload: {game: game}})
                }
            }
        }
    }
};

export default function(Component){
    return connect(mapStateToProps,mapDispatchToProps)(Component);
}
