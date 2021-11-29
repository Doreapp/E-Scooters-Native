import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from "react-native";
import images from './Images';


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
        zIndex: 10
    },
    image: {
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        zIndex: 10,
        // borderColor: "#00ffff",
        // borderWidth: 1,
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

export default MapMarker = ({ icon, lat, lon, zoom, firstTilePosition, width, height }) => {
    pixel = pointToPixels(lat, lon, zoom)

    if (width === undefined) {
        width = WIDTH
    }
    if (height === undefined) {
        height = HEIGHT
    }

    let transformStyle = {
        transform: [
            { translateX: pixel.x - firstTilePosition.x * TILE_SIZE - width / 2 },
            { translateY: pixel.y - firstTilePosition.y * TILE_SIZE - height / 2 }
        ]
    }

    let sizeStyle = {
        width: width,
        height: height
    }

    console.log(icon)

    if (icon == undefined) {
        return (
            <View
                style={[
                    styles.default,
                    transformStyle,
                    sizeStyle]}
            />
        )
    } else {
        return (
            <Image
                style={[styles.image, 
                    transformStyle,
                     sizeStyle]}
                    source={icon}
            />
        )
    }
}