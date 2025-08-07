# Dockerfile.dev - Ambiente de Desenvolvimento do Nuxt.js
FROM node:22-alpine

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat bash

# Configurar diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos de dependências para instalar rapidamente as libs
COPY package*.json ./

# Instalar dependências usando `npm install` (incluindo as devDependencies)
RUN npm install

# Adicionar volumes para que as mudanças no código local reflitam no container
VOLUME ["/app"]

# Expor as portas utilizadas no desenvolvimento
EXPOSE 3000 24678

# Comando padrão para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]