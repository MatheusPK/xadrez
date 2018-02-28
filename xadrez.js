class Peca {
    constructor(tipo, cor, img) {
        this.tipo = tipo;
        this.cor = cor;
        this.img = img;
        this.xy = [];
        this.Nmovimentos = 0;
    }

    posicao(tabuleiro){
       var coordenadas = [];
       for(var  i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            if(this === tabuleiro[i][j]) coordenadas.push(i, j);
        }
       }
       this.xy = [coordenadas[0], coordenadas[1]];
    }

    movimento(tabuleiro) {
        this.posicao(tabuleiro);
        var movimentos = [];
        var x = this.xy[0];
        var y = this.xy[1];
        if(this.tipo === "torre" || this.tipo === "rainha") {
            for(var i = x + 1; i < 8; i++) { 
                if(tabuleiro[i][y] != "") {
                    movimentos.push([i, y]);
                    break;
                }
                movimentos.push([i, y]);
            }
            for(var i = x - 1; i >= 0; i--) {
                if(tabuleiro[i][y] != "") {
                    movimentos.push([i, y]);
                    break;
                }
                movimentos.push([i, y]);
            }
            for(var i = y + 1; i < 8; i++) {
                if(tabuleiro[x][i] != "") {
                    movimentos.push([x, i]);
                    break;
                }
                movimentos.push([x, i]);
            }
            for(var i = y - 1; i >= 0; i--) {
                if(tabuleiro[x][i] != "") {
                    movimentos.push([x, i]);
                    break;
                }
                movimentos.push([x, i]);
            }
        }
        if(this.tipo === "cavalo") {
            movimentos.push([x - 2, y + 1]);
            movimentos.push([x - 2, y - 1]);
            movimentos.push([x - 1, y - 2]);
            movimentos.push([x - 1, y + 2]);
            movimentos.push([x + 2, y - 1]);
            movimentos.push([x + 2, y + 1]);
            movimentos.push([x + 1, y + 2]);
            movimentos.push([x  + 1, y - 2]);
            for(var i = 0; i < movimentos.length; i++) {
                if(movimentos[i][0] < 0 || movimentos[i][1] < 0 || movimentos[i][0] > 7 || movimentos[i][1] > 7) {
                    movimentos.splice(i, 1);
                    i--;
                }
            }
        }
        if(this.tipo === "peão") {
            if(this.Nmovimentos === 0  && tabuleiro[x - 2][y] === "") movimentos.push([x - 2, y]);
            if(tabuleiro[x - 1][y] === "") movimentos.push([x - 1, y]);
            if(tabuleiro[x - 1][y + 1] != "" && tabuleiro[x - 1][y + 1] != null) movimentos.push([x - 1, y + 1]);
            if(tabuleiro[x - 1][y - 1] != "" && tabuleiro[x - 1][y - 1] != null) movimentos.push([x - 1, y - 1]);
        }
        if(this.tipo === "bispo" || this.tipo === "rainha") {
            var i = 1, j = 1, z = 1, n = 1, k = 1, l = 1, o = 1, p = 1;
            while(x - i >= 0 && y + j <= 7) {
                if(tabuleiro[x - i][y + j] != "") {
                    movimentos.push([x - i, y + j]);
                    break;
                }
                movimentos.push([x - i, y + j]);
                i++;
                j++;
            }
            while(x - z >= 0 && y - n >= 0) {
                if(tabuleiro[x - z][y - n] != "") {
                    movimentos.push([x - z, y - n]);
                    break;
                }
                movimentos.push([x - z, y - n]);
                z++;
                n++;
            }
            while(x + k <= 7 && y + l <= 7) {
                if(tabuleiro[x + k][ y + l] != "") {
                    movimentos.push([x + k, y + l]);
                    break;
                }
                movimentos.push([x + k, y + l]);
                k++;
                l++;
            }
            while(x + o <= 7 && y - p >= 0) {
                if(tabuleiro[x + o][y - p] != "") {
                    movimentos.push([x + o, y - p]);
                    break;
                }
                movimentos.push([x + o, y - p]);
                o++;
                p++;
            }
        }
        if(this.tipo === "rei") {
            movimentos.push([x - 1, y]);
            movimentos.push([x - 1, y + 1]);
            movimentos.push([x - 1, y - 1]);
            movimentos.push([x, y + 1]);
            movimentos.push([x, y - 1]);
            movimentos.push([x + 1, y]);
            movimentos.push([x + 1, y + 1]);
            movimentos.push([x + 1, y - 1]);
            for(var i = 0; i < movimentos.length; i++) {
                if(movimentos[i][0] < 0 || movimentos[i][1] < 0 || movimentos[i][0] > 7 || movimentos[i][1] > 7) {
                    movimentos.splice(i, 1);
                    i--;
                }
            }
        }
        for(var i = 0; i < movimentos.length; i++) {
            if(tabuleiro[movimentos[i][0]][movimentos[i][1]] != "" && tabuleiro[movimentos[i][0]][movimentos[i][1]].cor === this.cor) {
                movimentos.splice(i, 1);
                    i--;
            }
        }
        this.movimentos = movimentos;
    }

    mover(tabuleiro) {
        this.movimento(tabuleiro);
        var peca = this;
        for(var i = 0; i < this.movimentos.length; i++){
            $("." + this.movimentos[i][0]).children().eq(this.movimentos[i][1]).children().css({'background-color' : 'aquamarine'}).attr("onclick", "").click(function(){
                tabuleiro[peca.xy[0]][peca.xy[1]] = "";
                var newXY = $(this).parent().attr('id');
                newXY = newXY.split("-");
                tabuleiro[newXY[0]][newXY[1]] = peca;
                peca.Nmovimentos++;
                desenharTabuleiro(tabuleiro);
            });
        }
    }
}

function criarTabuleiro() {
    var tabuleiro = [];
    for(var  i = 0; i < 8; i++) {
        tabuleiro[i] = [];
        for(var j = 0; j < 8; j++) {
            tabuleiro[i].push("");
        }
    }
    return tabuleiro;
}

function inverterTabuleiro(tabuleiro) {
    for(var i = 0; i < 8; i++){
      tabuleiro[i].reverse();
    }
    tabuleiro.reverse();
    return tabuleiro;
}

function posicionarPecas(tabuleiro) {
    var peaoB1 = new Peca("peão", "branco", "♙");
    var peaoB2 = new Peca("peão", "branco", "♙");
    var peaoB3 = new Peca("peão", "branco", "♙");
    var peaoB4 = new Peca("peão", "branco", "♙");
    var peaoB5 = new Peca("peão", "branco", "♙");
    var peaoB6 = new Peca("peão", "branco", "♙");
    var peaoB7 = new Peca("peão", "branco", "♙");
    var peaoB8 = new Peca("peão", "branco", "♙");
    var torreB1 = new Peca("torre", "branco", "♖");
    var torreB2 = new Peca("torre", "branco", "♖");
    var cavaloB1 = new Peca("cavalo", "branco", "♘");
    var cavaloB2 = new Peca("cavalo", "branco", "♘");
    var bispoB1 = new Peca("bispo", "branco", "♗");
    var bispoB2 = new Peca("bispo", "branco", "♗");
    var rainhaB = new Peca("rainha", "branco", "♕");
    var reiB = new Peca("rei", "branco", "♔");
    var peaoP1 = new Peca("peão", "preto", "♟");
    var peaoP2 = new Peca("peão", "preto", "♟");
    var peaoP3 = new Peca("peão", "preto", "♟");
    var peaoP4 = new Peca("peão", "preto", "♟");
    var peaoP5 = new Peca("peão", "preto", "♟");
    var peaoP6 = new Peca("peão", "preto", "♟");
    var peaoP7 = new Peca("peão", "preto", "♟");
    var peaoP8 = new Peca("peão", "preto", "♟");
    var torreP1 = new Peca("torre", "preto", "♜");
    var torreP2 = new Peca("torre", "preto", "♜");
    var cavaloP1 = new Peca("cavalo", "preto", "♞");
    var cavaloP2 = new Peca("cavalo", "preto", "♞");
    var bispoP1 = new Peca("bispo", "preto", "♝");
    var bispoP2 = new Peca("bispo", "preto", "♝");
    var rainhaP = new Peca("rainha", "preto", "♛");
    var reiP = new Peca("rei", "preto", "♚");
    var pecasB = [[torreB1, cavaloB1, bispoB1, rainhaB, reiB, bispoB2, cavaloB2, torreB2], [peaoB1, peaoB2, peaoB3, peaoB4, peaoB5, peaoB6, peaoB7, peaoB8]];
    var pecasP = [[peaoP1, peaoP2, peaoP3, peaoP4, peaoP5, peaoP6, peaoP7, peaoP8], [torreP1, cavaloP1, bispoP1, rainhaP, reiP, bispoP2, cavaloP2, torreP2]];
    for(var i = 1; i >= 0 ; i--) {
        for(var j = 0; j < 8; j++) {
            tabuleiro[i][j] = pecasB[i][j];
        }
    }
    var m = 0;
    for(var z = 6; z < 8; z++) {
        for(var n = 0; n < 8; n++) {
            tabuleiro[z][n] = pecasP[m][n];
        }
        m++;
    }
}

function desenharTabuleiro(tabuleiro) {
    var count = 1;
    $("body").html('<table id="tabuleiro" cellspacing="0" cellpadding="0"></table>');
    for(var i = 0; i < 8; i++){
        var linha = "<tr class = '" + i + "'></tr>";
        $("#tabuleiro").append(linha);
        count++;
        for(var j = 0; j < 8; j++){
            var imgPeca = tabuleiro[i][j];
            imgPeca === "" ? imgPeca = "" : imgPeca = tabuleiro[i][j].img;
            var cor;
            count % 2 === 0 ? cor = "white" : cor = "black";
            count++;
            var coluna = "<td id = '" + i +  "-" + j + "'><div id = '" + cor + "' onclick = 'acao(this)'>" + imgPeca + "</div></td>";
            $("." + i).append(coluna);
        }
    }
}

function acao(elemento) {
        desenharTabuleiro(tabuleiro);
        var xy = $(elemento).parent().attr('id');
        xy = xy.split("-");
        if(tabuleiro[xy[0]][xy[1]] != "") {
            tabuleiro[xy[0]][xy[1]].mover(tabuleiro);
        }
}

var tabuleiro = criarTabuleiro();
posicionarPecas(tabuleiro);

