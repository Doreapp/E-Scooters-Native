import React from 'react';
import {
    View,
    StyleSheet
} from "react-native";


const WIDTH = 20
const HEIGHT = 20
const TILE_SIZE = 256
const styles = StyleSheet.create({
    default: {
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#ff0000",
        borderRadius: 99,
        borderColor: "#00ffff",
        zIndex: 10
    }
})

const pointToPixels = (lat, lon, zoom) => {
    let n = Math.pow(2, zoom) * TILE_SIZE
    let lat_radian = lat * Math.PI / 180
    let x = Math.floor((lon + 180) / 360 * n)
    let y = Math.floor((1 - Math.log(Math.tan(lat_radian) + 1 / Math.cos(lat_radian)) / Math.PI) / 2 * n)

    return {
        x: x,
        y: y
    }
}

export default MapMarker = ({ lat, lon, zoom, firstTilePosition }) => {
    pixel = pointToPixels(lat, lon, zoom)


    let transformStyle = {
        transform: [
            {translateX: pixel.x - firstTilePosition.x*TILE_SIZE - WIDTH/2},
            {translateY: pixel.y - firstTilePosition.y*TILE_SIZE - HEIGHT/2}
        ]
    }

    console.log("Marker: ", transformStyle)


    return (
        <View
            style={[styles.default, transformStyle]}
        />
    )
}