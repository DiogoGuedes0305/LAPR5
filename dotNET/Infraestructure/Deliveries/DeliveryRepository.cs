using DDDSample1.Domain.Deliveries;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>,IDeliveryRepository
    {
        public DeliveryRepository(DDDSample1DbContext context):base(context.Deliveries)
        {
           context.Database.EnsureCreated();
        }
    }
}