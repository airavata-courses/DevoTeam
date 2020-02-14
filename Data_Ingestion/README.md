# Data Ingestion micro-service  
Service built in python
- This micro-service recieves user input via a RabbitMQ broker and calls the Nexrad bucket to retrieve relevant radar data objects  
- It then publishes data to the broker for subscribers to retrieve it.  
