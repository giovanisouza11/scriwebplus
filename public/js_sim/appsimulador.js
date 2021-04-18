//=====================================================================================
//Inicializa variaveis
//=====================================================================================
var Sim_Canvas;
var Sim_Context;
var Imagens =[];
var LoadedImages = 0;
var Extensao = ['','_off','_on1','_on2','3','4','5'];
var ArrayImagens = [];
var ArrayLabel = [];
var ArrayObjDinamic = [];
var ArrayObjStatic =[];
var Sim_Path;
var Sim_PathInicial = 'scriweb/simulacao/';
var FuncaoMatriz =[];
var tempo = window.setInterval(AtualizaPorTempo, 500);
var variavel;
//=====================================================================================
//Inicializa Canvas
//Desenha area de trabalho em branco
//=====================================================================================
function Sim_Draw_Inicio() {
	Sim_Canvas = document.getElementById("tela6");
	Sim_Context = Sim_Canvas.getContext("2d");
	Sim_Canvas.width = 560; 
	Sim_Canvas.height = 525; 
}

//=====================================================================================
//Inicializa Canvas
//Click com omouse
//=====================================================================================
function Sim_Simulador_Click() {
	var posicaoy = parseInt(window.event.clientY-40);
	var posicaox = parseInt(window.event.clientX-70);
	//alert("clicou "+ posicaox + " " + posicaoy+" LoadedImages "+LoadedImages);
	//alert(ArrayObjStatic);
  	if (LoadedImages>0) {
    		for(var index_var=0; index_var<( parseInt(ArrayObjDinamic.length / 10)+1); index_var++) { 
			//alert(" "+ArrayObjStatic[index_var*20+17]+" "+verificaPosicao(posicaox, 0, 'X'+index_var)+ " "+verificaPosicao(posicaoy, 0, 'Y'+index_var));
			if (Sim_Edicao == 0) {
				if (ArrayObjStatic[index_var*20+17]==1 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					if (Sim_Endereco(ArrayObjStatic[index_var*20+1])==1) {
						Sim_Escreve_Endereco(ArrayObjStatic[index_var*20+1],0);
					}
					else {
						Sim_Escreve_Endereco(ArrayObjStatic[index_var*20+1],1);
					}
					//alert("clicou LABEL");
  	
				}
 
				if (ArrayObjStatic[index_var*20+17]==4 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					if (Sim_Endereco(ArrayObjStatic[index_var*20+1])==1) {
						Sim_Escreve_Endereco(ArrayObjStatic[index_var*20+1],0);
					}
					else {
						Sim_Escreve_Endereco(ArrayObjStatic[index_var*20+1],1);
					}
					//alert("clicou FIGURA");
  	
				}
				if (ArrayObjStatic[index_var*20+17]==6) {
					if (verificaTexto(posicaox, -4*ArrayObjStatic[index_var*20+10], 'X'+index_var)==1 && verificaTexto(posicaoy, ArrayObjStatic[index_var*20+10], 'Y'+index_var)==1)
					{
						variavel = index_var;
						var ICampo = document.getElementById('CampoS');
						var CInput = document.getElementById('Sim_Input_Ladder');
						ICampo.style.left = " "+ArrayObjDinamic[index_var*10+3] + "px";
						ICampo.style.top = " "+ArrayObjDinamic[index_var*10+4]  + "px";
						ICampo.style.display = "block";
						document.getElementById('Sim_Label_Input').innerHTML = ArrayObjStatic[index_var*20+1];
						document.getElementById('Sim_Input_Ladder').value = Sim_Endereco_CT(ArrayObjStatic[index_var*20+1],0);
						CInput.focus();
					//	alert("clicou ENTRADA");
  	
					}
				}
				if (ArrayObjStatic[index_var*20+17]==7 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
					ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
					//alert("clicou BARGRAPH");
  	
				}			
				if (ArrayObjStatic[index_var*20+17]==2 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1)
				{
					ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
					ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
					if (ArrayObjStatic[(index_var+1)*20+17]==2) {
						var auxiliar = ArrayObjStatic[index_var*20+4];
						ArrayObjStatic[index_var*20+4] = ArrayObjStatic[(index_var+1)*20+4];
						ArrayObjStatic[(index_var+1)*20+4] = auxiliar;
					}
					if (ArrayObjStatic[(index_var-1)*20+17]==2) {
						var auxiliar = ArrayObjStatic[index_var*20+4];
						ArrayObjStatic[index_var*20+4] = ArrayObjStatic[(index_var-1)*20+4];
						ArrayObjStatic[(index_var-1)*20+4] = auxiliar;
					}
					//alert("clicou FIGURA ANimada");
  	
				}			
			}
			//ENtra em modo ediçao
			if ((Sim_Edicao == 2) && ((ArrayObjStatic[index_var*20+17]!=1 && ArrayObjStatic[index_var*20+17]!=6 && verificaPosicao(posicaox, 0, 'X'+index_var)==1 && verificaPosicao(posicaoy, 0, 'Y'+index_var)==1) ||
			(ArrayObjStatic[index_var*20+17]==1 && verificaTexto(posicaox, -1*ArrayObjStatic[index_var*20+10]*ArrayImagens[ArrayObjDinamic[index_var*10+5]].length, 'X'+index_var)==1 && verificaTexto(posicaoy, ArrayObjStatic[index_var*20+10], 'Y'+index_var)==1) ||
			(ArrayObjStatic[index_var*20+17]==6 && verificaTexto(posicaox, -5*ArrayObjStatic[index_var*20+10], 'X'+index_var)==1 && verificaTexto(posicaoy, ArrayObjStatic[index_var*20+10], 'Y'+index_var)==1))) {
				simApontador(index_var);
				//alert("clicou EDICAO");
  	
			}
		}
  	} 
}
//=====================================================================================
// Monitora a tecla ENTER
// Quando aparece o campo INPUT
// Para entrada TAG e ENDERECO
//=====================================================================================
function eInputS(event) {
	if (event.keyCode == 13) { //Tecla enter
		var ICampo = document.getElementById('CampoS');
		var CInput = document.getElementById('Sim_Input_Ladder');
		Sim_Escreve_CT(ArrayObjStatic[variavel*20+1], CInput.value, 0);
		if(Sim_Endereco_CT(ArrayObjStatic[variavel*20+1],0) > ArrayObjStatic[variavel*20+16])
			Sim_Escreve_CT(ArrayObjStatic[variavel*20+1],parseInt(ArrayObjStatic[variavel*20+16]),0);
		if(Sim_Endereco_CT(ArrayObjStatic[variavel*20+1],0) < 0)
			Sim_Escreve_CT(ArrayObjStatic[variavel*20+1],0,0);

		ICampo.style.left = "10px";
		ICampo.style.top = "700px";
		CInput.blur();
		ICampo.style.display = "none";
	}
}

//Interrupção de tempo Tela_Eletrico_Simulador
function AtualizaPorTempo() {
	if (LoadedImages>0 && (Tela_Eletrico_Simulador == 1) && (Sim_Edicao ==0)) {
		Atualiza_Simulador();
	}
}

//=====================================================================================
//Atualiza variãveis e canvas
//Disparado ao receber SocketIO
//===================================================================================
function Atualiza_Simulador() {
	Desenha_Ihm_Sim();
	            	
	for(var ij=0; ij < parseInt((ArrayObjDinamic.length / 10)+1); ij++) {
		//alert("linha "+ ij);
		if (comandos > 0) {
			simTimer(ij);
			simFigura(ij);
		}
		else {
			ArrayObjDinamic[ij*10+3] = ArrayObjStatic[ij*20+3];
			ArrayObjDinamic[ij*10+4] = ArrayObjStatic[ij*20+6];
			ApagaImagem(ij);
		}

		if ((ArrayObjStatic[ij*20+17] != 1) && (ArrayObjStatic[ij*20+17] < 5)) {
			//alert("Eita "+ ArrayObjStatic[ij*20+13]);
			LoadImageIndex(Sim_Path + ArrayImagens[ArrayObjDinamic[ij*10+5]] + Extensao[ArrayObjDinamic[ij*10+1]]+'.png', ij);
		}
		if (ArrayObjStatic[ij*20+17] == 6) {
			Sim_Context.font = ArrayObjStatic[ij*20+10]+'pt Arial';
			Sim_Context.fillStyle = 'white';
			Sim_Context.fillRect(ArrayObjStatic[ij*20+3] ,ArrayObjStatic[ij*20+6], 4*ArrayObjStatic[ij*20+10], -ArrayObjStatic[ij*20+10]);
  			Sim_Context.fillStyle = ArrayObjStatic[ij*20+9];
			Sim_Context.fillText(Sim_EnderecoCT(ArrayObjStatic[ij*20+1],0),ArrayObjStatic[ij*20+3] ,ArrayObjStatic[ij*20+6]);
		}
		if (ArrayObjStatic[ij*20+17] == 7) {
			Sim_Context.fillStyle = ArrayObjStatic[ij*20+10];
			var percentual = parseInt(Sim_EnderecoCT(ArrayObjStatic[ij*20+1],0)*ArrayObjStatic[ij*20+7]/ ArrayObjStatic[ij*20+16]);
			Sim_Context.fillRect(parseInt(ArrayObjDinamic[ij*10+3]), parseInt(ArrayObjDinamic[ij*10+4]), parseInt(ArrayObjStatic[ij*20+4]), parseInt(ArrayObjStatic[ij*20+7])-percentual);
			Sim_Context.fillStyle = ArrayObjStatic[ij*20+12];
			Sim_Context.fillRect(ArrayObjDinamic[ij*10+3], parseInt(ArrayObjDinamic[ij*10+4])+parseInt(ArrayObjStatic[ij*20+7])-parseInt(percentual), ArrayObjStatic[ij*20+4], percentual);
		} 
		if (ArrayObjStatic[ij*20+17] == 1) {
			funcaoLabel(ij);
		}
	};
}
//----------------------------------------------------------
//Funcao de label
// Desenha o label e o quadro em volta
//----------------------------------------------------------
function funcaoLabel(apontador) {
	Sim_Context.font = ArrayObjStatic[apontador*20+10]+'pt Arial';
	var Llabel = ArrayLabel[ArrayObjDinamic[apontador*10+5]];
	if (ArrayObjStatic[apontador*20+1] != '') {
		if (Sim_Endereco(ArrayObjStatic[apontador*20+1]) != 0)
			Sim_Context.fillStyle = ArrayObjStatic[apontador*20+12];
		else
			Sim_Context.fillStyle = ArrayObjStatic[apontador*20+11];
		Sim_Context.fillRect(ArrayObjDinamic[apontador*10+3], ArrayObjDinamic[apontador*10+4],ArrayObjStatic[apontador*20+4],ArrayObjStatic[apontador*20+7]);	
		Sim_Context.fillStyle = ArrayObjStatic[apontador*20+9];
		//var LlabelX = parseInt(ArrayObjStatic[apontador*20+3]) + (parseInt(ArrayObjStatic[apontador*20+4])-(Llabel.length * parseInt(ArrayObjStatic[apontador*20+10])))/2;
		var LlabelX = parseInt(ArrayObjStatic[apontador*20+3]) + (parseInt(ArrayObjStatic[apontador*20+4])-getTextWidth(Llabel,Sim_Context.font))/2;
		var LlabelY = parseInt(ArrayObjStatic[apontador*20+6])+parseInt(ArrayObjStatic[apontador*20+10])+(parseInt(ArrayObjStatic[apontador*20+7])-parseInt(ArrayObjStatic[apontador*20+10]))/2;
		Sim_Context.fillText(Llabel,LlabelX,LlabelY);	
	}	
	else {
		Sim_Context.fillStyle = ArrayObjStatic[apontador*20+9];
		Sim_Context.fillText(Llabel,ArrayObjStatic[apontador*20+3] ,ArrayObjStatic[apontador*20+6]);
	}
}
//------------------------------------------------------------------
//Calcula o tamnho do label
//https://www.it-swarm.dev/pt/javascript/calcular-largura-do-texto-com-javascript/958395213/
//---------------------------------------------------------------------
function getTextWidth(text, font) {
    Sim_Context.font = font;
    var metrics = Sim_Context.measureText(text);
    return metrics.width;
}
//=====================================================================================
//Apaga Imagens se posicao X ou Y forem diferentes
//
//=====================================================================================
function ApagaImagem(index) {
	Sim_Context.fillStyle = 'white';
	if ((ArrayObjDinamic[index*10+3] != ArrayObjDinamic[index*10+7]) || (ArrayObjDinamic[index*10+4] != ArrayObjDinamic[index*10+8])){
		Sim_Context.fillRect(ArrayObjDinamic[index*10+7], ArrayObjDinamic[index*10+8], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
		ArrayObjDinamic[index*10+7] = ArrayObjDinamic[index*10+3];
		ArrayObjDinamic[index*10+8] = ArrayObjDinamic[index*10+4];
	}
}

//=====================================================================================
//Mostra um painel com todas as variáveis do sistema
//Visualiza as variáveis do sistema
//=====================================================================================
function Desenha_Ihm_Sim() {
	var tamanho_array = 0;
	var tipo_funcao = ['I','Q','M','T','C','R'];
	var linha = 500;
	//Sim_Context.lineWidth = 2;
  	Sim_Context.fillStyle = 'white';
  	Sim_Context.fillRect(10, 500, 500, 50);
  	Sim_Context.font = '36pt Arial';
  	Sim_Context.fillStyle = 'red';
	Sim_Context.fillText(num_clp, 10, 500);
	Sim_Context.fillStyle = 'black';
  	//Sim_Context.strokeRect(255, 10, 305, 5125);
  	//Sim_Context.font = '16pt Arial';
  	//Sim_Context.fillStyle = 'black';
  	//Sim_Context.fillText('Mapa de Memória', 270, 40);
  	Sim_Context.font = '9pt Arial';
  	var num_linhas;
  	var funcao = 3;
	//for (var funcao=0; funcao<6; funcao++) {
    		switch (parseInt(funcao)){
      		case 0:
        		Sim_Context.fillStyle = 'black';
        		Sim_Context.fillRect(280, linha-5, 60, 5);
        		Sim_Context.fillText('ENTRADAS', 280, linha);
        		//Sim_Context.fillRect(955, linha-5, 60, 5);
        		//Sim_Context.fillRect(1025, linha-5, 60, 5);
        		tamanho_array = I.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Sim_Context.fillText('MSB', 280,linha);
        		//Sim_Context.fillText('Valor binário', 870,linha);
        		//Sim_Context.fillText('LSB', 990,linha);
        		Sim_Context.fillText('Decimal', 530,linha);
			linha = linha + 15;
        		break;
      		case 1:
        		Sim_Context.fillStyle = 'black';
        		Sim_Context.fillRect(280, linha-5, 60, 5);
        		Sim_Context.fillText('SAIDAS', 280, linha);
        		//Sim_Context.fillRect(955, linha-5, 60, 5);
        		//Sim_Context.fillRect(1025, linha-5, 60, 5);
        		tamanho_array = Q.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Sim_Context.fillText('MSB', 280,linha);
        		//Sim_Context.fillText('Valor binário', 870,linha);
        		//Sim_Context.fillText('LSB', 990,linha);
        		Sim_Context.fillText('Decimal',530,linha);
        		linha = linha + 15;
        		break;
      		 case 2:
        		Sim_Context.fillStyle = 'black';
        		Sim_Context.fillRect(790, linha-5, 60, 5);
        		Sim_Context.fillText('MEMÓRIAS', 870, linha);
        		Sim_Context.fillRect(955, linha-5, 60, 5);
        		Sim_Context.fillRect(1025, linha-5, 60, 5);
        		tamanho_array = M.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Sim_Context.fillText('MSB', 790,linha);
        		Sim_Context.fillText('Valor binário', 870,linha);
        		Sim_Context.fillText('LSB', 990,linha);
        		Sim_Context.fillText('Decimal', 1035,linha);
        		linha = linha + 15;
        		break;
		case 3:
        		Sim_Context.fillStyle = 'black';
        		Sim_Context.fillRect(30, linha-5, 60, 5);
        		Sim_Context.fillText('TIMERS', 100, linha);
       			Sim_Context.fillRect(200, linha-5, 60, 5);
        		tamanho_array = T.length;
        		num_linhas = parseInt(tamanho_array / 3);
        		linha = linha + 15;
        		Sim_Context.fillText('Tem', 30,linha);
        		Sim_Context.fillText('bit', 60,linha);
        		Sim_Context.fillText('PV', 90,linha);
        		Sim_Context.fillText('SP', 120,linha);
        		linha = linha + 15;
        		break;
		case 4:
        		Sim_Context.fillStyle = 'black';
        		Sim_Context.fillRect(790, linha-5, 60, 5);
        		Sim_Context.fillText('CONTADORES', 860, linha);
        		Sim_Context.fillRect(955, linha-5, 60, 5);
        		tamanho_array = C.length;
        		num_linhas = parseInt(tamanho_array / 4);
        		linha = linha + 15;
        		Sim_Context.fillText('Cont', 790,linha);
        		Sim_Context.fillText('bit', 845,linha);
        		Sim_Context.fillText('PV', 895,linha);
        		Sim_Context.fillText('SP', 945,linha);
        		Sim_Context.fillText('AUX', 990,linha);
        		linha = linha + 15;
        		break;
      		case 5:
        		Sim_Context.fillStyle = 'black';
        		Sim_Context.fillRect(790, linha-5, 60, 5);
        		Sim_Context.fillText('RAMAIS', 880, linha);
        		Sim_Context.fillRect(955, linha-5, 60, 5);
        		tamanho_array = R.length;
        		num_linhas = parseInt(tamanho_array / 16);
        		linha = linha + 15;
        		Sim_Context.fillText('MSB', 790,linha);
        		Sim_Context.fillText('Valor binário', 870,linha);
        		Sim_Context.fillText('LSB', 990,linha);
        		linha = linha + 15;
        		break;
		default:
        		tamanho_array = 1;
    		}
    		var posicao;
    		var n_posicao;
    		for (var n_linhas=0; n_linhas <= num_linhas; n_linhas++) {
      			posicao = 0;
      			Sim_Context.fillStyle = 'green';
      			if (n_linhas < num_linhas){
        			if (funcao <3){
        				Sim_Context.fillText(tipo_funcao[funcao]+n_linhas+'.15', 280,linha);
        				n_posicao = (n_linhas * 16) + posicao;
        			}
        			if (funcao==5) {
        				n_posicao = (n_linhas * 16) + posicao;
        				Sim_Context.fillText(tipo_funcao[funcao]+(n_posicao+15), 280,linha);
        			}
      			}
      			else  {
        			if (funcao <3) {
        				Sim_Context.fillText(tipo_funcao[funcao]+n_linhas+'.'+((tamanho_array%16)-1), 280,linha);
        				n_posicao = (n_linhas * 16) + posicao;
        			}
        			if (funcao==5) {
        				n_posicao = (n_linhas * 16) + posicao;
        				Sim_Context.fillText(tipo_funcao[funcao]+(n_posicao + (tamanho_array%16)-1), 280,linha);
        			}
      			}
      			if(funcao==4) {
        			Sim_Context.fillText(tipo_funcao[funcao]+n_linhas, 280,linha);
        			n_posicao = (n_linhas * 4) + posicao;
      			}
      			if(funcao==3) {
        			Sim_Context.fillText(tipo_funcao[funcao]+n_linhas, 30,linha);
        			n_posicao = (n_linhas * 3) + posicao;
      			}
      			do {
        			switch (parseInt(funcao)){
        			case 0:
        				Sim_Context.fillStyle = 'red';
        				Sim_Context.fillText(I[n_posicao], 530-(posicao*10),linha);
        				break;
        			case 1:
        				Sim_Context.fillStyle = 'red';
        				Sim_Context.fillText(Q[n_posicao], 530-(posicao*10),linha);
        				break;
        			case 2:
        				Sim_Context.fillStyle = 'red';
        				Sim_Context.fillText(M[n_posicao], 980-(posicao*10),linha);
        				break;
        			case 5:
        				Sim_Context.fillStyle = 'red';
        				Sim_Context.fillText(R[n_posicao], 980-(posicao*10),linha);
        				break;
        			case 4:
        				Sim_Context.fillStyle = 'red';
        				Sim_Context.fillText(C[n_posicao], 850+(posicao*50),linha);
        				if (posicao >2)
        					posicao = 15;
        				break;
        			case 3:
        				Sim_Context.fillStyle = 'red';
        				Sim_Context.fillText(T[n_posicao], 30+(posicao*30),linha);
        				if (posicao >1)
        					posicao = 15;
        				break;
        			default:
        				posicao = 0;
        			}
        			posicao++;
        			n_posicao++;
      			} while((n_posicao < tamanho_array) && (posicao < 15));

      			if (funcao<3) {
        			Sim_Context.fillStyle = 'green';
        			Sim_Context.fillText(tipo_funcao[funcao]+n_linhas+'.0 - ' +tipo_funcao[funcao]+n_linhas+' = ', 530,linha);
        			Sim_Context.fillStyle = 'red';
        			Sim_Context.fillText(Sim_EnderecoCT(tipo_funcao[funcao]+n_linhas,0), 540,linha);
      			}
      			if (funcao==5) {
        			Sim_Context.fillStyle = 'green';
        			Sim_Context.fillText(tipo_funcao[funcao]+(n_linhas*16), 530,linha);
      			}
      			linha += 15;
      			if (n_posicao >= tamanho_array)
        			break;
    		}
  	//}
}

//======================================================================
//retira o valor da funcao Q/E/T/C/M
//=======================================================================
function Sim_Endereco(Aux_data) {
	var tamanho = Aux_data.length;
	var negacao = 0;
	var index;
	var retorno;
	var primeiro_char = Aux_data.charAt(0);
	if (primeiro_char != 'R' && primeiro_char != 'C' && primeiro_char != 'T' && primeiro_char != 'U' && primeiro_char != 'D' && primeiro_char != 'X' && primeiro_char != 'Y'){
		var ponto = Aux_data.indexOf('.');
		if (primeiro_char =='N') {
			primeiro_char = Aux_data.charAt(1);
			index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
			negacao = 1;
		}
		else{
			negacao = 0;
			if (ponto == -1)
				index = parseInt(Aux_data.substr(1)) *16;
			else
				index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
		}
	}
	else {
		negacao = 0;
		index = parseInt(Aux_data.substr(1));
	}


	switch (primeiro_char) {
		case 'Q':
			retorno = Q[index];
			break;
		case 'I':
			retorno = I[index];
			break;
		case 'M':
			retorno = M[index];
			break;
		case 'R':
			retorno = R[index];
			break;
		case 'T':
			retorno = T[3*index];
			break;
		case 'C':
			retorno = C[4*index];
			break;
		case 'D':
			retorno = Sim_Endereco(ArrayObjStatic[index*20+1]);
			break;
		case 'U':
			retorno = Sim_Endereco(ArrayObjStatic[index*20+1]);
			break;
		case 'X':
			retorno = Sim_Endereco(ArrayObjStatic[index*20+1]);
			break;
		case 'Y':
			retorno = Sim_Endereco(ArrayObjStatic[index*20+1]);
			break;
		default:
			retorno = 3;
	}
	if (negacao==1){
		if (retorno == 0 )
			retorno = 1;
		else
			retorno = 0;
	}
	if (isNaN(parseInt(retorno)))
		retorno = 0;
	return parseInt(retorno);
}

//======================================================================
// Escole variavel Analogica ou Digital
function Sim_Escreve(Aux_data, valor)
{
	if( Aux_data.indexOf('.') != -1)
		Sim_Escreve_Endereco(Aux_data,valor);
	else
		Sim_Escreve_CT(Aux_data,valor);
}

//======================================================================
//ESCREVE o valor da funcao Q/E/M
//=======================================================================
function Sim_Escreve_Endereco(Aux_data, valor)
{
	var index;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T') {
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}

	switch (Aux_data.charAt(0)) {
		case 'Q':
			Q[index] = valor;
			break;
		case 'I':
			I[index] = valor;
			Envia_Entrada_S(I);
			break;
		case 'M':
			M[index] = valor;
            			Envia_Memoria_S('M'+parseInt(index/16));
			break;
		case 'R':
			R[index] = valor;
			break;
		case 'T':
			T[3*index+1] = valor;
			break;
		case 'C':
			C[4*index+3] = 2;
			break;
	}
}

//======================================================================
//ESCREVE o valor da funcao T/C
//=======================================================================
function Sim_Escreve_CT(Aux_data, valor, index1)
{
	var index;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T') {
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			index = (parseInt(Aux_data.charAt(ponto-1)) *16);
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}

	switch (Aux_data.charAt(0)) {
		case 'I':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = parseInt(valor) %2;
				I[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			I[index+15] = valor;
			Envia_Entrada_S(I);
			break;
		case 'Q':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = parseInt(valor) %2;
				Q[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			Q[index+15] = valor;
			break;
		case 'M':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = parseInt(valor) %2;
				M[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			M[index+15] = valor;
			Envia_Memoria_S('M'+parseInt(index/16));
			break;
		case 'T':
			T[3*index+index1] = valor;
			break;
		case 'C':
			C[4*index+index1] = valor;
			break;
	}
}


//======================================================================
//retira o valor da funcao T/C
//=======================================================================
function Sim_Endereco_CT(Aux_data, index1) {
	var tamanho = Aux_data.length;
	var index;
	var retorno;
	var primeiro_char = Aux_data.charAt(0);
	if (primeiro_char != 'R' && primeiro_char != 'C' && primeiro_char != 'T' && primeiro_char != 'X' && primeiro_char != 'Y' && primeiro_char != 'D' && primeiro_char != 'U') {
		var ponto = Aux_data.indexOf('.');
		if (ponto == -1)
			index = parseInt(Aux_data.substr(1)) *16;
		else
			retorno = 3;
	}
	else {
		index = parseInt(Aux_data.substr(1));
	}


	switch (primeiro_char) {
		case 'I':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + variavelCT(I[index+ ia])* (2**ia);
			break;
		case 'Q':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + variavelCT(Q[index+ ia])* (2**ia);
		  	break;
		case 'M':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + variavelCT(M[index+ ia])* (2**ia);
			break;
		case 'T':
			retorno = T[3*index+index1];
			break;
		case 'C':
			retorno = C[4*index+index1];
			break;
		case 'X':
			retorno = (index1==0) ? parseInt(ArrayObjDinamic[index*10+3]) : parseInt(ArrayObjDinamic[index*10+3])+parseInt(ArrayObjStatic[index*20+4]);
			break;
		case 'Y':
			retorno = (index1==0) ? parseInt(ArrayObjDinamic[index*10+4]) : parseInt(ArrayObjDinamic[index*10+4])+parseInt(ArrayObjStatic[index*20+7]);
			break;
		case 'D':
			retorno = Sim_Endereco_CT(ArrayObjStatic[index*20+1], 0);
			break;
		case 'U':
			retorno = Sim_Endereco_CT(ArrayObjStatic[index*20+1], 0);
			break;
		default:
			if (isNaN(parseInt(Aux_data)))
				retorno = 3;
			else
				if (parseInt(Aux_data) < 32767)
					retorno = Aux_data;
	}
	if (isNaN(parseInt(retorno)))
		retorno = 2;
	return retorno;
}

//------------------------------------------------------------------------------------
// Encontra valor de um registrador 16 bits
// Despreza os bits nao declarados, colocados como ZERO
//------------------------------------------------------------------------------------
function variavelCT(Aux_data) {
	if (isNaN(Aux_data))
      		return 0;
  	else
    		return Aux_data;
}

//------------------------------------------------------------------------------------
// Executa temporizador para objetos
//
//------------------------------------------------------------------------------------
function simTimer(index_var) {
	if (ArrayObjStatic[index_var*20+15]>0 && ArrayObjStatic[index_var*20+17]<5) {
		if (ArrayObjStatic[index_var*20+16]<ArrayObjDinamic[index_var*10+2])
			ArrayObjDinamic[index_var*10+2] = 0;
		else
			ArrayObjDinamic[index_var*10+2] = ArrayObjDinamic[index_var*10+2] + 1;
	}
	else
		ArrayObjDinamic[index_var*10+2] = 0;
}

//------------------------------------------------------------------------------------
// Mostra o tipo de figura do objeto
//
//------------------------------------------------------------------------------------
function simFigura(index_var) {
	//0_id, 1_tipo, 2_nome, 3_var_1, 4_var_2, 5_pos_x_inicial, 6_dpos_x, 7_pos_x_final, 8_pos_y_inicial, 9_dpos_y,
	//10_pos_y_final, 11_inc_x1, 12_inc_x2, 13_inc_y1, 14_inc_y2, 15_var1_dependente, 16_var2_dependente/Decremen, 17_piscar/habEntrada,//18_tempo_pisca/ResolucaoAD, 19_figura, 20_funcao, 21_reserva, 22_reserva, 23_reserva, 24_reserva

	//propriedadas das figuras dinâmicas. 0_nome, 1_tipo(1:fig1, 2:fig2, etc), 2_Timer(uso da monitoracao), 3_PosX, 4_PosY,
	// 5_Pos_ArrayImagens, 6_funcao, 7_PosX_ANt, 8_PosY_Anterior, 9_reserva

	//propriedades estáticas. 0_nome, 1_var_1, 2_var_2, 3_pos_X_nicial,4_dpos_x,5_pos_x_final,6_pos_y_nicial, 7_dpos_y,
	// 8_posicao_y_final, 9_inc_x1, 10_inc_x2, 11_inc_y1, 12_inc_y2, 13_var1_associada, 14_var2_associada, 15_piscar,
	// 16_tempo, 17_Tipo, 18_reserva, 19_reserva
	
	var variavel1 = ArrayObjStatic[index_var*20+1];
	var variavel2 = ArrayObjStatic[index_var*20+2];
	var dependencia1 = ArrayObjStatic[index_var*20+13];
	var dependencia2 = ArrayObjStatic[index_var*20+14];
	//alert('Linha: '+index_var+' '+ArrayObjStatic[index_var*20+13]+' '+dependencia1);
	figura_animada(index_var, variavel1, variavel2);
	movimenta_x(index_var, dependencia1, dependencia2);
	movimenta_y(index_var, dependencia1, dependencia2);
	sensor(index_var, dependencia1,dependencia2);
	updown(index_var, dependencia1,dependencia2);
	Verifica_Posicao_Tag(index_var, dependencia1, dependencia2);
}

//=====================================================================================
//Figura animada
//=====================================================================================
function figura_animada(index_var, variavel1, variavel2) {
 	if (variavel1 != '')
		ArrayObjDinamic[index_var*10+1] = Sim_Endereco(variavel1)+1;
	else
		ArrayObjDinamic[index_var*10+1] = 0;

	if (variavel2 != '')
		ArrayObjDinamic[index_var*10+1] = (Sim_Endereco(variavel1) + Sim_Endereco(variavel2))+1;

	if (ArrayObjStatic[index_var*20+16] < ArrayObjDinamic[index_var*10+2] && (ArrayObjStatic[index_var*20+15]>0) && ArrayObjDinamic[index_var*10+1]>1)
		if (ArrayObjDinamic[index_var*10+1] ==	2)
			ArrayObjDinamic[index_var*10+1] = 3;
		else
			ArrayObjDinamic[index_var*10+1] = 2;
}

//=====================================================================================
//Movimenta no eixo X
//=====================================================================================
function movimenta_x(index_var, dependencia1, dependencia2) {

	//movimenta o objeto no eixo x
	if (ArrayObjStatic[index_var*20+9]!=0 && (Sim_Endereco(dependencia1) ==1)) {
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+9]);
	}
	if (ArrayObjStatic[index_var*20+10]!=0 && (Sim_Endereco(dependencia2) ==1)) {
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+parseInt(ArrayObjStatic[index_var*20+10]);
	}
			
		//movimento via complementar
	if (ArrayObjDinamic[index_var*10+6] > 0  && FuncaoMatriz.length >0) {
		var auxiliar = (ArrayObjDinamic[index_var*10+6]-1)*7;
		if ( endereco(FuncaoMatriz[auxiliar+2]) == 1) {
			ApagaImagem(index_var);
			ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3]) + parseInt(FuncaoMatriz[auxiliar+3]);		
		}
	}

	//limites inicial e final relativo a posicao X
	if (ArrayObjStatic[index_var*20+5]>ArrayObjStatic[index_var*20+3]) {
		if (ArrayObjStatic[index_var*20+5]<ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+5];
		if (ArrayObjStatic[index_var*20+3]>ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
	}
	else {
		if (ArrayObjStatic[index_var*20+5]>ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+5];
		if (ArrayObjStatic[index_var*20+3]<ArrayObjDinamic[index_var*10+3])
			ArrayObjDinamic[index_var*10+3] = ArrayObjStatic[index_var*20+3];
	}
}

//=====================================================================================
//Movimenta no eixo Y
//=====================================================================================
function movimenta_y(index_var, dependencia1, dependencia2) {
	if (ArrayObjStatic[index_var*20+11]!=0 && (Sim_Endereco(dependencia1) ==1)) {
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+11]);
	}
		
	if (ArrayObjStatic[index_var*20+12]!=0 && (Sim_Endereco(dependencia2) ==1)) {
		ApagaImagem(index_var);
		ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+parseInt(ArrayObjStatic[index_var*20+12]);
	}
	
	//movimento via complementar
	if (ArrayObjDinamic[index_var*10+6] > 0  && FuncaoMatriz.length >0) {
		var auxiliar = (ArrayObjDinamic[index_var*10+6]-1)*7;
		if ( endereco(FuncaoMatriz[auxiliar+2]) == 1){
			ApagaImagem(index_var);
			ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4]) + parseInt(FuncaoMatriz[auxiliar+4]);		
		}
	}
	//limites inicial e final relativo a posicao Y
	if (ArrayObjStatic[index_var*20+8]>ArrayObjStatic[index_var*20+6]) {
		if (ArrayObjStatic[index_var*20+8]<ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+8];
		if (ArrayObjStatic[index_var*20+6]>ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
	}
	else {
		if (ArrayObjStatic[index_var*20+8]>ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+8];
		if (ArrayObjStatic[index_var*20+6]<ArrayObjDinamic[index_var*10+4])
			ArrayObjDinamic[index_var*10+4] = ArrayObjStatic[index_var*20+6];
	}
};

//=====================================================================================
//Verifica a posicao e se o tag estaON
//=====================================================================================
function Verifica_Posicao_Tag(index_var, dependencia1, dependencia2) {
	if (((dependencia1.charAt(0) =='V') && (dependencia1.charAt(1) =='X')) || ((dependencia2.charAt(0) =='V') && (dependencia2.charAt(1) =='X'))) {
		if (ArrayObjStatic[index_var*20+9]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1.substr(1))==1) && (Sim_Endereco(dependencia1.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+9]);
			}		
		if (ArrayObjStatic[index_var*20+10]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1) && (Sim_Endereco(dependencia2.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+10]);
			}		
	
		if (ArrayObjStatic[index_var*20+11]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1.substr(1))==1) && (Sim_Endereco(dependencia1.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+11]);
			}		
		if (ArrayObjStatic[index_var*20+12]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1) && (Sim_Endereco(dependencia2.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+12]);
			}
	}
	if (((dependencia1.charAt(0) =='V') && (dependencia1.charAt(1) =='Y')) || ((dependencia2.charAt(0) =='V') && (dependencia2.charAt(1) =='Y'))) {
		if (ArrayObjStatic[index_var*20+9]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1) && (Sim_Endereco(dependencia1.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+9]);
			}		
		if (ArrayObjStatic[index_var*20+10]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1) && (Sim_Endereco(dependencia2.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+3] = parseInt(ArrayObjDinamic[index_var*10+3])+ parseInt(ArrayObjStatic[index_var*20+10]);
			}		
		if (ArrayObjStatic[index_var*20+11]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1) && (Sim_Endereco(dependencia1.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+11]);
			}		
		if (ArrayObjStatic[index_var*20+12]!=0)
			if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1) && (Sim_Endereco(dependencia2.substr(1))==1)) {
				ArrayObjDinamic[index_var*10+4] = parseInt(ArrayObjDinamic[index_var*10+4])+ parseInt(ArrayObjStatic[index_var*20+12]);
			}
	}
};
//=====================================================================================
//Up e Down
//=====================================================================================
function updown(index_var, dependencia1, dependencia2) {
	if (dependencia1.charAt(0) == 'U' && endereco(dependencia1)==1 ) {
//		ApagaImagem(index_var);
		Sim_Escreve_CT(ArrayObjStatic[index_var*20+1],parseInt(Sim_Endereco_CT(ArrayObjStatic[index_var*20+1],0))+parseInt(dependencia2),0);
		if(Sim_EnderecoCT(ArrayObjStatic[index_var*20+1],0) > ArrayObjStatic[index_var*20+16])
			Sim_Escreve_CT(ArrayObjStatic[index_var*20+1],ArrayObjStatic[index_var*20+16],0);
	}
	if (dependencia1.charAt(0) == 'D' && endereco(dependencia1)==1) {
		Sim_Escreve_CT(ArrayObjStatic[index_var*20+1],parseInt(Sim_Endereco_CT(ArrayObjStatic[index_var*20+1],0))-parseInt(dependencia2),0);
		if (Sim_EnderecoCT(ArrayObjStatic[index_var*20+1],0) < 0)
			Sim_Escreve_CT(ArrayObjStatic[index_var*20+1],0,0);
	}
};

//=====================================================================================
//Sensor
//=====================================================================================
function sensor(index_var, dependencia1, dependencia2) {
	//------------------------------------------------------
	// controle sensor via variavel de dependencia
	//------------------------------------------------------
	var RESET = 'X';
	if (dependencia1.charAt(0) == 'X' && dependencia2.charAt(0)!='Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1)==1){
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
		}
		else
    		escreve(ArrayObjStatic[index_var*20+1],0);
	}

	if (dependencia1.charAt(0) == 'Y' && dependencia2.charAt(0)!='X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1)==1){
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
		}
		else
    		escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia2.charAt(0) == 'X' && dependencia1.charAt(0)!='Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2)==1){
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
		}
    	else
    		Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia2.charAt(0) == 'Y' && dependencia1.charAt(0)!='X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2)==1){
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
		}
    	else
    		Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia1.charAt(0) == 'X' && dependencia2.charAt(0) == 'Y') {
		if ((verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia1)==1)&&(verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2)==1)){
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
		}
    	else
    		Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia1.charAt(0) == 'Y' && dependencia2.charAt(0) == 'X') {
		if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1)==1)&&(verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2)==1)){
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
		}
     	else
      		Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
	}
	//Controle via SET E RESET
	if (dependencia1.charAt(0) == 'S' && dependencia1.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4],dependencia1.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
	}

	if (dependencia1.charAt(0) == 'S' && dependencia1.charAt(1) == 'Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
	}
	if (dependencia2.charAt(0) == 'R' && dependencia2.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
 	}
	if (dependencia2.charAt(0) == 'R' && dependencia2.charAt(1) == 'Y') {
		if ((verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1) && (Sim_Endereco(ArrayObjStatic[index_var*20+1])==1)) 
			Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
	}
	if (dependencia2.charAt(0) == 'S' && dependencia2.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4],dependencia1.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
	}

	if (dependencia2.charAt(0) == 'S' && dependencia2.charAt(1) == 'Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia1.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],1);
	}
	if (dependencia1.charAt(0) == 'R' && dependencia1.charAt(1) == 'X') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+3], ArrayObjStatic[index_var*20+4], dependencia2.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
 	}
	if (dependencia1.charAt(0) == 'R' && dependencia1.charAt(1) == 'Y') {
		if (verificaPosicao(ArrayObjDinamic[index_var*10+4], ArrayObjStatic[index_var*20+7], dependencia2.substr(1))==1)
			Sim_Escreve(ArrayObjStatic[index_var*20+1],0);
  }
}

//=====================================================================================
//Verifica se a posicao de um objeto está entre (sobre) um outro objet
//=====================================================================================
function verificaPosicao(posicao, deslocamento, dependencia) {
	var retorno = 0;
	var A = Sim_Endereco_CT(dependencia,0);
	var B = Sim_Endereco_CT(dependencia,1);
	var C = parseInt(posicao);
	var D = parseInt(posicao)+ parseInt(deslocamento);

	if (((A < D) && (B > C))) {  // || (( B < D) && (B > C)) || ((A < C) && (B > D))) {
		   retorno = 1;
	}
	return retorno;
}

//=====================================================================================
//Verifica se a posicao do texto  está sobre o ponteiro
//=====================================================================================
function verificaTexto(posicao, deslocamento, dependencia) {
	var retorno = 0;
	var A = Sim_Endereco_CT(dependencia,0);
	var B = Sim_Endereco_CT(dependencia,1);
	var C = parseInt(posicao);
	var D = parseInt(posicao)+ parseInt(deslocamento);
	if ((B -A)>0)
		retorno = verificaPosicao(posicao, 0, dependencia);
	else
	{
		if (deslocamento < 0) {
			if ((A < C) && (A > D))
				retorno = 1;
		}
		else {
			if ((A < D) && (A > C))
				retorno = 1;
		}
	}
	return retorno;
}

//=====================================================================================
//Desenho o processo para simulacao apartir de uma matriz
// Apos leitura do arquivo
//=====================================================================================
function Sim_Draw_Processo(fileArr) {
	Sim_Inicializa_Array();
	Sim_Draw_Fundo();
	Sim_Context.font = '9pt Arial';
	var ponteiro = 0;
	LoadedImages = 1;
	for (var i=1; i<fileArr.length; i++) {
		//alert('linha '+i);
		var fileLine = fileArr[i].split(',');
		if ((fileLine[1] >0) && (fileLine[1]<10)) {
			if ((fileLine[1] != 1) && (fileLine[1] <5)) {
				ArrayObjDinamic[(i-1)*10+5] = ArrayImagens.length;
				ArrayImagens[ArrayObjDinamic[(i-1)*10+5]] = fileLine[19];
			}
			if (fileLine[1]==1) {
				ArrayObjDinamic[(i-1)*10+5] = ArrayLabel.length;
				ArrayLabel[ArrayObjDinamic[(i-1)*10+5]] = fileLine[19];
			}
			if ((fileLine[1]==6) || (fileLine[1]==7) ) {
				ArrayObjDinamic[(i-1)*10+5] = fileLine[19];
			}
			ArrayObjStatic[(i-1)*20] = fileLine[2];
			ArrayObjStatic[(i-1)*20+1] = fileLine[3];
			ArrayObjStatic[(i-1)*20+2] = fileLine[4];
			ArrayObjStatic[(i-1)*20+3] = fileLine[5];
			ArrayObjStatic[(i-1)*20+4] = fileLine[6];
			ArrayObjStatic[(i-1)*20+5] = fileLine[7];
			ArrayObjStatic[(i-1)*20+6] = fileLine[8];
			ArrayObjStatic[(i-1)*20+7] = fileLine[9];
			ArrayObjStatic[(i-1)*20+8] = fileLine[10];
			ArrayObjStatic[(i-1)*20+9] = fileLine[11];
			ArrayObjStatic[(i-1)*20+10] = fileLine[12];
			ArrayObjStatic[(i-1)*20+11] = fileLine[13];
			ArrayObjStatic[(i-1)*20+12] = fileLine[14];
			ArrayObjStatic[(i-1)*20+13] = fileLine[15];
			ArrayObjStatic[(i-1)*20+14] = fileLine[16];
			ArrayObjStatic[(i-1)*20+15] = fileLine[17];
			ArrayObjStatic[(i-1)*20+16] = fileLine[18];
			ArrayObjStatic[(i-1)*20+17] = fileLine[1];
			ArrayObjStatic[(i-1)*20+18] = fileLine[21];
			ArrayObjStatic[(i-1)*20+19] = fileLine[22];

			ArrayObjDinamic[(i-1)*10] = fileLine[2];
			if (fileLine[3] == "")
				ArrayObjDinamic[(i-1)*10+1] = 0;
			else
				ArrayObjDinamic[(i-1)*10+1] = 1;
			ArrayObjDinamic[(i-1)*10+2] = fileLine[18];
			ArrayObjDinamic[(i-1)*10+3] = fileLine[5];
			ArrayObjDinamic[(i-1)*10+4] = fileLine[8];
			ArrayObjDinamic[(i-1)*10+6] = fileLine[20];
			ArrayObjDinamic[(i-1)*10+9] = fileLine[23];
			if ((ArrayObjStatic[(i-1)*20+17] != 1) && (ArrayObjStatic[(i-1)*20+17] < 5)) {
				LoadImage(Sim_Path + ArrayImagens[ArrayObjDinamic[(i-1)*10+5]] + Extensao[ArrayObjDinamic[(i-1)*10+1]] + '.png', i-1);
			}		
			else {
				if (ArrayObjStatic[(i-1)*20+17] == 1) {
					funcaoLabel(i-1);
				}
				if (ArrayObjStatic[(i-1)*20+17] == 6) {
					Sim_Context.fillText(Sim_EnderecoCT(ArrayObjStatic[(i-1)*20+1],0),ArrayObjStatic[(i-1)*20+3] ,ArrayObjStatic[(i-1)*20+6]);
				}
				if (ArrayObjStatic[(i-1)*20+17] == 7) {
					Sim_Context.fillStyle = 'blue';
					Sim_Context.fillRect(ArrayObjDinamic[(i-1)*10+3], ArrayObjDinamic[(i-1)*10+4], ArrayObjStatic[(i-1)*20+4], ArrayObjStatic[(i-1)*20+7]);
				}
			}
		}
		
		if (fileLine[1] == 'X') {
			FuncaoMatriz[ponteiro]= ponteiro;
			ponteiro++;
			for (var ij=2; ij < 8; ij++){
				FuncaoMatriz[ponteiro] = fileLine[ij];
				ponteiro++;
			};
		}
	};

}

//-----------------------------
//https://stackoverflow.com/questions/32363801/images-not-loaded-on-first-call-in-html-canvas
//---------------------
function LoadImage(imagefile, ij) {
    var image1 = new Image();
	image1.onload = function() {
        Sim_Context.drawImage(Imagens[ArrayObjDinamic[ij*10+5]], ArrayObjDinamic[ij*10+3],ArrayObjDinamic[ij*10+4], ArrayObjStatic[ij*20+4], ArrayObjStatic[ij*20+7]);
		
    };
    image1.src = imagefile;
    Imagens[Imagens.length] = image1;
}

function LoadImageIndex(imagefile, index) {
    var image1 = new Image();
	image1.onload = function() {
    	Sim_Context.drawImage(Imagens[ArrayObjDinamic[index*10+5]], ArrayObjDinamic[index*10+3],ArrayObjDinamic[index*10+4], ArrayObjStatic[index*20+4], ArrayObjStatic[index*20+7]);
	};
    image1.src = imagefile;
    Imagens[ArrayObjDinamic[index*10+5]] = image1;
}

//=====================================================================================
//Desenha area de trabalho em branco
//=====================================================================================
function Sim_Draw_Fundo() {
	Sim_Draw_Inicio();
	Sim_Context.lineWidth = 1;
	Sim_Context.fillStyle = 'white';
	Sim_Context.fillRect(1, 1, 559, 524);
	Sim_Context.fillStyle = 'black';
	Sim_Context.strokeRect(2, 2, 558, 523);
}

//=====================================================================================
// Inicializa o array
//=====================================================================================
function Sim_Inicializa_Array() {
	Imagens =[];
	ArrayImagens = [];
	ArrayLabel = [];
	ArrayObjDinamic = [];
	ArrayObjStatic =[];
	LoadedImages = 0;
}

//=====================================================================================
//Redesenha o processo para simulacao
// Apos leitura do alteracao doarquivo em appsimfuncao.js
//=====================================================================================
function Sim_Redraw_Processo() {
	Sim_Context.font = '9pt Arial';
	var ponteiro = 0;
	for(var i=0; i <(ArrayObjStatic.length/20); i++) {
		if ((ArrayObjStatic[i*20+17] != 1) && (ArrayObjStatic[i*20+17] < 5)) {
			LoadImage(Sim_Path + ArrayImagens[ArrayObjDinamic[i*10+5]] + Extensao[ArrayObjDinamic[i*10+1]] + '.png', i);
		}		
		else {
			if (ArrayObjStatic[i*20+17] == 1) {
				funcaoLabel(i);
			}
			if (ArrayObjStatic[i*20+17] == 6) {
				Sim_Context.fillText(Sim_EnderecoCT(ArrayObjStatic[i*20+1],0),ArrayObjStatic[i*20+3] ,ArrayObjStatic[i*20+6]);
			}
			if (ArrayObjStatic[i*20+17] == 7) {
				Sim_Context.fillStyle = 'blue';
				Sim_Context.fillRect(ArrayObjDinamic[i*10+3], ArrayObjDinamic[i*10+4], ArrayObjStatic[i*20+4], ArrayObjStatic[i*20+7]);
			}
		}
	}
}


