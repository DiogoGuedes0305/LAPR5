:-include('./baseConhecimento/id_armazem.pl').
:-include('./baseConhecimento/energiaGasta.pl').
:-include('./baseConhecimento/factos_camiao.pl').
:-include('./baseConhecimento/tempoViagem.pl').
:-include('./baseConhecimento/entregas_ex2.pl').


%armazem_principal(?ID).
armazem_principal(5).


%Peso_Total_Duma_Entrega
calcular_peso_total([],_,[]).
calcular_peso_total([X|LPesos_Entregas], Nome_Camiao, [Peso_Total|LPesos_Total]):-
    calcular_peso_total(LPesos_Entregas,Nome_Camiao,LPesos_Total),
    carateristicasCam(Nome_Camiao, Tara, _, _, _, _),
    Peso_Total is Tara + X.


%Calcular_Peso_Por_Entrega
calcular_peso_por_entrega(LCidades, LEntregas, LPesos):-
    calcular_peso_por_entrega2(LCidades, LEntregas,LPesos, _).

calcular_peso_por_entrega2([],[],[0],0).
calcular_peso_por_entrega2([_|LCidades], [Entrega|LEntregas], [Inc|LPesos], Inc):-
    calcular_peso_por_entrega2(LCidades, LEntregas, LPesos, TempInc),
    entrega(Entrega,_,Peso,_,_,_),
    Inc is TempInc + Peso.

%Obter_paragens_rota
paragens_rota([],[]).
paragens_rota([Entrega|LEntregas], LArmazens):-
    paragens_rota(LEntregas, List),
    entrega(Entrega, _, _, Armazem, _, _),
    append([Armazem], List, LArmazens).

%Calcula_Energia_Gasta
calcular_energia_gasta(Cidade1, Cidade2, Peso, Nome_Camiao, Energia_Gasta):-
    energiaGasta(Cidade1,Cidade2, Energy),
    carateristicasCam(Nome_Camiao,_,CargaMax,_,_,_),
    carateristicasCam(Nome_Camiao,Tara,_,_,_,_),
    PesoMax is CargaMax + Tara,
    X is Peso * Energy,
    Energia_Gasta is X / PesoMax.


%Obter_Energia_Minima
energia_minima(Nome_Camiao, Energia_Minima):-
    carateristicasCam(Nome_Camiao, _, _, Capacidade_Maxima, _, _),
    X is Capacidade_Maxima * 20, %Calculo_por_causa_do_valor_ser_em_KiloWatts
    Energia_Minima is X / 100.

energia_maxima(Nome_Camiao, Energia_Maxima):- 
    carateristicasCam(Nome_Camiao, _, _, Capacidade_Maxima, _, _),
    X is Capacidade_Maxima * 80,
    Energia_Maxima is X / 100.


%Calcular_O_Tempo_De_Recarga
calcular_tempo_recarga(Nome_Camiao, Energia_Maxima, Energia_Minima, Energia_Recarga_Necessaria, Tempo_Recarga):-
    carateristicasCam(Nome_Camiao, _, _, _, _, Tempo_Carga),
    Y is Energia_Maxima - Energia_Minima,
    Z is Energia_Recarga_Necessaria * Tempo_Carga,
    Tempo_Recarga is Z / Y.

%Calcular_Tempo_Duma_Viagem
calcular_tempo_viagem(Cidade1, Cidade2, Nome_Camiao,Peso, Tempo_Necessario_Viagem):-
    tempoViagem(Cidade1,Cidade2, Tempo),
    X is Peso * Tempo,
    carateristicasCam(Nome_Camiao, _,Capacidade_Maxima,_,_,_),
    carateristicasCam(Nome_Camiao, Tara, _, _, _, _),
    Peso_Total is Tara + Capacidade_Maxima,
    Tempo_Necessario_Viagem is X / Peso_Total.


%Calcular_tempo_descarga_rota
tempo_descarga_rota([],[0]).
tempo_descarga_rota([Entrega|LEntregas], ListaTemposDescarga):-
    tempo_descarga_rota(LEntregas, List),
    entrega(Entrega,_,_,_,_,Tempo_Descarga),
    append([Tempo_Descarga], List, ListaTemposDescarga).


%Completa_As_Rotas_Com_Armazem_Matosinhos
completar_rotas([],[]).
completar_rotas([Permutacao|Total_Perm_LArmazens], [Rota|LRotas]):-
    completar_rotas(Total_Perm_LArmazens, LRotas),
    armazem_principal(Armazem_Principal),
    append([Armazem_Principal], Permutacao, List),
    append(List, [Armazem_Principal], Rota).


%Tempo_viagem_de_cada_rota
tempo_viagem_de_cada_rota(_,_,[],_,_,[],[]).
tempo_viagem_de_cada_rota(Nome_Camiao, Energia_Atual, [Rota|LRotas], LPesosTotal, LTempo_Descarga, [Tempo_Viagem|LTempos_Viagem_Por_Rota], [Rota|Rotas_Possiveis]):-
    tempo_viagem_rota(Nome_Camiao, Energia_Atual, Rota, LPesosTotal, LTempo_Descarga, Tempo_Viagem),
    !,
    tempo_viagem_de_cada_rota(Nome_Camiao, Energia_Atual, LRotas, LPesosTotal, LTempo_Descarga, LTempos_Viagem_Por_Rota, Rotas_Possiveis).

tempo_viagem_de_cada_rota(Nome_Camiao, Energia_Atual, [_|LRotas], LPesosTotal, LTempo_Descarga, LTempos_Viagem_Por_Rota, Rotas_Possiveis):-
    tempo_viagem_de_cada_rota(Nome_Camiao, Energia_Atual, LRotas, LPesosTotal, LTempo_Descarga, LTempos_Viagem_Por_Rota, Rotas_Possiveis).



%Adiciona_tempo_de_carga_entrega
adiciona_tempo_de_carga_entrega(_,[],[]).
adiciona_tempo_de_carga_entrega(LEntregas, [Tempo_Rota|LTempos_Viagem_Por_Rota], [Tempo_Rota_Atualizado|LTempos_Viagem_Por_Rota_Atualizada]):-
    calcula_tempo_de_carga_duma_entrega(LEntregas, Tempo_De_Carga_Entrega),
    Tempo_Rota_Atualizado is Tempo_Rota + Tempo_De_Carga_Entrega,
    adiciona_tempo_de_carga_entrega(LEntregas, LTempos_Viagem_Por_Rota, LTempos_Viagem_Por_Rota_Atualizada).



%Calcula_Tempo_De_Carga_Duma_Entrega
calcula_tempo_de_carga_duma_entrega([],0).
calcula_tempo_de_carga_duma_entrega([Entrega|LEntregas], Tempo_De_Carga):-
    calcula_tempo_de_carga_duma_entrega(LEntregas, X),
    entrega(Entrega, _, _, _, Tempo_Colocar_Carga, _),
    Tempo_De_Carga is X + Tempo_Colocar_Carga.




%Calcula_Tempo_de_Uma_Viagem_Entre_Armazens
tempo_viagem_rota(_,_,[_|[]], [], [], 0).


tempo_viagem_rota(Nome_Camiao, Energia_Atual, [Cidade1, Cidade2| LCidades], [Peso|LPesos], [TempoDescarga | LTempo_Descarga], Tempo_Viagem):-
    calcular_energia_gasta(Cidade1, Cidade2, Peso, Nome_Camiao, Energia_Gasta),
    Energia_Sobra is Energia_Atual - Energia_Gasta,
    energia_minima(Nome_Camiao, Energia_Minima),
    Energia_Sobra >= Energia_Minima,
    calcular_tempo_viagem(Cidade1,Cidade2, Nome_Camiao,Peso,Tempo_Necessario_Viagem),
    tempo_viagem_rota(Nome_Camiao, Energia_Sobra, [Cidade2|LCidades], LPesos, LTempo_Descarga, Z),
    X1 is Z + Tempo_Necessario_Viagem,
    Tempo_Viagem is TempoDescarga + X1.

tempo_viagem_rota(Nome_Camiao, Energia_Atual, [Cidade1, Cidade2 | LCidades], [Peso|LPesos], [TempoDescarga | LTempo_Descarga], Tempo_Viagem):-
    calcular_energia_gasta(Cidade1, Cidade2, Peso, Nome_Camiao, Energia_Gasta),
    Energia_Sobra is Energia_Atual - Energia_Gasta,
    energia_minima(Nome_Camiao, Energia_Minima),
    Energia_Sobra < Energia_Minima,
    energia_maxima(Nome_Camiao, Energia_Maxima),
    Energia_Gasta =< Energia_Maxima,
    X is Energia_Gasta + Energia_Minima,
    Energia_Recarga is X - Energia_Atual,
    calcular_tempo_recarga(Nome_Camiao, Energia_Maxima, Energia_Minima, Energia_Recarga, Tempo_Recarga),
    Y is Energia_Atual + Energia_Recarga, 
    Energia_Sobra2 is Y - Energia_Gasta,
    calcular_tempo_viagem(Cidade1,Cidade2, Nome_Camiao,Peso,Tempo_Necessario_Viagem),
    tempo_viagem_rota(Nome_Camiao, Energia_Sobra2, [Cidade2|LCidades], LPesos, LTempo_Descarga, Z),
    X1 is Z + Tempo_Necessario_Viagem,
    Y1 is X1 + Tempo_Recarga,
    Tempo_Viagem is TempoDescarga + Y1.


%Obter_Tempo_Todas_As_Rotas
tempo_viagem_todas_rotas(Nome_Camiao, Data, LRotas, LTempos):-
    findall(X,entrega(X,Data,_,_,_,_), LEntregas),
    paragens_rota(LEntregas, LArmazens),
    calcular_peso_por_entrega(LArmazens, LEntregas, LPesos),
    calcular_peso_total(LPesos, Nome_Camiao, LPesosTotal),
    findall(LArmazens_Permutacoes, permutation(LArmazens, LArmazens_Permutacoes), Total_Perm_LArmazens),
    completar_rotas(Total_Perm_LArmazens, Lista1),
    carateristicasCam(Nome_Camiao, _, _, Capacidade_Maxima, _, _),
    tempo_descarga_rota(LEntregas, LTempo_Descarga),
    tempo_viagem_de_cada_rota(Nome_Camiao, Capacidade_Maxima, Lista1, LPesosTotal, LTempo_Descarga, Lista2, LRotas),
    adiciona_tempo_de_carga_entrega(LEntregas, Lista2, LTempos).

