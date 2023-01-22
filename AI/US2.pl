:-dynamic custo_menor/2.
:-include('./US1.pl').

% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(lists)).
:- use_module(library(term_to_json)).


% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).



:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).


%Obter_solucao_otima
obter_solucao_otima(Nome_Camiao,Data,LCidades,Custo):-(run(Nome_Camiao, Data);true),custo_menor(LCidades,Custo).
run(Nome_Camiao, Data):-
    retractall(custo_menor(_,_)),
    assertz(custo_menor(_,100000)),
    findall(X,entrega(X,Data,_,_,_,_), LEntregas),
    paragens_rota(LEntregas, LArmazens),
    permutation(LArmazens,RotaPerm),
    calcular_peso_por_entrega(RotaPerm, LEntregas, LPesos),
    calcular_peso_total(LPesos, Nome_Camiao, LPesosTotal),
    append([5|RotaPerm], [5], RotaPermAtualizada),
    carateristicasCam(Nome_Camiao, _, _, Energia_Atual, _, _),
    tempo_descarga_rota(LEntregas, LTempo_Descarga),
    tempo_viagem_rota(Nome_Camiao, Energia_Atual, RotaPermAtualizada, LPesosTotal, LTempo_Descarga, Tempo_Viagem),
    atualiza(RotaPermAtualizada,Tempo_Viagem),
    fail.

atualiza(LCidades,Tempo_Viagem):-
  custo_menor(_,CustoMin),
  ((Tempo_Viagem<CustoMin,!,retract(custo_menor(_,_)),assertz(custo_menor(LCidades,Tempo_Viagem)));true).




