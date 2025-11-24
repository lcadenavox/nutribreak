# NutriBreak

Aplicação fullstack para acompanhamento de **refeições**, **pausas** e **bem-estar** de usuários em ambiente de trabalho.  
Backend em **Spring Boot** (com suporte opcional a RabbitMQ) e frontend em **React + Vite + i18next**.

---

## 📑 Sumário

- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Backend](#configuração-do-backend)
- [Configuração do Frontend](#configuração-do-frontend)
- [Autenticação e Usuário Padrão](#autenticação-e-usuário-padrão)
- [Rotas Principais da API](#rotas-principais-da-api)
- [Entidades Importantes](#entidades-importantes)
- [Mensageria (RabbitMQ)](#mensageria-rabbitmq)
- [Internacionalização (i18n)](#internacionalização-i18n)
- [Execução de Testes](#execução-de-testes)
- [Problemas Comuns](#problemas-comuns)
- [Licença](#licença)

---

## 🛠 Tecnologias

### **Backend**
- Java 21+
- Spring Boot
- Spring Data JPA
- Spring Security
- Bean Validation (Jakarta)
- Lombok
- RabbitMQ (opcional)

### **Frontend**
- Node.js (LTS)
- React
- Vite
- Axios
- i18next

---

## 🏗 Arquitetura

### Backend (`src/main/java/com/nutribreak`)
- `config/` – segurança, locale, RabbitMQ, etc.  
- `controller/` – controladores REST (`AuthController`, `MealController`, etc.)  
- `service/` – regras de negócio  
- `repository/` – interfaces JPA  
- `dto/` – objetos de transferência (`MealDTO`, `BreakRecordDTO`, etc.)  
- `model/` – entidades (`User`, `Meal`, `BreakRecord`, etc.)  
- `exception/` – exceções customizadas  
- `messaging/` – publicação/consumo de eventos  

### Frontend (`frontend/`)
- `src/pages/` – páginas principais  
- `src/components/` – componentes reutilizáveis  
- `src/context/` – `AuthContext`  
- `src/services/api.js` – cliente Axios  
- `src/i18n/` – traduções (`en.json`, `pt.json`)  
- `src/styles/` – estilos  

---

## 📌 Pré-requisitos

- Java 21+  
- Maven Wrapper (incluso no projeto)  
- Node.js LTS (18+)  
- RabbitMQ (opcional, apenas se quiser eventos assíncronos)  

---

## ⚙️ Configuração do Backend

### 1. Arquivos importantes

- `src/main/resources/application.properties`
- `src/main/resources/messages.properties`
- `src/main/resources/messages_pt.properties`

Certifique-se de configurar corretamente:
- Credenciais e URL do banco
- Parâmetros de segurança
- Configurações do RabbitMQ (se habilitado)

---

### 2. Rodar o Backend

#### 🔹 **Windows (PowerShell / CMD)**
```bash
mvnw.cmd spring-boot:run
🔹 Linux / Mac
bash
Copiar código
./mvnw spring-boot:run
A API ficará disponível em:

arduino
Copiar código
http://localhost:8080
💻 Configuração do Frontend
A partir da pasta frontend/:

1. Instalar dependências
bash
Copiar código
npm install
2. Executar o projeto
bash
Copiar código
npm run dev
URL padrão do Vite:

arduino
Copiar código
http://localhost:5213
Variável de ambiente recomendada:
env
Copiar código
VITE_API_BASE_URL=http://localhost:8080
🔐 Autenticação e Usuário Padrão
Autenticação gerenciada por Spring Security.
O frontend envia o token no header:

makefile
Copiar código
Authorization: Bearer <token>
👤 Primeiro acesso:
Email: admin@nutribreak.local

Senha: Admin123!

Após o login, é possível cadastrar novos usuários.

🛣 Rotas Principais da API
Prefixo geral: /api
🔑 Autenticação
Método	Rota	Descrição
POST	/api/auth/login	Login
POST	/api/auth/register	Registro (se habilitado)

👥 Usuários
Método	Rota
GET	/api/users
GET	/api/users/{id}
POST	/api/users
PUT	/api/users/{id}
DELETE	/api/users/{id}

🍽️ Refeições (Meals)
Método	Rota
GET	/api/meals
GET	/api/meals/{id}
POST	/api/meals
PUT	/api/meals/{id}
DELETE	/api/meals/{id}

Exemplo de payload:
json
Copiar código
{
  "items": "Arroz, frango, salada",
  "calories": 520
}
⏸️ Pausas (Breaks)
Método	Rota
GET	/api/breaks
POST	/api/breaks

💡 Sugestões
Método	Rota	Descrição
POST	/api/suggestions	Sugestões baseadas no estado do usuário

🧩 Entidades Importantes
User
Campos principais:

id, name, email, role

workMode, mood, energy

screenTimeMinutes

password (criptografada)

Meal
id

user

timestamp

items

calories

📨 Mensageria (RabbitMQ)
Opcional — usado para publicar eventos como criação de refeições.

Se RabbitMQ não estiver ativo:

EventPublisher fica null e não quebra a aplicação.

Configuração padrão:

Porta: 5672

Ajuste credenciais e filas em:

RabbitConfig

application.properties

🌍 Internacionalização (i18n)
Idiomas disponíveis:

🇧🇷 Português (pt.json)

🇺🇸 Inglês (en.json)

Arquivos:

bash
Copiar código
frontend/src/i18n/
Componente para troca de idioma:

bash
Copiar código
frontend/src/components/LanguageSwitcher.tsx
🧪 Execução de Testes
Backend
swift
Copiar código
src/test/java/com/nutribreak/NutribreakApplicationTests.java
src/test/java/com/nutribreak/UserServiceTests.java
Frontend
Se configurado:

Vitest / Jest

⚠ Problemas Comuns
❌ 401 / 403 em /api/*
Token ausente

Usuário não autenticado

Verificar o header Authorization

❌ Erro 500 ao criar refeição
Payload incorreto (name em vez de items)

Usuário não logado

❌ Placeholders aparecendo
Chave de tradução inexistente

Alguns placeholders ainda são textos fixos na página
