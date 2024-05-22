import { z } from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default registerSchema;
