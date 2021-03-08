import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const PlacesList = props => {
    return (
        <View>
            <Text>PlacesListScreen</Text>
        </View>
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
