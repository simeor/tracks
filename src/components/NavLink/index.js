import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Spacer from "../Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, type }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(type)}>
      <Spacer>
        <Text style={styles.link}>
          {type === "SignIn"
            ? "Already have an account? Sign In"
            : "Click here to create an account"}
        </Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: { color: "blue" },
});

export default withNavigation(NavLink);
