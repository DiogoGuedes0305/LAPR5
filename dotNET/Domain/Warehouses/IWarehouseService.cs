using System.Collections.Generic;
using System.Threading.Tasks;
using System;
namespace DDDSample1.Domain.Warehouses
{
    public interface IWarehouseService
    {
        Task<List<WarehouseDTO>> GetAllAsync();

        Task<WarehouseDTO> GetByIdAsync(WarehouseId id);

        Task<WarehouseDTO> AddAsync(WarehouseDTO dto);

        Task<WarehouseDTO> UpdateAsync(Guid id, WarehouseDTO dto);

        Task<WarehouseDTO> DeleteAsync(WarehouseId id);

        Task<WarehouseDTO> InactivateAsync(WarehouseId id);
        
        Task<List<WarehouseDTO>> GetAllActiveAsync();
        
        Task<List<WarehouseDTO>> GetAllUnativeAsync();
    }
}