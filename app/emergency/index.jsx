import { View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function Emergency() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const emergencyContacts = [
    {
      id: 1,
      name: 'Veterinary Emergency Service (India)',
      phone: '1962',
    },
    {
      id: 2,
      name: 'Bombay Society for the Prevention of Cruelty to Animals (BSPCA)',
      address: 'Dr. S. S. Rau Road, Parel, Bombay – 400012.',
      phone: ['+91-22-24137518', '24135285', '24135434'],
      email: 'bombayspca@yahoo.co.in',
      services: [
        'Adoption Centre',
        'Ambulance Service',
        'Blood & Plasma Transfusion',
        'Pet Care Facility',
        'Electric Crematorium',
        'Hospital',
      ],
    },
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 28, marginBottom: 20, textAlign: 'center', color: Colors.SECONDARY }}>
        Emergency Contacts
      </Text>

      {emergencyContacts.map((contact) => (
        <View key={contact.id} style={{
          backgroundColor: '#fff',
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3
        }}>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, color: Colors.Black, marginBottom: 8 }}>
            {contact.name}
          </Text>

          {contact.address && (
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY, marginBottom: 5 }}>
              📍 {contact.address}
            </Text>
          )}

          {contact.services && (
            <Text style={{ fontFamily: 'outfit', fontSize: 16, marginBottom: 5 }}>
              🏥 Services: {contact.services.join(', ')}
            </Text>
          )}

          <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, marginTop: 10 }}>📞 Phone:</Text>
          {Array.isArray(contact.phone) ? (
            contact.phone.map((num, index) => (
              <TouchableOpacity key={index} onPress={() => handleCall(num)}>
                <Text style={{ fontFamily: 'outfit', fontSize: 16, color: 'blue', marginVertical: 2 }}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity onPress={() => handleCall(contact.phone)}>
              <Text style={{ fontFamily: 'outfit', fontSize: 16, color: 'blue', marginVertical: 2 }}>
                {contact.phone}
              </Text>
            </TouchableOpacity>
          )}

          {contact.email && (
            <>
              <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, marginTop: 10 }}>📧 Email:</Text>
              <TouchableOpacity onPress={() => handleEmail(contact.email)}>
                <Text style={{ fontFamily: 'outfit', fontSize: 16, color: 'blue' }}>{contact.email}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
