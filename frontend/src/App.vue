<template>
  <div id="app">
    <LoginPage v-if="!isLoggedIn" @login="handleLogin" />
    <DashboardPage v-if="isLoggedIn" />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';
import DashboardPage from './components/DashboardPage.vue';

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,  
    };
  },
  components: {
    LoginPage,
    DashboardPage,
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;  
    }
  }
}
</script>
