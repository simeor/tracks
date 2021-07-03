import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "../Spacer";
import { Context as AuthContext } from "../../context/AuthContext";

const AuthForm = ({ headerText, submitText, type }) => {
  const { state, signUp, signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidated, setEmailValidated] = useState(true);
  const [passwordValidated, setPasswordValidated] = useState(true);

  const validateForm = () => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(email)) return setEmailValidated(false);
    if (pattern.test(email)) setEmailValidated(true);
    if (password.length < 8) return setPasswordValidated(false);
    if (password.length >= 8) setPasswordValidated(true);
    type === "SignUp" ? signUp(email, password) : signIn(email, password);
  };

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        textContentType="username"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
      />
      {!emailValidated && (
        <Text style={styles.error}>{"Must be a valid email format"}</Text>
      )}

      <Spacer />
      <Input
        label="Password"
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!passwordValidated && (
        <Text style={styles.error}>
          {"Password must be more than 8 characters"}
        </Text>
      )}
      <Spacer />

      {!!state.errorMessage && (
        <Text style={styles.error}>{state.errorMessage}</Text>
      )}
      <Spacer>
        <Button
          title={submitText}
          onPress={() => {
            validateForm();
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});
export default AuthForm;
