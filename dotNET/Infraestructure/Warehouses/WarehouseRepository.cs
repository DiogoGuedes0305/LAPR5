using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Warehouses
{
    public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>,IWarehouseRepository
    {
        public WarehouseRepository(DDDSample1DbContext context):base(context.Warehouse)
        {
           context.Database.EnsureCreated();
        }
    }
}