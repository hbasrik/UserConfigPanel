<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/assets/icon.png" alt="Login Image" class="login-image" />
      <h2>Please sign in</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <input type="email" placeholder="E-mail address" v-model="email" required />
        </div>
        <div class="input-container">
          <input type="password" placeholder="Password" v-model="password" required />
        </div>
        <div class="sign-button">
            <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
     async handleSubmit() {
      try {
        // Sign in with Firebase using email and password
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        
        // Get the Firebase ID token
        const idToken = await user.getIdToken();

        console.log('User after login:', auth.currentUser); 
        // Send the ID token to the backend
        const response = await axios.post('http://localhost:3000/login', { token: idToken });

        // Handle successful login and redirect to the dashboard
        console.log('Login successful:', response.data);

        // Navigate to the dashboard only if it's not the current route
       
        if (this.$router.currentRoute.path !== '/dashboard') {
  this.$router.push('/dashboard');
}

        
      } catch (error) {
        // Handle errors during login
        if (error.response) {
          // Server responded with a status code outside the 2xx range
          console.error('Error logging in:', error.response.data);
          alert('Login failed: ' + error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Error logging in: No response received');
          alert('Login failed: No response from server.');
        } else {
          // Something else happened
          console.error('Error logging in:', error.message);
          alert('Login failed: ' + error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b0b28;
}

.login-box {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  width: 380px;
}

.login-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  color: #8e8eb9;
  margin-bottom: 20px;
}

input[type="email"] {
  font-size: 18px;
  width: 90%;
  padding: 1rem;
  border-radius: .5rem .5rem 0 0;
  border: 1px solid #8b7591;
  background-color: #252548;
  color: #fff;
  outline: none;
}

input[type="password"] {
  font-size: 18px;
  width: 90%;
  padding: 1rem;
  border-radius: 0 0 .5rem .5rem;
  border: 1px solid #8b7591;
  background-color: #252548;
  color: #fff;
  outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border: 1px solid rgb(126, 7, 126);
  box-shadow: 0 0 5px rgb(126, 7, 126);
}

input[type="email"]::placeholder,
input[type="password"]::placeholder {
  color: #aaa;
}

button {
  font-weight: 600;
  margin-top: .5rem;
  font-size: 18px;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: .5rem;
  background-color: #4169e1;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #3659c6;
}
</style>
