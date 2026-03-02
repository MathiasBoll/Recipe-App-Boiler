// components/ui/EmptyState.js
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function EmptyState({ icon, text, subText }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={80} color="#D3D3D3" />
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.subText}>{subText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -100,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
});