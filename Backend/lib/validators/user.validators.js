const { z } = require('zod');

const userSignupValidationSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Email: z.string().email("Invalid email format"),
  Password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/[0-9]/, "Password must contain at least one numeric value")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special symbol"),
  Address: z.string().min(5, "Address must be at least 5 characters"),
  PinCode: z.string().min(6, "PinCode must be at least 6 characters"),
  ContactNo: z.string().min(10, "ContactNo must be at least 10 characters"),
  Role: z.enum(['lawyer', 'advocate', 'client', 'admin'], {
    errorMap: () => ({ message: "Role must be one of: lawyer, advocate, client, admin" })
  }).default('client')
});

const userSigninValidationSchema = z.object({
  Email: z.string().email("Invalid email format"),
  Password: z.string().min(1, "Password is required")
});

module.exports = { userSignupValidationSchema, userSigninValidationSchema };