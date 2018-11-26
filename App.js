import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import HomeScreen from './screens/mainscreen';
import infoPage from './screens/infopage';
import settingsPage from './screens/settingspage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/configureStore';

const tabs = createMaterialTopTabNavigator (
  {
    Home: HomeScreen,
    Info: infoPage,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {tabBarVisible: false},
  }
);
const RootStack = createStackNavigator(
  {
    Home: tabs,
    Settings: settingsPage,
  },
  {
    initialRouteName: 'Home',
    //initialRouteName: 'Settings',
    navigationOptions: {
      header: null
  }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    )
  }
}
 