all_dfs(Nome1,Nome2,LCam):-get_time(T1),
    findall(Cam,dfs(Nome1,Nome2,Cam),LCam),
    length(LCam,NLCam),
    get_time(T2),
    write(NLCam),write(' solucoes encontradas em '),
    T is T2-T1,write(T),write(' segundos'),nl,
    write('Lista de Caminhos possiveis: '),write(LCam),nl,nl.


dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(NAct,Dest,LA,Cam):id_armazem(NAct,IdAct),(entrega(_,_,_,IdAct,_,_);ligacao(NX,IdAct,_,_,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam).







findAll(X,entrega(X,_,_,_,_,_), L).