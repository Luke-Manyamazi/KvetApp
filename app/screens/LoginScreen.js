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
import { firebase } from "../config/firebase";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(""); // For storing user email
  const [password, setPassword] = useState(""); // For storing user password

  // Handle login logic
  const handleLogin = async () => {
    try {
      // Sign in the user with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Redirect to the home screen after successful login
      navigation.navigate("FileUpLoad");
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

        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.newEmployee}>New Employee?</Text>
          <TouchableOpacity>
            <Text
              style={styles.register}
              onPress={() => navigation.navigate("SignUp")}
            >
              Register
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
  forgotPassword: {
    color: "blue",
    marginTop: 5,
    textAlign: "right",
    marginLeft: 20,
  },
  input: {
    height: 40,
    margin: 12,
    marginBottom: 2,
    padding: 10,
    marginTop: 20,
    width: "150%",
    borderRadius: 5,
    backgroundColor: "beige",
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  loginButton: {
    width: "150%",
    height: 40,
    backgroundColor: "#21409a",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
    marginTop: 70,
    marginBottom: 50,
  },
  newEmployee: {
    color: "darkblue",
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensures vertical alignment of text
  },
  register: {
    color: "blue",
    marginTop: 10,
  },
});

export default LoginScreen;
