import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native-gesture-handler';
import firebase from '../Config';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeusers: [],
      inactiveusers: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitleText}>MainScreen!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
