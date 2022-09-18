import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import Event from './Bet/Event';

function EventCard({item, navigation}){
    const expectedDateAndTime = item.event.date.replace('Z', '').split('T');
    const dueDateAndTime = item.event.active_due_date.replace('Z', '').split('T');

    return (
    <View style={[styles.eventItemContainer, item.has_bet? styles.myEvent: {}]}>
        <View style={styles.descriptionArea}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Event', {item, navigation})}>
                <Text style={styles.eventTitle}>{item.event.title}</Text>
                </TouchableOpacity>
                <Text style={styles.eventDescription}>{item.event.description}</Text>
            
        </View>
        <View style={styles.datesArea}>
            <Text style={styles.datesText}>Expected date: {expectedDateAndTime[0]} {expectedDateAndTime[1]}</Text>
            <Text style={styles.datesText}>Bet due date: {dueDateAndTime[0]} {dueDateAndTime[1]}</Text>
        </View>
    </View>
    ) 
}

const styles = StyleSheet.create({
    eventItemContainer:{
        flexDirection: 'row',
        width: '95%',
        borderRadius: 10,
        padding: 10,
        borderWidth: 0.5,
        marginBottom: 8
    },
    eventTitle:{
        fontWeight: '700',
        fontSize: 16,
    },
    eventDescription:{
        fontWeight: '400',
        fontSize: 12,
        flexWrap: 'wrap',
        maxHeight: 80
    },
    descriptionArea:{
        width: '70%',
        borderRightColor: 'grey',
        borderRightWidth: 0.5,
        paddingRight: 5
    },
    datesArea:{
        width: '30%',
        paddingLeft: 5,
    },
    datesText:{
        fontSize: 12,
    },
    myEvent:{
        borderColor: 'green'
    }

  });

export default EventCard;