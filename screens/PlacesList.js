import React, { useEffect } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import CustomHeaderButton from '../components/CustomHeaderButton';
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
                            address={null}
                        />
                    )
                }     
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={addNewPlaceHandler}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#456783'
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'pink',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
});

PlacesList.navigationOptions = navData => {
    return {
        headerTitle: 'All places',
        // headerRight: (
        //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //         <Item
        //             title='Add Place'
        //             iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        //             onPress={() => {
        //                 navData.navigation.navigate('NewPlaces');
        //             }}
        //         />
        //     </HeaderButtons>
        // )
    };
};


export default PlacesList;
