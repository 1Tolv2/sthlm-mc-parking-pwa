<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/sthlm-mc-parking-pwa">
    <img src="components/assets/images/og-icon.png" alt="parking icon" width="80" height="80" />
  </a>

<h3 align="center">STHLM MC Parking</h3>

  <p align="center">
    A progressive web app written in TypeScript with Next.js
    <br />
    <a href="https://github.com/1Tolv2/sthlm-mc-parking-pwa"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/1Tolv2/sthlm-mc-parking-pwa/issues">Propose Feature</a>
	  ·
    <a href="https://github.com/1Tolv2/sthlm-mc-parking-pwa/issues">Report Bug</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
# About The Project

This application lets you search or use your current location to find parking spots in the Stockholm City area. It utilises the local traffic offices road database through the Open Stockholm API to get all registered locations of motorcycle parking spots.
To display the map and location markers, the google Maps JavaScript API is used.

## Built with
* [<img alt="TypeScript" src="https://img.shields.io/static/v1?style=flat&logo=typescript&label=&message=TypeScript&color=white"/>](https://www.typescriptlang.org/)
* [<img alt="Next.js" src="https://img.shields.io/static/v1?style=flat&logo=next.js&label=&message=Next.js&color=black"/>](https://nextjs.org/)

<!-- GETTING STARTED -->
# Getting Started

To setup a local copy follow the steps below

## Prerequisites

* NPM - https://nodejs.org/en/download/

## Installation
 
1. First start cloning the repo by entering the below command in your terminal.
   ```sh
   git clone https://github.com/1Tolv2/sthlm-mc-parking-pwa-typescript.git
   ```
2. After cloning the repository, cd in to the new folder and install.
   ```sh
   npm install
   ```
3. Set up your env variables
You need to get 2 keys
- A google maps JavaScript API key at: https://console.cloud.google.com/
- A Open Stockholm key at: https://openstreetgs.stockholm.se/Home/News

Rename the `./.env.example` file to `.env` and fill out the empty variables with your keys

## Run the app
### Localhost
Start up the application by running the below command when standing in the root of the repository folder.
```sh
npm run dev
```

After starting your app you can open <a href="http://localhost:3000/">http://localhost:3000/</a> in the browser.
The page reloads as you make changes and save your code.


# Documentation
This project is setup by using `create-next-app --typescript`, to read more about this setup process see [Next.js "Getting started" documentation](https://nextjs.org/docs/getting-started).
## Scripts
To run scripts you can write `npm run <SCRIPT>`, e.g `npm run dev`
- `dev` - Runs `next dev` to start Next.js in development mode
- `build` - Runs `next build` to build the application for production usage
- `start` - Runs `next start` to start a Next.js production server
- `lint` - Runs `next lint` to set up Next.js' built-in ESLint configuration

## Application structure
This is a one page application so the app is rendered from the index page, `./pages/index`.

In the index page the main structure is prepared
- `<Layout />` encapsulates the app which contains `<main />`.
- `<AppProvider />` contains all the context for the application so all content is rendered as it's child. 
- `<Content />` renders every component.

The application utilises the next api to provide security for the api keys aswell as get around CORS on the Stockholm Open APIs.

This is a diagram of the application structure.
<img src="components/assets/images/app-diagram.svg" alt="application diagram" width="100%" height="auto" />

### Context
All context providers are rendered through `./context/index`.

The following are provided:
- `AppContext` - Application loading states.
- `ModalContext` - State of the modal content and renders the modal.
- `ParkingContext` - Parkingspot aswell as location states and a reset function to reset to all parkingspots.
- `MapContext` - Map setting states and a reset function to reset map to initial center position.

### Components
All components are found in the `./components` folder, the main components are found in it's root, eg. `<MapNavigation />` and `<TopNavigation />`, the rest are in `./library`.

Components in the library folder are grouped based on similarity, like `/library/buttons`, or on relation like `/library/map` which contains `<Map />` that renders `<ParkingLocations />` which is a one-time-use-component but they are split up to help with readability.

#### **Basic reusable components**

- `<StandardContainer />` - This is a container for free floating components on top of the map.
- `<Icons />` - To dynamically render icons, add icon here to the icons object.
- `<Modal />` - This is a container for prompt or information that should grab the users attention.
- `<LoadingModal />` - Whenever data is being fetched, this should be shown to inform the user, it triggers by setting `isLoading` to `true`.

### Types
All custom types are found here. Import them through the index, like so:
```javascript
import { FeatureItem } from "../types";
```

### API
The API is found in `./pages/api`.
Client side calls are made through `./components/api.ts`.

**Base URL** https://sthlm-mc-parking-pwa.vercel.app/api/ 

### Parking spot(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /parking | Get all parking spots | 
| POST | /parking/nearby | Get nearby parking spots |  
| GET | /parking/street | Search parking spot streets |  

This endpoint makes calls to [Stockholm Open Parkering API](https://openstreetgs.stockholm.se/Home/Parking)


#### **Examples**

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

### Street(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /streets | Get all streetnames | 
| GET | /streets/streetLocation | Get addresses on a street |  
| GET | /streets/streetNames | Search streetnames |  

This endpoint makes calls to [Stockholm Open LvWS 4 API](https://openstreetgs.stockholm.se/Home/Ws)

#### **Examples**

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

## Lint
To be filled out

## Deploy
To be filled out

## UI Design
To be filled out