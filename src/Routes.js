import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';
import requireNotAuth from './containers/auth/requireNotAuth';

import PostCreate from './containers/post/PostCreate';
import PostEdit from './containers/post/PostEdit';
import PostList from './containers/post/PostList';
import requireAuth from './containers/auth/requireAuth';


const RouterComponent = () => (
  <Router
    sceneStyle={{ paddingTop: 65, backgroundColor: '#edecec' }}
    navigationBarStyle={styles.navigationBarStyle}
    titleStyle={{ color: '#4d4d4d' }}
  >
    <Scene key="mod">
      <Scene key="signup" component={requireNotAuth(Signup)} title="Por favor, insira seus dados" />
      <Scene key="signin" component={requireNotAuth(Signin)} title="Por favor, logue no sistema" />

      <Scene
        key="postList"
        component={requireAuth(PostList)}
        title="Posts"
        leftTitle="Logout"
        onLeft={() => { firebase.auth().signOut(); Actions.auth(); }}
        onRight={() => Actions.postCreate()}
        rightTitle="Add"
      />
      <Scene key="postCreate" component={requireAuth(PostCreate)} title="Adicionar linguagem programacao" />
      <Scene key="postEdit" component={requireAuth(PostEdit)} title="Editar linguagem programacao" />

    </Scene>
  
  </Router>
);

const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

export default RouterComponent;
