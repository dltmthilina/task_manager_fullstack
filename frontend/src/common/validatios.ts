import * as yup from 'yup'

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

const userValidationSchema = () => yup.object().shape({
    name: yup.string().required("Name is required"),
    email : yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string()
                    .required("Password is required")
                    .min(6, "Password must have atleast 6 characters")
                    .matches(/[0-9]/, getCharacterValidationError('digit'))
                    .matches(/[a-z]/, getCharacterValidationError('digit'))
                    .matches(/[A-Z]/, getCharacterValidationError('digit')),
    confirmPassword: yup.string().required("Please re-enter your password")
                                 .oneOf([yup.ref("password")], "Password does not match"),
    imageUrl: yup.string().nullable().url("It should be a image URL")
})


export {
    userValidationSchema
}