import { useFormik } from "formik";
import * as yup from 'yup';
import useSignIn from "../../hooks/useSignIn"
import { useNavigate } from "react-router-native";
import SignInForm from "./SignInForm";

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

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return <SignInForm formik={formik} />
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      navigate("/")
      console.log("data", data);
    } catch (e) {
      console.log("e", e);
    }
  };
  
  return <SignInContainer onSubmit={onSubmit} />
};

export default SignIn;