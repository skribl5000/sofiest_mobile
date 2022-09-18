import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Button } from 'react-native';
import axios from 'axios';
import { baseURL } from '../config';

function AuthScreen (props) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.timeout = 1500;

    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState(null);
    const [passwordCheck, onChangePasswordCheck] = React.useState(null);

    const [loggedIn, setLoggedIn] =  React.useState(! axios.defaults.headers.common.Authorization == null);

    const [newUser, setSelection] = React.useState(false);
    const [lastname, onChangeLastname] = React.useState("");
    const [firstname, onChangeFirstname] = React.useState("");

    let logoutButton = <Button onPress={logout} title='logout' style={styles.navBarButtonWrap} color='#56A6BA'></Button>
    let signupButton = <Button onPress={signup} title='signup'></Button>
    let loginButton = <Button onPress={login} title='login'></Button>
    let logo = <View style={styles.navBarButtonWrap}><Text style={styles.navBarText}>SofiestApp</Text></View>

    async function login(){
        const payload = {
          username: username,
          password: password
        };
        clearForms();
        axios
        .post('auth/login/', payload)
        .then(response => {
          const { token, user } = response.data; 
          // We set the returned token as the default authorization header
          axios.defaults.headers.common.Authorization = `Token ${token}`;
          console.log(token)
          props.navigation.navigate('EventFeed')
          // Navigate to the home screen
        })
        .catch(error => console.log(error));
      }
    
      async function logout(){
        axios 
          .get('auth/logout/')
          .then(response => {
            axios.defaults.headers.common.Authorization = null
            setLoggedIn(false);
          })
          .catch(error =>  console.log(error));
      }
      
      async function clearForms(){

        onChangeUsername('')
        onChangeLastname('')
        onChangePassword('')
        onChangePasswordCheck('')
      }
    
      async function signup(){
        const payload = { 
          username: username, 
          password: password,
          firstname: firstname,
          lastname: lastname
        } 
        clearForms();
        if (password != passwordCheck){
          Alert.alert('passowrds are not equal')
          return
        }
        axios 
          .post('auth/register/', payload)
          .then(response => {
            const { token, user } = response.data;
            // We set the returned token as the default authorization header
            axios.defaults.headers.common.Authorization = `Token ${token}`;
            setLoggedIn(true);
          })
          .catch(error =>  console.log(error));
      }

    let loginForm = 
      <SafeAreaView>
      <TextInput
        onChangeText={onChangeUsername}
        value={username}
        placeholder="email"
        autoCapitalize='none'
      />
      <TextInput
        onChangeText={onChangePassword}
        secureTextEntry
        value={password}
        placeholder="password"
        autoCapitalize='none'
        onSubmitEditing={login}
      />
      {loginButton}
      <Button onPress={()=>setSelection(true)} title='new user?'/>
      </SafeAreaView>
      ;

      let signupForm = 
<View style={styles.container}>
  <SafeAreaView>
    <TextInput
        onChangeText={onChangeUsername}
        placeholder="email"
        autoCapitalize='none'
      />
      <TextInput
        onChangeText={onChangeFirstname}
        placeholder="firstname"
      />
      <TextInput
        onChangeText={onChangeLastname}
        placeholder="lastname"
      />
      <TextInput
        onChangeText={onChangePassword}
        secureTextEntry
        placeholder="password"
        autoCapitalize='none'
        value={password}
      />
      <TextInput
        onChangeText={onChangePasswordCheck}
        secureTextEntry
        placeholder="repeat password"
        autoCapitalize='none'
        onSubmitEditing={signup}
        value={passwordCheck}
      />
        {signupButton}
        <Button onPress={()=>setSelection(false)} title='already has account?'/>
        </SafeAreaView>
        
        </View>

    if (loggedIn){
        props.navigation.navigate('EventFeed');
    }

    return (
        <View style={styles.container}>
            {logo}
            {newUser? signupForm: loginForm}
        </View>
    )
    }


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: '10%',
          paddingHorizontal: '5%',
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems:'center'
        },
        row: {
          flexDirection: "row",
          flexWrap: "wrap",
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

export default AuthScreen;