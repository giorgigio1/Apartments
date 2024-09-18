import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().min(2).required("Name is required"),
    surname: yup.string().min(2).required("Last name is required"),
    email: yup
      .string()
      .email("Entered value does not match email format")
      .matches(
        /^[A-Za-z0-9._%+-]+@redberry\.ge$/,
        "Email must end with @redberry.ge"
      )
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^\d{9}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    avatar: yup
      .mixed()
      .test("required", "Profile picture is required", (value) => {
        return value instanceof FileList && value.length > 0;
      }),
  })
  .required();

export default schema;
