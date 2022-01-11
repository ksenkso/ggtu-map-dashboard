import BuildingsIndex from "../components/buildings/BuildingsIndex";
import BuildingCreate from "../components/buildings/BuildingCreate";
import BuildingEdit from "../components/buildings/BuildingEdit";
import BuildingView from "../components/buildings/BuildingView";

export default [
  {
    path: '/buildings',
    component: BuildingsIndex,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/buildings/create',
    component: BuildingCreate,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/buildings/edit/:id',
    component: BuildingEdit,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/buildings/view/:id',
    component: BuildingView,
    meta: {
      requiresAuth: true
    },
  }
]
