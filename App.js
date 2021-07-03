import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen.js";
import SignInScreen from "./src/screens/SigninScreen.js/index.js";
import SignUpScreen from "./src/screens/SignupScreen.js/index.js";
import TrackCreateScreen from "./src/screens/TrackCreateScreen.js/index.js";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen.js/index.js";
import TrackListScreen from "./src/screens/TrackListScreen.js/index.js";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef.js";
const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailsScreen,
    }),
    TrackCreate: TrackCreateScreen,
    AccountScreen: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
