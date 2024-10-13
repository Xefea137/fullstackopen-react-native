import { useFormik } from "formik";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  inputBox: {
    borderColor: theme.colors.fade,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  errorMessage: {
    marginLeft: 13,
    marginTop: -5,
  },
  errorBox: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  }
});

const initialValues = {
  username: 'elina',
  password: 'password',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={formik.touched.username && formik.errors.username ? styles.errorBox : styles.inputBox}
        placeholder="Username"
        placeholderTextColor={theme.colors.fade}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorMessage} color='error'>{formik.errors.username}</Text>
      )}
      <TextInput
        style={formik.touched.password && formik.errors.password ? styles.errorBox : styles.inputBox}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={theme.colors.fade}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorMessage} color='error'>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white'>Sign In</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    //console.log("values", values);
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log("data", data);
      console.log("accessToken", data.authenticate.accessToken);
    } catch (e) {
      console.log("e", e);
    }
  };
  
  return <SignInForm onSubmit={onSubmit} />
};

export default SignIn;