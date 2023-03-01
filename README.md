
# AutoPark 
[![GitHub issues](https://img.shields.io/github/issues/le0henr1que/desafio-verzel-Back-end.svg)](https://github.com/le0henr1que/desafio-verzel-Back-end/issues)
[![GitHub forks](https://img.shields.io/github/forks/sle0henr1que/desafio-verzel-Back-end.svg)](https://github.com/le0henr1que/desafio-verzel-Back-end/network)

Este é um projeto que visa fornecer uma API RESTful para gerenciamento de anúncios de veículos. Com ele, é possível criar, ler, atualizar e excluir anúncios de veículos, fornecendo informações como modelo, marca, ano, preço e imagem do veículo.

A API foi construída usando Node.js com Express e armazenamento de dados MongoDB. Também foi utilizado o Mongoose, uma biblioteca de modelagem de objetos MongoDB para Node.js, para facilitar a interação com o banco de dados.

Possui dois tipos de usuários distintos, administrador e anunciante, cada um com seus próprios privilégios e responsabilidades. O administrador tem a capacidade de editar e excluir anúncios de veículos, enquanto o anunciante pode criar e gerenciar seus próprios anúncios.

Além de Possui um sistema de notificação por email entre anunciante e pessoa com interesse.

## 🚀 Começando

Para obter uma copia do projeto para execução basta seguir as etapas:

Clonar repositorio:

```
git clone https://github.com/le0henr1que/Verzel-Front-End.git
```
## 📋 Documentação

A documentação da API está disponível em http://localhost:5000/api/docs , Ela fornece informações detalhadas sobre as rotas disponíveis e os parâmetros de entrada e saída de cada rota.

Acesso para teste da área ADM:

* Login: `admin@admin.com`
* Password: `admin123`


### 📋 Pré-requisitos

Para execução do projeto é preciso:

* Gerenciador de pacotes;
* Node JS

### 🔧 Execução

Para executar o projeto basta seguir as etapas:


### Instalação das Dependências run:

```
npm i
```



## Buildar aplicação:
```
yarn build:dev
```

Iniciar a aplicação:

```
yarn dev
```

## 🏃 Acessos

* Para Acessar Vitrine de Veiculos:

![image](https://user-images.githubusercontent.com/68018921/199551931-47ce6ea0-e90c-4554-ba65-c2b8a6ed5ef1.png)
![image](https://user-images.githubusercontent.com/68018921/216786851-893492cd-9898-4934-90e7-02ddd79c4c55.png)


* Para Acessar área de login ADM:

![image](https://user-images.githubusercontent.com/68018921/199550731-b402cf04-3724-4acb-8b11-650f94933c8a.png)
![image](https://user-images.githubusercontent.com/68018921/216786102-b85eac9f-4a07-491f-8ac0-8e8e82868056.png)
Acesso para teste da área ADM:

* Login: `admin@admin.com`
* Password: `admin123`


* Filtro e contagem:

![image](https://user-images.githubusercontent.com/68018921/199551344-1425b2c1-dcc4-46fc-88c3-a12f77c97661.png)
![image](https://user-images.githubusercontent.com/68018921/216786869-acc55adb-4061-4c1f-83fc-e6358f0b0255.png)
![image](https://user-images.githubusercontent.com/68018921/216786885-316c9972-67e0-45f2-87ec-321cf34c4d08.png)

* Tela ADM

![image](https://user-images.githubusercontent.com/68018921/216786957-0458ac8a-163c-4a50-a120-f8e690203df3.png)

* Tela de Cadastro

![image](https://user-images.githubusercontent.com/68018921/216786984-b5407a5a-50cb-4959-92cc-2c5468289fe3.png)

## 📄 Notas

 ### interações Obrigatorias:
  
  * 🟩 Sistema de Login;
  * 🟩 Cadastro de veiculos;
  * 🟩 Update de veiculos;
  * 🟩 Cadastro de imagem do veiuclo (Firefox) no Google Chrome não está cadastrando;
  * 🟩 Uodate de imagem (firefox e crhome);
  * 🟩 Deleção de veiculos;
  * 🟩 Listagem de veiculos;
  * 🟩 Sistema de permissão para CRUD em veiculos;
  * 🟩 Listagem por ordem de preço;
  * 🟩 Logout;
  
 ### PLUS++ (interações não obrigatórias): 
 
  * 🟩 Botão Home e comprar carro;
  * 🟩 Input search de Pesquisar veiculo;
  * 🟩 Accordon lateral (sem filtro);
  * 🟩 Filtros laterais;
  * 🟩 Paginação;
  * 🟩 Pilula de filtro;
  * 🟩 Classificar do maior para o menor preço pelo filtro de veiculos;
  * 🟩 Botões Header (Vender Carro, App Auto Car, Sobre nós);
  * 🟩 Avalie Carro conosco;
  * 🟩 Detalhes do veiculos;





