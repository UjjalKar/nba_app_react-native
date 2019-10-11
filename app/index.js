import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';
import {RootNavigator} from './routes';

const Index = () => {
  const Nav = RootNavigator();
  return (
    <>
      <StatusBar backgroundColor="#1d428a" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Nav />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Index;
