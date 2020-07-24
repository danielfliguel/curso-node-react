# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install express -save
# Verificar se é possível manter o -d para instalar o nodemon apenas em modo de desenvolvimento
RUN npm install -g nodemon

# add app
COPY . ./

# start app
CMD ["npm", "start"]

EXPOSE 80