'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableHighlight,
  LayoutAnimation,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import HomeScreen from './HomeScreen';
import { login } from '../common/actions/user';
import { ASYNC_STORAGE_KEY } from '../common/constants';

var window = Dimensions.get('window');

class StartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    };

    this.loginOrRegister = this.loginOrRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.navigateToHomeScreen = this.navigateToHomeScreen.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (this.props.user.status !== 'authorized' && user.status === 'authorized') {
      AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(user.profile));
      this.navigateToHomeScreen();
    }
  }

  navigateToHomeScreen() {
    const { navigator } = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    navigator.replace({
      title: 'Gainsville',
      component: HomeScreen
    });
  }

  showError(message) {
    Alert.alert('Error', message);
    this.setState({loading: false});
  }

  loginOrRegister() {
    const { dispatch, firebase } = this.props;
    if (!this.state.email || !this.state.password) {
      self.showError('Bruh, you need to give me an email and a password.');
    } else {
      dispatch(login(this.state.email, this.state.password, firebase.api));
    }
  }

  onChangeEmail(text) {
    this.setState({email: text});
  }

  onChangePassword(text) {
    this.setState({password: text});
  }

  render() {
    const { user } = this.props;
    let loginButton = null;
    if (user.status === 'authenticating') {
      loginButton =
        <TouchableHighlight style={[styles.loginButton]}>
          <Text style={[{color: '#fff'}]}>LOGGING IN...</Text>
        </TouchableHighlight>;
    } else {
      loginButton =
        <TouchableHighlight style={[styles.loginButton]} onPress={this.loginOrRegister.bind(this)}>
          <Text style={[{color: '#fff'}]}>ENTER</Text>
        </TouchableHighlight>;
    }
    return (
      <KeyboardAvoidingView style={[styles.background]} behavior="position">
        <Image style={[styles.background]} source={require('../assets/images/background.png')} resizeMode="cover">
          <View style={[styles.container]}>
            <Image style={[styles.logo]} resizeMode="stretch"
                   source={require('../assets/images/logo-main.png')}/>
            <View style={[styles.formContainer]}>
              <Text style={[styles.formLabel]}>Email</Text>
              <TextInput style={[styles.formText]}
                         onChangeText={this.onChangeEmail}>
              </TextInput>
            </View>
            <View style={[styles.formContainer]}>
              <Text style={[styles.formLabel]}>Password</Text>
              <TextInput style={[styles.formText]}
                         secureTextEntry={true}
                         keyboardType={'email-address'}
                         onChangeText={this.onChangePassword}>
              </TextInput>
            </View>
            <View style={[styles.formContainerLast]}>
              {loginButton}
            </View>
            <Image style={{
              height: window.height - 80,
              width: window.height - 80
            }} source={{uri: 'http://2.bp.blogspot.com/_H8hh1K-R3qo/TUHuC4TMatI/AAAAAAAAAMg/heH-xvbb1Uw/s1600/iron-sheik.JPG'}}/>
          </View>
        </Image>
      </KeyboardAvoidingView>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    height: window.height,
    width: window.width
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    height: window.width,
    width: window.width
  },
  formContainer: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingTop: 10
  },
  formContainerLast: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingTop: 25,
  },
  picture: {
    height: window.width,
    width: window.width
  },
  formLabel: {
    height: 20,
    color: '#fff'
  },
  formText: {
    height: 40,
    width: window.width - 40,
    backgroundColor: '#1f2429',
    borderWidth: 1,
    borderColor: 'gray',
    color: '#fff'
  },
  loginButton: {
    backgroundColor: '#a60707',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowOffset: {height: 5},
    shadowRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    width: window.width - 40
  }
});

function mapStateToProps(state) {
  const { user, firebase } = state;
  return {
    user,
    firebase
  };
}

export default connect(mapStateToProps)(StartScreen);
