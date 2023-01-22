% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(lists)).
:- use_module(library(term_to_json)).
:- use_module(library(odbc)).


% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).



:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).


:- include('./US3.pl').

:- http_handler('/prolog/best_solution', obter_solucao_otima_server, []).
:- http_handler('/prolog/all_paths', obter_todas_rotas_server, []).
:- http_handler('/prolog/heuristic1', obter_heuristica_1, []).
:- http_handler('/prolog/heuristic2', obter_heuristica_2, []).
:- http_handler('/prolog/heuristic3', obter_heuristica_2, []).

server(Port) :-                        % (2)
        http_server(http_dispatch, [port(Port)]).

stopServer(Port) :-
    http_stop_server(Port,_).

% Funções do Servidor
:- set_setting(http:cors, [*]).


:- json_object solucao_otima_json(array:list(integer), tempoViagem:string).
:- json_object all_paths_json(array:list(solucao_otima_json)).

obter_solucao_otima_server(Request) :-                    % (3)
    cors_enable(Request,[methods([get])]),
    http_parameters(Request,[truckPlate(Nome_Camiao, []), data(Data,[])]),
    obter_solucao_otima(Nome_Camiao, Data, LCidades, Tempo_Viagem),
    prolog_to_json([LCidades,Tempo_Viagem], JSONObject1),
    reply_json(JSONObject1).

obter_todas_rotas_server(Request) :-
    cors_enable(Request,[methods([get])]),
    http_parameters(Request,[truckPlate(Nome_Camiao, []), data(Data,[])]),
    tempo_viagem_todas_rotas(Nome_Camiao, Data, LRotas, Tempos),
    prolog_to_json([LRotas,Tempos], JSONObject1),
    reply_json(JSONObject1).

obter_heuristica_1(Request) :-
    cors_enable(Request,[methods([get])]),
    http_parameters(Request,[data(Data,[])]),
    bestfsDist(Data,Res),
    prolog_to_json([Res],JSONObject1),
    reply_json(JSONObject1).

obter_heuristica_2(Request) :-
    cors_enable(Request,[methods([get])]),
    http_parameters(Request,[data(Data,[])]),
    bestfsMassa(Data,Res),
    prolog_to_json([Res],JSONObject1),
    reply_json(JSONObject1).

obter_heuristica_2(Request) :-
    cors_enable(Request,[methods([get])]),
    http_parameters(Request,[data(Data,[])]),
    bestfsMassaXDist(Data,Res),
    prolog_to_json([Res],JSONObject1),
    reply_json(JSONObject1).
