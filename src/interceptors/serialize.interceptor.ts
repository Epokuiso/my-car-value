import { 
    CallHandler, 
    ExecutionContext,
    UseInterceptors,
    NestInterceptor
 } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";


interface ClassConstructor {
    new (...args: any []): {}
}

export function Serialize (dataTransferObject: ClassConstructor)
{
    return UseInterceptors (new SerializeInterceptor (dataTransferObject));
}
export class SerializeInterceptor implements NestInterceptor
{
    constructor (private dataTransferObject: any) {}

    intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise <any>
    {
        return next.handle ().pipe(
            map ((data: any ) => plainToClass (this.dataTransferObject, data, {
                    excludeExtraneousValues: true
                })
            )
        );
    }
}