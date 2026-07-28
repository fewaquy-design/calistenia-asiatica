# Calistenia Asiática - Funil de Vendas & Dashboard

Bem-vindo(a) ao repositório oficial do projeto **Calistenia Asiática**. Este projeto consiste em um sofisticado funil de conversão (Quiz + VSL) interligado a um painel de administração (Dashboard) desenvolvido para monitoramento em tempo real de Leads e Eventos.

## 🚀 Visão Geral do Projeto

A aplicação foi estruturada para oferecer uma experiência fluida para os usuários (mobile first) e uma captação de dados cirúrgica para a equipe de marketing e inteligência de vendas.

### Funcionalidades Principais
- **Quiz de Alta Conversão (35 Passos):** Um fluxo interativo de qualificação de leads com dezenas de passos, focado nas dores, rotinas e objetivos das usuárias (foco no público feminino +40).
- **Auto-Captura Dinâmica:** Todo o fluxo possui um "espião global" (`js/analytics.js`) que lê dinamicamente as perguntas na tela (`<h1>`) e salva as escolhas dos usuários, campos de formulário e cliques. 
- **Integração Backend (Firebase):** Toda a navegação, eventos de UTMs (via UTMify) e dados qualificados (respostas do Quiz) são armazenados num banco de dados *Realtime Database* do Firebase.
- **Dashboard Interno (`/dashboard.html`):** Um painel restrito (protegido por senha) que permite visualizar os dados tabulares dos leads e exportar a base de forma flexível.

## 📂 Estrutura de Diretórios

Para manter a aplicação escalável e os caminhos relativos limpos, o projeto segue a seguinte arquitetura:

```text
/
├── dashboard.html      # Painel de controle interno da aplicação
├── index.html          # Ponto de entrada do funil (Landing Page/Step 1)
├── css/                # Folhas de estilo (Globais e do Dashboard)
├── js/                 # Lógica de frontend (Analytics, eventos, rastreios)
├── pages/              # Páginas secundárias do quiz (step2.html até step35.html)
├── images/             # Ativos visuais (WebP, PNG, SVGs) otimizados
├── scripts/            # Scripts Node.js utilitários (traduções, injeções) não expostos ao cliente
└── es/                 # Versão internacionalizada (Espanhol) do funil
```

## 📊 Exportação de Dados e BI

O `dashboard.html` possui um sistema de exportação altamente inteligente preparado para Business Intelligence (BI):
- **Exportação JSON:** Extração bruta dos nós do banco de dados, perfeita para importar em softwares avançados.
- **Exportação CSV Dinâmica:** O gerador de CSV varre toda a base, descobre todas as chaves (perguntas respondidas) dinamicamente e constrói as colunas da planilha automaticamente, incluindo todo o contexto subjetivo do lead (ex: *"Qual a sua maior dificuldade para emagrecer hoje?"*).

## 🛠️ Tecnologias e Dependências

- **Frontend:** HTML5, CSS3 Vanilla, JavaScript (ES5/ES6)
- **Tracking:** [UTMify](https://utmify.com.br/) (Mapeamento de origem e conversão)
- **Database:** Firebase Realtime Database
- **Estética de UI:** Glassmorphism, Micro-interações, Design Responsivo, Tailwind-inspired Utilities.

## ⚙️ Scripts de Manutenção

Na pasta `scripts/`, você encontrará ferramentas Node.js criadas para manutenção em lote. Para rodá-las (exemplo):
```bash
node scripts/translate_to_es.js
```
*(Certifique-se de instalar as dependências rodando `npm install` caso algum script necessite, verifique o `package.json`).*

---
*Projeto mantido e versionado por [fewaquy-design]*
