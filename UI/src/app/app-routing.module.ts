import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruckComponent } from 'truck/truck.component';
import { WarehouseComponent } from 'warehouse/warehouse.component';
import { DeliveryComponent } from 'delivery/delivery.component';
import { PathComponent } from 'path/path.component';
import { CreateDeliveryComponent } from 'delivery/create-delivery/create-delivery.component';
import { CreatePathComponent } from 'path/create-path/create-path.component';
import { CreateTruckComponent } from 'truck/create-truck/create-truck.component';
import { CreateWarehouseComponent } from '../warehouse/create-warehouse/create-warehouse.component';
import { PlaningComponent } from 'planing/planing.component';
import { ActiveTrucksComponent } from 'truck/active-trucks/active-trucks.component';


const routes: Routes = [
  { path: 'trucks', component: TruckComponent },
  { path: 'activeTrucks', component: ActiveTrucksComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'planing', component: PlaningComponent},
  { path: 'path', component: PathComponent },
  { path: 'createPath', component: CreatePathComponent },
  { path: 'createTruck', component: CreateTruckComponent},
  { path: 'createWarehouse', component: CreateWarehouseComponent},
  { path: 'createDelivery', component: CreateDeliveryComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
