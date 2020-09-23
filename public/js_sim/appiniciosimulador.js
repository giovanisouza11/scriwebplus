//var num_clp;	    	
function draw_inicio() {
	if (localStorage.tela_largura<200 || localStorage.tela_largura>2000)
		locaStorage.setItem("tela_largura", 1400);
	if (localStorage.tela_altura<200 || localStorage.tela_altura>2000)
		locaStorage.setItem("tela_altura", 900);
	//window.resizeTo(localStorage.tela_largura, localStorage.tela_altura);
	if (localStorage.num_clp1 <0 || localStorage.numclp1>30)
		locaStorage.setItem("num_clp1", 0);
	
	draw_botoessim();
	draw_simulador_inicio();
	Config_Socket(localStorage.num_clp1);
}	
