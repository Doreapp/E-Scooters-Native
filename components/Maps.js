import React, { Component } from 'react';
import { Image } from 'react-native';
import { Dimensions } from "react-native";




export default class Maps extends Component {
    render() {
        
        const s_width = Dimensions.get('window').width; //full width
        const s_height = Dimensions.get('window').height; //full height

        console.log("Render map")
        return (
            <Image
                // style={styles.stretch}
                style={{
                    width:s_width,
                    height:s_height
                }}
                source={require('../img/maps/01.png')}
            />
        )
    }
}