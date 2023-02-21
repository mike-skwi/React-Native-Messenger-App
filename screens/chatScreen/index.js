import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { styles } from './styles'
import Chat from '../../components/Chat';
import Input from '../../components/Input';
import SendButton from '../../components/SendButton';
import SignOutButton from '../../components/SignOutButton';


const ChatScreen = () => {
  // Input text
  const [text, setText] = useState('');                      
  // Chat messages
  const [chats, setChats] = useState([]);                    
  // Loading state
  const [loading, setLoading] = useState(true);              
  // Firestore timestamp
  const timestamp = firestore.FieldValue.serverTimestamp();  

  const sendMessage = async e => {
    const {uid, photoURL} = auth().currentUser;

    // Dont allow empty/large messages
    if (text.length > 1 && text.length < 40) {
      try {
        e.preventDefault();
        setLoading(true);

        await firestore()
          .collection('chats')
          .doc()
          .set({
            owner: uid,
            imageUrl: photoURL,
            text: text,
            createdAt: timestamp,
          })
          .then(() => {
            setText('');
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
            Alert.alert('Error', err.message);
          });
      } catch (err) {
        setLoading(false);
        Alert.alert('Error', err);
      }
    } else {
      setLoading(false);
      Alert.alert('Chat not sent', 'Must be between 1 and 40 characters');
    }
  };

  const handleSignOut = async () => await auth().signOut();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      // Sort by timestamp
      .orderBy('createdAt', 'asc')    
      // Only retrieve the last 15 messages
      .limitToLast(15)                
      .onSnapshot(querySnapshot => {
        const chatsArr = [];
        if (querySnapshot === null) {
          setLoading(false);
          return;
        }
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          // Add docId and chat data to chats array 
          chatsArr.push({id, ...data});
        });
        setChats(chatsArr);
        setLoading(false);
      });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  if (loading) {
    // Show loader while loading chats
    return <ActivityIndicator style={styles.activityIndicator} size={42} />;  
  } else {
    const username = auth().currentUser.displayName;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{username}</Text>
          <SignOutButton handleClick={handleSignOut} />
        </View>
        <View style={styles.chatStyle}>
          {chats && (
            <FlatList
              data={chats}
              renderItem={({item}) => <Chat key={item.id} chat={item} />}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input text={text} setText={setText} />
          <SendButton handleChat={sendMessage} />
        </View>
      </View>
    );
  }
};

export default ChatScreen;
