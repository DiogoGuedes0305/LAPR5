using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {

        public DateTime Date { get; private set; }

        public double Weight { get; private set; }

        private double MAX_WEIGHT = 99999;

        public int LoadTime { get; private set; }

        public int UnloadTime { get; private set; }

        public string WareId { get;  private set; }

        public bool Active{ get;  private set; }

        public Delivery (DeliveryDto dto)
            
            :this(dto.Date, dto.Weight, dto.LoadTime, dto.UnloadTime, new WarehouseId(dto.WareId)){
        }
        private Delivery()
        {
            this.Active = true;
        }
        public Delivery(DateTime date, double weight, int loadTime, int unloadTime, WarehouseId wareId){

            this.Id = new DeliveryId(Guid.NewGuid());

            validateDate(date);
            this.Date = date;

            validateWeight(weight);
            this.Weight = weight;

            validateLoadTime(loadTime);
            this.LoadTime = loadTime;

            validateUnloadTime(unloadTime);
            this.UnloadTime = unloadTime;

            validateWarehouseId(wareId);
            this.WareId = wareId.AsString();

            this.Active = true;
        }
        private void validateDate(DateTime Date){
            if(Date.CompareTo(DateTime.Now) < 0)
                throw new BusinessRuleValidationException("The date already passed");
        }

        private void validateWeight(double deliveryWeight){
            if(deliveryWeight > MAX_WEIGHT)
                throw new BusinessRuleValidationException("The max weight is: " + MAX_WEIGHT);
            if(deliveryWeight < 0)
                throw new BusinessRuleValidationException("The weight needs to be more than 0");
        }

        private void validateLoadTime(int timeMin){
            if(timeMin <= 0)
                throw new BusinessRuleValidationException("Loading time needs to be more than 0");
        }
        private void validateUnloadTime(int timeMin){
            if(timeMin <= 0)
                throw new BusinessRuleValidationException("Unloading time needs to be more than 0");
        }

        private void validateWarehouseId(WarehouseId warehouseId){
           if(warehouseId == null)
               throw new BusinessRuleValidationException("Warehouse Id can't be null");
        }

        public void ChangeDate(DateTime date){
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive delivery.");
            validateDate(date);
            this.Date = date;
        }
        public void ChangeWeight(double weight){
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the weight to an inactive delivery.");
            validateWeight(weight);    
            this.Weight = weight;
        }
        public void ChangeLoadTime(int loadTime){
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the loadTime to an inactive delivery.");
            validateLoadTime(loadTime);
            this.LoadTime = loadTime;
        }
        public void ChangeUnloadTime(int unloadTime){
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the unloadTime to an inactive delivery.");
            validateUnloadTime(unloadTime);
            this.UnloadTime = unloadTime;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
        public DeliveryDto toDTO(){
            return new DeliveryDto(Id.AsGuid(), Date, Weight, LoadTime, UnloadTime, new WarehouseId(WareId));
        }
    }
}