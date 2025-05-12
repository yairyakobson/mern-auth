FROM node:22.15.0 as development

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]

# COPY command - copy file from container to a local directory
FROM node:22.15.0 as production

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=development /app/dist ./dist
CMD ["node", "dist/server.js"]