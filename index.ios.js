/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Alert, Button, NetInfo } from 'react-native';

const NETINFO = {none: "离线", wifi: "wifi", cell: '网络', unknown: '网络状态不可知'}
function handleClick() {
  NetInfo.fetch().done((reach) => {
    Alert.alert('Net', 'Initial: ' + NETINFO[reach]);
  });
  // Alert.alert('handleClick', NetInfo)
}

export default class awesomeBus extends Component {
  
  // 生命周期
  componentDidMount() {
    function handleFirstConnectivityChange(reach) {
      Alert.alert('Net', 'First change, type: ' + NETINFO[reach]);
      NetInfo.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      );
    }
    NetInfo.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native2!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button title="check net!" onPress={handleClick}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('awesomeBus', () => awesomeBus);
