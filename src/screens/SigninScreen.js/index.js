import React from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../../components/AuthForm";
import NavLink from "../../components/NavLink";

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <AuthForm headerText="Sign In" submitText="Sign In" type="SignIn" />
      <NavLink type={"SignUp"} />
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SignInScreen;
