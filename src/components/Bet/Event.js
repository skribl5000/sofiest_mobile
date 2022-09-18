import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput} from 'react-native';
import { Component } from 'react';
import Comments from './Comments';
import { baseURL } from '../../config';
import axios from 'axios';
import Navbar from '../Navbar';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function Event (props){
        axios.defaults.baseURL = baseURL;
        axios.defaults.timeout = 1500;
        const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState({});
        const item = props.route.params.item;
        const [editable, setEditable] = useState(false);
        const [changed, setChanged] = useState(false);

        useEffect(() => {
            axios.get('get_bet/', { params: { event_id: item['event']['id'] } })
              .then(({ data }) => {
                setVariants(data.variants)
                setData(data)
              })
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
          }, []);
        
        const [variants, setVariants] = useState([]);
        return (<View style={styles.container}>
                <Navbar navigation={props.navigation}/>
                <View style={styles.navbarView}>
                    <Button title='<- Back' onPress={()=>{props.navigation.goBack()}}/>
                </View>
                {isLoading ? <ActivityIndicator/>:(
                <View>
                <Text>Title: {data.event.title}</Text>
                <Text>Description: {data.event.description}</Text>

                <View style={styles.variantsView}>
                    <Text>Bet variants:</Text>
                    {data.variants.map((e, index, arr) => <View key={index} style={styles.variantView}>
                        <Text key={e.id}>{e.title}</Text>
                        <TextInput 
                            style={styles.variantInput} 
                            keyboardType='decimal-pad' 
                            placeholder={isNaN(variants[index].weight)? '':''+(variants[index].weight * 100).toFixed(0)}
                            value={isNaN(variants[index].weight)? '':''+(variants[index].weight * 100).toFixed(0)}
                            onChangeText={value=>{
                                let newVariants = [...variants];
                                newVariants[index].weight = value / 100;
                                setVariants(newVariants);
                            }}
                            editable={editable}
                            />
                        </View>)}    
                </View>
                </View>)}
                {editable ? 
                <View style={styles.submitBtnView}>
                <Button title='Submit' onPress={()=>{
                    const postData = {...data};
                    postData.variants = variants;
                    axios
                    .post('post_bet/', postData)
                    .then(response => {
                      setEditable(false);
                    })
                    .catch(error => console.log(error));
                }}/>
            </View>:
            <View style={styles.editBtnView}>
                <Button title='Edit' onPress={()=>{
                    setEditable(true);
                }}/></View>}
                
                <View style={styles.commentSection}>
                    <Comments/>
                </View>
            </View>)
    };
const styles = StyleSheet.create(
    {
        container:
            {
                flex:1,
            },
            commentSection:{
                textAlign:'center',
                alignItems: 'center'
            },
            navbarView:{
                alignItems:'flex-end'
            },
            submitBtnView:{
                alignItems:'flex-end'
            },
            editBtnView:{
                alignItems:'flex-end'
            },
            variantsView:{
                marginTop: 10,
                flexDirection:'column',
            },
            variantView:{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
            },
            variantInput:{
                borderColor: 'grey',
                borderWidth:1,
                width: '15%'
            }
    })

export default Event;