import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Entered value does not match email format")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    profilePicture: yup
      .mixed<FileList>()
      .test("required", "Profile picture is required", (value) => {
        return value && value instanceof FileList && value.length > 0;
      }),
  })
  .required();

export default schema;
