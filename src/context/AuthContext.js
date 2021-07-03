import createDataContext from "./createDataContext";
import appApi from "../api/appApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";
import { CHECK_VALID_PASSWORD } from "../../enviroment/index";

const authReducer = (state, action) => {
  switch (action.type) {
    case "addToken": //log in
      return { errorMessage: "", token: action.payload };
    case "addError":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signUp = (dispatch) => async (email, password) => {
  try {
    const response = await appApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "addToken",
      payload: response.data.token,
    });
    navigate("TrackList"); // page to go to after auth / sign up
  } catch (err) {
    dispatch({
      type: "addError",
      payload: "Failed to create account, please try again later",
    });
  }
};

const signIn = (dispatch) => async (email, password) => {
  try {
    const response = await appApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "addToken",
      payload: response.data.token,
    });
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "addError",
      payload: "Failed to log in, email or password is incorrect",
    });
  }
};

const signOut = (dispatch) => {
  return ({ email, password }) => {};
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await appApi.post("/checkvalid", {
    token,
    password: CHECK_VALID_PASSWORD,
  });
  if (response.data === true) {
    dispatch({
      type: "addToken",
      payload: { token },
    });
    navigate("TrackList");
  }
  return null;
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, tryLocalSignin },
  { token: null, errorMessage: "" }
);
