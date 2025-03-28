import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    GetUserDetails();
  
    const unsubscribe = onSnapshot(collection(db, 'Chat', params?.id, 'Messages'), (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Sort messages based on createdAt timestamp in ascending order
      messageData.sort((a, b) => moment(a.createdAt, 'MM-DD-YYYY HH:mm:ss').valueOf() - moment(b.createdAt, 'MM-DD-YYYY HH:mm:ss').valueOf());
  
      setMessages(messageData);
    });
  
    return () => unsubscribe();
  }, []);
  

  /**
   * Get User Info
   */
  const GetUserDetails = async () => {
    const docRef = doc(db, 'Chat', params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);
    const otherUser = result?.users.filter((item) => item.email !== user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].name
    });
  };

  const onSend = async () => {
    if (!text.trim()) return;

    const newMessage = {
      text,
      createdAt: moment().format('MM-DD-YYYY HH:mm:ss'),
      user: {
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl
      }
    };

    await addDoc(collection(db, 'Chat', params.id, 'Messages'), newMessage);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
  data={[...messages].reverse()} 
  keyExtractor={(item) => item.id.toString()}
  inverted
  renderItem={({ item }) => (
    <View style={[styles.messageContainer, item.user._id === user?.primaryEmailAddress?.emailAddress ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timeText}>{moment(item.createdAt, 'MM-DD-YYYY HH:mm:ss').fromNow()}</Text>
    </View>
  )}
/>


      {/* Chat Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          style={styles.input}
        />
        <Button title="Send" onPress={onSend} />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  messageContainer: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '80%' },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  messageText: { fontSize: 16 },
  timeText: { fontSize: 12, color: 'gray', marginTop: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginRight: 10 }
});

