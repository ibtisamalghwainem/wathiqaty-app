import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function DocItem({ doc }) {
  const IconLib = doc.icon.library === 'FontAwesome' ? FontAwesome : MaterialIcons;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconLib name={doc.icon.name} size={24} color="#333" />
      <Text style={{ marginLeft: 8 }}>{doc.type}</Text>
    </View>
  );
}
