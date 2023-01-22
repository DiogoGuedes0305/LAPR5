using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Deliveries;

namespace DDDSample1.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            builder.ToTable("Deliveries", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}