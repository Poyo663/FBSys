# 🍦 FBSys — Sistema de Gestão e Pedidos para Sorveteria Frut Bom

> **Projeto de Extensão Acadêmica**  
> **Disciplina:** Desenvolvimento Web  
> **Instituição:** Universidade Federal do Ceará (UFC)  
> **Equipe:** Jefferson de Azevedo Maciel,   

---

## 📌 1. Registro do Contato Comunitário

Como parte das diretrizes de extensão universitária, a equipe realizou uma visita presencial para identificar demandas reais na comunidade comercial local.

* **Comércio Parceiro:** Sorveteria Frut Bom 
* **Localização:** Centro, Cascavel - CE
* **Contato/Responsável:** Maria Adriana (Proprietária)
* **Data da Visita/Reunião:** 26 de Outubro de 2026
* **Resumo do Encontro:** Conversamos com a proprietária para compreender a rotina operacional da sorveteria, o fluxo de caixa, as maiores dificuldades no atendimento em horários de alta demanda e como é feita a tomada de decisão sobre estoque e sabores.

---

## 🔍 2. Diagnóstico do Problema

Durante o mapeamento com o parceiro comunitário e a observação direta do estabelecimento, identificamos os seguintes gargalos:

1. **Gargalo em Horários de Pico:** Nos fins de semana, períodos noturnos e eventos próximos ao Centro, o fluxo de clientes aumenta drasticamente. O atendimento via conversa com o cliente não é efetivo, acontece o acúmulo de clientes dentro da sorveteria.
2. **Falta de Previsibilidade de Estoque:** O comerciante não possui registro estruturado de quais sabores e acompanhamentos têm maior saída em determinados dias ou horários, resultando na falta de insumos populares e desperdício de itens de baixa rotatividade.
3. **Ausência de Histórico de Consumo:** Não há acompanhamento das preferências e frequência dos clientes, impossibilitando ações de fidelização ou promoções direcionadas.

---

## 🎯 3. Objetivos do Projeto

### Objetivo Geral
Desenvolver e implantar uma aplicação web voltada para a sorveteria Frut Bom, otimizando o fluxo de atendimento nos horários de pico e fornecendo relatórios analíticos sobre o comportamento de consumo dos clientes.

### Objetivos Específicos
* **Reduzir o congestionamento de clientes** no espaço da sorveteria de modo perceptível.
* **Criar um painel operacional (KDS/Balcão)** para acompanhamento e atualização de status dos pedidos em tempo real.
* **Disponibilizar um módulo de *Analytics*** com gráficos intuitivos para que o gestor tome decisões baseadas em dados (sabores mais vendidos, horários de pico, faturamento).
---

## 📋 4. Requisitos do Sistema

### 🔐 Requisitos Funcionais (RF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RF01** | O sistema deve permitir a gestão (CRUD) de produtos, categorias, sabores, tamanhos e adicionais. | **Alta** |
| **RF02** | O atendente/cliente deve conseguir registrar pedidos selecionando combinações de sorvetes e adicionais. | **Alta** |
| **RF03** | O sistema deve exibir uma tela de acompanhamento de pedidos em tempo real para o balcão (*Recebido*, *Em Preparo*, *Pronto*, *Entregue*). | **Alta** |
| **RF04** | O sistema deve permitir marcar itens/sabores como "indisponíveis" para atualização imediata no menu. | **Média** |
| **RF05** | O sistema deve gerar relatórios analíticos de vendas por período, sabores mais populares e horários de maior movimento. | **Média** |
| **RF06** | O sistema deve permitir o cadastro simplificado de clientes para identificação de perfil e frequência. | **Baixa** |

---

### 🛡️ Requisitos Não Funcionais (RNF)

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RNF01** | **Responsividade:** A interface deve adaptar-se perfeitamente a dispositivos móveis, tablets e desktops. | **Alta** |
| **RNF02** | **Usabilidade:** A tela do balcão deve permitir a criação de um pedido em no máximo 3 telas. | **Alta** |
| **RNF03** | **Desempenho:** As atualizações na fila de pedidos em tempo real devem ter latência inferior a 2 segundos. | **Média** |
| **RNF04** | **Disponibilidade:** A aplicação deve ser acessível via navegador web sem necessidade de instalação local complexa. | **Alta** |

---

## 💡 5. Proposta de Solução

A solução proposta é o **FBSys**, uma aplicação web responsiva composta por três pilares fundamentais:

# FBSYS
| Módulo | Descrição |
| :----: | :---------: |
| Módulo Balcão / Cliente | Registro rápido do pedido     |
| Módulo 'Cozinha' (KDS)    | Fila dinâmica e status ao vivo|
| Módulo Gestor/Analytics | Gráficos de hábitos e estoque |

1. **Terminal de Atendimento Rápido:** Interface focada na velocidade, permitindo que o atendente Monte o copo/casquinha com adicionais de forma simples e direta no tablet/PC do balcão.
2. **Painel Dinâmico do Balcão:** Substitui as fichas de papel por um Kanban digital que destaca pedidos atrasados e organiza a ordem de preparo.
3. **Dashboard de Inteligência Comercial:** Painel exclusivo do administrador que consolida os dados de vendas, permitindo identificar padrões (ex: *"Sábado à noite o sorvete de Ninho com Nutella responde por 40% das vendas"*).

---

## 🛠️ Tecnologias Pretendidas

* **Front-end:** HTML5, CSS3, JavaScript 
* **Back-end:** Node.js / Express
* **Banco de Dados:** PostgreSQL 
* **Controle de Versão:** Git & GitHub

---

## 👥 Autores e Agradecimentos

Projeto desenvolvido pelos estudantes do curso de Ciência da Computação / Sistemas da Informação da Universidade Federal do Ceará. Agradecemos à **Sorveteria Frut Bom** pela disponibilidade e colaboração no fornecimento dos requisitos de negócio.
