import { Component,Inject, OnInit } from '@angular/core';
import { error } from 'cypress/types/jquery';
import { Truck } from 'truck/truck';
import { TruckService } from '../truck.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

// export interface DialogData {
//   name: string;
//   message: string;
// }

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css'],
  providers: [TruckService],
})


export class CreateTruckComponent implements OnInit {

//   formCreateTruck!: FormGroup;
//   constructor(public dialog: MatDialog, private truckService: TruckService, private fb: FormBuilder, private router: Router) { }


//   ngOnInit(): void {
//     this.formCreateTruck = new FormGroup({
//       truckPlate: new FormControl('', [Validators.required]),
//       truckAutonomyWithCargo: new FormControl('', [Validators.required]),
//       truckBatteryEnergy: new FormControl('', [Validators.required]),
//       truckFastRechargeTime: new FormControl('', [Validators.required]),
//       truckCargoCapacity: new FormControl('', [Validators.required]),
//       truckTare: new FormControl('', Validators.required)
//     });
//   }



//   onClickSubmit(): void {
//     if (this.formCreateTruck.valid) {
//       let answer = this.truckService.addTruck(this.formCreateTruck.value);
//       let message = "Truck created successfully";
//       if (answer == null) {
//         message = "Error creating truck";
//       }

//       const dialogRef = this.dialog.open(CreateTruckComponentDialog, {
//         width: '250px',
//         data: {
//           name: this.formCreateTruck.value.truckPlate ,
//           message: message
//         },
//       });

//       dialogRef.afterClosed().subscribe(result => {
//         if (answer != null) {
//           this.router.navigate(['/createTruck']);
//         }
//       });
//     }
//   }
// }


//   @Component({
//     selector: 'app-create-truck',
//     templateUrl: 'truckdialog.dialog.component.html',
//   })
//   export class CreateTruckComponentDialog {
//   constructor(
//     public dialogRef: MatDialogRef<CreateTruckComponentDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) { }

//   ngOnInit(): void {}

//   onOk(): void {
//     this.dialogRef.close();
//   }

constructor(private truckService: TruckService) {}

ngOnInit(): void {}

onClickSubmit(data: {
  truckPlate: any;
  truckAutonomyWithCargo: any;
  truckBatteryEnergy: any;
  truckFastRechargeTime: any;
  truckCargoCapacity: any;
  truckTare: any;
}): void {
  this.truckService
    .addTruck({
      truckPlate: data.truckPlate,
      truckAutonomyWithCargo: data.truckAutonomyWithCargo,
      truckBatteryEnergy: data.truckBatteryEnergy,
      truckFastRechargeTime: data.truckFastRechargeTime,
      truckCargoCapacity: data.truckCargoCapacity,
      truckTare: data.truckTare,
    })
    .subscribe((truck: Truck) => {
      alert('Truck with plate ' + truck.truckPlate + ' created');
    });
}


}
