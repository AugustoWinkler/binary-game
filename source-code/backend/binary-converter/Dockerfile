# Etapa de build
FROM maven:3.8.6-eclipse-temurin-21 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia apenas os arquivos necessários para o build
COPY source-code/backend/binary-converter .

# Executa o build com Maven
RUN mvn clean package -DskipTests

# Etapa de execução (imagem mais leve)
FROM openjdk:21-jdk-slim

WORKDIR /app
EXPOSE 8080

# Copia o JAR gerado na etapa anterior
COPY --from=build /app/target/binary-converter-0.0.1-SNAPSHOT.jar app.jar

# Comando para rodar o Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
