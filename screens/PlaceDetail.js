import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlaceDetail = props => {
    return (
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    );
};

PlaceDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    };
};

const styles = StyleSheet.create({});

export default PlaceDetail;
