import * as yup from "yup"

export const registerSchema = yup
  .object({
    username: yup.string().required("username is required!").min(5,"username should be at least 5 characters"),
    email: yup.string().required("email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Not a valid email address"),
    password: yup.string().required("password is required!").min(8,"password should be at least 8 characters long"),
    confirmPassword: yup.string().required("confirm password is required!")
  })
  .required()

  export const loginSchema = yup
  .object({
    email: yup.string().required("email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Not a valid email address"),
    password: yup.string().required("password is required!").min(8,"password should be at least 8 characters long"),
  })
  .required()
 