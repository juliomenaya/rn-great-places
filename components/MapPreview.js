import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import ENV from '../env';

const MapPreview = props => {
    let imagePreview;

    if (props.location) {
        const {lat, lng} = props.location;
        imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${
            lat
        },${
            lng
        }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            lat
        },${lng}&key=${ENV.googleApiKey}`;
    }
    return (
        <View style={{...props.style, ...styles.mapPreview}}>
            {props.location ? <Image style={styles.mapImage} source={{ uri: imagePreview }}/> : props.children}
        </View>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});
