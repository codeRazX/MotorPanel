import { z } from 'zod';
import { ClientSchema } from './client';

export const EmployeeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  contact: z.number().nullable(),
  services: z.array(z.object({
    _id: z.string(),
    client: ClientSchema.pick({
      name: true,
      _id: true,
      slug: true
    }),
    vehicle: z.string(),
    status: z.enum(['pending', 'in progress', 'completed']),
    createdAt: z.string(),
    dateCompleted: z.string().nullable(),
    serviceNumber: z.number(),
    symptoms: z.string()
  })),
  available: z.boolean(),
  hireDate: z.string().nullable(),
  createdAt: z.string(),
  salary: z.number().nullable(),
  role: z.enum(['mechanic', 'workshop_boss', 'administration', 'body_and_paint', 'dealer', 'trainee', 'assistant', 'sales_representative', 'other']),
  productivity: z.enum(['low', 'medium', 'high']),
  notes: z.array(z.object({
    content: z.string(),
    _id: z.string()
  }))
});

const EmployeeListSchema = EmployeeSchema.pick({
  _id: true,
  name: true,
  slug: true,
  role: true,
  available: true,
})

export const EmployeesSchemaDashboard = z.object({
  data: z.array(EmployeeListSchema),
  count: z.number(),
  limit: z.number()
})

export const EmployeesAvailableSchema = z.array(EmployeeListSchema.pick({
  _id: true,
  name: true,
  slug: true
}))

export type EmployesAvailableType = z.infer<typeof EmployeesAvailableSchema>
export type EmployeDashboardType = z.infer<typeof EmployeeListSchema>
export type EmployeeType = z.infer<typeof EmployeeSchema>;
export type EmployeeCreateFormType = Pick<EmployeeType, 'name' | 'contact' | 'hireDate'  | 'salary'> & {
  role:EmployeeType['role'] | ""
  productivity: EmployeeType['productivity'] | ""
}
export type EmployeeEditType = Pick<EmployeeCreateFormType, 'name' | 'contact' | 'hireDate' | 'role' | 'productivity' | 'salary'> & {
  available?: string
}