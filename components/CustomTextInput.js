import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const CustomTextInput = ({ label, value, onChangeText, maxLength, placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
  },
});

export default CustomTextInput;