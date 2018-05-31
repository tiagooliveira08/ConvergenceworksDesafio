# convergenceWorks Desafio

![gif-01.gif](gifs/gif-01.gif)






Esse projetinho foi um desafio da convergenceWorks em que aprendi bastante coisa mesmooooo e tive algumas dificuldades superadas ao longo
do projeto.





----
![gif-02.gif](gifs/gif-02.gif)

## Falando um pouco sobre os desafios superados.

1. Bom, tive alguns problemas com os efeitos fadeIn e fadeOut no jquery devido às requisições get serem mais rápidas que o fade diante disso
gerava alguns bugs em que os gif loader não funcionava da forma que deveria.
- Solução -> deixei o fadeOut com 0 de paramentro, praticamento inperceptivel, e lembrando que passando callback não resolveria meu problema.

2. Outro probleminha chato que tive ao desenvolver foi um erro ate então desconhecido para mim, ao fazer requisição com a API ela me retor
nava uma data com um dia atrasado, fiquei bastante tempo tentando descobrir tal motivo grrrrr, mas no final das contas o erro estava no fuso
horário haha, a API não estava retornando o fuso horário de brasília e sim de outro local com 3 horas de atraso :3.
- Solução -> adição do metodo que retorna o dia da semana com o hórario universal  getUTCDay()

3. Mais um desafio que superei foi no jQuery, eu precisava remover e depois adicionar uma div com eventos entrelaçados e não sabia
que o método 'Remove' do jquery removia os eventos javascript lol, fiquei um tempinho tentando achar o motivo do evento não estar
funcionado hahaha até ir no jquery e ler a documentação do remove :D
- Solução -> usei o método detach()

4. Ultimo desafio foi no meu aprendizado com gulp haha, cuidado ao não declarar uma variável e ainda assim usar e  ter que 
minificar com o uglify que vai da erro, provavelmente ao minificar ela desconsidera aquela variável por não esta declarada.

![gif-03.gif](gifs/gif-03.gif)


# O que eu aprendi com esse desafio.

Acho que de longe foi o desafio que me fez desafiar a mim mesmo de diversas formas.

1. - Tive que apreder jQuery - Sabia apenas o basicão -> mas ainda tenho que encontrar a solução das requisições get - bom usei o encadeamento
de requisições , mas a minha ideia era usar promisses porem não obtive sucesso, tentei usar o metodo jQuery.when mas não supriu minhas necessidades.

2. - `BEM CSS`, Era algo que ate então era desconhecido para mim, apenas tinha ouvido falar mas não conhecia a sua importância,
BEM tem seus pros e contras um dos pros é que te ajuda na organização do codigo css já que você bate o olho e já sabe o que é aquele css, 
e um dos contra é que o css acaba ficando bem extenso :d.

3. - `GULP`, cara ele é sensacional putz me arrependo de não ter conhecido antes, imagina quantas requisições get eu poderia ter evitado na
API ao apertar F5 so pra mudar o css, a sintaxe e bem razoavel diferente do webpack que grrrr e triste.

4. - e por ultimo comecei a da valor para a acessibilidade e otimização no front-end, algo que eu realmente não me importava.


# Considerações finais.

Irei finalizar o desafio por aqui 19/02/2018 as 02:36 da matina mas ainda considero implementar mais algumas funções que tenho em mente.
como sistema de usuário e localStorage, Desafio Finalized;;;;;;;;;;;;;


![gif-04.gif](gifs/gif-04.gif)

# Ahhhhhh;

para acessar o projeto [clique Aqui](https://cdn.rawgit.com/xeromole/convergenceworks-desafio/master/public/index.html)






