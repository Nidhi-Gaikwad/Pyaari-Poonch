import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';
import { useRouter } from 'expo-router';

export default function UserItem({ userInfo }) {
  const router = useRouter(); // Initialize router

  return (
    <Pressable onPress={() => router.push('/chat?id=' + userInfo.docId)}>
      <View style={styles.card}>
        <Image source={{ uri: userInfo?.imageUrl }} style={styles.userImage} />
        <Text style={styles.userName}>{userInfo?.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: -1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.2,
    borderColor: Colors.GRAY,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  userName: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: '#333',
  },
});
