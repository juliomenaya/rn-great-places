import React, { useState, useCallback, useEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const Map = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly = props.navigation.getParam('readOnly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    let mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        if (readOnly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('Cant go back', 'Please mark a location on the map', [{ text: 'Okay' }]);
            return;
        }
        props.navigation.navigate('NewPlaces', { pickedLocation: selectedLocation });
    }, [selectedLocation]);
    
    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler});
    }, [savePickedLocationHandler]);

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
        mapRegion.latitude = selectedLocation.lat;
        mapRegion.longitude = selectedLocation.lng;

    }

    return (
        <MapView
            region={mapRegion}
            style={styles.map}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}
        </MapView>
    );
};

Map.navigationOptions = navData => {
    const saveFunction = navData.navigation.getParam('saveLocation');
    const readOnly = navData.navigation.getParam('readOnly');

    if (readOnly) {
        return;
    }

    return {
        headerRight: () => {
            return (
                <TouchableOpacity style={styles.headerButton} onPress={saveFunction}>
                    <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
            );
        }
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default Map;
