class Jogo {
    constructor() {}
    //pegar estado de jogo
    getState() {
        var estadoJogo = database.ref("estadoJogo");
        estadoJogo.on("value", function (data) {
            estadoJogo = data.val();
        });
    }

    //atualizar estado de jogo
    update(estado) {
        database.ref('/').update({
            estadoJogo: estado
        });
        estadoJogo = estado;
    }
    //iniciar o jogo
    //transformar em função assíncrona e adicionar o ouvinte assíncrono .once() é opcional e evita o bug de clicar muito rápido e ainda não ter buscado o valor de numJogadores
    async start() {
        if (estadoJogo === 0) {
            jogador = new Jogador();
            var refNumJogadores = await database.ref('numJogadores').once("value");
            if (refNumJogadores.exists()){
                numJogadores = refNumJogadores.val();
                jogador.getCount();
            }
            form = new Form();
            form.display();
        }
        Carro1 = createSprite(400, displayHeight/2);
        Carro1.addImage("Car1", Car1);
        Carro2 = createSprite(600, displayHeight/2);
        Carro2.addImage("Car2", Car2);
        Carro3 = createSprite(800, displayHeight/2);
        Carro3.addImage("Car3", Car3);
        Carro4 = createSprite(1000, displayHeight/2);
        Carro4.addImage("Car4", Car4);
        Carros = [Carro1, Carro2, Carro3, Carro4];
    }

    //novo
    //estado de jogo jogar
    jogar() {
        drawSprites();
        form.esconder();
        Jogador.getInfoJogadores();

        if (todosJogadores !== undefined) {
            var indice = 0;
            var X = 200;
            var Y;

            image(Track, 0, -displayHeight*4, displayWidth, displayHeight*5);
            
            // deixar o texto do jogador atual vermelho
            for (var i in todosJogadores) {
               indice += 1;
               X += 200;
               Y = displayHeight/2-todosJogadores[i].distancia;
               Carros[indice-1].x = X;
               Carros[indice-1].y = Y;
               if (indice === jogador.indice){
                camera.position.x = displayWidth/2;
                camera.position.y = Carros[indice-1].y;
                Carros[indice-1].shapeColor = 'red';
               }
            }
        }

        if (keyDown(UP_ARROW) && jogador.indice !== null) {
            jogador.distancia += 50;
            jogador.update();
        }
        if (jogador.distancia > 3860) {
            estadoJogo = 2;
        }
    }
}