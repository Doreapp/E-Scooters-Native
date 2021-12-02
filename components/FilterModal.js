import React, { Component, useState } from 'react';
import { View, Image, Text, StyleSheet, Slider, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
    filterView: {
        flex: 1,
        backgroundColor: "black",
        margin: 40,
        marginBottom: 100,
        width: 300,
        padding: 10,
        paddingBottom: 500,
    },
    title: {
        fontSize: 20,
        color: "white"
    },
    brandimage: {
        width: 40,
        height: 50,
        margin: 5
    },
    brandContainer: {
        flexDirection: 'row',
        padding: 10
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    }
});
const CheckBox = ({ selected, onPress, style, size = 30, color = 'white', text, ...props}) => (
    <View style={[styles.checkBox]}>
        <Text style={styles.title}> {text} </Text>
        <TouchableOpacity onPress={onPress} {...props}>
            <Icon
                size={size}
                color={color}
                name={ selected ? 'check-box' : 'check-box-outline-blank'}
            />
        </TouchableOpacity>
    </View>
)

const FilterModal = () => {
    const [distValue, setDistValue] = useState(0.2);
    const [batteryValue, setBatteryValue] = useState(0.5);
    const [priceValue, setPriceValue] = useState(0.1);
    const [lockUpFee, setlockUpFee] = useState(false);

    return (
            <View style={styles.filterView}>
                <Text style={styles.title}>Distance</Text>
                <Slider
                    value={distValue}
                    onValueChange={distValue => setDistValue({distValue})} />
                <Text style={styles.title}>Battery</Text>
                <Slider
                    value={batteryValue}
                    onValueChange={batteryValue => setBatteryValue({batteryValue})} />
                <CheckBox 
                    text={'No lock up fee'}
                    selected={lockUpFee} 
                    onPress={() => setlockUpFee(!lockUpFee)}/>
                <Text style={styles.title}>Max price/minute</Text>
                <Slider
                    value={priceValue}
                    onValueChange={priceValue => setPriceValue({priceValue})} />
                <Text style={styles.title}>Brands</Text>
                <View style={styles.brandContainer}>
                    <TouchableOpacity>
                        <Image 
                            source={require('../img/lime_pin.png')}
                            style={styles.brandimage} 
                            onPress={() => console.log("lime")}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image 
                            source={require('../img/voi_pin.png')}
                            style={styles.brandimage}
                            onPress={() => console.log("voi")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image 
                            source={require('../img/bird_pin.png')}
                            style={styles.brandimage}
                            onPress={() => console.log("bird")} />
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default FilterModal;