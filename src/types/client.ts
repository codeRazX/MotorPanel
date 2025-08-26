import { z } from 'zod';


export const ClientSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  contact: z.number().or(z.null()),
  vehicles: z.array(z.string()),
  services: z.array(z.string().or(z.object({
    _id: z.string(),
    vehicle: z.string(),
    total: z.number().nullable(),
    status: z.enum(['pending', 'in progress', 'completed']),
    repairs: z.array(z.object({
      description: z.string(),
      quantity: z.number(),
      type: z.enum(['unit', 'hour']),
      price: z.number()
    })),
    employees: z.array(z.union([
      z.string(),
      z.object({
      _id: z.string(),
      name: z.string(),
      slug: z.string()
    })
    ])),
    createdAt: z.string(),
    dateCompleted: z.string().nullable(),
    serviceNumber: z.number(),
    symptoms: z.string(),
  }))),
  regularCustomer: z.boolean(),
  notes: z.array(z.object({
    content: z.string(),
    _id: z.string()
  }))
});

const ClientListSchema = ClientSchema.pick({
  _id: true,
  name: true,
  slug: true,
  services: true,
  regularCustomer: true,
  vehicles: true,
})

export const ClientsSchemasDashboard = z.object({
  data: z.array(ClientListSchema),
  count: z.number(),
  limit: z.number()
})

export const ClientsSuggestedSchema = z.array(ClientListSchema)
export type ClientSchemaType = z.infer<typeof ClientListSchema>
export type ClientType = z.infer<typeof ClientSchema>;
export type ClientEditType = Pick<ClientType, 'name' | 'contact'> & {
  vehicles: string,
  regularCustomer: string | boolean
  vehicles_remove?: {value: string, label: string}[]
}


export type ClientServicesPopulate = {
  _id: string,
  vehicle: string,
  total: number,
  status: 'pending' | 'in progress' | 'completed',
  createdAt: string, 
  serviceNumber: number,
  symptoms: string,
  employees: {
    _id: string,
    name: string,
    slug: string
  }[]
}