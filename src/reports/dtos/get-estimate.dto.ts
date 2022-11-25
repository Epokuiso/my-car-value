import { 
    IsString, 
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude 
} from "class-validator";
import { Transform } from 'class-transformer';

export class GetEstimateDTO
{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    longitude: number;
    
    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    latitude: number;
    
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}