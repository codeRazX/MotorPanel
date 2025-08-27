# 🧩 MotorPanel

> Aplicación web para la gestión integral de talleres mecánicos.  
> [English version](./README.en.md)

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

## 🖼️ Vista previa de la aplicación

A continuación, se muestran diferentes capturas de pantalla que reflejan las principales funcionalidades, validaciones y diseño responsivo de **MotorPanel**.  
**Nota:** Todas las validaciones de campos están implementadas tanto en el *frontend* como en el *backend*, aunque solo se muestran visualmente en una pantalla para evitar redundancias.

---

### 🔐 Inicio de sesión

Autenticación segura mediante formulario con validación de campos.

<img width="1920" height="950" alt="Login" src="https://github.com/user-attachments/assets/f6ddd952-a8f3-4ad2-863d-607fbc84c4a6" />

---

### 🆕 Registro de cuenta

Creación de una nueva cuenta de usuario. Aquí se evidencian los mensajes de error en caso de validación incorrecta.  
Esta es la única captura donde se muestran errores visuales, aunque todos los formularios en la app cuentan con validación.

<img width="1904" height="948" alt="Registro" src="https://github.com/user-attachments/assets/384a2d91-9bfa-4a91-8375-4ab4d6b7cb23" />

---

### 🏠 Panel principal (Dashboard)

Centro de operaciones desde donde se accede a todas las secciones de la aplicación.

<img width="1796" height="931" alt="Dashboard" src="https://github.com/user-attachments/assets/d379e6e1-6a1b-474d-877b-54061aa1dd1d" />

---

### 🛠️ Crear o editar un servicio

Formulario con múltiples secciones, validación y relaciones entre modelos como empleados y clientes.  
Esta pantalla representa el formulario de servicio, pero todos los modelos (servicios, empleados y clientes) se pueden editar y crear, salvo los clientes, cuya creación la gestiona el sistema en automático.

<img width="1895" height="943" alt="Editar servicio" src="https://github.com/user-attachments/assets/832a01c0-4b16-444d-990b-f250573bbd88" />

---

### 🔍 Autocompletado inteligente

Búsqueda predictiva en todos los formularios de la app, en los campos donde sea requerida.

<img width="1905" height="948" alt="Autocompletado" src="https://github.com/user-attachments/assets/d7843bef-5a6a-4554-b5d4-d09184c2c111" />

---

### 📄 Detalles completos de un servicio

Visualización detallada de un servicio, incluyendo todas sus relaciones.  
Desde aquí puedes navegar hacia los detalles de empleados o clientes.  
Esta pantalla representa la estructura de visualización de todos los modelos, pero se muestra el servicio por ser el más completo.

<img width="1902" height="923" alt="Detalles servicio" src="https://github.com/user-attachments/assets/a4c5bf3b-2a32-4863-af6a-7aeb6545c749" />

---

### 👤 Detalles del cliente + Notas

Vista detallada de un cliente, con posibilidad de añadir notas.  
La funcionalidad de notas está presente también en servicios y empleados, pero solo se muestra aquí por simplicidad.

<img width="1902" height="936" alt="Detalles cliente" src="https://github.com/user-attachments/assets/0988a01e-6889-4baa-8f22-090844199bee" />

---

### ❌ Modal de confirmación de eliminación

Modal de confirmación antes de eliminar cualquier registro.  
El usuario debe escribir una palabra clave como medida de seguridad, y el modal muestra con claridad qué elemento se va a eliminar.

<img width="1917" height="948" alt="Eliminar confirmación" src="https://github.com/user-attachments/assets/f591c64c-cdb7-443d-89fe-7b67fc4cb921" />

---

### 🔢 Paginación elíptica

Sistema de paginación moderno, bonito y responsivo para todos los listados masivos.  
Estilo elíptico: `< 1 2 3 ... 7 >`.

<img width="1918" height="950" alt="Image" src="https://github.com/user-attachments/assets/24729564-c57c-4a35-ab06-082b065da252" />

---

### 🧮 Filtros avanzados

Buscador interactivo, con animaciones y capacidad para filtrar por múltiples campos específicos de cada modelo.  
Incluye botón para resetear filtros, todo en un diseño adaptable.

<img width="1903" height="950" alt="Filtros" src="https://github.com/user-attachments/assets/10c95b13-2173-4fd1-9626-736c066d0584" />

---

### 👤 Edición de perfil

Pantalla para modificar los datos del usuario (nombre, correo, contraseña).  
Totalmente responsiva.

<img width="1912" height="928" alt="Perfil" src="https://github.com/user-attachments/assets/77ee32f9-a47d-40d7-a3d4-b5106493c376" />

---

### 🦴 Carga con Skeleton – Formularios

Indicador de carga con diseño moderno en formularios.  
Este es un ejemplo visual, pero toda la app utiliza skeletons en los formularios.

<img width="1782" height="932" alt="Skeleton formulario" src="https://github.com/user-attachments/assets/32d2352f-c4a6-412f-9aa3-d8bcc17fbdf2" />

---

### 🦴 Carga con Skeleton – Listados

Skeletons en listas renderizadas mientras se cargan los datos.  
Toda la aplicación emplea este tipo de loaders.

<img width="1795" height="931" alt="Skeleton lista" src="https://github.com/user-attachments/assets/4bdb5284-41bd-4233-8c23-a89cb5e5e8c7" />

---

### 📱 Responsividad – Dashboard en móvil

Vista del dashboard principal en una pantalla pequeña.  
Toda la aplicación es responsiva; esta imagen es solo un ejemplo.

<img width="479" height="927" alt="Responsive dashboard" src="https://github.com/user-attachments/assets/b977d263-5eaf-4408-b643-af6807f284c7" />

---

### 📱 Responsividad – Listado de empleados

Vista móvil adaptada para la sección de empleados.

<img width="482" height="930" alt="Responsive empleados" src="https://github.com/user-attachments/assets/84a7bfbb-732f-43cc-87b8-82305e62bb0c" />

---

### 📱 Responsividad – Perfil

Ejemplo adicional de diseño responsivo, en este caso para la sección de perfil.

<img width="481" height="924" alt="Responsive perfil" src="https://github.com/user-attachments/assets/39716c3e-4abc-4e4c-aa93-3a6d7c6a2f8d" />

---

✅ **Toda la aplicación ha sido diseñada para ofrecer una experiencia fluida en todos los dispositivos**, garantizando una navegación accesible, moderna y profesional.




