#NOTE

This repo is no longer mainteined

# ggtu-map-dashboard

An admin panel for GGTU Maps.

Related repos:
- [Admin panel repo](https://github.com/ksenkso/ggtu-maps-admin)
- [Map library (API client and renderer)](https://github.com/ksenkso/ggtu-map)
- [Map client](https://github.com/ksenkso/ggtu-map-client)
- [Map transformation tool](https://github.com/ksenkso/ggtu-map-too)

## Features

- Create locations, buildings, transitions
- Create objects on maps
- Define paths between objects and locations thorugh transitions (partially broken)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Environment

You need to provide API URL (with trailing slash) in VUE_APP_API_URL variable. It is used to configure an API client from [ggtu-map](https://github.com/ksenkso/ggtu-map)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
