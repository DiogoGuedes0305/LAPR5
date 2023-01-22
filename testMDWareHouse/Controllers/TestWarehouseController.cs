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
    public class TestWarehouseController
    {
        [Fact]
        public async Task GetAll_ShouldReturnList()
        {
                var warehouse1 = new WarehouseDTO("desc", "address", 60,-40,10,true);
                var warehouse2 = new WarehouseDTO("desc", "address", 60,-40,10,true);
                var listDTO = new List<WarehouseDTO>(){warehouse1,warehouse2};
                var mockService = new Mock<IWarehouseService>();
                mockService.Setup(serv => serv.GetAllAsync()).ReturnsAsync(listDTO).Verifiable();
                
                var controller = new WarehousesController(mockService.Object);

                var result = await controller.GetAll();
    
                Assert.NotNull(result);
                mockService.Verify();

        }

        [Fact]
        public async Task GetGetById_ShoudReturnTheWarehouse()
        {
                var id = new Guid();
                
                var warehouse1 = new WarehouseDTO(id,"desc", "address", 60,-40,10,true);
                var listDTO = new List<WarehouseDTO>(){warehouse1};
                var mockService = new Mock<IWarehouseService>();
                mockService.Setup(serv => serv.GetByIdAsync(new WarehouseId(id))).ReturnsAsync(warehouse1).Verifiable();
                
                var controller = new WarehousesController(mockService.Object);

                var result = await controller.GetGetById(id);

                Assert.Equal(warehouse1,result.Value);

        }
        
        [Fact]
        public async Task Create_ShouldReturnCreatedWarehouse()
        {
                var id = new Guid("00000000-0000-0000-0000-000000000000");
                
                var warehousedto = new WarehouseDTO(id,"desc", "address", 60,-40,10,true);
                var warehouse = new Warehouse(warehousedto);
                var mockService = new Mock<IWarehouseService>();
                mockService.Setup(serv => serv.AddAsync(warehousedto)).ReturnsAsync(warehousedto).Verifiable();
                
                var controller = new WarehousesController(mockService.Object);

                var result = await controller.Create(warehousedto);

                Assert.NotNull(result);

        }
        [Fact]
        public async Task Update()
        {
                var id = new Guid();
                
                var warehousedto = new WarehouseDTO(id,"desc", "address", 60,-40,10,true);
                var mockService = new Mock<IWarehouseService>();
                mockService.Setup(serv => serv.UpdateAsync(id,warehousedto)).ReturnsAsync(warehousedto).Verifiable();
                
                var controller = new WarehousesController(mockService.Object);

                var result = await controller.Update(id,warehousedto);

                Assert.NotNull(result);

        }

        [Fact]
        public async Task GetAll_ShouldReturnList_Integration()
        {
                var id1 = new Guid("2907a679-6be8-4b31-b68c-50381bd58e01");
                var id2 = new Guid("2907a679-6be8-4b31-b68c-50381bd58e02");
                var warehouse1 = new WarehouseDTO(id1,"desc", "address", 60,-40,10,true);
                var warehouseDo1= new Warehouse(warehouse1);                
                var warehouse2 = new WarehouseDTO(id2,"desc", "address", 60,-40,10,true);
                var warehouseDo2= new Warehouse(warehouse2);
                var list = new List<Warehouse>(){warehouseDo1,warehouseDo2};
                var listDTO = new List<WarehouseDTO>(){warehouse1,warehouse2};
                
                var mockUnity = new Mock<IUnitOfWork>();
                mockUnity.Setup(u => u.CommitAsync());


                var mockRepo = new Mock<IWarehouseRepository>();
                mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(list).Verifiable();
                
                
                var service = new WarehouseService(mockUnity.Object,mockRepo.Object);
                var controller = new WarehousesController(service);
                var result = await controller.GetAll();
    
                Assert.NotNull(result);
                mockRepo.Verify();

        }

        [Fact]
        public async Task Create_ShouldReturnCreatedWarehouse_Integration()
        {
                var id = new Guid("00000000-0000-0000-0000-000000000000");
                
                var warehousedto = new WarehouseDTO(id,"desc", "address", 60,-40,10,true);
                var warehouse = new Warehouse(warehousedto);
                var mockUnity = new Mock<IUnitOfWork>();

                mockUnity.Setup(u => u.CommitAsync());


                var mockRepo = new Mock<IWarehouseRepository>();
                mockRepo.Setup(repo => repo.AddAsync(warehouse)).ReturnsAsync(warehouse).Verifiable();
                
               
                var service = new WarehouseService(mockUnity.Object,mockRepo.Object);
                var controller = new WarehousesController(service);

                var result = await controller.Create(warehousedto);

                Assert.NotNull(result);

        }
    }
}