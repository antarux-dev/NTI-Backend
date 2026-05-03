FROM node:22-alpine AS build_stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --ignore-scripts
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build_stage /app/dist ./dist

COPY package*.json ./
RUN npm ci --only=production --prefer-offline --no-audit --ignore-scripts

EXPOSE 3000
CMD ["npm", "start"]