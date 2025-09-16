const {z}=require('zod');

const userSignupValidationSchema=z.object({
  Name: z.string(),
  Email: z.string().email(),
  Password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain atleast one Capital letter")
    .regex(/[0-9]/, "Password must contain atleast one numeric value")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast one special symbol"),
  Address: z.string().min(5, "Address must be at least 5 characters"),
  PinCode: z.string().min(6, "PinCode must be at least 6 characters"),
  ContactNo: z.string().min(10, "ContactNo must be at least 10 characters"),
});

const userSigninValidationSchema=z.object({
  Email:z.string().email(),
  Password:z.string()
});

module.exports={userSignupValidationSchema,userSigninValidationSchema};