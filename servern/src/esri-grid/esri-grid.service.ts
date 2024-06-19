import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const filePath = "./data1718369389209-1760821768.asc";
const filePathBelleIle = "./belleile17184665949491072719353.asc"
@Injectable()
export class EsriGridService {
    constructor(private httpService: HttpService) { }

    async getFileCoord(south: string, north: string, west: string, east: string): Promise<any> {
        console.log("process env var")
        console.log(process.env.SECRET_OPEN_API);
        const url = 'https://portal.opentopography.org/API/globaldem';
        const params = {
            demtype: 'EU_DTM',
            south,
            north,
            west,
            east,
            outputFormat: 'AAIGrid',
            API_Key: process.env.SECRET_OPEN_API, // Replace with your actual API key
        };

        const response: AxiosResponse = await firstValueFrom(this.httpService.get(url, { params }));
        return response.data;
    }

    async getFileInfo(): Promise<string> {
        return (await fs.promises.readFile(filePath)).toString();
    }
}
