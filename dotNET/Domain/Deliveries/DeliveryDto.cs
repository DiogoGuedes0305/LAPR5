using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public double Weight { get; set; }
        public int LoadTime { get; set; }
        public int UnloadTime { get; set; }
        public string WareId { get; set; }

        public DeliveryDto(){}

        public DeliveryDto(Guid id, DateTime date, double weight, int loadTime, int unloadTime, WarehouseId wareId)
        {
            Id = id;
            Date = date;
            Weight = weight;
            LoadTime = loadTime;
            UnloadTime = unloadTime;
            WareId = wareId.AsString();
        }
        
        public DeliveryDto(DateTime date, double weight, int loadTime, int unloadTime, WarehouseId wareId)
        {
            Date = date;
            Weight = weight;
            LoadTime = loadTime;
            UnloadTime = unloadTime;
            WareId = wareId.AsString();
        }
        public DeliveryDto(DateTime date, double weight, int loadTime, int unloadTime, string wareId)
        {
            Date = date;
            Weight = weight;
            LoadTime = loadTime;
            UnloadTime = unloadTime;
            WareId = wareId;
        }

    }
}