using System.Collections.Generic;
using System.Threading.Tasks;
using System;
namespace DDDSample1.Domain.Deliveries
{
    public interface IDeliveryService
    {
        Task<List<DeliveryDto>> GetAllAsync();

        Task<DeliveryDto> GetByIdAsync(DeliveryId id);

        Task<DeliveryDto> AddAsync(DeliveryDto dto);

        Task<DeliveryDto> UpdateAsync(Guid id, DeliveryDto dto);

        Task<DeliveryDto> DeleteAsync(DeliveryId id);

    }
}