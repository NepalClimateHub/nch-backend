FROM node:22

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]
