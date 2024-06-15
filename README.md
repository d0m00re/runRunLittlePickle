# runRunLittlePickle
run run little pickle

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
```

# later opti

* LOD : have multiple variation of the map file (https://threejs.org/docs/#api/en/objects/LOD)