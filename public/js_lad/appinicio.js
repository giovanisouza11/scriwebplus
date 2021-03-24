var num_clp;
var Num_Linhas;

function draw_inicio() {
	if (localStorage.num_clp > 0)
		num_clp = localStorage.num_clp;
	else
		num_clp = 0;
	if (localStorage.num_linhas > 10 && localStorage.num_linhas<301)
		Num_Linhas = localStorage.num_linhas;
	else
		Num_Linhas = 100;		
	draw_eletrico();
    	draw_botoes();
	draw_ladder_inicio();	
	config(num_clp);
	//onLoad();
	
	if (localStorage.tela_largura<200 || localStorage.tela_largura>2000)
		locaStorage.setItem("tela_largura", 1400);
	if (localStorage.tela_altura<200 || localStorage.tela_altura>2000)
		locaStorage.setItem("tela_altura", 900);
	//window.resizeTo(localStorage.tela_largura, localStorage.tela_altura);
	if (localStorage.num_clp1 <0 || localStorage.numclp1>30)
		locaStorage.setItem("num_clp1", 0);
	
	draw_botoessim();
	draw_simulador_inicio();
	//Config_Socket(localStorage.num_clp1);
}
