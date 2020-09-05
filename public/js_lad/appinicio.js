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
}
