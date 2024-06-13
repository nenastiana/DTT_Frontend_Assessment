<template>
  <div class="company-info-container">
    <div class="company-info">
      <h1 class="header">About</h1>
      <h1>About DTT Real Estate</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      <h1>Design and Development</h1>
      <div class="company-info-content">
        <img alt="dttlogo" class="logo-image" :src="LogoImage" />
        <div class="company-links">
          <div>BY DITT</div>
          <a href="http://www.d-tt.nl">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LogoImage from '../assets/img_logo_dtt@3x.png';
</script>

<style>
.company-info-container {
  display: flex;
  justify-content: center;
}

.company-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1100px;
  margin-top: 100px;
}

.company-info a {
  color: #779cc8;
  text-decoration: none;
}

.company-info-content {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 20px;
}

.company-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.header {
  display: none;
}

.logo-image {
  width: 194px;
}

@media only screen and (max-width: 768px) {
  .company-info-container {
    padding: 20px;
  }

  .company-info {
  margin-top: 20px;
}

  .company-links {
    gap: 2px;
    font-size: 12px;
  }

  .header {
    display: block;
    flex-grow: 1;
    text-align: center;
    font-size: 24px;
  }

  h1 {
    font-size: 18px;
  }

  .logo-image {
    width: 130px;
  }

  p {
    font-size: 12px;
  }

}
</style>
