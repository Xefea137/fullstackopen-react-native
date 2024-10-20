import { Pressable, StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import CustomTextInput from "../CustomTextInput";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
});

const SignInForm = ({ formik }) => {
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
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white'>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;