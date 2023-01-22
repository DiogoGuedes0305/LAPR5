using DDDSample1.Domain.Trucks;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Trucks
{
    public class TruckRepository : BaseRepository<Truck, TruckId>,ITruckRepository
    {
        public TruckRepository(DDDSample1DbContext context):base(context.Trucks)
        {
           
        }
    }
}