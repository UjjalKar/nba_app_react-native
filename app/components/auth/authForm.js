import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Button,
  Platform,
} from 'react-native';
import Input from '../../utils/forms/input';
import ValidationRules from '../../utils/forms/validationRules';
import {setTokens} from '../../utils/misc';
import {connect} from 'react-redux';
import {signUp, signIn} from '../../store/actions/users_action';
import {bindActionCreators} from 'redux';

export class AuthForm extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'I want to register',
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'password',
        },
      },
    },
  };

  updateInput = (name, value) => {
    this.setState({
      hasError: false,
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    // rules
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;
    // end vaidation
    this.setState({
      form: formCopy,
    });
  };

  changeFormType = () => {
    const type = this.state.type;

    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode: type === 'Login' ? 'I want to Login' : 'I want to register',
    });
  };

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      this.setState({hasErrors: true});
    } else {
      setTokens(this.props.User.auth, () => {
        this.setState({hasErrors: false});
        this.props.goNext();
      });
    }
  };

  submitUser = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === 'Login') {
        //  Login
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && formCopy[key].value;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].value;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === 'Login') {
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasError: true,
      });
    }
  };

  render() {
    return (
      <View>
        <Input
          placeholder="Enter email"
          placeholderTextColor="#cecece"
          autoCapitalize={'none'}
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          keyboardType={'email-address'}
          onChangeText={value => this.updateInput('email', value)}
          //   overrideStyles
        />
        <Input
          placeholder="Enter password!"
          placeholderTextColor="#cecece"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          secureTextEntry
          onChangeText={value => this.updateInput('password', value)}
          //   overrideStyles
        />
        {/* confirm password field */}
        {this.state.type !== 'Login' ? (
          <Input
            placeholder="Confirm password!"
            placeholderTextColor="#cecece"
            type={this.state.form.confirmPassword.type}
            value={this.state.form.confirmPassword.value}
            secureTextEntry
            onChangeText={value => this.updateInput('confirmPassword', value)}
            //   overrideStyles
          />
        ) : null}
        {/* end */}
        {/* Error Fields */}
        {this.state.hasErrors ? (
          <View style={styles.errorFormContainer}>
            <Text style={styles.errorFormLabel}>Ooops, check inputs</Text>
          </View>
        ) : null}
        {/* End Error fields */}

        {/* Action Button */}
        <View style={{marginTop: 20}}>
          <View style={styles.button}>
            <Button
              color="#1d428a"
              title={this.state.action}
              onPress={this.submitUser}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={this.state.actionMode}
              onPress={this.changeFormType}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="I'll do it later"
              onPress={() => this.props.goNext()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorFormContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336',
  },

  errorFormLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginBottom: 10,
        marginTop: 10,
      },
    }),
  },
});

function mapStateToProps(state) {
  console.log(state);

  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn, signUp}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthForm);
