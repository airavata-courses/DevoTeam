FROM node:latest
RUN mkdir UI_Container
COPY . /UI_Container
WORKDIR UI_Container
RUN npm install
RUN npm install webpack@4.41.0
CMD ["npm","start"]

