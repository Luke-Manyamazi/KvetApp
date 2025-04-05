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

function SignUpScreen({ navigation }) {
  const [name, setName] = useState(""); // For storing user name
  const [email, setEmail] = useState(""); // For storing user email
  const [password, setPassword] = useState(""); // For storing user password

  // Handle sign up logic
  const handleSignUp = async () => {
    try {
      // Create user with email and password
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save additional user data (name) to Firestore
      await firebase.firestore().collection("users").doc(user.uid).set({
        name,
        email,
      });

      // Redirect to login screen after successful sign-up
      navigation.navigate("Login");
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
        <Image
          style={styles.logo}
          source={require("../assets/kvet-logo.png")}
        />
        <Text style={styles.appTitle}>Sign Up</Text>

        {/* Name input */}
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          value={name}
          onChangeText={setName}
        />

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

        {/* Sign up button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.oldEmployee}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.login}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    marginBottom: 2,
    padding: 10,
    marginTop: 20,
    width: "150%", // Corrected from "100%"
    borderRadius: 5, // Corrected from "5"
    backgroundColor: "beige",
  },
  logoContainer: {
    position: "absolute",
    top: 150, // Corrected from "70"
    alignItems: "center",
  },
  logo: {
    width: 100, // Corrected from "100"
    height: 100, // Corrected from "100"
  },
  signUpButton: {
    width: "150%",
    height: 40, // Corrected from "70"
    backgroundColor: "#21409a",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5, // Added border radius for better aesthetics
    marginTop: 20, // Corrected from "20"
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
    marginTop: 70,
    marginBottom: 50,
  },
  oldEmployee: {
    color: "darkblue",
    marginTop: 10,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensures vertical alignment of text
  },
  login: {
    color: "blue",
    marginTop: 10,
  },
});

export default SignUpScreen;
