using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Trucks;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrucksController : ControllerBase
    {
        private readonly TruckService _service;

        public TrucksController(TruckService service)
        {
            _service = service;
        }

        // GET: api/Trucks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TruckDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Trucks/F1
        [HttpGet("{id}")]
        public async Task<ActionResult<TruckDto>> GetGetById(String id)
        {
            var truck = await _service.GetByIdAsync(new TruckId(id));

            if (truck == null)
            {
                return NotFound();
            }

            return truck;
        }

        // POST: api/Trucks
        [HttpPost]
        public async Task<ActionResult<TruckDto>> Create(TruckDto dto)
        {
            var truck = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = truck.Id }, truck);
        }

        
        // PUT: api/Trucks/F5
        [HttpPut("{id}")]
        public async Task<ActionResult<TruckDto>> Update(String id, TruckDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var truck = await _service.UpdateAsync(dto);
                
                if (truck == null)
                {
                    return NotFound();
                }
                return Ok(truck);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Trucks/F5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TruckDto>> SoftDelete(String id)
        {
            var truck = await _service.InactivateAsync(new TruckId(id));

            if (truck == null)
            {
                return NotFound();
            }

            return Ok(truck);
        }
        
        // DELETE: api/Trucks/F5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<TruckDto>> HardDelete(String id)
        {
            try
            {
                var truck = await _service.DeleteAsync(new TruckId(id));

                if (truck == null)
                {
                    return NotFound();
                }

                return Ok(truck);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}