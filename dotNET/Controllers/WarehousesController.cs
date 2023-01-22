using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private readonly IWarehouseService _service;

        public WarehousesController(IWarehouseService service)
        {
            _service = service;
        }
        // GET: api/Warehouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseDTO>>> GetAllActive()
        {
            return await _service.GetAllActiveAsync();
        }
        // GET: api/Warehouses/All
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<WarehouseDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        //GET: api/Warehouses/Unative
        [HttpGet("Unactive")]
        public async Task<ActionResult<IEnumerable<WarehouseDTO>>> GetAllUnative()
        {
            return await _service.GetAllUnativeAsync();
        }
        // GET: api/Warehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDTO>> GetGetById(Guid id)
        {
            var Warehouse = await _service.GetByIdAsync(new WarehouseId(id));

            if (Warehouse == null)
            {
                return NotFound();
            }

            return Warehouse;
        }
        // POST: api/Warehouses
        [HttpPost]
        public async Task<ActionResult<WarehouseDTO>> Create(WarehouseDTO dto)
        {
            dto.Active = true;
            var Warehouse = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = Warehouse.id }, Warehouse);
        }

        
        // PUT: api/Warehouses/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WarehouseDTO>> Update(Guid id, WarehouseDTO dto)
        {

            try
            {
                var Warehouse = await _service.UpdateAsync(id, dto);
                
                if (Warehouse == null)
                {
                    return NotFound();
                }
                return Ok(Warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

    [HttpDelete("{id}/hard")]
    public async Task<ActionResult<WarehouseDTO>> Delete(Guid id)
    {
        try
        {
            var warehouseToDelete = await _service.DeleteAsync(new WarehouseId(id));

            if (warehouseToDelete == null)
            {
                return NotFound("warehouse not found");
            }
            return warehouseToDelete;
        }
        catch (Exception)
        {
            return null;
        }
    }
    // Inactivate: api/Products/5
        [HttpDelete("{id}")]
    public async Task<ActionResult<WarehouseDTO>> SoftDelete(Guid id)
        {
            var warehouseToDeactivate = await _service.InactivateAsync(new WarehouseId(id));

            if (warehouseToDeactivate == null)
            {
                return NotFound();
            }

            return Ok(warehouseToDeactivate);
        }    
    }
}