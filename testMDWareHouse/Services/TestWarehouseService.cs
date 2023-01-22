using System.Collections.Generic;
using Xunit;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Controllers;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Shared;
using System;
namespace testMDWareHouse
{
    public class TestWarehouseServices
    {
        [Fact]
        public async Task GetAllAsync_ShouldReturnList()
        {
                var id = new Guid("00000000-0000-0000-0000-000000000000");
                var warehouse1 = new WarehouseDTO(id,"desc", "address", 60,-40,10,true);
                var warehouseDo1= new Warehouse(warehouse1);                
                var warehouse2 = new WarehouseDTO(id,"desc", "address", 60,-40,10,true);
                var warehouseDo2= new Warehouse(warehouse2);
                var list = new List<Warehouse>(){warehouseDo1,warehouseDo2};
                var listDTO = new List<WarehouseDTO>(){warehouseDo1.toDTO(),warehouseDo2.toDTO()};

                var mockUnity = new Mock<IUnitOfWork>();
                mockUnity.Setup(u => u.CommitAsync());

                var mockRepo = new Mock<IWarehouseRepository>();
                mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(list).Verifiable();
                
                var service = new WarehouseService(mockUnity.Object,mockRepo.Object);

                var result = await service.GetAllAsync();

                Assert.Equal(listDTO.ToString(),result.ToString());

        }
        [Fact]
        public async Task GetByIdAsync_ShouldReturnWarehouse()
        {
                var id1 = new Guid("2907a679-6be8-4b31-b68c-50381bd58e01");
                var id2 = new Guid("2907a679-6be8-4b31-b68c-50381bd58e02");
                var warehouse1 = new WarehouseDTO(id1,"desc", "address", 60,-40,10,true);
                var warehouseDo1= new Warehouse(warehouse1);                
                var warehouse2 = new WarehouseDTO(id2,"desc", "address", 60,-40,10,true);
                var warehouseDo2= new Warehouse(warehouse2);
                var list = new List<Warehouse>(){warehouseDo1,warehouseDo2};

                var mockUnity = new Mock<IUnitOfWork>();
                mockUnity.Setup(u => u.CommitAsync());

                var mockRepo = new Mock<IWarehouseRepository>();
                mockRepo.Setup(repo => repo.GetByIdAsync(new WarehouseId(id1))).ReturnsAsync(warehouseDo1).Verifiable();
                
                var service = new WarehouseService(mockUnity.Object,mockRepo.Object);

                var result = await service.GetByIdAsync(new WarehouseId(id1));

                //var returnValue = Assert.IsType<List<WarehouseDTO>>(result.Result);
                Assert.Equal(warehouse1.ToString(),result.ToString());
        }
        [Fact]
        public async Task AddAsync_ShouldReturnNewWarehouse()
        {
                var warehouse1 = new WarehouseDTO("desc", "address", 60,-40,10,true);
                var warehouseDo1= new Warehouse(warehouse1);                
                

                var mockUnity = new Mock<IUnitOfWork>();
                mockUnity.Setup(u => u.CommitAsync());

                var mockRepo = new Mock<IWarehouseRepository>();
                mockRepo.Setup(repo => repo.AddAsync(warehouseDo1)).ReturnsAsync(warehouseDo1).Verifiable();
                
                var service = new WarehouseService(mockUnity.Object,mockRepo.Object);

                var result = await service.AddAsync(warehouse1);

                Assert.Equal(warehouse1.ToString(),result.ToString());
        }
    }
}