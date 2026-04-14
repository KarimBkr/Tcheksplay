import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        TCHEKSPLAY
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
        Navigation Expo Router - Étape 2 ✅
      </Text>
      <Link href="/" asChild>
        <Text style={{ fontSize: 14, color: '#0066cc' }}>
          Navigation fonctionnelle
        </Text>
      </Link>
    </View>
  );
}
