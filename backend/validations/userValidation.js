const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 letters long" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

module.exports = { registerSchema, loginSchema };
