//-----------------------------------------------------------------------------------
//Vari�veis utilizadas na convers�o
//-----------------------------------------------------------------------------------
// lArrayEstado = (LinhaColuna, 1-NUM_ESTADO,2-Memoria,3-Estado de chegada1,..,..,..,..,8-Estado de chegada5,
//                 9-Estado_Destino 1,..,..,..,..,..,..,16-Estado_DEstino8,
//                 17-Ação1,..,..,..,..,..,..,24-Ação 8,25-se estado 0 númerodememórias, 26-TAMANHO,27-Reserva,28-Reserva,29-Reserva
// lArrayTransiçao = (Estado origem, 1-estado destino, 2-Condoção 1,..,..,..,..,..,8-Condição 7,9-ponto1,10-ponto2,11-ponto3,12-ponto4,13-ponto5,14ponto6,15-Res,16-Res,17-Res,18-Res,19-res)

//=====================================================================================
// Converte programa LADDER -> BOOLEANO
// A cada deriva��o vertical coloca uma fun��o SET
// Na primeira liga��o horizontal da linha, tamb�m coloco fun��o SET, despreza as outras
//======================================================================================
function compila_sfc(){
	alert("ola mendo");
/*	var si = 0;
	//var booleano = new Array();
	var index_str = 0;
	while( si < (lArrayEstado.length /30)) {
		for (int sj=0; sj<8; sj++){
			if(lArrayEstado[si*30+17+sj] != "undefined"){
				if ( lArrayTransicao[lArrayEstado[si*30+17+sj]] != (-1)) {
					booleano[booleano.length] = 'LD';
					booleano[booleano.length] = lArrayEstado[lArrayTransicao[lArrayEstado[si*30+17+sj]]+2];
				}
				else {
					booleano[booleano.length] = 'LD';
					booleano[booleano.length] = 1;
				}
					
				for(var sz=0; sz<6; z++){
					if ( lArrayTransicao[lArrayEstado[si*30+17+sj]+2+sz] != (-1)) { 
						booleano[booleano.length] = 'ÁND';
					        booleano[booleano.length] = lArrayTransicao[lArrayEstado[si*30+17+sj]+2+sz];
					}
				}
				booleano[booleano.length] = 'SET';
				booleano[booleano.length] = 'R' + index_str;
			}
		}
	        booleano[booleano.length] = 'LD';
		booleano[booleano.length] = 'R'+index_str;
		booleano[booleano.length] = 'SET';
		booleano[booleano.length] = lArrayEstado[si*30+2];
		for(var sz=0; sz<6; z++){
			if ( lArrayEstado[si*30+17+sz] != (-1)) { 
				booleano[booleano.length] = 'RST';
			        booleano[booleano.length] = lArrayEstado[lArrayransicao[lArrayEstado[si*30+17+sz]*20]+2];
			}
		}
		si++;					
	}
*/		
}

//--------------------------------------------------
// funcao compila e pre-compila logicas ladder
//----------------------------------------------
function converte_sfc_ladder(){
	}
