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

import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/users_action';
import {bindActionCreators} from 'redux';

import {setTokens, getTokens} from '../../utils/misc';
class AuthComponent extends React.Component {
  state = {
    loading: true,
  };

  goNext = () => {
    this.props.navigation.navigate('App');
  };

  componentDidMount() {
    getTokens(value => {
      if (value[0][1] === null) {
        this.setState({loading: false});
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({loading: false});
          } else {
            setTokens(this.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }

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

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({autoSignIn}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthComponent);
