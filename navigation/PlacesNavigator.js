import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlacesList from '../screens/PlacesList';
import PlaceDetail from '../screens/PlaceDetail';
import NewPlaces from '../screens/NewPlace';
import Map from '../screens/Map';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';


const PlacesNavigator = createStackNavigator(
    {
        Places: PlacesList,
        PlaceDetail: PlaceDetail,
        NewPlaces: NewPlaces,
        Map: Map
    }, 
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
);

export default createAppContainer(PlacesNavigator);
