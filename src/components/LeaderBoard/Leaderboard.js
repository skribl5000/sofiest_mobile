import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import Navbar from '../Navbar';

function LeaderBoard (props) {
        return (
        <View >
                <Navbar navigation={props.navigation}/>
                <Button title='<- Back' onPress={()=>{props.navigation.goBack()}}/>
                <Text>LeaderBoard</Text>
        </View>
          )
    }


const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        flexGrow:1,
        width: '100%',
    },
  });

export default LeaderBoard;