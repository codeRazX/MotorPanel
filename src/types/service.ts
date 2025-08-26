import { z } from 'zod'
import { ClientSchema } from './client'
import { EmployeeSchema } from './employee'

export const ServiceSchema = z.object({
  _id: z.string(),
  serviceNumber: z.number(),
  client: ClientSchema.pick({
    name: true,
    slug: true,
    _id: true,
    contact: true
  }),
  vehicle: z.string(),
  symptoms: z.string(),
  total: z.number().nullable(),
  vat: z.preprocess(
    val => typeof val === 'number' ? val.toString() : val,
    z.enum(["22", "21", "20", "19", "18", "17", "16"])
  ),
  status: z.enum(['pending', 'in progress', 'completed']),
  repairs: z.array(z.object({
    description: z.string(),
    quantity: z.number(),
    type: z.enum(['unit', 'hour']),
    price: z.number()
  })),
  employees: z.array(EmployeeSchema.pick({
    _id: true,
    name: true,
    slug: true
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
  dateCompleted: z.string().nullable(),
  notes: z.array(z.object({
    content: z.string(),
    _id: z.string()
  }))
});


const ServiceListSchema = ServiceSchema.pick({
  _id: true,
  vehicle: true,
  symptoms: true,
  createdAt: true,
  updatedAt: true,
  status: true
}).extend({
  client: ClientSchema.pick({ name: true, slug: true })
});

export const ServicesDashboardSchema = z.object({
  data: z.array(ServiceListSchema),
  count: z.number(),
  limit: z.number()
})



export type ServiceType = z.infer<typeof ServiceSchema>;
export type ServiceDashboardType = z.infer<typeof ServiceListSchema>;
export type ServiceCreateTypeForm = Pick<ServiceType, 'vehicle' | 'symptoms'> & {
  client: string,
  employees: string[] | {value: string, label: string}[]
};
export type ServiceEditType = ServiceCreateTypeForm  & {
  status: ServiceType['status'] | '',
  vat: ServiceType['vat'] | '',
  repairs: ServiceType['repairs']
}
