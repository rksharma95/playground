# base image
FROM node:15
# working directory inside the container optional but good practice           
WORKDIR /app
# copy package.json file to the container - as /app is working directory it will be copied in it
COPY package.json .
# run npm install to install the dependencies
RUN npm install
# copy entire application files into the docker
COPY . ./
# creating env. variable PORT with default value 3000
ENV PORT 3000
# expose the port
EXPOSE ${PORT}
# run the application inside container
CMD ["node","index.js"]