import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { query } from 'firebase/database'
import { collection, getDocs, where } from 'firebase/firestore'
import {db }from './../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'
export default function Inbox() {

  const {user}=useUser();
  const [userList,setUserList]=useState([]);
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    user&&GetUserList();
  },[user])

  //Get User List Depends on Current User Emails
  const GetUserList=async()=>{
    setLoader(true)
    setUserList([])
    const q=query(collection(db,'Chat'),
    where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach(doc=>{
      setUserList(prevList=>[...prevList,{ id: doc.id, ...doc.data() }]) // Store doc.id
    });
    setLoader(false);
  
  }

  // Filter  the list of Other User in one state
  const MapOtherUserList=()=>{
    const list=[];
    userList.forEach((record)=>{
      const otherUser=record.users?.filter(u=>u?.email!==user?.primaryEmailAddress?.emailAddress);
      if(otherUser.length > 0) {
        const result={
          docId:record.id,  // Ensure `id` is actually available in record
          ...otherUser[0]
        }
        list.push(result);
      }
    })
    return list;
  }
  

  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Inbox</Text>

<FlatList
  data={MapOtherUserList()}
  refreshing={loader}
  onRefresh={GetUserList}
  style={{
    marginTop: 20,
  }}
  ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Adds a gap between items
  renderItem={({ item, index }) => (
    <UserItem userInfo={item} key={index} style={{ marginBottom: 10 }} />
  )}
/>

    </View>
  )
}