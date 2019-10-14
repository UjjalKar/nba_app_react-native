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

const AuthComponent = props => {
  const [loading, setLoading] = useState(false);

  const goNext = props => {
    props.navigation.navigate('App');
  };
  if (loading) {
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
          <AuthForm goNext={goNext(props)} />
        </View>
      </ScrollView>
    );
  }
};

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
