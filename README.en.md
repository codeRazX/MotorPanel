# ​ MotorPanel

> Web application for comprehensive auto workshop management  
> [Versión en Español](./README.md)

---

## ​ Overview

**MotorPanel** is a professional solution for workshop management, making it easy to manage services, clients, employees, and vehicles through a modern, clean, and fully responsive interface.

### Main Features

- 🔐 Secure authentication via JSON Web Tokens (JWT), stored in cookies and validated on the backend  
- 📋 Registration and management of incoming services  
- 👤 Automatic creation of clients if they don’t exist, with intelligent autocompletion for client data and vehicles  
- 🚗 Ability to associate vehicles with clients, with options to edit or delete  
- 🧰 Employee assignment to services, with control over productivity, salary, position, and start date  
- 🔄 Status updates on services, including options to add repairs, apply VAT, and calculate totals
- 🔔 Notification system to provide real-time feedback to the user: informs about successfully completed actions, errors, or relevant warnings 
- 🔗 Cross-navigation between related models: from clients to their services, and from services to associated employees  
- 🗑️ Record deletion, with automatic updates across all relationships  
- 🧑‍💼 Profile panel for editing personal details like name, email, and password

---

## ​​ Technologies Used

| Category               | Tech Stack                                      |
|------------------------|-------------------------------------------------|
| **Frontend**           | React + Vite + TypeScript + TailwindCSS         |
| **Backend**            | Node.js + Express + MongoDB + TypeScript        |
| **State Management**   | TanStack React Query                            |
| **Validation**         | Zod                                             |
| **Form Handling**      | React Hook Form                                 |
| **Routing**            | React Router DOM                                |
| **HTTP Client**        | Axios with interceptors and error handling      |
| **Authentication**     | JWT + Secure Cookies                            |
| **UI Components**      | Reusable components + Headless UI               |

---

## ​​ App Preview

Below are screenshots showcasing key features, validations, and the responsive design of **MotorPanel**.  
**Note:** All form fields are validated on both the frontend and backend; only one screen visually displays errors to avoid repetition.

---

### ​ Login

Secure login form with full field validation.

<img width="1920" height="950" alt="Login" src="https://github.com/user-attachments/assets/f6ddd952-a8f3-4ad2-863d-607fbc84c4a6" />

---

### ​ Account Registration

User account creation with visible validation messages.  
This is the only screenshot that displays validation errors, but all forms are fully validated.

<img width="1904" height="948" alt="Registration" src="https://github.com/user-attachments/assets/384a2d91-9bfa-4a91-8375-4ab4d6b7cb23" />

---

### ​ Main Dashboard

Central hub where users can navigate to all sections of the app.

<img width="1796" height="931" alt="Dashboard" src="https://github.com/user-attachments/assets/d379e6e1-6a1b-474d-877b-54061aa1dd1d" />

---

### ​​ Create or Edit Service

Form with several sections and relationship mappings (employees, clients).  
Although this example is for services, all models—services, employees, and clients—can be created and edited, except clients, who are automatically created by the system.

<img width="1895" height="943" alt="Create or Edit Service" src="https://github.com/user-attachments/assets/832a01c0-4b16-444d-990b-f250573bbd88" />

---

### ​ Smart Autocomplete

Predictive search available in all forms, improving data entry efficiency (clients, vehicles, etc.).

<img width="1905" height="948" alt="Smart Autocomplete" src="https://github.com/user-attachments/assets/d7843bef-5a6a-4554-b5d4-d09184c2c111" />

---

### ​ Full Service Details

Detailed service view showing all related information (employees, client, total, status, repairs, etc.).  
Navigation links to related entities are included.  
This template applies to all models but uses services here for being most comprehensive.

<img width="1902" height="923" alt="Service Details" src="https://github.com/user-attachments/assets/a4c5bf3b-2a32-4863-af6a-7aeb6545c749" />

---

### ​ Client Details + Notes

Detailed client view with the ability to add notes.  
Note-taking functionality is available for services and employees as well but is only showcased here.

<img width="1902" height="936" alt="Client Details + Notes" src="https://github.com/user-attachments/assets/0988a01e-6889-4baa-8f22-090844199bee" />

---

### ​ Delete Confirmation Modal

Confirmation modal requiring a typed acknowledgment before deletion, ensuring clarity and security on what will be removed.

<img width="1917" height="948" alt="Delete Confirmation Modal" src="https://github.com/user-attachments/assets/f591c64c-cdb7-443d-89fe-7b67fc4cb921" />

---

### ​ Elliptical Pagination

Modern, visually appealing pagination in all list views.  
Formats like `< 1 2 3 ... 7 >` for intuitive navigation.

<img width="1918" height="950" alt="Elliptical Pagination" src="https://github.com/user-attachments/assets/24729564-c57c-4a35-ab06-082b065da252" />

---

### ​ Advanced Filters

Interactive filter system with animations, tailored to each model.  
Includes a reset button; fully responsive.

<img width="1903" height="950" alt="Advanced Filters" src="https://github.com/user-attachments/assets/10c95b13-2173-4fd1-9626-736c066d0584" />

---

### ​ Profile Editing

Screen for updating user data (name, email, password).  
Fully responsive design.

<img width="1912" height="928" alt="Profile Editing" src="https://github.com/user-attachments/assets/77ee32f9-a47d-40d7-a3d4-b5106493c376" />

---

### ​ Skeleton Loader – Forms

Modern skeleton loaders for form loading states.  
Used across the entire app for consistency.

<img width="1782" height="932" alt="Form Skeleton Loader" src="https://github.com/user-attachments/assets/32d2352f-c4a6-412f-9aa3-d8bcc17fbdf2" />

---

### ​ Skeleton Loader – Lists

Skeleton loaders displayed while data is being fetched in lists.  
Fully implemented throughout the application.

<img width="1795" height="931" alt="List Skeleton Loader" src="https://github.com/user-attachments/assets/4bdb5284-41bd-4233-8c23-a89cb5e5e8c7" />

---

### ​ Responsive – Mobile Dashboard

Mobile view of the main dashboard layout.  
The app is fully responsive; this is one of many possible display states.

<img width="479" height="927" alt="Responsive Mobile Dashboard" src="https://github.com/user-attachments/assets/b977d263-5eaf-4408-b643-af6807f284c7" />

---

### ​ Responsive – Employee List

Mobile-friendly version of the employee list view.

<img width="482" height="930" alt="Responsive Employee List" src="https://github.com/user-attachments/assets/84a7bfbb-732f-43cc-87b8-82305e62bb0c" />

---

### ​ Responsive – Profile

Another example of responsive design, showcasing the profile section.

<img width="481" height="924" alt="Responsive Profile Section" src="https://github.com/user-attachments/assets/39716c3e-4abc-4e4c-aa93-3a6d7c6a2f8d" />

---

✅ **The entire application is designed to deliver a seamless experience across all device types**, ensuring modern, accessible, and professional navigation.
