import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from './PetListItem';

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Dogs'); // Keep track of selected category

  useEffect(() => {
    GetPetList(selectedCategory);
  }, [selectedCategory]); // Fetch new pets when the category changes

  /**
   * Fetches pet list based on selected category
   * @param {*} category 
   */
  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]); // Clear old data before fetching new data
    try {
      const q = query(collection(db, 'Pets'), where('category', '==', category));
      const querySnapshot = await getDocs(q);

      // Ensure proper state update using map
      const pets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPetList(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => setSelectedCategory(value)} />

      <FlatList
        data={petList}
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        showsHorizontalScrollIndicator={false}
        onRefresh={() => GetPetList(selectedCategory)}
        keyExtractor={(item) => item.id} // Ensure unique keys
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
