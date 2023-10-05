import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomButton({ text, IconComponent, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={['#FEB84A', '#FF5204']}
        style={styles.gradientBackground}>
        <View style={styles.content}>
          {IconComponent && (
            <IconComponent style={styles.icon} />
          )}
          <Text style={styles.text}>{text}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,

    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 10
  },
  gradientBackground: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
