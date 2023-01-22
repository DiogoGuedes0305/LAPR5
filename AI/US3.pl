:-include('./US2.pl').
idArmazem1('Arouca',1).
idArmazem1('Espinho',2).
idArmazem1('Gondomar',3).
idArmazem1('Maia',4).
idArmazem1('Matosinhos',5).
/*
idArmazem1('Oliveira de Azemeis',6).
idArmazem1('Paredes',7).
idArmazem1('Porto',8).
idArmazem1('Povoa de Varzim',9).
idArmazem1('Santa Maria da Feira',10).
idArmazem1('Santo Tirso',11).
idArmazem1('Sao Joao da Madeira',12).
idArmazem1('Trofa',13).
idArmazem1('Vale de Cambra',14).
idArmazem1('Valongo',15).
idArmazem1('Vila do Conde',16).
idArmazem1('Vila Nova de Gaia',17).
*/


distancia1(1,2,122).
distancia1(1,3,122).
distancia1(1,4,151).
distancia1(1,5,147).
/*
distancia1(1,6,74).
distancia1(1,7,116).
distancia1(1,8,141).
distancia1(1,9,185).
distancia1(1,10,97).
distancia1(1,11,164).
distancia1(1,12,76).
distancia1(1,13,174).
distancia1(1,14,59).
distancia1(1,15,132).
distancia1(1,16,181).
distancia1(1,17,128).
*/

distancia1(2, 1,116).	
distancia1(2, 3,55).	
distancia1(2, 4,74).	
distancia1(2, 5,65).	
/*
distancia1(2, 6,69).	
distancia1(2, 7,74).	
distancia1(2, 8,61).	
distancia1(2, 9,103).	
distancia1(2, 10,36).	
distancia1(2, 11,88).	
distancia1(2, 12,61).	
distancia1(2, 13,95).	
distancia1(2, 14,78).	
distancia1(2, 15,69).	
distancia1(2, 16,99).	
distancia1(2, 17,46).
*/
distancia1(3,1,120).	
distancia1(3,2,50).		
distancia1(3,4,46).	
distancia1(3,5,46).	


distancia1(4,1, 149).
distancia1(4,2,65).	
distancia1(4,3,46).	
distancia1(4,5,27).	

distancia1(5,1,141).
distancia1(5,2,55).
distancia1(5,3,48).
distancia1(5,4,25).

entrega1(4439, '20221205', 134, 1, 8, 10).
entrega1(4433, '20221205', 23, 2, 8, 10).
entrega1(4434, '20221205', 322, 3, 8, 10).
entrega1(4435, '20221205', 143, 4, 8, 10).

paragens_rota1([],[]).
paragens_rota1([Entrega|LEntregas], LArmazens):-
    paragens_rota1(LEntregas, List),
    entrega1(Entrega, _, _, Armazem, _, _),
    append([Armazem], List, LArmazens).

%Heuristica1
bestfsDist(Data, Res):- ArmAtual is 5,
    findall(X,entrega1(X,Data,_,_,_,_), LEntregas),
    paragens_rota1(LEntregas, LArm),
    bestfsDist2(LArm, [ArmAtual], CamF), 
    append(CamF, [5], Res).

bestfsDist2([],Cam, CamF):-  !,
    reverse(Cam, CamF).

bestfsDist2(LArm, Cam, CamF):-
    Cam = [ArmAtual|_],
    findall((CX,[X| Cam]), 
    (distancia1(ArmAtual,X,CX), idArmazem1(_,X), member(X, LArm)),
    Novos),

    sort(0, @=<, Novos, NovosOrd),
   
    NovosOrd = [(_,[At|_])|_],
    
    delete(LArm, At, LRestArm),
    bestfsDist2(LRestArm, [At|Cam], CamF).


%Heuristica2
bestfsMassa(Data, Res):- ArmAtual is 5,
    findall(X,entrega1(X,Data,_,_,_,_), LEntregas),
    paragens_rota1(LEntregas, LArm),
    bestfsMassa2(LArm, Data, [ArmAtual], CamF), 
    append(CamF, [5], Res).

bestfsMassa2([],_,Cam, CamF):- !,
    reverse(Cam, CamF).

bestfsMassa2(LArm, Data, Cam, CamF):-
    findall((Massa,[Armazem| Cam]), 
    (member(Armazem, LArm), entrega1(_,Data,Massa,Armazem,_,_), idArmazem1(_,Armazem)),
    Novos),


    sort(0, @>=, Novos, NovosOrd),

    NovosOrd = [(_,[At|_])|_],
    delete(LArm, At, LRestArm),
    bestfsMassa2(LRestArm, Data, [At|Cam], CamF).


%Heuristica3
bestfsMassaXDist(Data, Res):- ArmAtual is 5,
    findall(X,entrega1(X,Data,_,_,_,_), LEntregas),
    paragens_rota1(LEntregas, LArm),
    bestfsMassaXDist2(LArm, Data, [ArmAtual], CamF), 
    append(CamF, [5], Res).

bestfsMassaXDist2([],_,Cam, CamF):- !,
    reverse(Cam, CamF).

bestfsMassaXDist2(LArm, Data, Cam, CamF):-
    Cam = [ArmAtual|_],
    findall((Valor,[ArmNext| Cam]), 
    (distancia1(ArmAtual,ArmNext,Dist), member(ArmNext, LArm), entrega1(_,Data,Massa,ArmNext,_,_), idArmazem1(_,ArmNext), Valor is Massa*Dist),
    Novos),


    sort(0, @=<, Novos, NovosOrd),
    NovosOrd = [(_,[At|_])|_],
    delete(LArm, At, LRestArm),
    bestfsMassaXDist2(LRestArm, Data, [At|Cam], CamF).
