import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AuthForm from "../../components/AuthForm";
import NavLink from "../../components/NavLink";
import { Context as AuthContext } from "../../context/AuthContext";

const SignUpScreen = ({ navigation }) => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);
  return (
    <View style={styles.container}>
      <AuthForm headerText="Sign Up" submitText="Sign Up" type="SignUp" />
      <NavLink type={"SignIn"} />
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
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

export default SignUpScreen;
