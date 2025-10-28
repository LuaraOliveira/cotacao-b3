# Consulta de Cotações B3

Este projeto permite consultar e visualizar o preço de fechamento diário de ativos da B3 (como PETR4, VALE3, etc.) dentro de um período definido pelo usuário.  
A aplicação é composta por um **backend em Node.js (Express)** e um **frontend em React (Vite + Tailwind)**.

---

## 🚀 Como rodar o projeto

### 🧩 Backend (Node + Express)
1. Acesse a pasta `backend`
2. Instale as dependências:
   ```bash
   npm install
Execute o servidor:

bash
Copiar código
npm run start
O backend rodará em: http://localhost:3001

💻 Frontend (React + Vite + Tailwind)
Acesse a pasta frontend

Instale as dependências:

bash
Copiar código
npm install
Rode o projeto:

bash
Copiar código
npm run dev
Abra o link exibido no terminal (ex: http://localhost:5173)

O frontend se conecta automaticamente ao backend em http://localhost:3001.

🧠 Como o projeto funciona
O usuário preenche um formulário com:

Ativos (ex: PETR4, VALE3)

Data inicial e final

O frontend faz uma requisição para o backend (/api/quotes) com esses parâmetros.

O backend consulta a API pública do Yahoo Finance, formata os dados e devolve ao frontend.

O frontend exibe as cotações em um gráfico de linha interativo usando o Recharts.

🔁 Bônus de cache
O backend utiliza a biblioteca node-cache para guardar os resultados das consultas por 1 hora.
Assim, se o usuário pedir novamente os mesmos dados, a resposta vem instantaneamente do cache — sem nova chamada à API externa.

🧩 Tecnologias utilizadas
Backend:

Node.js + Express → servidor leve e simples de configurar

Axios → para buscar dados da API do Yahoo Finance

Node-cache → cache em memória rápido e prático

Frontend:

React (Vite) → inicialização rápida e reatividade

TailwindCSS → estilização simples e consistente

Recharts → geração de gráficos de linha de forma intuitiva

✍️ Observações
Os dados vêm da API pública do Yahoo Finance, que pode ocasionalmente omitir alguns dias sem pregão.

O projeto foi estruturado para ser fácil de entender e de evoluir e é possível trocar o provedor de API ou adicionar novos gráficos sem grandes mudanças.

Projeto desenvolvido para desafio técnico por Luara Oliveira.