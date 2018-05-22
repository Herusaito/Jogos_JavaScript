var quantBalao = 70
var timer = null;

function iniciaJogo(){ //selecionar lv de dificuldade
	var lvJogo = document.getElementById('nivel-jogo').value;
	window.location.href = 'jogo.html?'+lvJogo;
}

function startGame(){
	var ulr = window.location.search;
	var nivJogo = ulr.replace("?", "");
	var tempo = 0;

	if (nivJogo == 1) {
		tempo = 120;
	}

	if (nivJogo == 2) {
		tempo = 60;
	}

	if (nivJogo == 3) {
		tempo = 30;
	}
	//inserir segundos no span
	document.getElementById('cronometro').innerHTML = tempo;

	criaBalao(quantBalao);

	document.getElementById('balaoInteiro').innerHTML = quantBalao;
	document.getElementById('balaoEstourado').innerHTML = 0;

	contTempo(tempo + 1);
}

function criaBalao(quantBalao) {
	for (var i = 1; i <= quantBalao; i++) {
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '12px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this); }	
		document.getElementById('cenario').appendChild(balao);
	}
}

function contTempo(time) {
	time = time - 1;
	if (time == -1) {
		clearTimeout(timer);//para a execução da função settimeout
		gameOver();
		return false;
	}
	document.getElementById('cronometro').innerHTML= time;
	timer = setTimeout("contTempo("+time+")",1000);
}

function gameOver() {
	remove_eventos_baloes();
	pararJogo();
	alert('Fim de Jogo');
}

function estourar(pow){
	var idBalao = pow.id;
	document.getElementById(idBalao).setAttribute("onclick","");
	document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao){
	var bInteiro = document.getElementById('balaoInteiro').innerHTML;
	var bEstourado = document.getElementById('balaoEstourado').innerHTML;

	bInteiro = parseInt(bInteiro);
	bEstourado = parseInt(bEstourado);

	bInteiro = bInteiro + acao;
	bEstourado = bEstourado - acao;
	document.getElementById('balaoInteiro').innerHTML = bInteiro;
	document.getElementById('balaoEstourado').innerHTML = bEstourado;
	fimJogo(bInteiro);
}

function fimJogo(balaoInteiro) {
	if (balaoInteiro == 0) {
		alert('Parabéns, você conseguiu estourar todos os balões')
		pararJogo();
	}
}

function pararJogo() {
	clearTimeout(timer);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id    
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}