import { StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  inputBox: {
    borderColor: theme.colors.fade,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
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

const CustomTextInput = ({ touched, error, placeholder, value, onChange, secureTextEntry, multiline }) => {
  return (
    <>
      <TextInput
        style={touched && error ? styles.errorBox : styles.inputBox}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.fade}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
      {touched && error && (
        <Text style={styles.errorMessage} color='error'>{error}</Text>
      )}
    </>
  );
};

export default CustomTextInput;