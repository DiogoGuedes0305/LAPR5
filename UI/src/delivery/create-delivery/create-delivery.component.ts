import { Component, OnInit } from '@angular/core';
import { Delivery } from 'delivery/delivery';
import { DeliveryService } from '../delivery.service';


@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css']
})
export class CreateDeliveryComponent implements OnInit {
  constructor(private deliveryService : DeliveryService) { }

  ngOnInit(): void {
  }

  onClickSubmit(data: {
    date : any;
    weight: any;
    loadTime: any;
    unloadTime: any;
    wareId: string;
  }): void {
    this.deliveryService
      .addDelivery({
        date: data.date,
        weight: data.weight,
        loadTime: data.loadTime,
        unloadTime: data.unloadTime,
        wareId: data.wareId,
      })
      .subscribe((delivery: Delivery) => {
        alert(
          'Delivery created with date: ' + delivery.date
        );
      });
  }
}
