## User Management Service

### Prerequisite:

Java 8: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html  
MySQL Server and Workbench: https://dev.mysql.com/downloads/installer/

### Setup:

1. Database Setup

   Create database named devoteam_user in MySQL using command line or workbench and create table users.

    CREATE TABLE `users` (

      `email` varchar(45) NOT NULL,
  
      `password` varchar(500) NOT NULL,
  
      `firstname` varchar(45) NOT NULL,
  
      `lastname` varchar(45) NOT NULL,
  
      `contact` varchar(45) NOT NULL,
  
      PRIMARY KEY (`email`)
  
    );

2. Backend setup in eclipse

    a.  Open eclipse -> File -> Import -> Projects from folder or archive -> Directory -> Locate the project -> Finish
    
    b.  Edit application properties file with correct credentials for database connectivity
    
    c.  Right click on the project -> Run as -> Maven Install
    
    d.  Right click on the project -> Run as -> Maven Build -> Goals: spring-boot:run
   


