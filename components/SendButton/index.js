import React from 'react';
import { TouchableOpacity} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SendButton = ({handleChat}) => {
  return (
    <TouchableOpacity onPress={handleChat} style={styles.button}>
      <Icon name="send" size={30} color="#F1F1F1" />
    </TouchableOpacity>
  );
};

export default SendButton;