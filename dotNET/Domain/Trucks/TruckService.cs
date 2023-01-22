using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trucks
{
    public class TruckService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITruckRepository _repo;

        public TruckService(IUnitOfWork unitOfWork, ITruckRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<TruckDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<TruckDto> listDto = list.ConvertAll<TruckDto>(truck => new TruckDto{Id = truck.Id.AsString(), Description = truck.Description});

            return listDto;
        }

        public async Task<TruckDto> GetByIdAsync(TruckId id)
        {
            var truck = await this._repo.GetByIdAsync(id);
            
            if(truck == null)
                return null;

            return new TruckDto{Id = truck.Id.AsString(), Description = truck.Description};
        }

        public async Task<TruckDto> AddAsync(TruckDto dto)
        {
            var truck = new Truck(dto.Id, dto.Description);

            await this._repo.AddAsync(truck);

            await this._unitOfWork.CommitAsync();

            return new TruckDto { Id = truck.Id.AsString(), Description = truck.Description };
        }

        public async Task<TruckDto> UpdateAsync(TruckDto dto)
        {
            var truck = await this._repo.GetByIdAsync(new TruckId(dto.Id)); 

            if (truck == null)
                return null;   

            // change all field
            truck.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new TruckDto { Id = truck.Id.AsString(), Description = truck.Description };
        }

        public async Task<TruckDto> InactivateAsync(TruckId id)
        {
            var truck = await this._repo.GetByIdAsync(id); 

            if (truck == null)
                return null;   

            // change all fields
            truck.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new TruckDto { Id = truck.Id.AsString(), Description = truck.Description };
        }

         public async Task<TruckDto> DeleteAsync(TruckId id)
        {
            var truck = await this._repo.GetByIdAsync(id); 

            if (truck == null)
                return null;   

            if (truck.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active truck.");
            
            this._repo.Remove(truck);
            await this._unitOfWork.CommitAsync();

            return new TruckDto { Id = truck.Id.AsString(), Description = truck.Description };
        }
    }
}