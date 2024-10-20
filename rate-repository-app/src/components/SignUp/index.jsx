import * as yup from "yup";
import { useFormik } from "formik";
import SignUpForm from "./SignUpForm";
import useSignUp from "../../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useSignIn from "../../hooks/useSignIn";

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be atleast 5 characters')
    .max(30, 'Username cannot be more than 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be atleast 5 characters')
    .max(30, 'Password cannot be more than 30 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password conformation is required'),
});

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return <SignUpForm formik={formik}/>
};

const SignUp = () => {
  const [createUser] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await createUser({ username, password });
      await signIn({ username, password });
      navigate("/")
      console.log("signup data", data);
    } catch (e) {
      console.log("e", e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />
};

export default SignUp;