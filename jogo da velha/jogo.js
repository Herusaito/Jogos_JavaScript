var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){

	//Iniciar Jogo
	$('#play').click(function(){
		//validar nomes
		if ($('#name_player1').val() == '') {
			alert('Nome do Jogador 1 não foi preencido');
			return false;
		}
		if ($('#name_player2').val() == '') {
			alert('Nome do Jogador 2 não foi preencido');
			return false;
		}

		//exibir nomes
		$('#nome_jogador1').html($('#name_player1').val());
		$('#nome_jogador2').html($('#name_player2').val());

		//mudar tela
		$('#pg_inicial').hide();
		$('#jogo').show();

	});

	//Jogadas
	$('.jogada').click(function(){

		var campo_clicado = this.id;
		$('#'+campo_clicado).off();
		jogadas(campo_clicado);

	});

	function jogadas(id){
		var icone = '';
		var ponto = 0;

		if ((rodada % 2) == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		} else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}

		rodada++;
		$('#'+id).css('background-image', icone);

		//separa a string ex: usa o - de A-1 para separar A[0] de 1[1]
		//split trunca uma cadeia de caracteres transformando elas em array
		//var linha_coluna = id.split('-'); = array = *LINHA linha_coluna[0]  *COLUNA linha_coluna[1]
		var linha_coluna = id.split('-');
		//salva o ponto(1 ou -1) no campos que forem clicados
		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
		verifica_combinacao();
	}

	function verifica_combinacao(){
		//verifica horizontal A
		var pontos = 0;
		for(var i = 1; i<=3; i++){
			//busca no campo o ponto referente ao jogador (1 ou -1) 
			// e soma com o proximo campo clicado se for igual ex: A1 contem -1 e A2 contem -1 = ponto -2
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);

		//verifica horizontal B
		pontos = 0;
		for(var i = 1; i<=3; i++){			
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		//verifica horizontal C
		pontos = 0;
		for(var i = 1; i<=3; i++){			
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);

		//verifica vertical 		
		for(var l = 1; l<=3; l++){
			pontos = 0;			
			pontos =+ matriz_jogo['a'][l]; //ex: A2 = 1ponto = 1
			pontos =+ matriz_jogo['b'][l]; //ex: B2 = 1ponto = 2
			pontos =+ matriz_jogo['c'][l]; //ex: C2 = 1ponto = 3
			ganhador(pontos);
		}	

		//verificar diagonal		
		pontos = 0;				
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;				
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];		
		ganhador(pontos);

	}

	function ganhador(pontos){
		if(pontos == -3){
			var jogador_1 = $('#name_player1').val();
			alert(jogador_1 + ' é o vencedor');
			$('.jogada').off();

		} else if(pontos == 3){
			var jogador_2 = $('#name_player2').val();
			alert(jogador_2 + ' é o vencedor');
			$('.jogada').off();
		}

	}

});