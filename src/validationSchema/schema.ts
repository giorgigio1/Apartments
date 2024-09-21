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

export const addListingSchema = yup.object().shape({
  address: yup.string().min(2).required("Address is required"),
  image: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value): any => {
      return value && (value as FileList).length > 0;
    })
    .test("fileType", "Unsupported file type", (value): any => {
      return (
        value &&
        ["image/jpeg", "image/png"].includes((value as FileList)[0]?.type)
      );
    }),
  region_id: yup.number().required("Region is required").positive().integer(),
  description: yup.string().min(5).required("Description is required"),
  city_id: yup.number().required("City is required").positive().integer(),
  zip_code: yup
    .string()
    .required("Zip Code is required")
    .matches(/^\d{5}$/, "Zip Code must be exactly 5 digits"),
  price: yup.number().required("Price is required").positive(),
  area: yup.number().required("Area is required").positive(),
  bedrooms: yup
    .number()
    .required("Number of bedrooms is required")
    .positive()
    .integer(),
  is_rental: yup
    .number()
    .required("Transaction type is required")
    .oneOf([0, 1], "Must be 0 (For Sale) or 1 (For Rent)"),
  agent_id: yup.number().required("Agent is required").positive().integer(),
});

export default schema;
