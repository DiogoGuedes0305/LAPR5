using Xunit;
using Moq;
using System;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Xunit.Abstractions;

namespace testDeliveryManagement
{
    public class TestDeliveryService
    {

        [Fact]
        public async Task GetAll_ShouldReturnsDeliveryDto()
        {
            var warehouse1 = new WarehouseId(new Guid());
            var data = new DateTime(2024, 5, 1, 8, 30, 52);
            var delivery1 = new DeliveryDto(data, 20, 80, 90 , warehouse1);
            var deliveryDto1 = new Delivery(delivery1); 
            var delivery2 = new DeliveryDto(data, 20, 80, 90 , warehouse1);
            var deliveryDto2 = new Delivery(delivery2); 
            var list = new List<Delivery>(){deliveryDto1,deliveryDto2};
            var listDTO = new List<DeliveryDto>(){deliveryDto1.toDTO(),deliveryDto2.toDTO()};
            
            var mockUnity = new Mock<IUnitOfWork>();
            mockUnity.Setup(u => u.CommitAsync());

            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(list).Verifiable();

            var service = new DeliveryService(mockUnity.Object,mockRepo.Object, null);

            var result = await service.GetAllAsync();

            Assert.Equal(listDTO.ToString(),result.ToString());
        }

        [Fact]
        public async Task GetById_ShouldReturnDelivery()
        {
                var id1 = new Guid("2907a679-6be8-4b31-b68c-50381bd58e01");
                var warehouse1 = new WarehouseId(new Guid());
                var data = new DateTime(2024, 5, 1, 8, 30, 52);
                var delivery1 = new DeliveryDto(data, 20, 80, 90 , warehouse1);
                var deliveryDto1 = new Delivery(delivery1); 
                var delivery2 = new DeliveryDto(data, 20, 80, 90 , warehouse1);
                var deliveryDto2 = new Delivery(delivery2); 
                var list = new List<Delivery>(){deliveryDto1,deliveryDto2};
                var listDTO = new List<DeliveryDto>(){deliveryDto1.toDTO(),deliveryDto2.toDTO()};

                var mockUnity = new Mock<IUnitOfWork>();
                mockUnity.Setup(u => u.CommitAsync());

                var mockRepo = new Mock<IDeliveryRepository>();
                mockRepo.Setup(repo => repo.GetByIdAsync(new DeliveryId(id1))).ReturnsAsync(deliveryDto1).Verifiable();
                
                var service = new DeliveryService(mockUnity.Object,mockRepo.Object,null);

                var result = await service.GetByIdAsync(new DeliveryId(id1));

                Assert.Equal(delivery1.ToString(),result.ToString());
        }

    }
}
