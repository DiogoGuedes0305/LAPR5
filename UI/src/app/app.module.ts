import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruckComponent } from '../truck/truck.component';
import { DeliveryComponent } from '../delivery/delivery.component';
import { MessagesComponent } from '../messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { WarehouseComponent } from 'warehouse/warehouse.component';
import { PathComponent } from 'path/path.component';
import { CreatePathComponent } from 'path/create-path/create-path.component';
import { CreateTruckComponent } from 'truck/create-truck/create-truck.component';
import { CreateDeliveryComponent } from 'delivery/create-delivery/create-delivery.component';
import { CreateWarehouseComponent } from 'warehouse/create-warehouse/create-warehouse.component';
import { PlaningComponent } from '../planing/planing.component';
import { ActiveTrucksComponent } from '../truck/active-trucks/active-trucks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCard, MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from 'login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    TruckComponent,
    MessagesComponent,
    PathComponent,
    WarehouseComponent,
    DeliveryComponent,
    CreatePathComponent,
    CreateTruckComponent,
    CreateDeliveryComponent,
    CreateWarehouseComponent,
    PlaningComponent,
    ActiveTrucksComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    SocialLoginModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '251009032362-itcbgc5a17o7mug00hoeeul1d3umiqfj.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig, 
  },
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
