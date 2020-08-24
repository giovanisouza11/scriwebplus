/**
* Software SCRIWEB
*/
//--------------------------------------
//Variaveis globais
//--------------------------------------
var clp= new Array();
var sup= new Array();
var ativo = true;
var M = new Array();
var I = new Array();
var R = new Array();
var Q = new Array();

//O array de TIMER e COUNTER tem dimensao maior que 1
// T[0] = valor binário do temporizador, convere se totalizador é maior que limite
// T[1] = valor totalizado do temporizador
// T[2] = Valor limite do temporizador
var T = new Array();

//O array de TIMER e COUNTER tem dimensao maior que 1
// C[0] = valor binário do temporizador, convere se totalizador é maior que limite
// C[1] = valor totalizado do contador
// C[2] = Valor limite do contador
// C[3] = Flag para verificacao do pulso na entrada co contador
var C = new Array();

var programa1 = new Array();
var comandos = 0;
var segundo = 0;
var atraso = 0;
var atualiza_entrada = 0;

//Variaveis para CLP SOCKET
var MS = new Array();
var IS = new Array();
var RS = new Array();
var QS = new Array();
var TS = new Array();
var CS = new Array();
var comandosS = new Array();
var programaS = new Array();
var atualizaS = new Array();
var PA = new Array();
var LP = new Array();
//-----------------------------------------
//Iniciando servidor HTTP
//-----------------------------------------
if (ativo) {
    	const PORT = process.env.PORT || 4333;	
    	var path = require('path');
    	var express = require('express');
    	var app = express();
    	var router = express.Router();
    	var server = require('http').Server(app);
    	var io = require('socket.io')(server);

    	app.use(express.static(__dirname + '/public'));
    	app.use('/simulacao', express.static('/scriweb/simulacao'));
    	app.use('/ladder',express.static('/scriweb/ladder'));
    	app.get('/', function(req, res) {
        	res.sendFile(__dirname + '/scriweb.html');
    	});
    	app.get('/config',function(req,res){
        	res.sendFile(__dirname + '/scriwebconfig.html');
    	});
    	app.get('/about',function(req,res){
        	res.sendFile(__dirname + '/scriwebabout.html');
    	});
    	app.get('/help',function(req,res){
        	res.sendFile(__dirname + '/scriwebhelp.html');
    	});
    	app.get('/simulador',function(req,res){
        	res.sendFile(__dirname + '/simscriweb.html');
    	});
    	app.get('/servidor',function(req,res){
        	res.sendFile(__dirname + '/servidor.html');
    	});
    	app.get('/configsim',function(req,res){
        	res.sendFile(__dirname + '/simconfig.html');
    	});
    	app.get('/helpsim',function(req,res){
        	res.sendFile(__dirname + '/simhelp.html');
    	});
	app.get('/popup',function(req,res){
        	res.sendFile(__dirname + '/popup.html');
    	});
    	server.listen(PORT,function() {
 		//JanelaElectron();
		console.log("__________________________________________________________________");
    		console.log("|      SUPERVISORIO WEB INFORMATICA INDUSTRIAL rodando!           |");
    		console.log("| Neste servidor foi gerado uma pagina HTML                       |");
    		console.log("|                                                                 |");
    		console.log("| Execute no Browser para criar/alterar/monitorar LADDER.         |");
    		console.log("|    localhost:4333 ou XXX.XXX.XXX.XXX:4333                       |");
    		console.log("| Execute no Browser para Supervisão/simular processo Industrial.|");
    		console.log("|    localhost:4333/simulador ou XXX.XXX.XXX.XXX:4333/simulador   |");
    		console.log("___________________________________________________________________");
    	});
}

// Iniciando Socket.IO
// Emitindo messagem de conexao estabelecida
if (ativo) {
    	io.sockets.on('connection', function(socket) {
    		io.emit('time', { time: new Date().toJSON() });
        
		socket.on('disconnect', function(data) {
        		for(var x=0; x<(clp.length/2); x++){
				if (socket.id == clp[x*2+1]){
					socket.leave(clp[x*2]);
					clp[x*2] = 'k';
					console.log('Escreveu clp['+x+'] = K');
				}
				if (socket.id == sup[x*2+1]){
					socket.leave(sup[x*2]);
					sup[x*2] = 'k';
					console.log('Escreveu SUP['+x+'] = K');
				}
				if ((clp[x*2]== 'k' && sup[x*2]== 'k') ||(clp[x*2]== undefined || sup[x*2]== undefined)){
					atualizaS.splice(x,1);
					MS.splice(x,1);
					IS.splice(x,1);
					RS.splice(x,1);
					QS.splice(x,1);
					TS.splice(x,1);
					CS.splice(x,1);
					comandosS.splice(x,1);
					programaS.splice(x,1);
					PA.splice(x,1);
					LP.splice(x,1);
					clp.splice(x*2,2);
					sup.splice(x*2,2);
					console.log('Escreveu SUP['+x+'] e CLP['+x+']= 0');
				}
	   		}
	   		console.log(" DISconnect SOCKET.ID=",socket.id);
        	});
        	console.log(" connect SOCKET.ID=",socket.id);
		socket.on('connect', function(data) {
			var x;
			console.log('Escreveu VAR xX = '+ x);
	   		for(x=0; x<(clp.length/2); x++){
				if (socket.id == clp[x*2+1]){
					socket.leave(clp[x*2]);
					break;
	   			}
	   		}
	   		clp[x*2]= data;
	   		clp[x*2+1] = socket.id;
  	   		PA[x]=0;
	   		LP[x]=0;
           		socket.join(data);
	   		console.log('Escreveu clp['+data+'] = '+socket.id);
		});
		socket.on('clp', function(data) {
	   		var x;
	   		console.log('Escreveu VAR x = '+ x);
			for(x=0; x<(clp.length/2); x++){
				if (socket.id == clp[x*2+1]){
					socket.leave(clp[x*2]);
					console.log('Escreveu VAR x1 = '+ x);
					break;
				}
	   		}
	   		clp[x*2]= data;
	   		clp[x*2+1] = socket.id;
  	   		PA[x]=0;
	   		LP[x]=0;
           		socket.join(data);
	   		console.log('Escreveu clp['+data+'] = '+socket.id);
		});
   		socket.on('sup', function(data) {
	   		var x;
			console.log('Escreveu VAR x = '+ x);
	   		for(x=0; x<(clp.length/2); x++){
				if (data == clp[x*2]){
					socket.leave(sup[x*2]);
					break;
				}
	   		}
	   		sup[x*2]= data;
	   		sup[x*2+1] = socket.id;
  	   		socket.join(data);
	   		console.log('Escreveu clp['+data+'] = '+socket.id);
		});
		socket.on('programax', function(data) {
			var data1 = programa1[programa1.length-1];
			var x=verifica_clp(data1, socket);
			console.log('PROGRAMAX '+ data);
			console.log('clp '+ clp);
			
			programa1 = data.split(',');
			cria_memoria();
			atualiza_entrada = 1;
			atualizaS[x] = 1;
			MS[x] = M.join();
			IS[x] = I.join();
			RS[x] = R.join();
			QS[x] = Q.join();
			TS[x] = T.join();
			CS[x] = C.join();
			comandosS[x] = comandos;
			programaS[x] = programa1.join();
			console.log('PROGRAMAS '+ programaS);
			PA[x]=0;
			LP[x]=0;
		});
        	socket.on('comandosx', function(data) {
        		var x = verifica_clp(data[1], socket);
			comandosS[x] = data[0];
			comandos = data[0];
        	});
        	socket.on('entradax', function(data) {
            		I = data.split(',');
			var data1 = I[I.length-1]
			var x = verifica_clp(data1, socket);
			I.length = I.length-1;
			atualizaS[x] = 1;
			IS[x] = I.join();
			atualiza_entrada = 1;
        	});
        	socket.on('memoriax', function(data) {
        		aux = data.split(',');
			console.log(data);
			var data1 = aux[2];
			var x =	verifica_clp(data1, socket);
			if (MS[x] != undefined)
				M = MS[x].split(`,`);
			if (IS[x] != undefined)
				I = IS[x].split(`,`);
			if (RS[x] != undefined)
				R = RS[x].split(`,`);
			if (QS[x] != undefined)
				Q = QS[x].split(`,`);
			if (TS[x] != undefined)
				T =TS[x].split(`,`);
			if (CS[x] != undefined)
				C = CS[x].split(`,`);
	
	            	escreve_enderecoCT(aux[0], aux[1],1);
			MS[x] = M.join();
			IS[x] = I.join();
			RS[x] = R.join();
			QS[x] = Q.join();
			TS[x] = T.join();
			CS[x] = C.join();
		});
        	socket.on('trx', function(data) {
			R = data.split(',');
			data1 = R[R.length-1]
			var x = verifica_clp(data1, socket);
			RS[x] = R.join();
		});
   	});

   	function verifica_clp(data1, socket){
		var x=0;
		console.log('Escreveu PROGRAMAX x2 = '+ x);
		
		while(data1 != clp[x*2] || clp[x*2] != undefined){
			x++;
		}
		if (clp[x*2] == undefined){
			clp[x*2]= data1;
	   		clp[x*2+1] = socket.id;
  	   		PA[x]=0;
	   		LP[x]=0;
           		socket.join(data1);
		}
		console.log('Escreveu PROGRAMAX x3 = '+ x);
		
		return x;
  	}
//=============================================================================
// Send current time to all connected clients
//=============================================================================
	var passo_atual = 0;
	var localizacao_prog =0;
		
	function AtualizaPorTempo() {
		temporizadores();
	
   		for(var clp_index=0; clp_index<(clp.length/2); clp_index++){	
			if (MS[clp_index] != undefined)
				M = MS[clp_index].split(`,`);
			if (IS[clp_index] != undefined)
				I = IS[clp_index].split(`,`);
			if (RS[clp_index] != undefined)
				R = RS[clp_index].split(`,`);
			if (QS[clp_index] != undefined)
				Q = QS[clp_index].split(`,`);
			if (TS[clp_index] != undefined)
				T =TS[clp_index].split(`,`);
			if (CS[clp_index] != undefined)
				C = CS[clp_index].split(`,`);
			if (programaS[clp_index] != undefined)
				programa1 = programaS[clp_index].split(`,`);
			else
				programa1 = 0;
		   	//console.log(clp_index+' '+clp[clp_index*2]+' '+clp[clp_index*2+1]+' '+programa1[0]+programa1[1]+' '+I[0]+' '+Q[0]+' '+M[0]+' '+T[0]);
			atualiza_entrada = atualizaS[clp_index];
			comandos = comandosS[clp_index];
			passo_atual = PA[clp_index];
			localizacao_prog = LP[clp_index];
		   
			if( atualiza_entrada == 1) {
				io.to(clp[clp_index*2]).emit('entrada', I.join());
				atualiza_entrada = 0;
			}
			if (programa1 != 0){ 
				if (programa1.length > 0 && comandos>0 && comandos<3){
					passo_atual = programa1.length - 1;
	    				programa();
					localizacao_prog = 0;
				}
       				if (programa1.length > 0 && comandos>2){
					if ((passo_atual >= (programa1.length-1)) || (comandos==3)) {
						passo_atual = 0;
						localizacao_prog = 0;
					}
					localizacao_prog++;
					passo_atual++;
					while (programa1[passo_atual].charAt(0) =='R') {
						localizacao_prog++;
						passo_atual = passo_atual+2;
						if (passo_atual >= (programa1.length-1)) {
							passo_atual = 1;
							localizacao_prog = 1;
						}
					}
					programa();
				}
		
				segundo++;
       				if (segundo>10){
					segundo = 0;
					atraso++;
					if (atraso>1){
						atraso = 0;
						//io.emit('time', { time: new Date().toJSON() });
						io.to(clp[clp_index*2]).emit('memoria', M.join());
						io.to(clp[clp_index*2]).emit('tr', R.join());
						io.to(clp[clp_index*2]).emit('timer', T.join());
						io.to(clp[clp_index*2]).emit('counter', C.join());
						io.to(clp[clp_index*2]).emit('saida', Q.join());
						io.to(clp[clp_index*2]).emit('localizacao', localizacao_prog);
					}
				}
			}
        		if (comandos>1)
				comandos=0;
			if (M != undefined)
				MS[clp_index] = M.join();
			if (I != undefined)
				IS[clp_index] = I.join();
			if (R != undefined)
				RS[clp_index] = R.join();
			if (Q != undefined)
				QS[clp_index] = Q.join();
			if (T != undefined)
				TS[clp_index] = T.join();
			if (C != undefined)
				CS[clp_index] = C.join();
			if (programa1 != 0)
				programaS[clp_index] = programa1.join();
			atualizaS[clp_index] = atualiza_entrada;
			comandosS[clp_index] = comandos;
			PA[clp_index] = passo_atual;
			LP[clp_index] = localizacao_prog;
  		}
	}
//=============================================================================
// Send current time every 0,1 secs
//=============================================================================
    	setInterval(AtualizaPorTempo, 100);

//=============================================================================
// Interpreta o programa BOOLEANO
//=============================================================================
	function programa(){
        //var aux4;
		var acumulador;
		var passo;
		if (comandos > 0 && comandos<4){
			for (var aux_tr=0; aux_tr<(R.length); aux_tr++)
				R[aux_tr] = 0;
		}
		for (passo=0; passo<(passo_atual); passo = passo+2){
			switch (programa1[passo]) {
				case 'LD':
					acumulador = le_endereco(programa1[passo+1]);
					break;
				case 'LDN':
					acumulador = le_endereco(programa1[passo+1]) ? 0 : 1;
					break;
				case 'AND':
					acumulador = acumulador & le_endereco(programa1[passo+1]);
					break;
				case 'ANDN':
					acumulador = acumulador & (le_endereco(programa1[passo+1]) ? 0 : 1);
					break;
				case 'OR':
					acumulador = acumulador || le_endereco(programa1[passo+1]);
					break;
				case 'ORN':
					acumulador = acumulador || (le_endereco(programa1[passo+1]) ? 0 : 1);
					break;
				case 'OUT':
					escreve_endereco(programa1[passo+1], acumulador);
					break;
				case 'SET':
					if (acumulador == 1)
						escreve_endereco(programa1[passo+1], 1);
					break;
				case 'RST':
					if (acumulador == 1)
						escreve_endereco(programa1[passo+1], 0);
					break;
				case 'TMR':
					if (acumulador ==1 && le_enderecoCT(programa1[passo+1], 1)==0){
						escreve_enderecoCT(programa1[passo+1], 1, 1);
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+2],0), 2);
					}
					if (acumulador == 0){
						escreve_enderecoCT(programa1[passo+1], 0, 1);
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+2],0), 2);
					}
					passo++;
					break;
				case 'CNR':
					if (acumulador ==1 && le_enderecoCT(programa1[passo+1], 3)==0) {
						escreve_enderecoCT(programa1[passo+1], 1, 3);
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+1], 1)+1, 1);
					}
					if (acumulador == 0) {
						escreve_enderecoCT(programa1[passo+1], 0, 3);
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+2],0), 2);
					}
					if (le_enderecoCT(programa1[passo+1], 1) >= le_enderecoCT(programa1[passo+1], 2)){
						escreve_enderecoCT(programa1[passo+1], 1, 0);
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+1], 2), 1);
					}
					if (le_enderecoCT(programa1[passo+1], 3)==2){
						escreve_enderecoCT(programa1[passo+1], 0, 0);
						escreve_enderecoCT(programa1[passo+1], 0, 1);
						escreve_enderecoCT(programa1[passo+1], 0, 3);
					}
					passo++;
					break;
				case 'MOV':
					if (acumulador == 1)
						escreve_enderecoCT(programa1[passo+2], le_enderecoCT(programa1[passo+1],1),1);
					passo++;
					break;
				case '+':
					if (acumulador == 1)
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+1],1)+le_enderecoCT(programa1[passo+2],1),1);
					passo++;
					break;
				case '-':
					if (acumulador == 1)
						escreve_enderecoCT(programa1[passo+1], le_enderecoCT(programa1[passo+1],1)-le_enderecoCT(programa1[passo+2],1),1);
					passo++;
					break;
				case 'PLS':
					if (acumulador == 0)
						escreve_endereco(programa1[passo+1], 0);
					if (acumulador == 1 && le_endereco(programa1[passo+1])==1)
						acumulador = 0;
					if (acumulador == 1 && le_endereco(programa1[passo+1])==0) {
						escreve_endereco(programa1[passo+1], 1);
						acumulador = 1;
					}
					break;
				case '>':
					acumulador = acumulador & (le_enderecoCT(programa1[passo+1],1) > le_enderecoCT(programa1[passo+2],1) ? 1 : 0);
					passo++;
					break;
				case '<':
					acumulador = acumulador & (le_enderecoCT(programa1[passo+1],1) < le_enderecoCT(programa1[passo+2],1) ? 1 : 0);
					passo++;
					break;
				case '=':
					acumulador = acumulador & (le_enderecoCT(programa1[passo+1],1) == le_enderecoCT(programa1[passo+2],1) ? 1 : 0);
					passo++;
					break;
				case '>=':
					acumulador = acumulador & (le_enderecoCT(programa1[passo+1],1) >= le_enderecoCT(programa1[passo+2],1) ? 1 : 0);
					passo++;
					break;
				case '<=':
					acumulador = acumulador & (le_enderecoCT(programa1[passo+1],1) <= le_enderecoCT(programa1[passo+2],1) ? 1 : 0);
					passo++;
					break;
			}
		}
		passo_atual = passo;
	}
//=============================================================================
// encontra o maior index para criar todo o array
//=============================================================================
	function cria_memoria(){
		var tipo_memoria = ['I','Q','M','R','C','T'];
		var ultimo_endereco;
		var auxiliar;
		for (var funcao=0;funcao<6; funcao++) {
			ultimo_endereco = 0;
			for (var passo=0; passo<(programa1.length)-1; passo = passo+2){
				if (funcao < 6) {
					auxiliar = procura_max_endereco(tipo_memoria[funcao], programa1[passo+1]);
					if (auxiliar > ultimo_endereco)
						ultimo_endereco = auxiliar;
					if (programa1[passo] == 'TMR' || programa1[passo] == 'CNR' || programa1[passo] == 'MOV' || programa1[passo] == '<' || programa1[passo] == '>' || programa1[passo] == '<=' || programa1[passo] == '>=' || programa1[passo] == '='){
						auxiliar = procura_max_endereco(tipo_memoria[funcao], programa1[passo+2]);
						if (auxiliar > ultimo_endereco)
							ultimo_endereco = auxiliar;
						passo++;
					}
				}
			}
			for (var i=0; i<(ultimo_endereco+1); i++) {
				switch (tipo_memoria[funcao]) {
					case 'Q':
						Q[i] = 0;
						break;
					case 'I':
						I[i] = 0;
						break;
					case 'M':
						M[i] = 0;
						break;
					case 'R':
						R[i] = 0;
						break;
					case 'T':
						T[3*i] = 0;
						T[3*i+1] = 0;
						T[3*i+2] = 0;
						break;
					case 'C':
						C[4*i] = 0;
						C[4*i+1] = 0;
						C[4*i+2] = 0;
						C[4*i+3] = 0;
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
	function le_endereco(Aux_data)
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
			default:
				retorno = parseInt(Aux_data.substr(1));
		}
		return parseInt(retorno);
	}
//======================================================================
//retira o valor da funcao T/C
//=======================================================================
	function le_enderecoCT(Aux_data, index1)
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
					retorno = retorno + I[index+ ia]* (2**ia);
				break;
			case 'Q':
				retorno = 0;
				for (var ia=0; ia<16; ia++)
					retorno = retorno + Q[index+ ia]* (2**ia);
				break;
			case 'M':
				retorno = 0;
				for (var ia=0; ia<16; ia++)
					retorno = retorno + M[index+ ia]* (2**ia);
				break;
			case 'T':
				retorno = T[3*index+ index1];
				break;
			case 'C':
				retorno = C[4*index+ index1];
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
	function escreve_endereco(Aux_data, valor)
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
				Q[index] = valor;
				break;
			case 'I':
				I[index] = valor;
				break;
			case 'M':
				M[index] = valor;
				break;
			case 'R':
				R[index] = valor;
				break;
			case 'T':
				T[3*index+1] = valor;
				break;
			case 'C':
				//C[4*index+1] = valor;
				//C[4*index] = 0;
				//no contador para que o valor fique ativo por um ciclo, o reset seta o flag=2
				C[4*index+3] = 2;
				break;
		}
	}

//======================================================================
//ESCREVE o valor da funcao T/C
//=======================================================================
	function escreve_enderecoCT(Aux_data, valor, index1)
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
					I[index+ ia] = auxiliar;
					valor = parseInt(valor / 2);
				}
				I[index+15] = valor;
				break;
			case 'Q':
				for (var ia=0; ia<=14; ia++) {
					var auxiliar = valor %2;
					Q[index+ ia] = auxiliar;
					valor = parseInt(valor / 2);
				}
				Q[index+15] = valor;
				break;
			case 'M':
				for (var ia=0; ia<=14; ia++) {
					var auxiliar = valor %2;
					M[index+ ia] = auxiliar;
					valor = parseInt(valor / 2);
				}
				M[index+15] = valor;
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
  //Controla Temporizadores
  //=======================================================================
  	function temporizadores()
  	{
		for(var clp_index=0; clp_index<(clp.length/2); clp_index++){	
			if (TS[clp_index] != undefined){
				T =TS[clp_index].split(`,`);
		
				for (var i = 0; i<= (T.length/3); i++ ){
					if (T[3*i + 1] > 0)
						T[3*i+1] = T[3*i+1] + 1;
						if (T[3*i + 1] >= T[3*i+2]){
							T[3*i+1] = T[3*i+2];
							T[3*i] = 1;
						}
						else
							T[3*i] = 0;
				}	
				TS[clp_index]= T.join();
    			}
		}
	}					
}

  //======================================================================
  //Abre primeira janela do simulador endereco localhost:4333
  //=======================================================================

function JanelaElectron(){
	const { app, BrowserWindow, webFrame, Menu, BrowserView } = require('electron');
	const url = require('url');
	const shell = require('electron').shell;

	let isShown = true;

	app.win = null;

	app.on('ready', () => {

		app.win = new BrowserWindow({
			width: 600,
			height: 320,
			minWidth: 300,
			minHeight: 200,
			show: false,
			backgroundColor: '#FFE',
			//icon: { linux: '/icon/icon.png', win32: '/icon/icon.ico' },
			icon: path.join(__dirname,'public','icon','icon4.png'),
			resizable: true,
			webPreferences: { zoomFactor: 1.0, nodeIntegration: true, backgroundThrottling: false}
		});

		var splash = new BrowserWindow({ width: 280, height: 350, frame: false });
		splash.loadURL(`file://${__dirname}/splash.html`);

		app.win.setMenu(null);
		app.win.loadURL('http://localhost:4333/servidor');

		app.win.on('closed', () => {
			win = null;
			app.quit();
		});

		app.win.on('hide', function () {
			isShown = false;
		});

		app.win.on('show', function () {
			isShown = true;
		});

		app.win.once('ready-to-show', () => {
			setTimeout(function(){
				splash.close();
				app.win.show();
			}, 5000);
		});
		app.on('window-all-closed', () => {
			app.quit();
		});

		app.on('activate', () => {
			if (app.win === null) {
				createWindow();
			} else {
				app.win.show();
			}
		});
	});

	app.inspect = function () {
		app.win.toggleDevTools();
	}

	app.toggleFullscreen = function () {
		app.win.setFullScreen(!app.win.isFullScreen());
	}

	app.toggleVisible = function () {
		if (process.platform === 'win32') {
			if (!app.win.isMinimized()) { app.win.minimize(); } else { app.win.restore(); }
			} else {
			if (isShown && !app.win.isFullScreen()) { app.win.hide(); } else { app.win.show(); }
		}
	}

	app.injectMenu = function (Menu) {
		try {
			Menu.setApplicationMenu(null);
		} catch (err) {
			console.warn('Cannot inject menu.');
		}
	}
}
