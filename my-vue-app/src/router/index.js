import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import CreateHouse from '../views/CreateHouseView.vue';
import EditHouse from '../views/EditHouseView.vue';
import Favorites from '../views/FavoriteHouses.vue';
import HomeView from '../views/HomeView.vue';
import HouseDescription from '../views/DetailPageView.vue';
import MyListings from '../views/MyListingsView.vue';
import ViewedHouses from '../views/ViewedHouses.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/house/:id',
      name: 'description',
      component: HouseDescription
    },
    {
      path: '/house/create',
      name: 'create',
      component: CreateHouse
    },
    {
      path: '/house/edit/:id',
      name: 'edit',
      component: EditHouse
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/mylistings',
      name: 'myListings',
      component: MyListings
    },
    {
      path: '/viewed',
      name: 'viewedHouses',
      component: ViewedHouses
    }
  ]
});

export default router;
