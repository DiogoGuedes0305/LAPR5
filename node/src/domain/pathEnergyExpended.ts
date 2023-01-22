import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface EnergyExpendedProps {
  energy: number;
}

export class PathEnergyExpended extends ValueObject<EnergyExpendedProps> {
  constructor(props: EnergyExpendedProps) {
    super(props);
  }

  public get energy(): number {
    return this.props.energy;
  }
  public set energy(value: number) {
    this.props.energy = value;
  }

  public static validEnergy(value: number): boolean {
    return value >= 0;
  }

  public static create(props: EnergyExpendedProps): Result<PathEnergyExpended> {
    const propsResult = Guard.againstNullOrUndefined(props.energy, 'energy');

    if (!propsResult.succeeded) {
      return Result.fail<PathEnergyExpended>(propsResult.message);
    } else {
      if (!this.validEnergy(props.energy)) {
        return Result.fail<PathEnergyExpended>('Not a valid energy');
      }
      return Result.ok<PathEnergyExpended>(new PathEnergyExpended({ energy: props.energy }));
    }
  }
}
