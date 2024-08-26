import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Import your router configuration
import { auth } from '@/firebase'; // Import your Firebase setup

Vue.config.productionTip = false;

new Vue({
  router,  // Inject the router into the Vue instance
  render: h => h(App),
  created() {
    // Check if the user is already logged in when the app is created
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/');
      }
    });
  }
}).$mount('#app');
