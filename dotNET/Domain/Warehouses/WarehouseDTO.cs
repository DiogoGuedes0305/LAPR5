using System;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDTO
    {
        public Guid id { get; set; }
        public string description { get; set; }
        public string address { get; set; }
        public double latitud { get; set;}
        public double longitud { get; set;}
        public int height { get; set; }
        public bool Active {get; set;}
        public WarehouseDTO()
        {
        }
        
        public WarehouseDTO(Guid id, string description, string address, double latitud,double longitud,int height, bool Active)
        {
            Console.WriteLine("The sum of the values equals the total.");

            this.id = id;
            this.description = description;
            this.address = address;
            this.latitud = latitud;
            this.longitud = longitud;
            this.height = height;
            this.Active = Active;
            
        }
        public WarehouseDTO(string description, string address, double latitud,double longitud,int height, bool Active)
        {

            this.description = description;
            this.address = address;
            this.latitud = latitud;
            this.longitud = longitud;
            this.height = height;
            this.Active = Active;
        }

        

        
    }
}
