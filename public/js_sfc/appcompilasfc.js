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
	//alert("ola mendo");
	var si = 0;
	//var booleano = new Array();
	var index_bool = 0;
	wahile( si < (lArrayEstado.length/30)) {
		for (var sj=0; sj<8; sj++){
			if(lArrayEstado[si*30+17+sj] != "undefined"){
				if ( lArrayTransicao[lArrayEstado[si*30+17+sj]] != (-1)) {
					booleano[index_bool] = "LD";
	index_bool++;				
booleano[index_bool] = lArrayEstado[lArrayTransicao[lArrayEstado[si*30+17+sj]]+2];
index_bool++ ;
				}
				else {
					booleano[index_bool] = "LD";
index_bool++;
					booleano[index_bool] = 1;
index_bool++;
				}
					
				for(var sz=0; sz<6; sz++){
					if ( lArrayTransicao[lArrayEstado[si*30+17+sj]+2+sz] != "undefined") { 
						booleano[index_bool] = "AND";
					        booleano[index_bool] = lArrayTransicao[lArrayEstado[si*30+17+sj]+2+sz];
					}
				}
				booleano[index_bool] = "SET";
				booleano[index_bool] = "R" + si;
			}
		}
	        booleano[index_bool] = "LD";
		booleano[index_bool] = "R"+si;
		booleano[index_bool] = "SET";
		booleano[index_bool] = lArrayEstado[si*30+2];
		for(var sz=0; sz<6; z++){
			if ( lArrayEstado[si*30+17+sz] != "undefined") { 
				booleano[index_bool] = "RST";
			        booleano[index_bool] = lArrayEstado[lArrayTransicao[lArrayEstado[si*30+17+sz]*20]+2];
			}
		}
		si++;					
	}
}

//--------------------------------------------------
// funcao compila e pre-compila logicas ladder
//----------------------------------------------
function converte_sfc_ladder(){
	}
