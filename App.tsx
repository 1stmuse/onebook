import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import RootNavigator from './navigators';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists']);

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1, paddingTop: 30 }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
