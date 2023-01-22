import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface DistanceProps {
  distance: number;
}

export class PathDistance extends ValueObject<DistanceProps> {
  constructor(props: DistanceProps) {
    super(props);
  }

  public get distance(): number {
    return this.props.distance;
  }
  public set distance(value: number) {
    this.props.distance = value;
  }

  public static validDistance(value: number): boolean {
    return value >= 0;
  }

  public static create(props: DistanceProps): Result<PathDistance> {
    const propsResult = Guard.againstNullOrUndefined(props.distance, 'distance');
    if (!propsResult.succeeded) {
      return Result.fail<PathDistance>(propsResult.message);
    } else {
      if (!this.validDistance(props.distance)) {
        return Result.fail<PathDistance>('Not a valid distance');
      }
      return Result.ok<PathDistance>(new PathDistance({ distance: props.distance }));
    }
  }
}
