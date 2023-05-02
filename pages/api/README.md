# API
This is the documentation specific for the API.

Client side calls to the api are made through `./components/api.ts`.

**Base URL** https://sthlm-mc-parking-pwa.vercel.app/api/ 

## Parking spot(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /parking | Get all parking spots | 
| POST | /parking/nearby | Get nearby parking spots |  
| GET | /parking/street | Search parking spot streets |  

This endpoint makes calls to [Stockholm Open Parkering API](https://openstreetgs.stockholm.se/Home/Parking)


### **Examples**

<details>
<summary> GET /parking </summary>

**Request:**
```sh
URL: http://localhost:3000/api/parking
Method: "GET"
Headers: {
    "Content-Type": "application/json"
}
```
Status: 200

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": "LTFR_P_MOTORCYKEL.2262273",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        18.064212,
                        59.340714
                    ],
                    [
                        18.064264,
                        59.340755
                    ]
                ],
                "geometry_name": "GEOMETRY",
                "properties": {
                    "FID": 2262273,
                    "FEATURE_OBJECT_ID": 16634259,
                    "FEATURE_VERSION_ID": 1,
                    "EXTENT_NO": 1,
                    "VALID_FROM": "2019-05-31T22:00:00Z",
                    "START_TIME": 600,
                    "END_TIME": 0,
                    "START_WEEKDAY": "onsdag",
                    "CITATION": "0180 2019-01593",
                    "STREET_NAME": "Tegnérgatan",
                    "CITY_DISTRICT": "Vasastaden",
                    "PARKING_DISTRICT": "City",
                    "ADDRESS": "Tegnérgatan 2C",
                    "VF_METER": 5,
                    "VF_PLATS_TYP": "Reserverad p-plats motorcykel",
                    "OTHER_INFO": "Servicetid onsdag 00:00-06:00",
                    "RDT_URL": "https://rdt.transportstyrelsen.se/rdt/AF06_View.aspx?BeslutsMyndighetKod=0180&BeslutadAr=2019&LopNr=01593",
                    "PARKING_RATE": "taxa 12: Vardagar utom vardag före sön- och helgdag klockan 07.00 - 21.00, vardag före sön- och helgdag klockan 9.00 - 19.00 och sön- och helgdag klockan 9.00 - 19.00, 7,75 kr/tim. Övrig tid 5 kr/tim."
                },
                "bbox": [
                    18.064212,
                    59.340714,
                    18.064264,
                    59.340755
                ]
            },
        }, 
        { ... }]
}
```

**Request:**
```sh
URL: http://localhost:3000/api/parking/nearby
Method: "POST",
Headers: {
    "Content-Type": "application/json"
}
Body: {
  "coordinates": {
    "longitude": 18.064212,
    "latitude": 59.340714,
  }
}
```
Status: 404
```json
{
    "type": "FeatureCollection",
    "features": [],
    "totalFeatures": 0,
    "numberMatched": 0,
    "numberReturned": 0,
    "timeStamp": "2023-05-02T10:56:02.296Z"
}
```

</details>
<details>
<summary> POST /parking/nearby </summary>
The response looks the same as the index endpoint but the features array contains nearby locations based on the coordinates provided.


This endpoint initially searches for locations within 100 meter, but in case none are found it makes a second search for locations within 300 meter if there still aren't any it returns an empty features array.

**Body**:
- `coordinates` - an object containing the properties `longitude` and `latitude` with number values

**Request:**
```sh
URL: http://localhost:3000/api/parking/nearby
Method: "GET"
Headers: {
    "Content-Type": "application/json"
}
Body: "coordinates": {
    "longitude": 18.07502720995736,
    "latitude": 59.31323345086049,
}
```

</details>
<details>
<summary> GET /parking/street </summary>
The response looks the same as the index endpoint but the features array contains locations found based on the search term provided.

**Params**:
- `search` - full street name

**Request:**
```sh
URL: http://localhost:3000/api/parking/street?search=Hantverkargatan
Method: "GET"
Headers: {
    "Content-Type": "application/json"
}
```
</details>

## Street(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /streets | Get all streetnames | 
| GET | /streets/streetLocation | Get addresses on a street |  
| GET | /streets/streetNames | Search streetnames |  

This endpoint makes calls to [Stockholm Open LvWS 4 API](https://openstreetgs.stockholm.se/Home/Ws)

### **Examples**

<details>
<summary> GET /streets </summary>
Get all street locations or filter by searching.

**Params**:
- `search` - street name

**Request:**
```sh
URL: http://localhost:3000/api/streets?search=Hantverkargatan
Method: "GET"
Headers: {
    "Content-Type": "application/json"
}
```

Status: 200
```json
{
    "type": "Feature",
    "id": "LTFR_P_MOTORCYKEL.2262389",
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [
              18.075074,
              59.313121
            ],
            [
              18.07515,
              59.31313
            ]
        ]
    },
    "geometry_name": "GEOMETRY",
    "properties": {
        "FID": 2262389,
        "FEATURE_OBJECT_ID": 16652620,
        "FEATURE_VERSION_ID": 1,
        "EXTENT_NO": 1,
        "VALID_FROM": "2019-05-31T22:00:00Z",
        "START_MONTH": 6,
        "END_MONTH": 8,
        "START_DAY": 15,
        "END_DAY": 15,
        "CITATION": "0180 2019-02190",
        "STREET_NAME": "Åsögatan",
        "CITY_DISTRICT": "Södermalm",
        "PARKING_DISTRICT": "Södermalm",
        "ADDRESS": "Åsögatan 113",
        "VF_METER": 4,
        "VF_PLATS_TYP": "Reserverad p-plats motorcykel",
        "OTHER_INFO": "Servicetid fredag 00:00 - 06:00 utom under tiden 15 juni - 15 augusti",
        "RDT_URL": "https://rdt.transportstyrelsen.se/rdt/AF06_View.aspx?BeslutsMyndighetKod=0180&BeslutadAr=2019&LopNr=02190",
        "PARKING_RATE": "taxa 13: Vardagar utom vardag före sön- och helgdag klockan 7.00 - 19.00, 5 kr/tim. Vardag före sön- och helgdag klockan 11.00 - 17.00, 3,75 kr/tim."
    },
    "bbox": [
        18.075074,
        59.313121,
        18.07515,
        59.31313
    ]
  },
  { ... }
}
```

</details>

<details>
<summary> GET /streets/streetNames </summary>
This endpoint returns an array of streetnames based on the search provided. It has a fuzziness of 3, allowing names with a difference of 3 characters to be found in case of error in spelling.

**Params**:
- `search` - full or partial street name

**Request:**
```sh
URL: http://localhost:3000/api/streets/streetNames?search=Åsö
Method: "GET"
Headers: {
    "Content-Type": "application/json"
}
```
Status: 200
```json
[
    {
        "Name": "Stockholm",
        "StreetNames": [
            "Åsögatan",
            "Åsötorget"
        ]
    }
]`
```
</details>

<details>
<summary> GET /streets/streetLocation </summary>
This returns center coordinates of a street.

**Params**:
- `streetName` - Full street name
- `streetNumber` - Optional, provide street number


**Request:**
```sh
URL: http://localhost:3000/api/streets/streetLocation?streetName=Åsögatan&streetNumber=115
Method: "GET"
Headers: {
    "Content-Type": "application/json"
}
```
Status: 200
```json
[
    {
        "Municipality": "Stockholm",
        "PostalArea": "Stockholm",
        "PostalCode": 11221,
        "StreetName": "Hantverkargatan",
        "StreetNum": "1",
        "Wkt": "POINT (18.0551406 59.3278249)"
    },
    { ... }
]
```
</details>