import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, FlatList,
     ActivityIndicator, Button, ScrollView, RefreshControl,
    TouchableOpacity } from 'react-native';
import axios from 'axios';
import { baseURL } from '../config';
import EventCard from './EventCard';
import Navbar from './Navbar';
import { startOfYesterday } from 'date-fns';

function EventFeed (props) {
        
        axios.defaults.baseURL = baseURL;
        axios.defaults.timeout = 1500;
        const [isLoading, setLoading] = useState(true);
        const [categories, setCategories] = useState([]);
        const [data, setData] = useState([]);
        const [enabledCategories, setEnabledCategories] = useState([]);
        
        useEffect(() => {
            axios.get('events/')
              .then(({ data }) => {
                setData(data)
              })
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
          }, []);

        useEffect(() => {
            axios.get('event_category/')
            .then(({ data }) => {
                setCategories(data)
            })
            .catch((error) => console.error(error))
        }, []);

        const onRefresh = React.useCallback(() => {
            setLoading(true);
            axios.get('events/')
            .then(({ data }) => {
                setData(data)
              })
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

          }, []);

        const filterPanel = (
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesPannel}>
            <TouchableOpacity style={styles.filterBtn} onPress={()=>setEnabledCategories([])}><Text style={styles.filterBtnText}>All</Text></TouchableOpacity>
            {/* <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterBtnText}>My Predictions</Text></TouchableOpacity> */}
            {categories.map((e, index) => 
            <TouchableOpacity 
                key = {e.id} 
                style={[styles.filterBtn, enabledCategories.includes(e.id)? styles.includedCategory: {}]}
                onPress={
                    ()=>{
                    let tmpCats = [...enabledCategories];
                    if (tmpCats.includes(e.id)){
                        tmpCats = tmpCats.filter(elem => elem !== e.id)
                    }
                    else{
                        tmpCats.push(e.id)
                    }
                    setEnabledCategories(tmpCats);
                    }
                }
            >
                <Text key={e.id} style={styles.filterBtnText}>{e.name}</Text>
            </TouchableOpacity>)}
        </ScrollView>
        );

        return (
        <View style={styles.mainContainer}>
            <Navbar navigation={props.navigation}/>
            
            <View style={styles.container}>
            {filterPanel}
            <ScrollView 
                style={styles.listFeed}
                refreshControl={<RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                />}
            >
                {data.filter((e) => {
                    if (enabledCategories.length == 0 || enabledCategories.includes(e.event.category_id)){
                        return true
                    }
                    return false
                }).map((e, index) => <EventCard item={e} key={index} navigation={props.navigation}/>)}
            </ScrollView>

            </View>
        </View>
        
        )
        }


const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        width: '100%',
    },
    listFeed:{
        borderColor: 'red',
        alignSelf: 'stretch',
        width:'100%',
        height:'100%'
    },
     navBarButtonWrap:{
    padding: '2.5%',
  },
  navBarText:{
    color: '#56A6BA',
    fontWeight: '700',
    fontSize: 18,
  },
  categoriesPannel:{
    // flex:1,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10
    },
    filterBtn:{
        padding: 5,
        marginRight: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 3
    },
    includedCategory:{
        backgroundColor: 'grey'
    }
  });
export default EventFeed;