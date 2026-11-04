# 🍦 FBSys — Sistema de Gestão e Pedidos para Sorveterias Locais

> **Projeto de Extensão Acadêmica**  
> **Disciplina:** Desenvolvimento Web  
> **Instituição:** Universidade Federal do Ceará (UFC)  
> **Equipe:** [Nome dos Integrantes]  

---

## 📌 1. Registro do Contato Comunitário

Como parte das diretrizes de extensão universitária, a equipe realizou uma visita presencial para identificar demandas reais na comunidade comercial local.

* **Comércio Parceiro:** Sorveteria e Gelateria Sabor do Sertão (fictício)
* **Localização:** Centro, Quixadá - CE
* **Contato/Responsável:** João da Silva (Proprietário)
* **Data da Visita/Reunião:** 04 de Novembro de 2026
* **Resumo do Encontro:** Conversamos com o proprietário para compreender a rotina operacional da sorveteria, o fluxo de caixa, as maiores dificuldades no atendimento em horários de alta demanda e como é feita a tomada de decisão sobre estoque e sabores.

---

## 🔍 2. Diagnóstico do Problema

Durante o mapeamento com o parceiro comunitário e a observação direta do estabelecimento, identificamos os seguintes gargalos:

1. **Gargalo em Horários de Pico:** Nos fins de semana e períodos noturnos, o fluxo de clientes aumenta drasticamente. O atendimento via anotação em papel gera atrasos, erros de montagem e filas extensas.
2. **Falta de Previsibilidade de Estoque:** O comerciante não possui registro estruturado de quais sabores e acompanhamentos (*toppings*) têm maior saída em determinados dias ou horários, resultando na falta de insumos populares e desperdício de itens de baixa rotatividade.
3. **Ausência de Histórico de Consumo:** Não há acompanhamento das preferências e frequência dos clientes, impossibilitando ações de fidelização ou promoções direcionadas.

---

## 🎯 3. Objetivos do Projeto

### Objetivo Geral
Desenvolver e implantar uma aplicação web voltada para sorveterias de pequeno e médio porte, otimizando o fluxo de atendimento nos horários de pico e fornecendo relatórios analíticos sobre o comportamento de consumo dos clientes.

### Objetivos Específicos
* **Reduzir o tempo de espera** no atendimento e a taxa de erro nos pedidos em pelo menos 30%.
* **Criar um painel operacional (KDS/Balcão)** para acompanhamento e atualização de status dos pedidos em tempo real.
* **Disponibilizar um módulo de *Analytics*** com gráficos intuitivos para que o gestor tome decisões baseadas em dados (sabores mais vendidos, horários de pico, faturamento).
* **Proporcionar aos alunos** a aplicação prática de engenharia de software, modelagem de dados e desenvolvimento web full stack em um cenário real.

---

## 📋 4. Requisitos do Sistema

### 🔐 Requisitos Funcionais (RF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RF01** | O sistema deve permitir a gestão (CRUD) de produtos, categorias, sabores, tamanhos e adicionais. | **Alta** |
| **RF02** | O atendente/cliente deve conseguir registrar pedidos selecionando combinações de sorvetes e adicionais. | **Alta** |
| **RF03** | O sistema deve exibir uma tela de acompanhamento de pedidos em tempo real para a cozinha/balcão (*Recebido*, *Em Preparo*, *Pronto*, *Entregue*). | **Alta** |
| **RF04** | O sistema deve permitir marcar itens/sabores como "indisponíveis" para atualização imediata no menu. | **Média** |
| **RF05** | O sistema deve gerar relatórios analíticos de vendas por período, sabores mais populares e horários de maior movimento. | **Média** |
| **RF06** | O sistema deve permitir o cadastro simplificado de clientes para identificação de perfil e frequência. | **Baixa** |

---

### 🛡️ Requisitos Não Funcionais (RNF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RNF01** | **Responsividade:** A interface deve adaptar-se perfeitamente a dispositivos móveis, tablets e desktops. | **Alta** |
| **RNF02** | **Usabilidade:** A tela do balcão deve permitir a criação de um pedido em no máximo 3 toques/cliques. | **Alta** |
| **RNF03** | **Desempenho:** As atualizações na fila de pedidos em tempo real devem ter latência inferior a 2 segundos. | **Média** |
| **RNF04** | **Disponibilidade:** A aplicação deve ser acessível via navegador web sem necessidade de instalação local complexa. | **Alta** |

---

## 💡 5. Proposta de Solução

A solução proposta é o **FBSys**, uma aplicação web responsiva composta por três pilares fundamentais:

FBSYS
| Módulo | Descrição |
| Módulo Balcão / Cliente | Registro rápido do pedido     |
| Módulo Cozinha (KDS)    | Fila dinâmica e status ao vivo|
| Módulo Gestor/Analytics | Gráficos de hábitos e estoque |

1. **Terminal de Atendimento Rápido:** Interface focada na velocidade, permitindo que o atendente Monte o copo/casquinha com adicionais de forma simples e direta no tablet/PC do balcão.
2. **Painel Dinâmico da Cozinha/Balcão:** Substitui as fichas de papel por um Kanban digital que destaca pedidos atrasados e organiza a ordem de preparo.
3. **Dashboard de Inteligência Comercial:** Painel exclusivo do administrador que consolida os dados de vendas, permitindo identificar padrões (ex: *"Sábado à noite o sorvete de Ninho com Nutella responde por 40% das vendas"*).

---

## 🛠️ Tecnologias Pretendidas

* **Front-end:** HTML5, CSS3, JavaScript / React / Framework CSS
* **Back-end:** Node.js / Express
* **Banco de Dados:** PostgreSQL / SQLite
* **Controle de Versão:** Git & GitHub

---

## 👥 Autores e Agradecimentos

Projeto desenvolvido pelos estudantes do curso de Ciência da Computação / Engenharia de Software da Universidade Federal do Ceará. Agradecemos à **Sorveteria Sabor do Sertão** pela disponibilidade e colaboração no fornecimento dos requisitos de negócio.
