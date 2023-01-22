import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface PathTimeProps{
    minutes: number;
}

export class pathTime extends ValueObject<PathTimeProps>{
    constructor(props: PathTimeProps){
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
    
    
    public static create(props:PathTimeProps): Result<pathTime>{
            if (!this.validTime(props.minutes)) {
                return Result.fail<pathTime>('Not a valid distance');
            }
            return Result.ok<pathTime>(new pathTime({minutes : props.minutes}))
    }
}