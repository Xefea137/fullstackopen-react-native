import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import useCreateReview from "../../hooks/useCreateReview";
import ReviewForm from "./ReviewForm";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .typeError('Rating must be a number')
    .min(0, 'Rating cannot be below 0')
    .max(100, 'Rating cannot be more than 100'),
  text: yup
    .string(),
});

const ReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })
  
  return <ReviewForm formik={formik} />
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await createReview({ ownerName, repositoryName, rating, text });
      navigate(`/${data.createReview.repositoryId}`)
      console.log("review data", data);      
    } catch (e) {
      console.log("review error", e);      
    }
  }

  return <ReviewContainer onSubmit={onSubmit}/>
};

export default CreateReview;