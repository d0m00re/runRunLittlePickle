import { Controller, Get, Query, StreamableFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { EsriGridService } from './esri-grid.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DtoGetFileCoord } from './esri-grid.schema';

const filePathBelleIle = "belleile.asc";
const fileGpxOld = "palais-la-pointe-des-poulains.gpx"
const fileGpx = "visorando-pointe-des-poulains-aiguilles-de-port-coton.gpx"

@Controller('esri-grid')
export class EsriGridController {
    constructor(private readonly esriGrid: EsriGridService) { }

    @Get("test")
    @UsePipes(new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }))

    getData(@Query() query : DtoGetFileCoord)
    : Promise<any> {
        console.log("data")
        console.log(query)
        return Promise.resolve();
    }

    @Get("hello")
    getEnv(): string {
        return `${JSON.stringify(process.env)}`
    }


    @Get("package.json")
    getFile(): StreamableFile {
        const file = createReadStream(join(process.cwd(), 'package.json'));
        return new StreamableFile(file);
    }
    @Get("gpx")
    getItinary(): StreamableFile {        
        const file = createReadStream(join(process.cwd(), `src/esri-grid/${fileGpx}`));
        return new StreamableFile(file);
    }

    @Get()
    getFileInfo(): StreamableFile{
       // return this.esriGrid.getFileInfo();
        const file = createReadStream(join(process.cwd(), `src/esri-grid/${filePathBelleIle}`));
        return new StreamableFile(file);
    }
}
