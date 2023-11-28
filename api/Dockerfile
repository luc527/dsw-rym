FROM docker.io/eclipse-temurin:21-jdk-ubi9-minimal

WORKDIR /app
COPY target/*.jar ./

CMD ["java", "-jar", "rym-1.0.jar"]