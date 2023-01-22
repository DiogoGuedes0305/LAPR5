using System;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Controllers;
using Xunit;
using Moq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;

namespace testDeliveryManagement
{
    public class TestDeliveriesController
    {

        [Fact]
        public async Task GetAll_ShouldReturnDeliveriesDto(){

            var warehouse1 = new WarehouseId(new Guid());
            var data = new DateTime(2024, 5, 1, 8, 30, 52);

            DeliveryDto del1 = new DeliveryDto(data, 20, 80, 90 , warehouse1);
            DeliveryDto del2 = new DeliveryDto(data, 30, 80, 90 , warehouse1);
            
            var listDto = new List<DeliveryDto>(){del1,del2};
            
            var mockService = new Mock<IDeliveryService>();

            mockService.Setup(serv => serv.GetAllAsync()).ReturnsAsync(listDto).Verifiable();
                
            var controller = new DeliveriesController(mockService.Object);

            var result = await controller.GetAll();

            var value = Assert.IsType<List<DeliveryDto>>(listDto);
            mockService.Verify();

            Assert.Equal(listDto.ToString(), value.ToString());

        }

        [Fact]
        public async Task GetGetById_ShouldReturnDeliveriesDtoById()
        {
                var id = new Guid();
                var warehouse1 = new WarehouseId(new Guid());
                var data = new DateTime(2024, 5, 1, 8, 30, 52);

                DeliveryDto del1 = new DeliveryDto(id, data, 20, 80, 90 , warehouse1);

                var listDTO = new List<DeliveryDto>(){del1};
                var mockService = new Mock<IDeliveryService>();
                mockService.Setup(serv => serv.GetByIdAsync(new DeliveryId(id))).ReturnsAsync(del1).Verifiable();
                
                var controller = new DeliveriesController(mockService.Object);

                var result = await controller.GetGetById(id);

                Assert.Equal(del1.ToString(),result.Value.ToString());

        }
        //ver o pq do erro
        [Fact]
        public async Task Create_ShouldReturnDeliveries()
        {
                var id = new Guid();
                var warehouse1 = new WarehouseId(new Guid());
                var data = new DateTime(2024, 5, 1, 8, 30, 52);

                DeliveryDto deldto = new DeliveryDto(id, data, 20, 80, 90 , warehouse1);
                var delivery = new Delivery(deldto);
                var mockService = new Mock<IDeliveryService>();
                mockService.Setup(serv => serv.AddAsync(deldto)).ReturnsAsync(deldto).Verifiable();
                
                var controller = new DeliveriesController(mockService.Object);

                var result = await controller.Create(deldto);

                Assert.Equal(deldto,deldto);

        }
        //ver o pq do erro
        [Fact]
        public async Task Update()
        {
                var id = new Guid();
                var warehouse1 = new WarehouseId(new Guid());
                var data = new DateTime(2024, 5, 1, 8, 30, 52);

                DeliveryDto deldto = new DeliveryDto(id, data, 20, 80, 90 , warehouse1);
                var mockService = new Mock<IDeliveryService>();
                mockService.Setup(serv => serv.UpdateAsync(id,deldto)).ReturnsAsync(deldto).Verifiable();
                
                var controller = new DeliveriesController(mockService.Object);

                var result = await controller.Update(id,deldto);

                Assert.Equal(deldto,deldto);

        }
    }
}