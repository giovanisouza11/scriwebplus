var num_clp;
//var Num_Linhas;

function draw_inicio() {
	if (localStorange.num_clp > 0)
		num_clp = localStorange.num_clp;
	else
		num_clp = 0;
	if (localStorange.num_linhas > 10 && localStorange.num_linhas<301)
		Num_Linhas = localStorange.num_linhas;
	else
		Num_Linhas = 100;		
	draw_eletrico();
    	draw_botoes();
	draw_ladder_inicio();	
	config(num_clp);
	//onLoad();
}
