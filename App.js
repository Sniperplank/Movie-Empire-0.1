import { StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import Home from './Pages/Home';
import WatchLater from './Pages/WatchLater';
import SearchResults from './Pages/SearchResults';
import History from './Pages/History';
import Favourites from './Pages/Favourites';
import UserAuth from './Pages/UserAuth';
import store from './redux/store';
import MovieDetails from './Pages/MovieDetails';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Watch Later" component={WatchLater} />
          <Stack.Screen name="Search Result" component={SearchResults} />
          <Stack.Screen name="Login/Signup" component={UserAuth} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="Movie Details" component={MovieDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
