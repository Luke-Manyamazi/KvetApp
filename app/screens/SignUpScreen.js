import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

function SignUpScreen({ navigation }) {
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
        <TextInput style={styles.input} placeholder="Fullname" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.oldEmployee}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.login}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
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
