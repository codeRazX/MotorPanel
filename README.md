# 🧩 MotorPanel

> Aplicación web para la gestión integral de talleres mecánicos.  
> [Versión en inglés disponible aquí](#english-version)

---

## 🧠 Descripción

**MotorPanel** es una solución profesional para la administración de talleres, diseñada para facilitar el control de servicios, clientes, empleados y vehículos desde una interfaz moderna, limpia y totalmente responsiva.

### Funcionalidades principales

- 🔐 Autenticación segura con JSON Web Tokens (JWT), gestionada mediante cookies y validada en el backend
- 📋 Registro y gestión de servicios entrantes
- 👤 Creación automática de clientes si no existen, con autocompletado inteligente de datos y vehículos
- 🚗 Asociación de vehículos a clientes, con posibilidad de editar o eliminar
- 🧰 Asignación de empleados a servicios, con control de productividad, salario, puesto y fecha de alta
- 🔄 Modificación del estado de los servicios, con opción de añadir reparaciones, aplicar IVA y calcular totales
- 🔗 Navegación cruzada entre modelos relacionados: desde un cliente puedes ver sus servicios, desde un servicio sus empleados, etc.
- 🗑️ Eliminación de registros con actualización automática en todas las relaciones
- 🧑‍💼 Panel de perfil para modificar datos personales como nombre, email y contraseña

---

## 🛠️ Tecnologías utilizadas

| Categoría     | Stack técnico |
|---------------|---------------|
| **Frontend**  | React + Vite + TypeScript + TailwindCSS |
| **Backend**   | Node.js + Express + MongoDB + TypeScript |
| **Gestión de estado** | TanStack React Query |
| **Validación** | Zod |
| **Formularios** | React Hook Form |
| **Routing** | React Router DOM |
| **HTTP** | Axios con interceptores y validación |
| **Autenticación** | JWT + Cookies seguras |
| **UI** | Componentes reutilizables + Headless UI |

---

