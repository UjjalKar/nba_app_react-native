import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import AuthLogo from './authLogo';
import AuthForm from './authForm';

class AuthComponent extends React.Component {
  state = {
    loading: false,
  };

  goNext = () => {
    this.props.navigation.navigate('App');
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <AuthLogo />
            <AuthForm goNext={this.goNext} />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: '#1d428a',
    backgroundColor: '#fff',
    padding: 50,
  },
});

export default AuthComponent;
