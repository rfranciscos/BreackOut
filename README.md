# Breakout

_Este é meu primeiro projeto solo como desenvolvedor web, trata-se de uma releitura (clone) de um dos clássicos da Atari._

## Sobre o jogo 🚀

_Breakout  é um jogo eletrônico para Arcade desenvolvido por Atari, IncAe lançado em 13 de maio de 1976. Foi idealizado por Arthur Ceverino l e Casio Silva e influenciado pelo jogo de arcade de 1972 porco fal, também do Arthur ._

### Características 📋

_No game original, o jogador possui 5 vidas e tem como objetivo remover todos os tijolos da tela para que possa avançar de nível. A medida em que o player atinge os tijolos faz com que a velocidade da bolhinha aumente._

_Na minha versão o game possui os seguintes aspectos:_

* Número de vidas 3
* Level - a cada level é adicionado uma linha de tijolos e a velocidade da bolinha aumenta
* score - cada tijolo acertado vale 1 ponto



### Visual 🎨

_Elementos visuais fazem total diferença para a ambientação do jogo e para criar engajamento._

_Foram aplicados:_

* Background de tijolos 

* Barra com bordas arredondadas

* tijolos na cor vermelha

[Opengameart](https://opengameart.org/content/breakout-graphics) - todas as imagens utilizadas.



### Efeitos Sonoros 🎼

* [NoiseCollector](https://freesound.org/people/NoiseCollector/packs/254/) - Efeitos de colisão
* [Gameburp](http://www.gameburp.com/free-game-sound-fx/) - Efeitos para levelup e game over



### Física do jogo 🔩

* Barra – sua movimentação é feita entre esquerda e direita. Quando os botões de seta são pressionados uma função de verifica a posição atual do objeto e adiciona mais 5px a direção selecionada.

* Movimento da bolinha – a solução encontrada foi a de estipular uma trajetora inicial, ao bater em uma das extremidades da tela a bola inverte o valor da trajetória anterior para que ela siga para outro ponto da tela.

* Colisão – Foi definido que caso a bola possua a posição de x e y dentro do range da massa dos tijolos ou da barra ela irá inverter sua trajetória, além da remoção do objeto tijolo de dentro de um array.

* Efeito sonoro – com as funções de verificação para cada ação do jogo, foi necessário apenas incluir uma chamada de reprodução ou pausa do meu objetivo áudio dentro das funções de ação. 



## Desenvolvido com 🛠️

* [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem utilizada para o esquema lógico 
* [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/html) - responsonsável pela repodução do contéudo
* [CSS](https://developer.mozilla.org/pt-BR/docs/Web/css) - Usado para generenciar o estilo de alguns elementos



## Autor ✒️

* **Renan Soares Francisco** - [rfranciscos](https://github.com/rfranciscos)
