import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface PathExtraTimeProps{
    minutes: number;
}

export class pathExtraTime extends ValueObject<PathExtraTimeProps>{
    constructor(props: PathExtraTimeProps){
        super(props)
    }

    public get minutes() : number {
        return this.props.minutes;
    } 
    
    public set minutes(v : number) {
        this.props.minutes = v;
    }

    public static validTime(minutes: number):boolean{
        return minutes >= 0
    } 
    
    
    public static create(props:PathExtraTimeProps): Result<pathExtraTime>{
            if (!this.validTime(props.minutes)) {
                return Result.fail<pathExtraTime>('Not a valid distance');
            }
            return Result.ok<pathExtraTime>(new pathExtraTime({minutes : props.minutes}))
    }
}