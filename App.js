import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';


init().then(() => {
    console.log('Initialized db'); 
}).catch(err => {
    console.log('Something went wrong creating the db');
    console.log(err);
});

const rootReducer = combineReducers({
    places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
};
