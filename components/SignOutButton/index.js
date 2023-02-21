import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { styles } from './styles'

const SignOutButton = ({handleClick}) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <Text style={styles.text}>Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;