<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/sthlm-mc-parking-pwa">
    <img src="components/assets/images/og-icon.png" alt="parking icon" width="80" height="80" >
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
## About The Project

This application lets you search or use your current location to find parking spots in the Stockholm City area. It utilises the local traffic offices road database through the Open Stockholm API to get all registered locations of motorcycle parking spots.
To display the map and location markers, the google Maps JavaScript API is used.

## Built with
* [<img alt="TypeScript" src="https://img.shields.io/static/v1?style=flat&logo=typescript&label=&message=TypeScript&color=white"/>](https://www.typescriptlang.org/)
* [<img alt="Next.js" src="https://img.shields.io/static/v1?style=flat&logo=next.js&label=&message=Next&color=black"/>](https://nextjs.org/)

<!-- GETTING STARTED -->
## Getting Started

To setup a local copy follow the steps below

### Prerequisites

* NPM - https://nodejs.org/en/download/

### Installation
 
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
Add a .env file in the root folder add the following code in that file along with your keys
```
#HTTPS=true
SSL_CRT_FILE=src/config/ssl/cert.pem
SSL_KEY_FILE=src/config/ssl/key.pem

#Trafikverket API
NEXT_APP_TRAFIKVERKET_API_URL=https://openparking.stockholm.se/LTF-Tolken/v1/pmotorcykel
NEXT_APP_LV_API_URL=https://openstreetws.stockholm.se/LvWS-4.0/Lv.svc/json
NEXT_APP_TRAFIKVERKET_API_KEY=Open Stockholm key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=Google Maps key
NEXT_PUBLIC_URL=Your deployed page root URL
```

## Run the app
### Localhost
Start up the application by running the below command when standing in the root of the repository folder.
```sh
npm run dev
```

After starting your app you can open <a href="http://localhost:3000/">http://localhost:3000/</a> in the browser.
The page reloads as you make changes and save your code.
