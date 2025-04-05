import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/baboon.jpeg")}
      blurRadius={3}
    >
      {/* Logo and Title Section */}

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/kvet-logo.png")}
        />
        <Text style={styles.mainTitle}>Kogelberg Villages</Text>
        <Text style={styles.subTitle}>Environmental Trustees</Text>
        <Text style={styles.appTitle}>Data Collection App</Text>
      </View>

      {/* Login and Sign Up Buttons */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 70, // Corrected from "70"
    alignItems: "center",
  },
  logo: {
    width: 100, // Corrected from "100"
    height: 100, // Corrected from "100"
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 100,
  },
  loginButton: {
    width: "100%",
    height: 70, // Corrected from "70"
    backgroundColor: "#21409a",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    width: "100%",
    height: 70, // Corrected from "70"
    backgroundColor: "#b0b57d",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
