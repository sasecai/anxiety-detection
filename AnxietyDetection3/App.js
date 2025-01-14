import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import Photo from './PhotoModel';
import { PhotoHistoryProvider } from './PhotoHistoryProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PhotoHistoryProvider>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
        </PhotoHistoryProvider>
      </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
