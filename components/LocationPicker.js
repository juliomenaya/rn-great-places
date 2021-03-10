import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, Button } from 'react-native';
import MapPreview from './MapPreview';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const mapPickedLocation = props.navigation.getParam('pickedLocation');
    const {onLocationPicked} = props;

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
        }
        onLocationPicked(mapPickedLocation);
    }, [onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficiente permission!',
                'You need to grant location permissions to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync();
            console.log('La location')
            console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            console.log(err);
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map',
                [{ text: 'Okay' }]
            );
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
                {isFetching ? (
                    <ActivityIndicator size='large' color={Colors.primary}/>
                ) : (
                    <Text>No location chosen yet</Text>
                )}
            </MapPreview>
            <View style={styles.actions}>
                <Button title="Get user location" color={Colors.primary} onPress={getLocationHandler}/>
                <Button title="Pick on map" color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;
