import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesList = props => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();
    const addNewPlaceHandler = () => {
        props.navigation.navigate('NewPlaces');
    };

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <View style={styles.container}>     
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                        <PlaceItem
                            onSelect={() => {
                                props.navigation.navigate(
                                    'PlaceDetail',
                                    { placeTitle: itemData.item.title, placeId: itemData.item.id }
                                );
                            }}
                            image={itemData.item.imageUri}
                            title={itemData.item.title}
                            address={itemData.item.address}
                        />
                    )
                }     
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={addNewPlaceHandler}>
                    <Text style={{color: 'white'}}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: Colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    
});

PlacesList.navigationOptions = navData => {
    return {
        headerTitle: 'All places',
    };
};


export default PlacesList;
