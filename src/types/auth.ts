import { z } from 'zod';

export const AuthSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  confirm_password: z.string()
});

type AuthType = z.infer<typeof AuthSchema>;

export type AuthRegistrationType = Pick<AuthType, 'email' | 'name' | 'password' | 'confirm_password'>;
export type AuthLoginType = Pick<AuthType, 'email' | 'password'>;