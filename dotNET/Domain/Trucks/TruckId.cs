using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trucks
{
    public class TruckId : EntityId
    {

        public TruckId(String value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        override
        public String AsString(){
            return (String) base.Value;
        }
    }
}