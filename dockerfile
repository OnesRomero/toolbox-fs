# Imagen base
FROM node:20-alpine AS build

WORKDIR /app

# Copiar dependencias primero para aprovechar cache
COPY package*.json ./
RUN npm install --production

# Copiar el resto de la app
COPY . .

# Exponer el puerto interno
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]