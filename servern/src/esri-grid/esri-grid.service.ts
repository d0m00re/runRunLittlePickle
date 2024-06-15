import { Injectable } from '@nestjs/common';
import * as fs from "fs";

const filePath =  "./data1718369389209-1760821768.asc";
const filePathBelleIle = "./belleile17184665949491072719353.asc"
@Injectable()
export class EsriGridService {
    async getFileInfo(): Promise<string> {
        return (await fs.promises.readFile(filePath)).toString();
    }
}
