import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Avatar: undefined;
  Main: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Avatar'>;
};

const AVATARS = [
  { id: '1', emoji: '😊', name: 'Happy' },
  { id: '2', emoji: '😎', name: 'Cool' },
  { id: '3', emoji: '🤓', name: 'Smart' },
  { id: '4', emoji: '😄', name: 'Friendly' },
  { id: '5', emoji: '🧑‍💻', name: 'Professional' },
  { id: '6', emoji: '🦊', name: 'Fox' },
  { id: '7', emoji: '🐱', name: 'Cat' },
  { id: '8', emoji: '🐶', name: 'Dog' },
  { id: '9', emoji: '🦁', name: 'Lion' },
  { id: '10', emoji: '🐼', name: 'Panda' },
  { id: '11', emoji: '🦄', name: 'Unicorn' },
  { id: '12', emoji: '🤖', name: 'Robot' },
];

export default function AvatarScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    // TODO: Save avatar selection
    navigation.replace('Chat');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Avatar</Text>
        <Text style={styles.subtitle}>Pick a character that represents you</Text>
      </View>
      
      <View style={styles.grid}>
        {AVATARS.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarButton,
              selected === avatar.id && styles.selectedAvatar,
            ]}
            onPress={() => setSelected(avatar.id)}
          >
            <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
            <Text style={styles.avatarName}>{avatar.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1917',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#78716C',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  avatarButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#1C1917',
    backgroundColor: '#F5F5F4',
  },
  avatarEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  avatarName: {
    fontSize: 12,
    color: '#57534E',
  },
  footer: {
    padding: 24,
  },
  button: {
    backgroundColor: '#1C1917',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A8A29E',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
