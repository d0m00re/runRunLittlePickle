function calculateBoundingBox(lat: number, lon: number, widthM: number, heightM: number) {
    // Earth's radius in meters
    const R = 6371000;

    // Convert width and height from meters to degrees
    const widthDeg = widthM / (111320 * Math.cos(lat * Math.PI / 180));
    const heightDeg = heightM / 111320;

    // Calculate bounding box
    const minLat = lat - (heightDeg / 2);
    const maxLat = lat + (heightDeg / 2);
    const minLon = lon - (widthDeg / 2);
    const maxLon = lon + (widthDeg / 2);

    return {
        minLat: minLat,
        maxLat: maxLat,
        minLon: minLon,
        maxLon: maxLon
    };
}

// Example usage:
const centerLat = 40.7128;  // Latitude of central point
const centerLon = -74.0060;  // Longitude of central point
const width = 5000;  // Width in meters
const height = 3000;  // Height in meters

const boundingBox = calculateBoundingBox(centerLat, centerLon, width, height);
console.log(boundingBox);