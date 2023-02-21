import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import ChatScreen from './screens/chatScreen';
import auth from '@react-native-firebase/auth';
import LoginScreen from './screens/loginScreen';



// PUT THIS WHEREVER FB NEEDS TO BE INITIALIZED

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries


// // Your web app's Firebase configuration

// const firebaseConfig = {

//   apiKey: "AIzaSyBfcWjw_A6m7TFUFA9cLmHw3JDNGj73ME8",

//   authDomain: "fir-rnchat-b9e25.firebaseapp.com",

//   projectId: "fir-rnchat-b9e25",

//   storageBucket: "fir-rnchat-b9e25.appspot.com",

//   messagingSenderId: "35807050267",

//   appId: "1:35807050267:web:cf8e0496243a08d47116be"

// };


// // Initialize Firebase

// const app = initializeApp(firebaseConfig);




const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Auth listener
    const unsubscribe = auth().onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.viewStyle}>
        {user ? <ChatScreen /> : <LoginScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#151718',
  },
  viewStyle: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#151718',
  },
});

export default App;