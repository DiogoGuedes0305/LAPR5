

% :-include('./US2.pl').
:-include('./US3.pl').



    
%Calcular o tempo de execução para obter a solução ótima
tempoExecucaoSolucaoOtima(Nome_Camiao,Data,Tempo,TempoViagem):-
    get_time(Ti),
    obter_solucao_otima(Nome_Camiao, Data, ListRotas, Tempo_Viagem),
    get_time(Tf),
    TempoViagem is Tempo_Viagem,
    Tempo is Tf-Ti.

%Calcular o tempo de execução para obter a solucao através dos caminhos mais curtos
tempoExecucaoShortestPath(Data,Tempo):-
    get_time(Ti),
    bestfsDist(Data, Res),
    get_time(Tf),
    Tempo is Tf-Ti.
    
%Calcular o tempo de execução para obter a solucao atraves da descarga de maior massa
tempoExecucaoMassa(Data,Tempo):-
    get_time(Ti),
    bestfsMassa(Data, Res),
    get_time(Tf),
    Tempo is Tf-Ti.

%Calcular o tempo de execução para obter a solucao atraves da massa e distancia
tempoExecucaoMassaXDistancia(Data,Tempo):-
    get_time(Ti),
    bestfsMassaXDist(Data, Res),
    get_time(Tf),
    Tempo is Tf-Ti.


