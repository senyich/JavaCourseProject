FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY mvnw.cmd .
COPY .mvn .
COPY mvnw .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

# Создаем папки для данных
RUN mkdir -p /app/data /app/uploads/diagrams

COPY --from=builder /app/target/pajeroparts-backend-1.0.0.jar app.jar

RUN groupadd -r spring && useradd -r -g spring spring
RUN chown -R spring:spring /app
USER spring

EXPOSE 8080

VOLUME ["/app/data", "/app/uploads"]

ENTRYPOINT ["java", "-jar", "app.jar"]