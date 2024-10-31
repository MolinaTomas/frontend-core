# Usar una imagen base de Node para construir la aplicación
FROM node:16 AS build

# Crear y cambiar al directorio de trabajo
WORKDIR /app

# Copiar archivos y instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación compilada
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html