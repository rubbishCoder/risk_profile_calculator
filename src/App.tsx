import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Provider } from 'react-redux';
import Assessment from './components/Assessment';
import Home from './components/Home';
import Results from './components/Results';
import store from './reducers/store';

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Assessment" options={{ headerShown: false }} component={Assessment} />
          <Stack.Screen name="Results" options={{ headerShown: false }} component={Results} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
