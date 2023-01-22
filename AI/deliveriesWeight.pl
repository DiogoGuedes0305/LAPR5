%a delivery_sum
delivery_sum([],[],0).
delivery_sum([Entrega|LE],PesoAcum):-
delivery_sum(LC,LP,PesoAc1),carga(Cidade,Peso),PesoAc is Peso+PesoAc1.  