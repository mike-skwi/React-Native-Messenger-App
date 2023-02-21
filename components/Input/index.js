import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles'

const Input = ({text, setText}) => {
  return (
    <TextInput
      value={text}
      onChangeText={setText}
      style={styles.textInput}
      placeholder="Enter message"
      placeholderTextColor="#595959"
    />
  );
};

export default Input;