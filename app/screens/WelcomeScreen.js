import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/baboon.jpeg")}
      blurRadius={3}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/kvet-logo.png")}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 10,
          }}
        >
          Kogelberg Villages
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 5,
          }}
        >
          Environmental Trustees
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 100,
          }}
        >
          Data Collection App
        </Text>
      </View>
      <View style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </View>
      <View style={styles.registerButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  loginButton: {
    width: "100%",
    height: "70",
    backgroundColor: "#fc5c65",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100",
    height: "100",
  },
  logoContainer: {
    position: "absolute",
    top: "70",
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: "70",
    backgroundColor: "#4ecdc4",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
