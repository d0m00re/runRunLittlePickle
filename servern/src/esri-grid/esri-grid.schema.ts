import { IsNumber, IsString } from 'class-validator';
import { z } from 'zod';

export class DtoGetFileCoord {
    @IsNumber()
    south : number;
    @IsNumber()
    north : number;
    @IsNumber()
    west : number;
    @IsNumber()
    east : number;
}

/*
const schemaGetFileCoord = z.object({
    south : z.string(),
    north : z.string(),
    west : z.string(),
    east : z.string()
});

//                      z.infer<typeof createCatSchema>;
type DtoGetFileCoord = z.infer<typeof schemaGetFileCoord>;

export {
    schemaGetFileCoord,
    DtoGetFileCoord
}
*/
/*

import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;

*/