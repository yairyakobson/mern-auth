FROM node:22.15.0 as development

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .