import { Pressable, StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import CustomTextInput from "../CustomTextInput";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white
  },
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

const SignUpForm = ({ formik }) => {
  return (
    <View style={styles.container}>
      <CustomTextInput
        touched={formik.touched.username}
        error={formik.errors.username}
        placeholder='Username'
        value={formik.values.username}
        onChange={formik.handleChange("username")}
      />
      <CustomTextInput
        touched={formik.touched.password}
        error={formik.errors.password}
        placeholder='Password'
        value={formik.values.password}
        onChange={formik.handleChange("password")}
      />
      <CustomTextInput
        touched={formik.touched.confirmPassword}
        error={formik.errors.confirmPassword}
        placeholder='Password conformation'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange("confirmPassword")}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white'>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;