using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using System;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService : IDeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;
        private readonly IWarehouseRepository _repoWarehouse;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo, IWarehouseRepository warehouseRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoWarehouse = warehouseRepo;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>(delivery => delivery.toDTO());

            return listDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id);
            
            if(delivery == null)
                return null;

            return delivery.toDTO();
        }

        public async Task<DeliveryDto> AddAsync(DeliveryDto dto)
        {
            await checkWareIdAsync(new WarehouseId(dto.WareId));
            var delivery = new Delivery(dto.Date, dto.Weight, dto.LoadTime, dto.UnloadTime, new WarehouseId(new Guid(dto.WareId)));

            await this._repo.AddAsync(delivery);

            await this._unitOfWork.CommitAsync();

            return delivery.toDTO();
        }

        public async Task<DeliveryDto> UpdateAsync(Guid id, DeliveryDto dto)
        {
            var deliveries = await this._repo.GetByIdAsync(new DeliveryId(id)); 
            if (deliveries == null)
                return null; 
            this._repo.Remove(deliveries);
              

            // change all field
            deliveries.ChangeDate(dto.Date);
            if(dto.Weight > 0)
                deliveries.ChangeWeight(dto.Weight);
            if(dto.LoadTime > 0)
                deliveries.ChangeLoadTime(dto.LoadTime);
            if(dto.UnloadTime > 0)
                deliveries.ChangeUnloadTime(dto.UnloadTime);
            
            await this._unitOfWork.CommitAsync();
            await this._repo.AddAsync(deliveries); 
            return deliveries.toDTO();
        }

        public async Task<DeliveryDto> InactivateAsync(DeliveryId id)
        {
            var deliveries = await this._repo.GetByIdAsync(id); 

            if (deliveries == null)
                return null;   

            // change all fields
            deliveries.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return deliveries.toDTO();
        }

         public async Task<DeliveryDto> DeleteAsync(DeliveryId id)
        {
            var deliveries = await this._repo.GetByIdAsync(id); 

            if (deliveries == null)
                return null;   

            if (deliveries.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active deliveries.");
            
            this._repo.Remove(deliveries);
            await this._unitOfWork.CommitAsync();

            return deliveries.toDTO();
        }

        private async Task checkWareIdAsync(WarehouseId warehouseId)
        {
           var warehouse = await _repoWarehouse.GetByIdAsync(warehouseId);
           if (warehouse == null)
                throw new BusinessRuleValidationException("Invalid Warehouse Id.");
        }
    }
}