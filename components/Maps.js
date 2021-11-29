import React, { Component } from 'react';
import { Image } from 'react-native';


export default class Maps extends Component {
    render() {
        console.log("Render map")
        return (
            <Image
                // style={styles.stretch}
                style={{
                    width:160,
                    height:80
                }}
                source={require('../img/maps/01.png')}
            />
        )
    }
}