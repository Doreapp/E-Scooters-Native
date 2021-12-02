import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Slider, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 150,
        width: 350,
        backgroundColor: 'black',
        borderRadius: 20,
        margin: 20,
    },
    title: {
        fontSize: 30,
        color: 'white',
        padding: 10
    },
    rightText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'right',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    leftText: {
        fontSize: 20,
        color: 'white',
        paddingLeft: 10,
    },
    batteryView: {
        flexDirection: 'row',
        padding: 10,
    },
    titleView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    brandimage: {
        width: 20,
        height: 30,
        margin: 10,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    closeButton: {
            flexDirection: 'row',
            position: 'absolute',
            top: 10, left: 320,
            justifyContent: 'center', 
            alignItems: 'center'
    }
});

const ScooterModal = ({ scooter, setScooter }) => {
    return (
        <View style={styles.container}>
            <Icon
                name="close"
                size={20}
                color="white"
                style={styles.closeButton}
                onPress={console.log('close')}
                />
            <View style={styles.titleContainer}>
            <Text style={styles.title}>{scooter.brand}</Text>
                {/* <Image 
                        source={scooter.icon}
                        style={styles.brandimage}>
                    </Image> */}
            </View>
            <View style={styles.line} />
            <View style={styles.batteryView}>
                <Icon
                name="battery"
                size={20}
                color="white"
                />
                <Text style={styles.leftText}>Battery</Text>
                <Text style={styles.rightText}>{scooter.battery}%</Text>
            </View>
        </View>
    )
}

export default ScooterModal;