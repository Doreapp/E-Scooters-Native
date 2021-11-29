import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    StatusBar 
} from "react-native";

const styles = StyleSheet.create({
    container: {
    },
    scrollView: {
    },
    text: {
        fontSize: 42,
    },
});



export default class Maps extends Component {
    render() {

        const s_width = Dimensions.get('window').width; //full width
        const s_height = Dimensions.get('window').height; //full height

        const i_width = 1826
        const i_height = 590

        const width_ratio = s_width / i_width, 
            height_ratio = s_height / i_height 

        const ratio = Math.max(width_ratio, height_ratio)

        const final_width = i_width * ratio, 
            final_height = i_height * ratio

        console.log("screen size", s_width, s_height)
        console.log("img size", i_width, i_height)
        console.log("ratios", width_ratio, height_ratio, ratio)
        console.log("final size", final_width, final_height)

        console.log("Render map")
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Image
                        // style={styles.stretch}
                        style={{
                            width: final_width,
                            height: final_height
                        }}
                        source={require('../img/maps/01.png')}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}