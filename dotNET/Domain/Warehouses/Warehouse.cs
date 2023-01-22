using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {

        public string Description { get;  private set; }
        public string address { get;  private set; }
        public double latitud { get;  private set; }
        public double longitud { get;  private set; }
        public int height { get;  private set; }
        public bool Active { get;  private set; }
        private Warehouse()
        {

        }
        

        public Warehouse(string description, string address, double latitud,double longitud,int height)
        {
            this.Id = new WarehouseId(Guid.NewGuid());
            this.Active = true;
            if(validateDesc(description))
                this.Description = description;
            else
                throw new BusinessRuleValidationException("The description cannot be null");

            if(validateAddress(address))    
                this.address = address;
            else
                throw new BusinessRuleValidationException("The address cannot be null");

            if(validateLatitud(latitud))        
                this.latitud = latitud;
            else
                throw new BusinessRuleValidationException("The latitud must be beetween -90 and 90");
            if(validateLongitud(longitud))
                this.longitud=longitud;
            else        
                throw new BusinessRuleValidationException("The longitud must be beetween -180 and 180");
            if(validateHeight(height))
            this.height = height;
            else
                throw new BusinessRuleValidationException("The height cant be under 0");
            
        }
        public Warehouse(WarehouseDTO dto)
        {
            this.Active = dto.Active; 
            if(dto.id!=Guid.Empty)
            {
                this.Id = new WarehouseId(dto.id);
            }
            else{
                this.Id = new WarehouseId(Guid.NewGuid());
            }
            if(validateDesc(dto.description))
                this.Description = dto.description;
            else
                throw new BusinessRuleValidationException("The description cannot be null");

            if(validateAddress(dto.address))    
                this.address = dto.address;
            else
                throw new BusinessRuleValidationException("The address cannot be null");

            if(validateLatitud(dto.latitud))        
                this.latitud = dto.latitud;
            else
                throw new BusinessRuleValidationException("The latitud must be beetween -90 and 90");
            if(validateLongitud(dto.longitud))
                this.longitud=dto.longitud;
            else        
                throw new BusinessRuleValidationException("The longitud must be beetween -180 and 180");
            if(validateHeight(dto.height))
            this.height = dto.height;
            else
                throw new BusinessRuleValidationException("The height cant be under 0");
               
        }
        public bool validateHeight(int value){
            if(value<0){
                return false;
            }
            return true;
        }
        public bool validateDesc(string desc){
            if(desc == null){
               return false;     
            }
            return true;
        }
        public bool validateAddress(string add){
            if(add == null)
                return false;

            return true;
        }
        public bool validateLatitud(double value){
            if(value>-90 && value<=90)
            return true;

            return false;
        }

        public bool validateLongitud(double value){
            
            if(value>=-180 && value<=180)
                return true;

            return false;
        }
        public void ChangeDescription(string description)
        {
            if(!validateDesc(description))
                throw new BusinessRuleValidationException("The description cannot be null");
            this.Description = description;
        }
        public void ChangeAddress(string address)
        {
            if (!validateAddress(address))
                throw new BusinessRuleValidationException("The address cannot be null");
            this.address = address;
        }
        public void ChangeLatitud(double lat)
        {
            if (!validateLatitud(lat))
                throw new BusinessRuleValidationException("The latitud must be beetween -90 and 90");  
                this.latitud = lat;
        }
        public void ChangeLongitud(double log)
        {
            if (!validateLongitud(log))
                throw new BusinessRuleValidationException("The longitud must be beetween -180 and 180");
            this.longitud = log;
        }
        public void ChangeHeigth(int h)
        {
            if (!validateHeight(h))
                throw new BusinessRuleValidationException("The height cant be under 0");
            this.height = h;
        }
        public WarehouseDTO toDTO(){
            return new WarehouseDTO(Id.AsGuid(),Description,address,latitud,longitud,height,Active);
        }
         public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}