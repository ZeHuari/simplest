# SIMPLEST Guru - Reto Técnico FullStack

## Descripción del proyecto
Este proyecto es una aplicación web FullStack construida con **React** en el frontend y **Node.js + Express** en el backend, conectada a una base de datos **SQL Server**.  
Permite el registro y login de usuarios mediante **JWT** y un CRUD protegido (Users y Products).  
El objetivo es demostrar buenas prácticas, organización del código y manejo seguro de la autenticación.

## Tecnologías utilizadas
- **Frontend:** React, React Router DOM, Zustand
- **Backend:** Node.js, Express, bcryptjs, jsonwebtoken, mssql
- **Base de datos:** SQL Server (Docker)
- **Estilos:** Tailwind CSS, Shadcn

## Requisitos previos
- Node.js >= 18
- npm o yarn
- Docker (para SQL Server)
- Azure Data Studio o SQL Server Management Studio (opcional)

## Instalación y ejecución

### 1️⃣ Backend
1. Ir a la carpeta `backend`:
   ```bash
   cd backend
2. Instalar dependencias:`:
   npm install
3. Crear archivo .env en la raíz del backend con el contenido::
   DB_USER=sa
DB_PASSWORD=YourStrongPassword123!
DB_SERVER=localhost,1433
DB_NAME=master
JWT_SECRET=tu_clave_secreta
PORT=5000
4. ejecuta el `backend`:
   node src/server.js
5. Base de datos SQL Server (Docker)
   Ejecutar el contenedor:

   docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrongPassword123!" -p 1433:1433 --name simplest-sqlserver -d mcr.microsoft.com/mssql/server:2022-latest

    CREATE DATABASE master;
    GO
6. Ejecutar el script simplest.sql (incluido en el proyecto) para crear tablas y constraints:

Abrir Azure Data Studio o SQL Server Management Studio (yo use la extension del vs code)

Conectarse al servidor localhost con usuario sa y contraseña YourStrongPassword123!

Ejecutar el archivo simplest.sql para crear las tablas Users y Products.

7. Frontend

Ir a la carpeta frontend:
cd frontend

Instalar dependencias:

npm install
npm run dev

8. Credenciales de prueba

Usuario: test@gmail.com

Contraseña: 123456

9. Notas adicionales

Todas las operaciones del CRUD requieren estar autenticado mediante JWT.

Se utilizó fetch para todas las llamadas a la API.

Se aplicaron buenas prácticas de Clean Code y modularización en frontend y backend.