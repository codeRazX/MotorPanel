import { FilterQuery } from "mongoose";
import { ClientType } from "../models/Client";
import { CounterType } from "../models/Counter";
import { EmployeeType } from "../models/Employees";
import { ServiceType } from "../models/Service";
import { UserType } from "../models/User";


declare global {
  namespace Express {
    interface Request {
      user?: UserType,
      counter?: CounterType,
      employees?: EmployeeType[],
      client?: ClientType,
      employee?: EmployeeType,
      service?: ServiceType,
      modelNote?: EmployeeType | ServiceType | ClientType,
      page?: number,
      filters?: FilterQuery<EmployeeType | ClientType | ServiceType>
    }
  }
}