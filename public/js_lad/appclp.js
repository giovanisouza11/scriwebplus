/**
* Software SCRIWEB
*/
//--------------------------------------
//Variaveis globais
//--------------------------------------
var clpM = new Array();
var clpI = new Array();
var clpR = new Array();
var clpQ = new Array();

//O array de TIMER e COUNTER tem dimensao maior que 1
// T[0] = valor binário do temporizador, convere se totalizador é maior que limite
// T[1] = valor totalizado do temporizador
// T[2] = Valor limite do temporizador
var clpT = new Array();

//O array de TIMER e COUNTER tem dimensao maior que 1
// C[0] = valor binário do temporizador, convere se totalizador é maior que limite
// C[1] = valor totalizado do contador
// C[2] = Valor limite do contador
// C[3] = Flag para verificacao do pulso na entrada co contador
var clpC = new Array();

var clp_programa = new Array();
var clp_comandos = 0;
var clp_segundo = 0;
var clp_atraso = 0;
var clp_passo_atual = 0;
var clp_localizacao_prog =0;
		
function clp_AtualizaPorTempo() {
	clp_temporizadores();
	
	if (clp_programa != 0){ 
		if (clp_programa.length > 0 && clp_comandos>0 && clp_comandos<3){
			clp_passo_atual = clp_programa.length - 1;
			clp_programaCLP();
			clp_localizacao_prog = 0;
		}
		if (clp_programa.length > 0 && clp_comandos>2){
			if ((clp_passo_atual >= (clp_programa.length-1)) || (clp_comandos==3)) {
				clp_passo_atual = 0;
				clp_localizacao_prog = 0;
			}
			clp_localizacao_prog++;
			clp_passo_atual++;
			while (clp_programa[passo_atual].charAt(0) =='R') {
				clp_localizacao_prog++;
				clp_passo_atual = clp_passo_atual+2;
				if (clp_passo_atual >= (clp_programa.length-1)) {
					clp_passo_atual = 1;
					clp_localizacao_prog = 1;
				}
			}
			clp_programaCLP();
		}
		if (clp_segundo>10){
			clp_atraso = 0;
			M = clpM;
			R = clpR;
			T = clpT;
			C = clpC;
			Q = clpQ;
			I = clpI;
			localizacao = clp_localizacao_prog;
			liga_led_CLP();
			if (comandos != 0) {
				if (Tela_Eletrico_Simulador == 2)
					monitora_sfc();
				else
					monitora_ladder();
			};
		}
	}
        		
	if (clp_comandos>1) {
		//alert("comandos=0");
		clp_comandos=0;
	}
	if (clp_segundo>10)
		clp_segundo = 0;
	clp_segundo++;
}
//=============================================================================
// Send current time every 0,1 secs
//=============================================================================
var clp_tempo = window.setInterval(clp_AtualizaPorTempo, 100);

//=============================================================================
// Interpreta o programa BOOLEANO
//=============================================================================
function clp_programaCLP(){
	var acumulador;
	var passo;
	if (clp_comandos > 0 && clp_comandos<4){
		for (var aux_tr=0; aux_tr<(clpR.length); aux_tr++)
			clpR[aux_tr] = 0;
	}
	for (passo=0; passo<(clp_passo_atual); passo = passo+2){
		switch (clp_programa[passo]) {
			case 'LD':
				acumulador = clp_le_endereco(clp_programa[passo+1]);
				break;
			case 'LDN':
				acumulador = clp_le_endereco(clp_programa[passo+1]) ? 0 : 1;
				break;
			case 'AND':
				acumulador = acumulador & clp_le_endereco(clp_programa[passo+1]);
				break;
			case 'ANDN':
				acumulador = acumulador & (clp_le_endereco(clp_programa[passo+1]) ? 0 : 1);
				break;
			case 'OR':
				acumulador = acumulador || clp_le_endereco(clp_programa[passo+1]);
				break;
			case 'ORN':
				acumulador = acumulador || (clp_le_endereco(clp_programa[passo+1]) ? 0 : 1);
				break;
			case 'OUT':
				clp_escreve_endereco(clp_programa[passo+1], acumulador);
				break;
			case 'SET':
				if (acumulador == 1)
					clp_escreve_endereco(clp_programa[passo+1], 1);
				break;
			case 'RST':
				if (acumulador == 1)
					clp_escreve_endereco(clp_programa[passo+1], 0);
				break;
			case 'TMR':
				if (acumulador ==1 && clp_le_enderecoCT(clp_programa[passo+1], 1)==0){
					clp_escreve_enderecoCT(clp_programa[passo+1], 1, 1);
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+2],0), 2);
				}
				if (acumulador == 0){
					clp_escreve_enderecoCT(clp_programa[passo+1], 0, 1);
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+2],0), 2);
				}
				passo++;
				break;
			case 'CNR':
				if (acumulador ==1 && clp_le_enderecoCT(clp_programa[passo+1], 3)==0) {
					clp_escreve_enderecoCT(clp_programa[passo+1], 1, 3);
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+1], 1)+1, 1);
				}
				if (clp_le_enderecoCT(clp_programa[passo+1], 3)==2){
					clp_escreve_enderecoCT(clp_programa[passo+1], 0, 0);
					clp_escreve_enderecoCT(clp_programa[passo+1], 0, 1);
					clp_escreve_enderecoCT(clp_programa[passo+1], 0, 3);
				}
				if (acumulador == 0) {
					clp_escreve_enderecoCT(clp_programa[passo+1], 0, 3);
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+2],0), 2);
				}
				if (clp_le_enderecoCT(clp_programa[passo+1], 1) >= clp_le_enderecoCT(clp_programa[passo+1], 2)){
					clp_escreve_enderecoCT(clp_programa[passo+1], 1, 0);
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+1], 2), 1);
				}
				passo++;
				break;
			case 'MOV':
				if (acumulador == 1)
					clp_escreve_enderecoCT(clp_programa[passo+2], clp_le_enderecoCT(clp_programa[passo+1],1),1);
				passo++;
				break;
			case '+':
				if (acumulador == 1)
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+1],1)+clp_le_enderecoCT(clp_programa[passo+2],1),1);
				passo++;
				break;
			case '-':
				if (acumulador == 1)
					clp_escreve_enderecoCT(clp_programa[passo+1], clp_le_enderecoCT(clp_programa[passo+1],1)-clp_le_enderecoCT(clp_programa[passo+2],1),1);
				passo++;
				break;
			case 'PLS':
				if (acumulador == 0)
					clp_escreve_endereco(clp_programa[passo+1], 0);
				if (acumulador == 1 && clp_le_endereco(clp_programa[passo+1])==1)
					acumulador = 0;
				if (acumulador == 1 && clp_le_endereco(clp_programa[passo+1])==0) {
					clp_escreve_endereco(clp_programa[passo+1], 1);
					acumulador = 1;
				}
				break;
			case '>':
				acumulador = acumulador & (clp_le_enderecoCT(clp_programa[passo+1],1) > clp_le_enderecoCT(clp_programa[passo+2],1) ? 1 : 0);
				passo++;
				break;
			case '<':
				acumulador = acumulador & (clp_le_enderecoCT(clp_programa[passo+1],1) < clp_le_enderecoCT(clp_programa[passo+2],1) ? 1 : 0);
				passo++;
				break;
			case '=':
				acumulador = acumulador & (clp_le_enderecoCT(clp_programa[passo+1],1) == clp_le_enderecoCT(clp_programa[passo+2],1) ? 1 : 0);
				passo++;
				break;
			case '>=':
				acumulador = acumulador & (clp_le_enderecoCT(clp_programa[passo+1],1) >= clp_le_enderecoCT(clp_programa[passo+2],1) ? 1 : 0);
				passo++;
				break;
			case '<=':
				acumulador = acumulador & (clp_le_enderecoCT(clp_programa[passo+1],1) <= clp_le_enderecoCT(clp_programa[passo+2],1) ? 1 : 0);
				passo++;
				break;
			case '<>':
				acumulador = acumulador & (clp_le_enderecoCT(clp_programa[passo+1],1) != clp_le_enderecoCT(clp_programa[passo+2],1) ? 1 : 0);
				passo++;
				break;
		}
	}
	clp_passo_atual = passo;
}
//=============================================================================
// encontra o maior index para criar todo o array
//=============================================================================
function clp_cria_memoria(){
	var tipo_memoria = ['I','Q','M','R','C','T'];
	var ultimo_endereco;
	var auxiliar;
	for (var funcao=0;funcao<6; funcao++) {
		ultimo_endereco = 0;
		for (var passo=0; passo<(clp_programa.length)-1; passo = passo+2){
			if (funcao < 6) {
				auxiliar = procura_max_endereco(tipo_memoria[funcao], clp_programa[passo+1]);
				if (auxiliar > ultimo_endereco)
					ultimo_endereco = auxiliar;
				if (clp_programa[passo] == 'TMR' || clp_programa[passo] == 'CNR' || clp_programa[passo] == 'MOV' || clp_programa[passo] == '<' || clp_programa[passo] == '>' || clp_programa[passo] == '<=' || clp_programa[passo] == '>=' || clp_programa[passo] == '='){
					auxiliar = procura_max_endereco(tipo_memoria[funcao], clp_programa[passo+2]);
					if (auxiliar > ultimo_endereco)
						ultimo_endereco = auxiliar;
					passo++;
				}
			}
		}
		for (var i=0; i<(ultimo_endereco+1); i++) {
			switch (tipo_memoria[funcao]) {
				case 'Q':
					clpQ[i] = 0;
					break;
				case 'I':
					clpI[i] = 0;
					break;
				case 'M':
					clpM[i] = 0;
					break;
				case 'R':
					clpR[i] = 0;
					break;
				case 'T':
					clpT[3*i] = 0;
					clpT[3*i+1] = 0;
					clpT[3*i+2] = 0;
					break;
				case 'C':
					clpC[4*i] = 0;
					clpC[4*i+1] = 0;
					clpC[4*i+2] = 0;
					clpC[4*i+3] = 0;
					break;
			}
		}
	}
}

//======================================================================
//procura o endereco maior
//=======================================================================
function procura_max_endereco(Operando, Aux_data)
{
	var index = 0;
	if (Aux_data != undefined){
		if (Aux_data.charAt(0) == Operando) {
			if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
				var ponto = Aux_data.indexOf('.');
				if (ponto == -1)
					index = (parseInt(Aux_data.substr(1))+1) *16;
				else
					index = (parseInt(Aux_data.charAt(ponto-1)) *16)+ parseInt(Aux_data.substr(ponto+1));
			}
			else {
				index = parseInt(Aux_data.substr(1));
			}
		}
		else
			index = 0;
	}
	return index;
}

//======================================================================
//retira o valor da funcao Q/E/M
//=======================================================================
function clp_le_endereco(Aux_data)
{
	var index;
	var retorno;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
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
			retorno = clpQ[index];
			break;
		case 'I':
			retorno = clpI[index];
			break;
		case 'M':
			retorno = clpM[index];
			break;
		case 'R':
			retorno = clpR[index];
			break;
		case 'T':
			retorno = clpT[3*index];
			break;
		case 'C':
			retorno = clpC[4*index];
			break;
		default:
			retorno = parseInt(Aux_data.substr(1));
	}
	return parseInt(retorno);
}
//======================================================================
//retira o valor da funcao T/C
//=======================================================================
function clp_le_enderecoCT(Aux_data, index1)
{
	var index;
	var retorno;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
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
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + clpI[index+ ia]* (2**ia);
			break;
		case 'Q':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + clpQ[index+ ia]* (2**ia);
			break;
		case 'M':
			retorno = 0;
			for (var ia=0; ia<16; ia++)
				retorno = retorno + clpM[index+ ia]* (2**ia);
			break;
		case 'T':
			retorno = clpT[3*index+ index1];
			break;
		case 'C':
			retorno = clpC[4*index+ index1];
			break;
		default:
			if (parseInt(Aux_data) < 32767)
				retorno = Aux_data;
	}
	return parseInt(retorno);
}

//======================================================================
//ESCREVE o valor da funcao Q/E/M
//=======================================================================
function clp_escreve_endereco(Aux_data, valor)
{
	var index;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
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
			clpQ[index] = valor;
			break;
		case 'I':
			clpI[index] = valor;
			break;
		case 'M':
			clpM[index] = valor;
			break;
		case 'R':
			clpR[index] = valor;
			break;
		case 'T':
			clpT[3*index+1] = valor;
			break;
		case 'C':
			//C[4*index+1] = valor;
			//C[4*index] = 0;
			//no contador para que o valor fique ativo por um ciclo, o reset seta o flag=2
			clpC[4*index+3] = 2;
			break;
	}
}

//======================================================================
//ESCREVE o valor da funcao T/C
//=======================================================================
function clp_escreve_enderecoCT(Aux_data, valor, index1)
{
	var index;
	if (Aux_data.charAt(0) != 'R' && Aux_data.charAt(0) != 'C' && Aux_data.charAt(0) != 'T'){
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
				var auxiliar = valor %2;
				clpI[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			clpI[index+15] = valor;
			break;
		case 'Q':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = valor %2;
				clpQ[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
			}
			clpQ[index+15] = valor;
			break;
		case 'M':
			for (var ia=0; ia<=14; ia++) {
				var auxiliar = valor %2;
				clpM[index+ ia] = auxiliar;
				valor = parseInt(valor / 2);
				//alert('M['+(index+ia) +'] = ' + auxiliar);
			}
			clpM[index+15] = valor;
			//alert('M['+(index+15) +'] = ' + valor);
			break;
		case 'T':
			clpT[3*index+index1] = valor;
			break;
		case 'C':
			clpC[4*index+index1] = valor;
			break;
	}
}

//======================================================================
//Controla Temporizadores
//=======================================================================
function clp_temporizadores()
{
	for (var i = 0; i<= (clpT.length/3); i++ ){
		if (clpT[3*i + 1] > 0)
			clpT[3*i+1] = parseInt(clpT[3*i+1]) + 1;
		if (clpT[3*i + 1] >= clpT[3*i+2]){
			clpT[3*i+1] = clpT[3*i+2];
			clpT[3*i] = 1;
		}
		else
			clpT[3*i] = 0;
	}	
}
