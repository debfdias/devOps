/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import firebase from 'firebase';
import firebaseConfig from './firebase.json';
import { Provider } from 'react-redux';

import { SIGN_IN_SUCCESS } from './modules/auth';
import { Spinner } from './components/common';
import store from './configureStore'
import Routes from './Routes';



import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false };
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loaded: true });

      if (user) {
        store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.loaded ? <Routes /> : <Spinner />}
      </Provider>
    );
  }
}

export default App;
