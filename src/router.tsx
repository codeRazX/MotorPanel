import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout"
import AppLayout from "@/layouts/AppLayout"
import ProfileLayout from "@/layouts/ProfileLayout"

const DashboardPage = React.lazy(() => import('@/pages/app/DashboardPage'))
const ServicesPage = React.lazy(() => import('@/pages/app/services/ServicesPage'))
const ServiceDetailsPage = React.lazy(() => import('@/pages/app/services/ServiceDetailsPage'))
const CreateServicePage = React.lazy(() => import('@/pages/app/services/CreateServicePage'))
const CompleteServicePage = React.lazy(() => import('@/pages/app/services/CompleteServicePage'))
const ClientsPage = React.lazy(() => import('@/pages/app/clients/ClientsPage'))
const ClientDetailsPage = React.lazy(() => import('@/pages/app/clients/ClientDetailsPage'))
const EditClientsPage = React.lazy(() => import('@/pages/app/clients/EditClientsPage'))
const EmployeesPage = React.lazy(() => import('@/pages/app/employees/EmployeesPage'))
const EmployeeDetailsPage = React.lazy(() => import('@/pages/app/employees/EmployeeDetailsPage'))
const CreateEmployeePage = React.lazy(() => import('@/pages/app/employees/CreateEmployeePage'))
const EditEmployeesPage = React.lazy(() => import('@/pages/app/employees/EditEmployeesPage'))
const ProfilePage = React.lazy(() => import('@/pages/app/profile/ProfilePage'))
const ProfilePasswordPage = React.lazy(() => import('@/pages/app/profile/ProfilePasswordPage'))

import SkeletonLayout from "@/components/ui/skeletons/SkeletonLayoutApp";
import LoginPage from "@/pages/auth/LoginPage"
import NewAccountPage from "@/pages/auth/NewAccountPage"
import NotFoundPage from "@/pages/app/NotFoundPage"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <Suspense fallback={<SkeletonLayout />}>
            <AppLayout />
          </Suspense>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailsPage />} />
          <Route path="/services/create" element={<CreateServicePage />} />
          <Route path="/services/:serviceId/edit" element={<CompleteServicePage />} />

          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="/clients/:clientId/edit" element={<EditClientsPage />} />

          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/:employeeId" element={<EmployeeDetailsPage />} />
          <Route path="/employees/create" element={<CreateEmployeePage />} />
          <Route path="/employees/:employeeId/edit" element={<EditEmployeesPage />} />

          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="password" element={<ProfilePasswordPage />} />
          </Route>
        </Route>

       
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/account" element={<NewAccountPage />} />
        </Route>

       
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
