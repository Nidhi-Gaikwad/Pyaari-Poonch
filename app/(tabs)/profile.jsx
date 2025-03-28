import { ScrollView, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Profile() {
  const Menu = [
    { id: 1, name: 'Add New Pet', icon: 'add-circle', path: '/add-new-pet' },
    { id: 5, name: 'My Post', icon: 'bookmark', path: '/../user-post' },
    { id: 2, name: 'Favorites', icon: 'heart', path: '/(tabs)/favourite' },
    { id: 3, name: 'Inbox', icon: 'chatbubble', path: '/(tabs)/inbox' },
    { id: 4, name: 'Emergency', icon: 'car-emergency', path: '/emergency' },
    { id: 6, name: 'Logout', icon: 'exit', path: 'logout' },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressMenu = (menu) => {
    if (menu.path === 'logout') {
      signOut();
      router.replace('/../login');
      return;
    }
    router.push(menu.path);
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20, marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Profile</Text>

        <View style={{ display: 'flex', alignItems: 'center', marginVertical: 25 }}>
          <Image 
            source={{ uri: user?.imageUrl }} 
            style={{ width: 80, height: 80, borderRadius: 99 }} 
          />

          <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginTop: 6 }}>
            {user?.fullName}
          </Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <FlatList
          data={Menu}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPressMenu(item)}
              key={item.id}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 10
              }}>
              
              {item.icon === 'car-emergency' ? (
                <MaterialCommunityIcons 
                  name={item.icon} 
                  size={30} 
                  color={Colors.PRIMARY} 
                  style={{ padding: 10, backgroundColor: Colors.WHITE, borderRadius: 10 }} 
                />
              ) : (
                <Ionicons 
                  name={item.icon} 
                  size={30} 
                  color={Colors.PRIMARY} 
                  style={{ padding: 10, backgroundColor: Colors.WHITE, borderRadius: 10 }} 
                />
              )}

              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
          scrollEnabled={false} // Disables FlatList's internal scrolling to allow ScrollView to handle it
        />
      </View>
    </ScrollView>
  );
}
