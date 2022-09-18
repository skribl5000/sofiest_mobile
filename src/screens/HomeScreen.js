import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import EventFeed from '../components/EventFeed';
import { baseURL } from '../config';
import FilterPanel from '../components/FilterPanel';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Event from '../components/Bet/Event';
import LeaderBoard from '../components/LeaderBoard/Leaderboard';
import AuthScreen from './AuthScreen';

function HomeScreen() {
    const Stack =  createStackNavigator()
    // return Stack;
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    cardStyle: {
                        backgroundColor: 'white',
                    },
                    animationEnabled: false,
                    headerShown: false,
                    }}
                    initialRouteName={axios.defaults.headers.common.Authorization == null? 'AuthScreen':'EventFeed'}>
                    <Stack.Screen name='LeaderBoard' component={LeaderBoard}/>
                    <Stack.Screen name='EventFeed' component={EventFeed}/>
                    <Stack.Screen name='Event' component={Event}/>
                    <Stack.Screen name='AuthScreen' component={AuthScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    </View>
    )
}

  
  const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: '5%',
        paddingHorizontal: '5%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'
      },
    container: {
        width:'100%',
        flex: 1,
        marginTop: '10%'
    }
  });

  export default  HomeScreen;
