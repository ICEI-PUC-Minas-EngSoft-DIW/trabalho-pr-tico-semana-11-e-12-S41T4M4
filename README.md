# Trabalho Prático 06 - Semanas 11 e 12

Nessa etapa, você irá evoluir o projeto anterior e montando um ambiente de desenvolvimento mais completo, típico de projetos profissionais. Nesse processo, vamos utilizar um **servidor backend simulado** com o JSON Server que fornece uma APIs RESTful a partir de um arquivo JSON.

Para esse projeto, além de mudarmos o JSON para o JSON Server, vamos permitir o cadastro e alteração de dados da entidade principal (CRUD).

## Informações do trabalho

- Nome: Vitor Ibraim
- Matricula: 903881
- Proposta de projeto escolhida: Cadastro de Personalidades Históricas
- Breve descrição sobre seu projeto: Sistema web completo com CRUD (Create, Read, Update, Delete) para cadastro e gerenciamento de personalidades históricas, utilizando JSON Server como backend simulado e API Fetch para comunicação assíncrona.

## Estrutura de Dados

A aplicação utiliza a entidade **personalidades** com a seguinte estrutura:

```json
{
  "personalidades": [
    {
      "id": "string (UUID)",
      "nome": "string",
      "nascimento": "string (YYYY-MM-DD)",
      "falecimento": "string (YYYY-MM-DD) ou null",
      "nacionalidade": "string",
      "profissao": "string",
      "contribuicao": "string",
      "imagem": "string (URL) ou null"
    }
  ]
}
```

### Campos da Entidade Personalidades

- **id**: Identificador único da personalidade (UUID gerado automaticamente)
- **nome**: Nome completo da personalidade histórica
- **nascimento**: Data de nascimento no formato YYYY-MM-DD
- **falecimento**: Data de falecimento no formato YYYY-MM-DD (opcional)
- **nacionalidade**: Nacionalidade da personalidade
- **profissao**: Profissão ou ocupação principal
- **contribuicao**: Descrição da contribuição histórica da personalidade
- **imagem**: URL da imagem da personalidade (opcional)

### Exemplo de Dados

O arquivo `db.json` atualmente contém 3 personalidades históricas de exemplo:
1. Albert Einstein - Físico alemão
2. Marie Curie - Física e química polonesa
3. Leonardo da Vinci - Artista e inventor italiano

## Prints Solicitados

**Print dos testes da API com Postman ou similar**

<< COLOQUE A IMAGEM GET AQUI >>

Para testar GET: Faça uma requisição GET para `http://localhost:3000/personalidades`

<< COLOQUE A IMAGEM POST AQUI >>

Para testar POST: Faça uma requisição POST para `http://localhost:3000/personalidades` com body JSON contendo:
```json
{
  "nome": "Isaac Newton",
  "nascimento": "1643-01-04",
  "falecimento": "1727-03-31",
  "nacionalidade": "Inglês",
  "profissao": "Físico e Matemático",
  "contribuicao": "Desenvolveu a Lei da Gravitação Universal e as três leis do movimento",
  "imagem": "https://exemplo.com/newton.jpg"
}
```

<< COLOQUE A IMAGEM PUT AQUI >>

Para testar PUT: Faça uma requisição PUT para `http://localhost:3000/personalidades/{id}` com body JSON contendo os campos atualizados (incluindo o id)

<< COLOQUE A IMAGEM DELETE AQUI >>

Para testar DELETE: Faça uma requisição DELETE para `http://localhost:3000/personalidades/{id}`

**Print da aba NETWORK com requisições Fetch/XHR POST e GET**

<<  COLOQUE A IMAGEM AQUI >>

Para obter este print:
1. Abra o DevTools do navegador (F12)
2. Vá para a aba Network
3. Execute ações na aplicação (listar personalidades, cadastrar nova personalidade)
4. Filtre por XHR/Fetch
5. Tire o print mostrando as requisições GET e POST

## Funcionalidades Implementadas

### Página Inicial (index.html)
- Listagem de todas as personalidades cadastradas
- Cards visuais com informações principais de cada personalidade
- Preview da contribuição histórica
- Botão para ver detalhes de cada personalidade
- Navegação para página de cadastro

### Página de Detalhes (detalhes.html)
- Exibição completa das informações da personalidade
- Exibição da imagem da personalidade (se disponível)
- Formatação de datas em formato brasileiro
- Botão para editar a personalidade
- Botão para excluir a personalidade (com confirmação)
- Navegação de volta para listagem

### Página de Cadastro (cadastro_personalidades.html)
- Formulário para cadastrar nova personalidade
- Formulário para editar personalidade existente (modo edição)
- Campos para: nome, nascimento, falecimento, nacionalidade, profissão, contribuição e imagem
- Validação de campos no front-end:
  - Nome deve ter pelo menos 3 caracteres
  - Data de nascimento obrigatória
  - Validação de data de falecimento (não pode ser anterior à data de nascimento)
  - Contribuição deve ter pelo menos 10 caracteres
- Mensagens de sucesso e erro
- Redirecionamento após cadastro/edição

### Operações CRUD

- **Create (POST)**: Cadastro de novas personalidades através do formulário
- **Read (GET)**: Listagem de personalidades e visualização de detalhes
- **Update (PUT)**: Edição de personalidades existentes
- **Delete (DELETE)**: Exclusão de personalidades com confirmação

## **Orientações Gerais**

Nesse projeto você vai encontrar a seguinte estrutura base:

* **Pasta db**
  Essa pasta contem um único arquivo: `db.json`. Esse arquivo serve de banco de dados simulado e nele você deve colocar as estruturas de dados que o seu projeto manipula.
  * **OBS**: A estrutura de personalidades históricas foi criada para o projeto.
* **Pasta public**
  Nesta pasta você deve colocar todos os arquivos do seu site (front end). Aqui vão os arquivos HTML, CSS, JavaScript, imagens, vídeos e tudo o mais que precisar para a interface do usuário.
* **Arquivo README.md**
  Este arquivo em que são colocadas as informações de quem está desenvolvendo esse projeto e os registros solicitados no enunciado da tarefa.
* **Arquivo .gitignore**
  Configuração do que deve ser ignorado pelo git evitando que seja enviado para o servidor no GitHub.
* **Arquivo package.json**
  Considerado o manifesto do projeto ou arquivo de configuração. Nesle são incluídas as informações básicas sobre o projeto (descrição, versão, palavras-chave, licença, copyright), a lista de pacotes dos quais o projeto depende tanto para desenvolvimento quanto execução, uma lista de  do projeto, scripts entre outras opções.
  * **OBS**: Esse arquivo é criado assim que o projeto é iniciado por meio do comando `npm init`.
  * **OBS2**: Esse arquivo já traz a informação de necessidade do JSONServer.
* **Pasta node_modules**
  Local onde ficam os pacotes dos quais o projeto depende. Evite enviar essa pasta para o repositório remoto. Essa pasta é reconstruída toda vez que se executa o comando `npm install`.

**Ambiente de Desenvolvimento (IMPORTANTE)**

> A partir de agora, **NÃO utilizamos mais o LiveServer/FiveServer** durante o processo de desenvolvimento. O próprio JSONServer faz o papel de servidor.

Para iniciar o JSONServer e acessar os arquivos do seu site, siga os seguintes passos:

1. Abra a pasta do projeto dentro da sua IDE (por exemplo, Visual Studio Code)
2. Abra uma janela de teminal e certifique-se que a pasta do terminal é a pasta do projeto
3. Execute o comando `npm install`
   Isso vai reconstruir a pasta node_modules e instalar todos os pacotes necessários para o nosso ambiente de desenvolvimento (Ex: JSONServer).
4. Execute o comando `npm start`
   Isso vai executar o JSONServer e permitir que você consiga acessar o seu site no navegador.
5. Para testar o projeto:
   1. **Site Front End**: abra um navegador e acesse o seu site pela seguinte URL: 
      [http://localhost:3000](http://localhost:3000)
   2. **Site Back End**: abra o navegador e acesse as informações da estrutura de personalidades por meio da API REST do JSONServer a partir da seguinte URL: 
      [http://localhost:3000/personalidades](http://localhost:3000/personalidades)

Ao criar suas estruturas de dados no arquivo db.json, você poderá obter estes dados através do endereço: http://localhost:3000/SUA_ESTRUTURA, tal qual como foi feito com a estrutura de personalidades. **IMPORTANTE**: Ao editar o arquivo db.json, é necessário parar e reiniciar o JSONServer.

**IMPORTANTE:** Assim como informado anteriormente, capriche na etapa pois você vai precisar dessa parte para as próximas semanas. 

**IMPORTANTE:** Você deve trabalhar:

* na pasta **`public`,** para os arquivos de front end, mantendo os arquivos **`index.html`**, **`detalhes.html`**, **`styles.css`** e **`app.js`** com estes nomes, e
* na pasta **`db`**, com o arquivo `db.json`.

Deixe todos os demais arquivos e pastas desse repositório inalterados. **PRESTE MUITA ATENÇÃO NISSO.**
