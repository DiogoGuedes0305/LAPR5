using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trucks
{
    public class Truck : Entity<TruckId>, IAggregateRoot
    {

        public string Description { get;  private set; }

        public bool Active{ get;  private set; }

        private Truck()
        {
            this.Active = true;
        }

        public Truck(string code, string description)
        {
            this.Id = new TruckId(code);
            this.Description = description;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive truck.");
            this.Description = description;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}