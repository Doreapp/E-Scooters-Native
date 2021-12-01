import React, { Component, useState } from 'react';
import { View, Image, Text, StyleSheet, Slider, TouchableOpacity, CheckBox } from 'react-native';
//import Slider from 'react-native-slider';

const styles = StyleSheet.create({
    filterView: {
        flex: 1,
        backgroundColor: "black",
        margin: 40,
        marginBottom: 100,
        width: 300,
        padding: 10,
        paddingBottom: 500
    },
    text: {
        fontSize: 50,
        color: "white"
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
    }
});
const markerDisplay = () =>
<Image style={[styles.image,
    sizeStyle]}
    source={icon}
/>

const FilterModal = ({ onClick }) => {
    const [value, setValue] = useState(0.2);
    return (
            <View style={styles.filterView}>
                <Text style={styles.title}>Distance</Text>
                <Slider
                    value={value}
                    onValueChange={value => setValue({value})} />
                <Text style={styles.title}>Battery</Text>
                <Slider
                    value={value}
                    onValueChange={value => setValue({value})} />
                <Text style={styles.title}>No lock up fee</Text>
                <Text style={styles.title}>Max price/minute</Text>
                <Slider
                    value={value}
                    onValueChange={value => setValue({value})} />
                <Text style={styles.title}>Brands</Text>
                <View style={styles.brandContainer}>
                    <TouchableOpacity>
                        <Image 
                            source={require('../img/lime_pin.png')}
                            style={styles.brandimage} 
                            onClick={() => console.log("lime")}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image 
                            source={require('../img/voi_pin.png')}
                            style={styles.brandimage} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image 
                            source={require('../img/bird_pin.png')}
                            style={styles.brandimage}
                            onPress={() => console.log("lime")} />
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default FilterModal;