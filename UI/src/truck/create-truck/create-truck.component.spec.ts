import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TruckService } from '../truck.service';
import { CreateTruckComponent } from './create-truck.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


describe('CreateTruckComponent', () => {
  let component: CreateTruckComponent;
  let fixture: ComponentFixture<CreateTruckComponent>;
  let httpMock: any;

  // const mockSnackBar = {
  //   open: (message: string, action: string, config) => {}
  // };

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ CreateTruckComponent ],
  //     imports: [HttpClientTestingModule, MatDialogModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule],
  //     providers: [TruckService,{ provide: MatSnackBar, useValue: mockSnackBar } ,{ provide: MAT_DIALOG_DATA, useValue: {} },]
  //   }).compileComponents();


  //   httpMock = TestBed.get(HttpTestingController);
  //   fixture = TestBed.createComponent(CreateTruckComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   component.ngOnInit();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });



  // it('onSubmit with invalid form', async () => {
  //   let data = {
  //     truckPlate: 'AX-24-LL',
  //     truckAutonomyWithCargo: 22,
  //     truckBatteryEnergy: 467,
  //     truckFastRechargeTime: 863,
  //     truckCargoCapacity: 293,
  //     truckTare: 291
  //   };
  //   await component.onClickSubmit(data);
  // });

  // it('onSubmit with valid form', async () => {
  //   component.truckForm.controls['plate'].setValue('22-22-FA');
  //   component.truckForm.controls['name'].setValue('Popo');
  //   component.truckForm.controls['autonomy'].setValue('1');
  //   component.truckForm.controls['maxBattery'].setValue('1');
  //   component.truckForm.controls['payLoad'].setValue('1');
  //   component.truckForm.controls['tare'].setValue('1');
  //   component.truckForm.controls['baterryChargingTime'].setValue('1');
  //   await component.createTruck();
  //   expect(component.truckForm.valid).toBeTruthy();
  // });
});
