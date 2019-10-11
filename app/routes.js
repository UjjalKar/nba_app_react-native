import React from 'react';
import {Platform} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

// Screens
import Signin from './components/auth';
import News from './components/news';
import Games from './components/games';
