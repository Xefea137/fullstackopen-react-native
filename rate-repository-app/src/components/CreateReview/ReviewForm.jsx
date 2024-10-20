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

const ReviewForm = ({ formik }) => {
  return (
    <View style={styles.container}>
      <CustomTextInput
        touched={formik.touched.ownerName}
        error={formik.errors.ownerName}
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChange={formik.handleChange("ownerName")}
      />
      <CustomTextInput
        touched={formik.touched.repositoryName}
        error={formik.errors.repositoryName}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChange={formik.handleChange("repositoryName")}
      />
      <CustomTextInput
        touched={formik.touched.rating}
        error={formik.errors.rating}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChange={formik.handleChange("rating")}
      />
      <CustomTextInput
        placeholder='Review'
        value={formik.values.text}
        onChange={formik.handleChange("text")}
        multiline={true}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white'>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;