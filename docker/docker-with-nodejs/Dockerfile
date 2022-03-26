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
# expose the port
EXPOSE 3000
# run the application inside container
CMD ["npm","start"]