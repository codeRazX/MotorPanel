import { AuthSchema } from './auth';
import { z } from 'zod';

export const UserSchema = AuthSchema.pick({
  _id: true,
  name: true,
  email: true
});

export const UserSchemaPassword = AuthSchema.pick({
  password: true,
  confirm_password: true
})

export type UserType = z.infer<typeof UserSchema>;
export type UserProfileType = Pick<UserType, 'email' | 'name'>
export type UserProfilePassword = z.infer<typeof UserSchemaPassword> & {
  current_password: string
}