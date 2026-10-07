# TravelTrucks

Web application for a camper rental company. Browse the catalog, filter campers, save favorites, read reviews and send a booking request.

**Live demo:** https://CANLI-SITE-LINKIN.vercel.app

## Features

- Home page with a call-to-action banner leading to the catalog
- Catalog with **backend filtering** by location, vehicle type and equipment (query params sent to the API)
- **Pagination** with a "Load more" button (`page` / `limit` handled by the backend)
- Favorites stored in Redux and persisted in `localStorage`
- Camper details: photo gallery, features, specifications and 5-star reviews
- Booking form with validation and a success notification
- Loading indicators for all async requests, empty and error states
- Prices shown with two decimals (e.g. `€8000.00`)

## Tech stack

React, Vite, Redux Toolkit, React Router, Axios, react-hot-toast, plain CSS.

## Getting started

```bash
git clone https://github.com/GITHUB_KULLANICI_ADIN/traveltrucks.git
cd traveltrucks
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Routes

| Path           | Page           |
| -------------- | -------------- |
| `/`            | Home           |
| `/catalog`     | Catalog        |
| `/catalog/:id` | Camper details |

## Author

ADIN SOYADIN — https://github.com/GITHUB_KULLANICI_ADIN
