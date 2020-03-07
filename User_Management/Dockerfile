FROM openjdk:8-jdk-alpine
RUN mkdir User_Management_Container
RUN apt-get update
RUN apt-get install -y maven
COPY . /User_Management_Container
WORKDIR User_Management_Container
RUN mvn package
CMD["java","-jar", "target/UserManagement-0.0.1-SNAPSHOT.jar"]
