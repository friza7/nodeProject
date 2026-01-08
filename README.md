# Node Project - Sistema de Autenticación y Administración

Sistema de autenticación con Express, TypeScript y MySQL. Incluye gestión de roles, creación de administrador y panel de control protegido.

## Características

- Autenticación segura con JWT
- Cifrado de contraseñas con bcryptjs
- Sistema de roles (Admin y Usuario)
- Panel de administración protegido
- Middleware de autenticación personalizado
- Cookies seguras (httpOnly)
- Base de datos MySQL

## Requisitos

- Node.js v16+
- npm
- XAMPP con MySQL activado

## Base de Datos

En phpMyAdmin, ejecuta este script SQL:

```sql
CREATE DATABASE IF NOT EXISTS node_project;
USE node_project;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Instalación

```bash
# Navegar al proyecto
cd nodeProject

# Instalar dependencias
npm install
```

## Configuración

Crea un archivo `.env` en la raíz:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=node_project
JWT_SECRET=tu_secreto_muy_seguro_aqui
```

## Ejecución

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## Flujo de uso

1. **Primera ejecución**: Si no existe admin, se redirige a `/auth/createAdmin` para crear el administrador
2. **Login**: Accede a `/auth/login` con tus credenciales
3. **Dashboard**: Una vez autenticado, accede a `/admin/dashboard`
4. **Logout**: Pulsa el boton de logout para volver al inicio

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/auth/login` | Formulario de login |
| POST | `/auth/login` | Procesar login |
| GET | `/auth/createAdmin` | Formulario crear admin |
| POST | `/auth/createAdmin` | Crear administrador |
| GET | `/auth/logout` | Cerrar sesión |
| GET | `/admin/dashboard` | Panel admin (requiere auth) |

## Dependencias principales

- **express** 5.2.1 - Framework web
- **mysql2** 3.16.0 - Driver MySQL
- **jsonwebtoken** 9.0.3 - JWT
- **bcryptjs** 3.0.3 - Hash de contraseñas
- **dotenv** 17.2.3 - Variables de entorno
- **cookie-parser** 1.4.7 - Manejo de cookies

## Solución de problemas

**Error de conexión a MySQL**
- Verifica que XAMPP esté corriendo
- Confirma que MySQL está activado en el panel de XAMPP
- Revisa las credenciales en `.env`

**Error: Unknown database**
- Asegúrate de ejecutar el script SQL en phpMyAdmin
- Verifica que el nombre de la base de datos en `.env` coincida

**La app no se recarga**
- Detén el servidor (Ctrl+C) y ejecuta `npm run dev` nuevamente