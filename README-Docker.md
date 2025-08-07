# Docker Setup para Nuxt.js

Este projeto inclui uma configuração Docker otimizada seguindo as melhores práticas mais recentes para aplicações Nuxt.js.

## Arquivos Docker

### Dockerfile
- **Multi-stage build**: Otimiza o tamanho da imagem final
- **Node.js 20 Alpine**: Imagem base leve e segura
- **Usuário não-root**: Executa a aplicação com usuário `nuxtjs` para segurança
- **Health check**: Monitora a saúde da aplicação
- **Cache de layers**: Otimiza rebuilds através da ordem correta de COPY

### docker-compose.yml
- **Serviço de produção**: Configuração pronta para deploy
- **Serviço de desenvolvimento**: Comentado, pode ser habilitado para desenvolvimento
- **Health checks**: Verifica se a aplicação está respondendo
- **Restart policy**: Reinicia automaticamente em caso de falha
- **Networking**: Rede isolada para o serviço

### .dockerignore
- Exclui arquivos desnecessários do contexto de build
- Reduz o tamanho do contexto e melhora a performance
- Inclui exclusões específicas para Nuxt.js

## Como usar

### Produção

1. **Build da imagem:**
   ```bash
   docker build -t nuxt-app .
   ```

2. **Executar com Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Acessar a aplicação:**
   - URL: http://localhost:3000

### Desenvolvimento

1. **Descomente o serviço `nuxt-dev` no docker-compose.yml**

2. **Crie um Dockerfile.dev (opcional):**
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   EXPOSE 3000
   EXPOSE 24678
   CMD ["npm", "run", "dev"]
   ```

3. **Execute o ambiente de desenvolvimento:**
   ```bash
   docker-compose up nuxt-dev
   ```

## Comandos úteis

```bash
# Build da imagem
docker build -t nuxt-app .

# Executar container
docker run -p 3000:3000 nuxt-app

# Ver logs
docker-compose logs -f nuxt-app

# Parar serviços
docker-compose down

# Rebuild e restart
docker-compose up --build -d

# Limpar imagens não utilizadas
docker system prune -a
```

## Variáveis de ambiente

As seguintes variáveis podem ser configuradas:

- `NODE_ENV`: Ambiente de execução (production/development)
- `NUXT_HOST`: Host da aplicação (padrão: 0.0.0.0)
- `NUXT_PORT`: Porta da aplicação (padrão: 3000)

## Características de segurança

- ✅ Usuário não-root
- ✅ Imagem Alpine (menor superfície de ataque)
- ✅ Multi-stage build (reduz tamanho final)
- ✅ Health checks
- ✅ .dockerignore otimizado

## Performance

- ✅ Cache de layers otimizado
- ✅ Dependências instaladas em layer separada
- ✅ Build artifacts copiados eficientemente
- ✅ Imagem final mínima