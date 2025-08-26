import { UserType } from "../models/User";
import { reverseTranslationProductivity, reverseTranslationRole, reverseTranslationStatus } from ".";
import { FilterQuery } from "mongoose";
import Employee, { EmployeeType } from "../models/Employees";
import Client, { ClientType } from "../models/Client";
import { ServiceType } from "../models/Service";

const filtersEmployees = (search : string | boolean | number) => {
  const filters = []

  if (typeof search === "string") {
    filters.push(
      { name: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" }  },
      { productivity: search }
    )
  }

  if (typeof search === "number") {
    filters.push(
      { contact: search }, 
      { salary: search }
    );
  }

  if (typeof search === "boolean") {
    filters.push({ available: search })
  }

  return filters.length > 0 ? filters : undefined
}

  
const filterClients = (search : string | boolean | number) => {
  const filters = []

  if (typeof search === "string") {
    filters.push(
      {name: { $regex: search, $options: "i" } },
      {vehicles: { $regex: search, $options: "i" } }
    )
  }

  if (typeof search === "number") {
    filters.push({ contact: search })
  }
  return filters.length > 0 ? filters : undefined
}

const filterServices = async (search : string | boolean | number) => {
  const filters = []

  if (typeof search === "string") {
    filters.push(
      {vehicle: { $regex: search, $options: "i" }},
      {status: { $regex: search, $options: "i" }  },
    )
    const [clientMatch, employeeMatch] = await Promise.all([
      Client.findOne({ name: { $regex: search, $options: "i" } }).select("_id"),
      Employee.findOne({ name: { $regex: search, $options: "i" } }).select("_id"),
    ]);
    
    
    if (clientMatch) filters.push({ client: clientMatch.id})
    if (employeeMatch) filters.push({ employees: employeeMatch.id })

  }
  return filters.length > 0 ? filters : undefined
}


export const setFilters = async (search: string | boolean | number | null, userId: UserType["id"],baseUrl: string) => {
  const filters: FilterQuery<EmployeeType | ClientType | ServiceType> = {
    manager: userId,
  }
  
  if (search) {
    const baseRaw = baseUrl.split("/");
    const entity = baseRaw[baseRaw.length - 1];
   

    switch (entity) {
      case "services":
        const filtersOptionsServices = await filterServices(search)
        if (filtersOptionsServices) {
          filters.$or = filtersOptionsServices;
        }
      break;

      case "employees":
        const filtersOptionsEmployees = filtersEmployees(search)
        if (filtersOptionsEmployees) {
          filters.$or = filtersOptionsEmployees;
        }
      break;

      case "clients":
        const filtersOptionsClients = filterClients(search)
        if (filtersOptionsClients) {
          filters.$or = filtersOptionsClients;
        }
      break;
    }
  }
  return filters;
};


export const sanitazeSearch = (search: string) => {
  if (/^\d+$/.test(search)) {
    return Number(search);
  }

  if (search === "disponible" || search === "ocupado") {
    return search === "disponible" ? true : false;
  }

  if (search in reverseTranslationStatus) {
    return reverseTranslationStatus[search as keyof typeof reverseTranslationStatus]
  }

  if (search in reverseTranslationRole) {
    return reverseTranslationRole[
      search as keyof typeof reverseTranslationRole
    ];
  }

  if (search in reverseTranslationProductivity) {
    return reverseTranslationProductivity[
      search as keyof typeof reverseTranslationProductivity
    ];
  }

  return search;
};
