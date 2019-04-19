# Library_ABZ

Caso de algum erro ao executar relacionado ao express ou mysql nao existir, use:

 * npm i express -g
 * npm i mysql
 * npm i



 * Para rodar o projeto use nodemon app.js
 
 **Guia da API**
 
 * Livros
 
 https://documenter.getpostman.com/view/7173958/S1EJY23N
 
 https://www.getpostman.com/collections/2a146620ef3530ff8523
 
 * Usuários
 
 https://documenter.getpostman.com/view/7173958/S1ETRGK2
 
 https://www.getpostman.com/collections/00a2aea99f15c91411eb
 
 * Estantes
 
 https://documenter.getpostman.com/view/7173958/S1ETQwWx
 
 https://www.getpostman.com/collections/da3ac956f143dc042151
 
 
 **Últimas alterações:**
 
 * Criado CRUD para Estante
 
 https://www.getpostman.com/collections/da3ac956f143dc042151
 
 **Pontos a revisar:**
 
 Usuário tera somente uma estante?
 Atualmente o método delete de estantes apaga as estantes do usuário, isso fará apagar todas as estantes se o mesmo tiver mais de uma. Outro ponto, é que tem que arrumar o método de apagar estantes para caso a mesma tenha dependências como Livros, por exemplo.
