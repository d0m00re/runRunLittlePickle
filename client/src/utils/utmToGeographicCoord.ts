import proj4 from 'proj4';

// Function to approximate UTM zone from longitude
function getUTMZone(longitude: number): number {
    return Math.floor((longitude + 180) / 6) + 1;
}

export const utmToGeographicCoord = (xllcorner: number, yllcorner: number) => {
    // Assuming an initial approximation to find the longitude (This may vary depending on your specific coordinate system)
    const initialLongitude = (xllcorner - 500000) / 111320; // Rough approximation for UTM conversion
    const utmZone = getUTMZone(initialLongitude);

    // Determine if the coordinates are in the Northern Hemisphere
    const isNorthernHemisphere = yllcorner >= 0;

    // Define the UTM projection string
    const utmProjString = `+proj=utm +zone=${utmZone} ${isNorthernHemisphere ? '+north' : '+south'} +datum=WGS84`;

    // Define the WGS84 projection string
    const wgs84ProjString = `+proj=longlat +datum=WGS84 +no_defs`;

    // Convert UTM to geographic coordinates
    const [longitude, latitude] = proj4(utmProjString, wgs84ProjString, [xllcorner, yllcorner]);

    return {
        longitude,
        latitude
    }
}

export const geographicCoordToUtm = (latitude: number, longitude: number) => {

    // Determine UTM zone from the longitude
    const utmZone = getUTMZone(longitude);

    // Determine if the coordinates are in the Northern Hemisphere
    const isNorthernHemisphere = latitude >= 0;

    // Define the WGS84 projection string
    const wgs84ProjString = `+proj=longlat +datum=WGS84 +no_defs`;

    // Define the UTM projection string
    const utmProjString = `+proj=utm +zone=${utmZone} ${isNorthernHemisphere ? '+north' : '+south'} +datum=WGS84`;

    // Convert geographic coordinates to UTM
    const [xllcorner, yllcorner] = proj4(wgs84ProjString, utmProjString, [longitude, latitude]);
    return {
        xllcorner,
        yllcorner
    }
}