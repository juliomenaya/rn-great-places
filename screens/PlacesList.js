import React from 'react';
import { Platform, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlacesList = props => {
    const places = useSelector(state => state.places.places);

    return (
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
                        image={null}
                        title={itemData.item.title}
                        address={null}
                    />
                )
            } 
        
        />
    );
};

PlacesList.navigationOptions = navData => {
    return {
        headerTitle: 'All places',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlaces');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default PlacesList;
