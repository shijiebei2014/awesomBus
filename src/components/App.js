import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Button, NetInfo, Image, Modal } from 'react-native';

const NETINFO = { none: "离线", wifi: "wifi", cell: '网络', unknown: '网络状态不可知' }
// 私有方法
function handleClick() {
    NetInfo.fetch().done((reach) => {
        Alert.alert('Net', 'Initial: ' + NETINFO[reach]);
    });
}
function onLoadStart(args) {
    console.log(`loadStart`);
}
function onLoad(args) {
    console.log(`load`);
}
function onLoadEnd(args) {
    console.log(`loadEnd`);
}
export default class awesomeBus extends Component {
    constructor(props) {
        super(props)
        this.state = {modalVisible: false}
        
        this.openModal = this.openModal.bind(this)
        console.log(this.openModal);
    }
    openModal() {
        this.setState(Object.assign(this.state, { modalVisible: !this.state.modalVisible }))
    }
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
                <Modal animationType="fade" visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Text> modal text</Text>
                        <Button title="close modal" onPress={this.openModal.bind(this)} />
                    </View>
                </Modal>
                <Text style={styles.welcome}>Welcome to React Native2!
                </Text>
                <Image onLoadStart={onLoadStart} onLoad={onLoad} onLoadEnd={onLoadEnd} style={styles.icon} source={{ uri: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3618887590,1475536464&fm=85&s=F5907F9566037AE844A970E30300E030' }} />
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
                <Button title="check net!" onPress={handleClick} />
                <Button title="open modal" onPress={this.openModal.bind(this)}/>
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
    icon: {
        width: 100,
        height: 50,
    },
});