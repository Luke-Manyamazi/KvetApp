import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { firebase } from "./app/config/firebase-config"; 

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(""); // For storing user email
  const [password, setPassword] = useState(""); // For storing user password

  // Handle login logic
  const handleLogin = async () => {
    try {
      // Sign in the user with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Redirect to the home screen after successful login
      navigation.navigate("Home"); // Replace "Home" with your actual home screen name
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/backgroundTwo.jpg")}
      blurRadius={3}
    >
    <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/kvet-logo.png")} />
        <Text style={styles.appTitle}>Login</Text>
        
        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        
        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        
        {/* Forgot password link */}
        <TouchableOpacity>
          <Text
            style={styles.forgotPassword}
            // onPress={() => navigation.navigate("ResetPassword")}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
