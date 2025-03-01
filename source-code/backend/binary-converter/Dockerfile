# Etapa de build
FROM ubuntu:latest AS build

# Atualiza os pacotes e instala o OpenJDK 17 e Maven
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    maven \
    && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY source-code/backend/binary-converter/ .

# Compila o projeto (gera o JAR dentro de /app/target)
RUN mvn clean install -DskipTests

# Etapa final para rodar a aplicação
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Expondo a porta do serviço
EXPOSE 8080

# Copia o JAR gerado na etapa de build
COPY --from=build /app/target/*.jar app.jar

# Executa a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
