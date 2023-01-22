using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public interface IWarehouseRepository: IRepository<Warehouse,WarehouseId>
    {
    }
}