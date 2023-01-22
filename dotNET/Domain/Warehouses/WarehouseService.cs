using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseService : IWarehouseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWarehouseRepository _repo;


        public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<WarehouseDTO>> GetAllActiveAsync()
        {
            var list = await this._repo.GetAllAsync();
            List<WarehouseDTO> result = new List<WarehouseDTO>();
            List<WarehouseDTO> listDto = list.ConvertAll<WarehouseDTO>(whar => 
                (whar.toDTO()));
            foreach (WarehouseDTO dto in listDto)
            {   
                if(dto.Active)
                result.Add(dto);
            }

            return result;
        }


        public async Task<List<WarehouseDTO>> GetAllUnativeAsync()
        {
            var list = await this._repo.GetAllAsync();
            List<WarehouseDTO> result = new List<WarehouseDTO>();
            List<WarehouseDTO> listDto = list.ConvertAll<WarehouseDTO>(whar => 
                (whar.toDTO()));
            foreach (WarehouseDTO dto in listDto)
            {   
                if(!dto.Active)
                result.Add(dto);
            }

            return result;
        }
        public async Task<List<WarehouseDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<WarehouseDTO> listDto = list.ConvertAll<WarehouseDTO>(whar => 
                (whar.toDTO()));
            

            return listDto;
        }

        public async Task<WarehouseDTO> GetByIdAsync(WarehouseId id)
        {
            var whar = await this._repo.GetByIdAsync(id);
            
            if(whar == null)
                return null;

            return (whar.toDTO());
        }

        public async Task<WarehouseDTO> AddAsync(WarehouseDTO dto)
        {
            dto.Active = true;
            var Warehouse = new Warehouse(dto);
            
            await this._repo.AddAsync(Warehouse);

            await this._unitOfWork.CommitAsync();

            return (Warehouse.toDTO());
        }
        // Editar armazem
        public async Task<WarehouseDTO> UpdateAsync(Guid id, WarehouseDTO dto)
        {
            
            var Warehouse = await this._repo.GetByIdAsync(new WarehouseId(id)); 
            if (Warehouse == null)
                return null;   

            // change all fields
            Warehouse.ChangeDescription(dto.description);
            Warehouse.ChangeAddress(dto.address);
            Warehouse.ChangeLatitud(dto.latitud);
            Warehouse.ChangeLongitud(dto.longitud);
            Warehouse.ChangeHeigth(dto.height);
           
            await this._unitOfWork.CommitAsync();
            
            return (Warehouse.toDTO());
        }

         public async Task<WarehouseDTO> DeleteAsync(WarehouseId id)
        {
            
            var Warehouse = await this._repo.GetByIdAsync(id); 
            if (Warehouse == null)
                return null;   

            this._repo.Remove(Warehouse);
           
            await this._unitOfWork.CommitAsync();
            
            return (Warehouse.toDTO());
        }

        public async Task<WarehouseDTO> InactivateAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id); 

            if (warehouse == null)
                return null;   

            warehouse.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return warehouse.toDTO();
        }

        
    }
}