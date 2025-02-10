import * as Yup from "yup"
export const signUpSchema = Yup.object ({
    name:Yup.string().min(2).max(25).required("please.enter your name"),
    email:Yup.string().email().required("please inter your passowd"),
    password:Yup.string().min(6).required("pleas entar your passowd"),
    confirm_Password:Yup.string().required().oneOf([Yup.ref("password"),null],"passworsd must match")
})