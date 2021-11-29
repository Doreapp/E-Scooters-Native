import React from 'react';
import {
    Image,
    StyleSheet
} from "react-native";

import UserAgent from 'react-native-user-agent';

const TILE_SIZE = 256
const DISPLAY_SIZE = TILE_SIZE

const styles = StyleSheet.create({
    image: {
        width: DISPLAY_SIZE,
        height: DISPLAY_SIZE,
        backgroundColor: "#fff",
        borderColor: "#ff0000",
        resizeMode: 'stretch',
        borderWidth: 1
    }
})


const toUrl = (x, y, z) => {
    return "https://b.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png"
}

const userAgent = UserAgent.getUserAgent()

export default MapTile = ({ x, y, z, style }) => {
    const url = toUrl(x, y, z)
    console.log("MapTile: ", x, y, z, "url=", url)
    return (
        <Image
            // style={styles.stretch}
            style={[styles.image, style]}
            source={{
                uri: url,
                headers: {
                    'User-Agent': userAgent
                }
            }}
        />
    )
}