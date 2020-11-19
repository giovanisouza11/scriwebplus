//-----------------------------------------------------------------------------------
//Vari�veis utilizadas na convers�o
//-----------------------------------------------------------------------------------
var booleano = new Array(); //programa booleano
var posicao_ladder  = new Array(); //posi��o do comando booleano no ladder. (Linha x10 + Coluna)
var ib = 0; // Index do programa booleano
var ibl = 0; //index para posicao ladder no booleano
var itr = 0;
var pos_Logica = new Array();

//=====================================================================================
// Converte programa LADDER -> BOOLEANO
// A cada deriva��o vertical coloca uma fun��o SET
// Na primeira liga��o horizontal da linha, tamb�m coloco fun��o SET, despreza as outras
//======================================================================================
function compila_ladder(){
	//
	//Inclui/completa o array, quando existir uma nova linha não continua
	//
	var texto = '';
	for (var auxi=0; auxi<(larray.length/9); auxi++) {
		for (var j=0; j<9; j++)
		    texto += larray[(auxi*9)+j]+',';
	}

	var atexto = texto.split(',');
	for (var auxi=0; auxi<(atexto.length/9); auxi++) {
		for (var j=0; j<9; j++)
			larray[(auxi*9)+j] = atexto[(auxi*9)+j];
	}

	zera_tr();
	zera_booleano();
	ib = 0;
	ibl = 0;
	var i = 0;
	var linha_final;
	var fim_logica;
	var deslocamento = 0;
	var coluna_derivacao = 0;
	var coluna_derivacao_anterior = -1;
	var offset;
	var coluna_derivacao1 = 0;
	var coluna_inicio;
	itr = 0;
	for(var auxi=0; auxi < Num_Linhas; auxi++){
		context2.fillStyle = 'red';
		context2.clearRect(10, (13+auxi*60), 20, 12);
	}
	//PROCURA PROXIMA linha
	do {
		//Procura próxima ligação vertical na linha
		context2.fillStyle = 'red';
		context2.fillText(i, 10, (25+i*60));
		pos_Logica[pos_Logica.length] = i;
		do {
			do {
				coluna_derivacao = procura(i, coluna_derivacao_anterior+1, 6);
				//Verifica quantas linhas estão ligadas nesta coluna, via ligação vertical
				offset = 0;
				if (coluna_derivacao >(-1) && coluna_derivacao < 7) {
					offset = derivacao_linha(i, coluna_derivacao);
					for (var ai=(i+1); ai < (i+1+offset); ai++){
						if (coluna_derivacao>0) {
							coluna_inicio = volta_derivacao(ai, coluna_derivacao);
						}
						else
							coluna_inicio = 0;
						if (larray[ai*8*9 + coluna_inicio*9 + 3] != "undefined"){
							if (coluna_inicio >0 ) {
								if (larray[(ai-1)*8*9 + (coluna_inicio-1)*9 + 5]>1)
									coluna_derivacao1 = procura(ai, coluna_inicio, coluna_derivacao);
							}
							else {
								coluna_derivacao1 = procura(ai, 0, coluna_derivacao);
							}
						}
					}
					if (offset>deslocamento)
						deslocamento = offset;
				}
				coluna_derivacao_anterior = coluna_derivacao;
			} while (coluna_derivacao_anterior<7);
			coluna_derivacao_anterior = -1;
			linha_final = fim_linha(i);
			if (linha_final < deslocamento) {
				fim_logica = false;
				for( var cf=(i+linha_final+1); cf<(i+deslocamento+1); cf++) {
					//CbooleanoTR('xxxxxxx', deslocamento, cf);
					if ((larray[cf*8*9 + 7*9 + 3]>2) && larray[cf*8*9 + 7*9 + 3]<9) {
						coluna_derivacao_anterior = procura_coluna_inicio(cf);
						deslocamento = deslocamento -cf + i + linha_final;
						i = cf; //i + cf;
						fim_logica = false;
						break;
					};
					fim_logica = true;
				};
			}
			else {
				fim_logica = true;
			};
		} while (fim_logica == false);
		i = i + 1 + deslocamento;
		deslocamento = 0;
	} while (i <  (larray.length/(8*9)));
}

//=====================================================================================
// Procura proxima ligacao vertical enquanto preenche o BOOLEANO
//======================================================================================
function procura(linha, inicio, fim){
	var num_linhas = 0;
	for(var j = inicio; j < (fim+1); j++) {
		if (j == 0){
			switch (larray[linha*8*9 + j*9 + 3]) {
				case '1':
					Cbooleano('LD',(linha*8*9 + j*9));
					break;
				case '2':
					Cbooleano('LDN',(linha*8*9 + j*9));
					break;
				case '9':
					booleano[ib] = 'LD';
					ib++;
					booleano[ib] = 1;
					ib++;
					posicao_ladder[ibl] = larray[linha*8*9 + j*9];
					ibl++;
					Cbooleano('PLS',(linha*8*9 + j*9));
					break;
				case '8':
				case '10':
					booleano[ib] = 'LD';
					ib++;
					booleano[ib] = 1;
					ib++;
					posicao_ladder[ibl] = larray[linha*8*9 + j*9];
					ibl++;
					CbooleanoTC(larray[linha*8*9 + j*9 + 8],(linha*8*9 + j*9));
					break;
			}
		}
		else {
			if (larray[linha*8*9 + (j-1)*9 + 5]>0)
				CbooleanoTR('LD', ('R' + larray[(linha*8*9) + (j-1)*9+5]/10), (linha*8*9 + j*9));
			else if (linha>0) {
				 if (larray[(linha-1)*8*9 + (j-1)*9 + 5]>0)
					CbooleanoTR('LD', ('R' + larray[((linha-1)*8*9) + (j-1)*9+5]/10), (linha*8*9 + j*9));
			}
			switch (larray[linha*8*9 + j*9 + 3]) {
				case '1':
					Cbooleano('AND' , (linha*8*9 + j*9));
					break;
				case '2':
					Cbooleano('ANDN' , (linha*8*9 + j*9));
					break;
				case '8':
					CbooleanoTC(larray[linha*8*9 + j*9 + 8] , (linha*8*9 + j*9));
					break;
				case '9':
					Cbooleano('PLS' , (linha*8*9 + j*9));
					break;
				case '10':
					CbooleanoTC(larray[linha*8*9 + j*9 + 8] , (linha*8*9 + j*9));
					break;
			}
			if (larray[linha*8*9 + j*9 + 3]==11 && larray[linha*8*9 + (j-1)*9 + 3] != 11 && (larray[linha*8*9 + (j-1)*9 + 5]==0 || larray[linha*8*9 + (j-1)*9 + 5] == "undefined")){
				itr++;
				larray[linha*8*9 + j*9 + 2] = 'R' + itr;
				CbooleanoTR('SET', ('R' + itr), (linha*8*9 + j*9));
			}
			if (larray[linha*8*9 + j*9 + 3]==11 && larray[linha*8*9 + (j-1)*9 + 3] == 11 && (larray[linha*8*9 + (j-1)*9 + 5]==0 || larray[linha*8*9 + (j-1)*9 + 5] == "undefined"))
				larray[linha*8*9 + j*9 + 2] = larray[linha*8*9 + (j-1)*9 + 2];
			if (larray[linha*8*9 + j*9 + 3]==11 && larray[linha*8*9 + (j-1)*9 + 5]>0)
				larray[linha*8*9 + j*9 + 2] =  'R' + larray[linha*8*9 + (j-1)*9 + 5]/10;
		}

		if (larray[linha*8*9 + j*9 + 5] > 0) {
			itr++;
			if (linha>0)
			  	if (larray[(linha-1)*8*9 + j*9 + 5] > 0)
		 				itr--;
		}

		if (larray[linha*8*9 + j*9 + 5] > 0) {
			num_linhas = 0;
			if (larray[(linha-1)*8*9 + j*9 + 5] > 0 && (linha > 0)){
				CbooleanoTR('SET', ('R' + (larray[(linha-1)*8*9 + j*9 + 5]/10)), ((linha+num_linhas)*8*9 + j*9));
				larray[(linha+num_linhas)*8*9 + j*9 + 5] =  larray[(linha-1)*8*9 + j*9 + 5];
			}
			else {
				CbooleanoTR('SET', ('R' + itr), ((linha+num_linhas)*8*9 + j*9));
				larray[(linha+num_linhas)*8*9 + j*9 + 5] =  itr * 10;
			}
			break;
		}
		if (linha>0 && j==fim) {
			if (larray[(linha-1)*8*9 + j*9 + 5] > 0){
				num_linhas = 0;
				CbooleanoTR('SET', ('R' + larray[(linha-1)*8*9 + j*9 + 5]/10), ((linha+num_linhas)*8*9 + j*9));
				break;
			}
		}
	}
	return j;
}

//=====================================================================================
//Constrói o ARRAY booleano para as funções
//======================================================================================
function Cbooleano(funcao, endereco){
	booleano[ib] = funcao;
	ib++;
	booleano[ib] = larray[endereco+2];
	ib++;
	posicao_ladder[ibl] = larray[endereco];
	ibl++;
}

//=====================================================================================
//Constrói o ARRAY booleano para as funções
//======================================================================================
function CbooleanoTC(funcao, endereco){
	booleano[ib] = funcao;
	ib++;
	booleano[ib] = larray[endereco+2];
	ib++;
	booleano[ib] = larray[endereco+4];
	ib++;
	posicao_ladder[ibl] = larray[endereco];
	ibl++;
}

//=====================================================================================
//Constrói o ARRAY booleano para uma derivação
//======================================================================================
function CbooleanoTR(funcao, endereco, posicao){
	booleano[ib] = funcao;
	ib++;
	booleano[ib] = endereco;
	ib++;
	posicao_ladder[ibl] = larray[posicao];
	ibl++;
}

//=====================================================================================
//Inicializa todas as váriais de derivação de linha com o valor 1 ou zero
//======================================================================================
function zera_tr(){
	for(var i=0; i<(larray.length/9); i++)
		if (larray[i*9+5]>1)
			larray[i*9+5] = 1;
}

//=====================================================================================
//Inicializa o ARRAY booleano através da indicação de seu tamanho
//======================================================================================
function zera_booleano(){
		booleano.length = 0;
		posicao_ladder.length = 0;
		pos_Logica.length = 0;
}

//=====================================================================================
//Procura o numero de linhas ligado a coluna -> offset
//======================================================================================
function derivacao_linha(linha, coluna){
	var retorno=0;
	do {
		larray[(linha+retorno)*8*9 + coluna*9 + 5] = itr*10;
		retorno++;
	} while (larray[(linha+retorno)*8*9 + coluna*9 + 5] > 0 );
	return retorno;
}

//=====================================================================================
// Procura o ponto inicial(coluna, derivação ou vazio) para uma linha ligada a uma derivação
//======================================================================================
function volta_derivacao(linha, coluna){
	var retorno = 0;
	for(var jp=coluna; jp>-1; jp--) {
		//Incluido &&
		if (larray[linha*8*9 + jp*9 + 3] <1 || (larray[linha*8*9 + jp*9 + 3] >2 && larray[linha*8*9 + jp*9 + 3] <8) || larray[linha*8*9 + jp*9 + 3] === "undefined"){
			retorno = jp;
			jp = 0;
			break;
		}
		if (larray[linha*8*9 + (jp-1)*9 + 5] > 1) {
				retorno = jp;
				jp = 0;
				break;
		}
		if (larray[(linha-1)*8*9 + (jp-1)*9 + 5] > 1) {
				retorno = jp;
				jp = 0;
				break;
		}
		retorno = jp;
	}
	return retorno;
}

//=====================================================================================
//Completa a linha
//======================================================================================
function fim_linha(linha){
	var linha_anterior = linha;
	if (larray[(linha*8*9) + (6)*9+5]>0)
		CbooleanoTR('LD', ('R' + larray[(linha*8*9) + (6)*9+5]/10), (linha*8*9 + (7)*9));
	else if (larray[(linha*8*9) + (7)*9+3]>2 || larray[(linha*8*9) + (7)*9+3]<8)
		CbooleanoTR('LD', (larray[(linha*8*9) + (6)*9+2]), (linha*8*9 + (7)*9));
	funcao_fim_linha(linha);
	while (larray[(linha*8*9) + (6)*9+5]>0) {
		linha++;
		funcao_fim_linha(linha);
	}
	return (linha - linha_anterior);
}
//=====================================================================================
//Coloca a função no fim de linha
//======================================================================================
function funcao_fim_linha(linha){
	//++++++++++++++++++++++++++++++++++
	//document.getElementById("label_input").innerHTML = larray[linha*8*9 + 7*9 + 3];

	switch (larray[linha*8*9 + 7*9 + 3]) {
		case '3':
			Cbooleano('OUT',(linha*8*9 + (7)*9));
			break;
		case '4':
			Cbooleano('SET',(linha*8*9 + (7)*9));
			break;
		case '5':
		case '25':
			Cbooleano('RST',(linha*8*9 + (7)*9));
			break;
		case '6':
			CbooleanoTC('TMR',(linha*8*9 + (7)*9));
			break;
		case '7':
			CbooleanoTC('CNR',(linha*8*9 + (7)*9));
			larray[((linha+1)*8*9) + (7)*9+2] = larray[(linha*8*9) + (7)*9+2];
			larray[((linha+1)*8*9) + (7)*9+3] = '25';
			larray[((linha+1)*8*9) + (7)*9] = (linha+1)*10 + 7;
			break;
		case '8':
			CbooleanoTC(larray[linha*8*9 + (7)*9 + 8],(linha*8*9 + (7)*9));
			break;
	}
}

//=====================================================================================
// Procura ligacao vertical anterior com valor maior que 1
//======================================================================================

function procura_coluna_inicio(linha){
	var coluna0 = 0;

	for(var col = 6; col > -1; col--) {
		if (larray[(linha-1)*8*9 + col*9 + 5]>1){
			coluna0 = col;
			break;
		}
	}
	return coluna0;
}
