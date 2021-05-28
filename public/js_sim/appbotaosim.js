var Sim_ImageB = new Image();
Sim_ImageB.src = "/img_sim/botoessim.png";
var Sim_Canvas1;
var Sim_Context1;
var Sim_Botao_Funcao = new Array(14);
var Sim_Edicao = 0; 
let titulo ='SimScriWeb';
//desenha os botoes
function Sim_Draw_Botoes() {
    Sim_Canvas1 = document.getElementById("tela5");
    Sim_Context1 = Sim_Canvas1.getContext("2d");
    Sim_Canvas1.width = 75;
    Sim_Canvas1.height = 550;

    for(i=1; i<13; i++) {
	var Sim_Edicao_Aux = Sim_Edicao;   
        if (Sim_Botao_Funcao[i] === undefined)
		Sim_Botao_Funcao[i] = 0;
	if (Sim_Edicao == 2)
		Sim_Edicao_Aux = 1;
	if (Sim_Edicao == 3)
		Sim_Edicao_Aux = 0;
	Sim_Context1.drawImage(Sim_ImageB, 70*Sim_Botao_Funcao[i]+(140*Sim_Edicao_Aux), 45*(i-1), 70, 45, 5,(i-1)*44, 70, 43);
    }
}

//Verifica QUAL botao foi acionado
//Separa em tres grupos: 0 a 10: Sim_Comandos do software, 11 a 20: edicao do ladder, 21 a 30: funcoes do ladder
function Sim_Botao_Click() {
	var posicaoy= parseInt((window.event.clientY-40)/44);

	if ((posicaoy >=0) && (posicaoy < 12))
	{
		for(i=1; i<13; i++)
			Sim_Botao_Funcao[i] = 0;
		Sim_Botao_Funcao[posicaoy+1]=1;
	}

	if (Sim_Botao_Funcao[12]==1){
    		window.open("/About", "About SCriWeb", "height=600,width=600");
	    	Sim_Botao_Funcao[12]=0;
	}
	if (Sim_Botao_Funcao[11]==1){
        	window.open("/helpsim", "Help SCriWeb", "height=800,width=1000");
	    	Sim_Botao_Funcao[11]=0;
	}
	if (Sim_Botao_Funcao[10]==1){
	   	Sim_Botao_Funcao[10]=0;
	}
	if (Sim_Edicao==0 && Sim_Botao_Funcao[2]==1){
        	var inputCSV = document.createElement('input');
	 	inputCSV.type = 'file';
		inputCSV.accept = '.CSV';
		inputCSV.click();
		inputCSV.onchange = function() {
	    		var file = this.files[0];
			Sim_Leitor_Arquivo.readAsText(file);
			Sim_Path = Sim_PathInicial + file.name.slice(0,file.name.length -4) + '/';
			titulo = file.name.slice(0,file.name.length -4);
		};
	}
	if (Sim_Edicao==0 && Sim_Botao_Funcao[3]==1){
	    	let texto = '0_id, 1_tipo, 2_nome, 3_var_1, 4_var_2, 5_pos_x_inicial, 6_dpos_x, 7_pos_x_final, 8_pos_y_inicial, 9_dpos_y, 10_pos_y_final, 11_inc_x1, 12_inc_x2, 13_inc_y1, 14_inc_y2, 15_var1_dependente, 16_var2_dependente, 17_piscar, 18_tempo_pisca, 19_figura, 20_funcao, 21_reserva, 22_reserva, 23_reserva, 24_reserva \n';
	    	for (var i=0; i<(ArrayObjStatic.length/20); i++) {
			texto += i +','+ArrayObjStatic[i*20+17]+',';
			for (var j=0; j<17; j++)
			    texto += ArrayObjStatic[(i*20)+j]+',';
			if (ArrayObjStatic[(i*20)+17]>1 && ArrayObjStatic[(i*20)+17]<5) 
				texto += ArrayImagens[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			if (ArrayObjStatic[(i*20)+17]==1) 
				texto += ArrayLabel[ArrayObjDinamic[i*10+5]]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			if (ArrayObjStatic[(i*20)+17]==6 || ArrayObjStatic[(i*20)+17]==7) 
				texto += ArrayObjDinamic[i*10+5]+',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			//texto += ArrayObjDinamic[i*10+5] +',' + ArrayObjDinamic[i*10+6]+ ',,,,,';
			texto += '\n';
		}
		for (var i=1; i<((FuncaoMatriz.length/8)+1); i++) {
			texto += i + ',X,' ;
			for (var j=0; j<6; j++)
			    texto += FuncaoMatriz[j]+',';
			texto += '\n';
		}
		FuncaoMatriz[ponteiro]
        	//let titulo ='SimScriWeb';
        	var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        	saveAs(blob, titulo + ".csv");
        	Sim_Botao_Funcao[3]=0;
	}
	if (Sim_Edicao==0 && Sim_Botao_Funcao[5]==1){
		Sim_Botao_Funcao[5]=0;
		Sim_Edicao =3;
	}
	if (Sim_Edicao==0 && Sim_Botao_Funcao[6]==1){
		Sim_Botao_Funcao[6]=0;
	}
	if (Sim_Edicao==0 && Sim_Botao_Funcao[4]==1){
		var modal1 = document.getElementById("myModal1");
		var t_modal = modal1.getElementsByTagName("h2");
		t_modal[0].innerHTML = "Download";	
		var modalb1 = document.getElementById("myBody1");
		//modalb1.innerHTML = "<p><a href='javascript:Sim_Le_Arquivo_Nuvem(Alarmes)'>Alarmes</a></p>";
		modalb1.innerHTML = "<p><a href='http://scriweb.herokuapp.com/ftp/Alarme/Alarme.csv'>Alarmes</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Classificacao/Classificacao.csv'>Classificação</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Corte_Vinco/Corte_Vinco.csv'>Corte e Vinco</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Elevador/Elevador.csv'>Elevador(3 andares)</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Elevador5/Elevador5.csv'>Elevador(5 andares)</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Envase/Envase.csv'>Envase</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Expedicao/Expedicao.csv'>Expedição</a></p>";
		modalb1.innerHTML += "<p><a href='http://scriwebshow.herokuapp.com/ftp/Semaforo/Semaforo.csv'>Semáforo</a></p>";
		// Create <OK> element that closes the modal
		var btn = document.createElement('button');
		btn.setAttribute('type','button');
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			modal1.style.display = "none";
		};
		modalb1.appendChild(btn);
		
		modal1.style.display = "block";
		// Get the <Close> element that closes the modal
		var span1 = document.getElementById("close1");
		span1.onclick = function() {
			modal1.style.display = "none";
		}
		
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal1) {
				modal1.style.display = "none";
			}
		}
		Sim_Botao_Funcao[4]=0;
	}
	if (Sim_Edicao==0 && Sim_Botao_Funcao[1]==1){
		Sim_Botao_Funcao[1]=0;
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[1]==1){
		Sim_Botao_Funcao[1]=0;
		Sim_Edicao = 0;
	}
	if (Sim_Edicao==1 && Sim_Botao_Funcao[2]==1){
		Sim_Edicao = 2;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[3]==1){
		Sim_Funcao1();
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[4]==1){
		Sim_Funcao2();
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[5]==1){
		Sim_Funcao3();
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[6]==1){
		Sim_Funcao4();
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[7]==1){
		Sim_Funcao5();
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[8]==1){
		Sim_Funcao6();
		Sim_Edicao = 1;
	}
	if ((Sim_Edicao==1 || Sim_Edicao==2) && Sim_Botao_Funcao[9]==1){
		Sim_Funcao7();
		Sim_Edicao = 1;
	}

	Sim_Draw_Botoes();		
}


//leitura de arquivos
//Fonte https://tableless.com.br/file-api-trabalhando-com-arquivos-locais-usando-javascript/
var Sim_Leitor_Arquivo = new FileReader();
Sim_Leitor_Arquivo.addEventListener('load', Sim_Le_Arquivo);


function pegaCSV(inputFile) {
	var file = inputFile.files[0];
	Sim_Leitor_Arquivo.readAsText(file);
}

function Sim_Le_Arquivo(evt) {
	var fileArr = evt.target.result.split('\n');
	Sim_Draw_Processo(fileArr);
}

function Sim_Le_Arquivo_Nuvem(arquivo) {
	//inputCSV.onchange = function() {
		atert("OLA");
    		var file = 'http://scriweb.herokuapp.com/ftp/'+arquivo+'/'+arquivo+'.csv';
		Sim_Leitor_Arquivo.readAsText(file);
		Sim_Path = Sim_PathInicial + file.name.slice(0,file.name.length -4) + '/';
		titulo = file.name.slice(0,file.name.length -4);
	modal1.style.display = "none";
	
	
	//};
}
