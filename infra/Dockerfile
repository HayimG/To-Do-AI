# hadolint ignore=DL3007
FROM node:18-alpine

WORKDIR /app

# hadolint ignore=DL3020
ADD . .

# hadolint ignore=DL3059
RUN npm install --production

# hadolint ignore=DL3059
RUN npm cache clean --force

EXPOSE 3000

# Missing: no USER instruction (runs as root)
# Missing: no HEALTHCHECK

CMD ["node", "src/index.js"]
