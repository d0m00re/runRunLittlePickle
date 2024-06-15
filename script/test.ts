//https://khalilstemmler.com/blogs/typescript/node-starter-project/
/**
     ncols and nrows are the numbers of columns and rows, respectively (represented as integers);
    xllcorner and yllcorner are the western (left) x-coordinate and southern (bottom) y-coordinates, such as easting and northing (represented as real numbers with an optional decimal point),
        when the data points are cell-centered xllcenter and yllcenter are used to indicate such registration.
    cellsize is the length of one side of a square cell (a real number); and,
    nodata_value is the value that is regarded as "missing" or "not applicable"; this line is optional, but highly recommended as some programs expect this line to be declared (a real number).
 */

import * as fs from "fs";

const filePath =  "./../asset/dtm/appRasterSelectAPIService1718369389209-1760821768.asc";

const readFile = async () => {
  let data = (await fs.promises.readFile(filePath)).toString().split("\n");
  return data;
}

interface IAscInfo {
  ncols : number;
  nrows : number;
  xllcorner : number;
  yllcorner : number;
  cellsize : number;
}

const makeEmptyIAscInfo = () : IAscInfo => ({
  ncols : 0,
  nrows : 0,
  xllcorner : 0,
  yllcorner : 0,
  cellsize : 0
});

//
const parseHeader = (data : string[]) : IAscInfo => {
  let info = makeEmptyIAscInfo();

  for (let x = 0; x < 6; x++) {
    let elem = data[x].split(" ");
    let key : any = elem[0].toLocaleLowerCase();


    if (info.hasOwnProperty(key) !== undefined) {
      (info)["nrows"] = parseFloat(elem[1]);
    }
  }
  return info;
}

const main = async () => {
    let data = await readFile();

    let header = parseHeader(data);
    console.log(header);

    //
    for (let x = 0; x < 6 && x < data.length; x++) {
      console.log(data[x])
    }

    console.log("length : ", data[10].split(" ").length)
    //

    console.log("Hello world : ", filePath);
    console.log(data.length);
}

main();