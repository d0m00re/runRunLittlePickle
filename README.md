# runRunLittlePickle
run run little pickle

## bug
* camera reset when we click on timeline
* gpx trace don t correctly match the map

## improve
* rework shader
* show elevation information on timeline
* timeline ui integration improvement

## feature
* user account
* create a map + import gpx trace

## geoJSON
GeoJSON est un format ouvert d'échange de données géospatiales utilisant la norme JSON représentant des entités géographiques simples et leurs attributs non spatiaux

## DEM - Digital elevation model
A digital elevation model (DEM) or digital surface model (DSM)

## opentopography
provide lot of differnet type of file about topo data
https://en.wikipedia.org/wiki/Digital_elevation_model

https://www.youtube.com/watch?v=fvzNkdmoy48

## goal 1
* read data file
* preview with threejs
* inject gpx or custom iti


### asc file
```
    ncols and nrows:
        are the numbers of columns and rows, respectively (represented as integers);
    xllcorner and yllcorner
        are the western (left) x-coordinate and southern (bottom) y-coordinates, such as easting and northing (represented as real numbers with an optional decimal point),
        when the data points are cell-centered xllcenter and yllcenter are used to indicate such registration.
    cellsize
        is the length of one side of a square cell (a real number); and,
    nodata_value
        is the value that is regarded as "missing" or "not applicable"; this line is optional, but highly recommended as some programs expect this line to be declared (a real number).
```

### WGS 84 (World Geodetic System 1984) 
```
est un système géodésique mondial. Il est composé d'un système de coordonnées, d'un ellipsoïde de référence (l'ellipsoïde de révolution IAG GRS 80) et d'un géoïde (EGM96 ou suivantNote 1). Ce système géodésique mondial est notamment utilisé par le système de positionnement par satellite GPS. 
```


### WGS 84  bounding box wanted
```
Minimum Longitude (west)
Minimum Latitude (south)
Maximum Longitude (east)
Maximum Latitude (north)
```

### gps coordinate to WGS 84 bounding box
```
calculate a bounding box (in WGS 84 coordinates) given a central GPS coordinate and the desired width and height (in meters), you can follow these steps:
```
#### basis formula
```
The Earth's radius is approximately 6,371,000 meters.
Latitude: 1 degree is approximately 111,320 meters.
Longitude: 1 degree varies with latitude and is approximately 111,320 meters * cos(latitude).
```

#### convert width and height from meters to degrees
```
Width in degrees= (width in meters) / (111.320 * cos(lattitude))
Height in degrees= (height in meters) / 111.320
```

####
```
min_lat=lat0​−2Height in degrees​
max_lat=lat0+Height in degrees2max_lat=lat0​+2Height in degrees​
min_lon=lon0−Width in degrees2min_lon=lon0​−2Width in degrees​
max_lon=lon0+Width in degrees2max_lon=lon0​+2Width in degrees​
```


#### ile dieu exemple
```
longitude (vertical)
latitude (horrizontal)
https://www.limko.cm/wp-content/uploads/2021/09/latitude-longitude.jpg
http://bboxfinder.com/

Minimum Longitude (west)
Minimum Latitude (south)
Maximum Longitude (east)
Maximum Latitude (north)

lng / lat :  -3.287659,47.265392 (bottom left)
lng / lat -3.048706,47.400316  (top right)

So : 
South: 47.265392
North: 47.400316
West: -3.287659
East: -3.048706

## uv coordinate

Les coordonnées UV sont souvent normalisées, ce qui signifie qu'elles sont comprises entre 0 et 1.

position -> raycast bottom -> get uv -> cacul coordinate with that

target gps -> find pts
```

## Why 0.000277777778 === 30 meters ?

The cell size of 0.000277777778 corresponds to a resolution of 30 meters because it represents the distance between adjacent cells in the grid. This conversion is based on the fact that one degree of latitude spans approximately 111,319 meters, and one degree of longitude spans approximately 111,132 kilometers at the equator.

To understand why 0.000277777778 corresponds to 30 meters, let's break down the calculation:

    Latitude Conversion: Since we're dealing with a unit of measurement in meters, we'll focus on the conversion from degrees to meters. One degree of latitude equals approximately 111,319 meters. Therefore, to convert a degree of latitude to meters, you multiply by 111,319.

    Longitude Conversion: The conversion for longitude is more complex due to the Earth's curvature and varies depending on the location. However, for simplicity and assuming we're working near the equator where the approximation holds true, one degree of longitude equals approximately 111,132 kilometers. To convert this to meters, you would multiply by 1,111,320 (since there are 1,000 meters in a kilometer).

    Cell Size Calculation: Given that the cell size is being represented in decimal degrees (a common practice in GIS systems), and assuming a uniform scale across both latitude and longitude, the cell size of 0.000277777778 can be interpreted as follows:

    For latitude: (0.000277777778 \times 111,319 = 30.83333333) meters.
    For longitude: (0.000277777778 \times 111,132 = 30.86388889) meters.

In practical terms, a cell size of 0.000277777778 translates to approximately 30 meters in both latitude and longitude directions under these approximations. This means that each cell in the grid represents a square area of about 900 square meters (30m x 30m) at the equator.

It's important to note that this explanation simplifies the Earth's geometry and assumes a constant scale, which may not perfectly apply everywhere on Earth due to variations in the Earth's shape and size. For precise geospatial analysis, more sophisticated methods considering the Earth's ellipsoidal shape and varying scales along latitude and longitude lines should be employed.

## warning
```
don t use EU_DTM (because of xllcorner    3320790.000000000000
yllcorner    2770420.000000000000)
here we don t have real abs gps coordinate but, we will use cop30 data (copernicus global DSM 30m)
```

# prio opti
* raytracing for finding ground take too much time, probably better to rework this part
1) get height from the map directly with position calculation
2) or maybe that come from too many ratracing init

# later opti
* use chrome not firefox
* LOD : have multiple variation of the map file (https://threejs.org/docs/#api/en/objects/LOD)

# next goal :
* gps position -> position on the map
    * {x: -3.168333329678278, y: 47.33298148116576}, Player.tsx:79 47.33298148116576,-3.168333329678278
    *  Player.tsx:79 47.333462959898235,-3.168333329678278
* uv -> gps position


### get pos array with real world pos
```
### BASE PTS INFO
    0 : -68.27400097498139
    1 : 311.12999916428566
    2 :  100

### TOTAL DIM MAP :
ncols     dim_x =    860 * SCALE.x
nrows     dim_y =    486 * SCALE.y

### MIDDLE MAP 
middle_dim_x = dim_x / 2;
middle_dim_y = dim.y / 2;

### DIM ONE CASE :
dimOneCase.x = SCALE.x
dimOneCase.y = SCALE.y

### Calcul : 
getting current case 
let absPos.x = (posPts.x + middle_dim_x);
let arrPos.x = Math.floor(absPos.x / dimOneCase.x);

let absPos.y = (posPts.y + middle_dim_y);
let arrPos.y = Math.floor(absPos.y / dimOneCase.y);

### DESIRED OUTPUT : 
    pos on map data [x, y] 
```