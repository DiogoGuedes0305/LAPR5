using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Trucks;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.Deliveries;
using DDDSample1.Infrastructure.Warehouses;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Truck> Trucks { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Warehouse> Warehouse { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TruckEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
        }
    }
}