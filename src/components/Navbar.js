import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Button } from 'react-native';
import axios from 'axios';

function Navbar(props){
    async function logout(){
        axios 
          .get('auth/logout/')
          .then(response => {
            axios.defaults.headers.common.Authorization = null;
            props.navigation.navigate('AuthScreen');
          })
          .catch(error =>  console.log(error));
      }

    let logoutButton = <Button onPress={logout} title='logout' style={styles.navBarButtonWrap} color='#56A6BA'></Button>
    let logo = <View style={styles.navBarButtonWrap}><Text style={styles.navBarText}>SofiestApp</Text></View>
    
    return (
            <View style={styles.navbar}>
            <Button 
                title='Leaders' 
                style={styles.navBarButtonWrap} 
                color='#56A6BA' 
                onPress={()=>props.navigation.navigate('LeaderBoard')}/>
                {logo}
                {logoutButton}
            </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: '5%',
        backgroundColor: '#fff',
        justifyContent: 'center',    
        alignItems:'center'
      },
      navbar:{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: '2%',
        marginBottom: '2%',
        justifyContent: 'space-between',
        alignContent: 'space-between',   
        width: '100%',
        borderColor: 'grey',
        borderBottomEndRadius: 15,
        borderBottomWidth: 0.5
      },
    listFeed:{
        borderColor: 'red',
        alignSelf: 'stretch',
        width:'100%',
    },
     navBarButtonWrap:{
    padding: '2.5%',
  },
  navBarText:{
    color: '#56A6BA',
    fontWeight: '700',
    fontSize: 18
  }
  });

export default Navbar