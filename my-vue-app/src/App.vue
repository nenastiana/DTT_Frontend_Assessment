<template>
  <div class="nav-bar-container">
    <div class="nav-bar">
      <RouterLink to="/">
        <img alt="dttlogo" class="logo" :src="Logo" />
      </RouterLink>
      <nav>
        <RouterLink to="/">
          <span class="nav-text">Home</span>
          <img :src="isAboutActive ? HomeMobile : HomeMobileActive" alt="IconHome" class="icon-mobile" />
        </RouterLink>
        <RouterLink to="/about">
          <span class="nav-text">About</span>
          <img :src="isAboutActive ? InfoMobileActive : InfoMobile" alt="IconInfo" class="icon-mobile" />
        </RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
        <RouterLink to="/mylistings">My listings</RouterLink>
        <RouterLink to="/viewed">History</RouterLink>
      </nav>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

import Logo from './assets/img_logo_dtt@3x.png';
import HomeMobileActive from './components/icons/ic_mobile_navigarion_home_active@3x.png';
import HomeMobile from './components/icons/ic_mobile_navigarion_home@3x.png';
import InfoMobileActive from './components/icons/ic_mobile_navigarion_info_active@3x.png';
import InfoMobile from './components/icons/ic_mobile_navigarion_info@3x.png';

const route = useRoute();
const isAboutActive = ref(route.path === '/about');

watch(() => route.path, (newValue) => {
  isAboutActive.value = newValue === '/about';
});

</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: black;
  font-weight: 600;
}

nav a {
  text-decoration: none;
  margin-right: 50px;
  color: gray;
}

nav a:hover {
  color: black;
}

.nav-bar-container {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 80px;
}

.nav-bar {
  display: flex;
  width: 1100px;
}

.logo {
  width: 134px;
  height: 44px;
  margin-right: 50px;
  cursor: pointer;
}

.icon-mobile {
  display: none;
}

@media only screen and (max-width: 768px) {
  .nav-bar-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-bar {
    justify-content: space-around;
    width: 100%;
  }

  .logo {
    display: none;
  }

  nav {
    justify-content: space-around;
    width: 100%;
  }

  nav a:nth-child(3),
  nav a:nth-child(4),
  nav a:nth-child(5) {
    display: none;
  }

  .icon-mobile {
    display: block;
    width: 25px;
  }

  .nav-text {
    display: none;
  }
}
</style>
