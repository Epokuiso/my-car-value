import { 
    CallHandler, 
    ExecutionContext,
    UseInterceptors,
    NestInterceptor
 } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { UserDTO } from "src/users/dtos/user-dto";

export class SerializeInterceptor implements NestInterceptor
{
    intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise <any>
    {
        return next.handle ().pipe(
            map ((data: any ) => plainToClass (UserDTO, data, {
                    excludeExtraneousValues: true
                })
            )
        );
    }
}