import LocationsIndex from "../components/locations/LocationsIndex";
import LocationCreate from "../components/locations/LocationCreate";
import LocationEdit from "../components/locations/LocationEdit";
import MapEditor from "../components/locations/MapEditor";

export default [
  {
    path: '/locations',
    component: LocationsIndex,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/locations/create',
    component: LocationCreate,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/locations/edit/:id',
    component: LocationEdit,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/locations/map/:id',
    component: MapEditor,
    meta: {
      requiresAuth: true
    },
  }
]
