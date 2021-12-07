var num_clp;
var Num_Linhas;
var tela_largura;
var tela_altura;

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
	draw_sfc_inicio();
	//config(num_clp);
	//onLoad();
	
	if (localStorage.tela_largura<200 || localStorage.tela_largura>2000)
		localStorage.setItem("tela_largura", 1400);
	if (localStorage.tela_altura<200 || localStorage.tela_altura>2000)
		localStorage.setItem("tela_altura", 900);
	//window.resizeTo(localStorage.tela_largura, localStorage.tela_altura);
	if (localStorage.num_clp1 <0 || localStorage.numclp1>30)
		localStorage.setItem("num_clp1", 0);
	
	//Sim_Draw_Botoes();
	//Sim_Draw_Inicio();
	//Sim_Config_Socket(localStorage.num_clp1);
}
