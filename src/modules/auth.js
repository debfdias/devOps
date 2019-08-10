import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { reset } from 'redux-form';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const signInUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });

      dispatch(reset('signin'));

      Actions.post();
    })
    .catch((error) => { dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) }); });
};

export const signUpUser = ({ email, password,birth, firstname, lastname }) => (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.database().ref('/users/')
        .set({ firstname, lastname })
        .then(() => {
          dispatch({ type: SIGN_UP_SUCCESS, payload: user });

          dispatch(reset('signup'));

          Actions.post();
        });
    })
    .catch((error) => { dispatch({ type: SIGN_UP_FAILURE, payload: authFailMessage(error.code) }); });
};

export const clearState = () => (
  { type: SET_INITIAL_STATE }
);

export const signOutUser = () => (dispatch) => {
  dispatch({ type: SET_INITIAL_STATE });

  firebase.auth().signOut();
};

const authFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'E-mail eh invalido';
    case 'auth/user-not-found':
      return 'Usuario nao encontrado';
    case 'auth/wrong-password':
      return 'Senha incorreta';
    case 'auth/email-already-in-use':
      return 'E-mail ja esta em uso';
    default:
      return 'Erro na autenticacao';
  }
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  error: '',
  loading: false,
  user: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_UP_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_UP_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SIGN_IN_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SET_INITIAL_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default reducer;
