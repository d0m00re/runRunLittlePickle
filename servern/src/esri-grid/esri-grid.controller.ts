import { Controller, Get, StreamableFile } from '@nestjs/common';
import { EsriGridService } from './esri-grid.service';
import { createReadStream } from 'fs';
import { join } from 'path';

const filePathBelleIle = "belleile.asc"


@Controller('esri-grid')
export class EsriGridController {
    constructor(private readonly esriGrid: EsriGridService) { }

    @Get("test")
    getFile(): StreamableFile {
        const file = createReadStream(join(process.cwd(), 'package.json'));
        return new StreamableFile(file);
    }
    @Get()
    getFileInfo(): StreamableFile{
       // return this.esriGrid.getFileInfo();
        const file = createReadStream(join(process.cwd(), `src/esri-grid/${filePathBelleIle}`));
        return new StreamableFile(file);
    }
}
