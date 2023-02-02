FROM node:16


RUN apt-get update && apt-get install -y python3

RUN apt-get install -y python3-pip

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN pip3 install --upgrade pip

RUN python3 -m pip install spleeter 

RUN npm install

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 1200

CMD [ "npm", "start" ]
