<template>
  <div class="dashboard">
    <div class="header">
      <img src="@/assets/icon.png" alt="Logo" class="logo" />
     
      <div class="profile-dropdown">
        <button @click="toggleDropdown" class="profile-button">
          <i class="fas fa-user profile-icon"></i>
          <span class="dropdown-icon">&#x25BC;</span>
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <table class="parameters-table">
      <thead>
        <tr>
          <th>Parameter Key</th>
          <th>Value</th>
          <th>Description</th>
          <th>Create Date &#x2193;</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(parameter, index) in parameters" :key="index">
          <td>
            <input
              v-if="parameter.isEditing"
              v-model="parameter.editKey"
              placeholder="Parameter Key"
            />
            <span v-else>{{ parameter.key }}</span>
          </td>
          <td>
            <input
              v-if="parameter.isEditing"
              v-model="parameter.editValue"
              placeholder="Value"
            />
            <span v-else>{{ parameter.value }}</span>
          </td>
          <td>
            <input
              v-if="parameter.isEditing"
              v-model="parameter.editDescription"
              placeholder="Description"
            />
            <span v-else>{{ parameter.description }}</span>
          </td>
          <td>{{ parameter.createDate }}</td>
          <td class="actions">
            <button
              v-if="parameter.isEditing"
              @click="saveEdit(parameter)"
              class="save-button"
            >
              Save
            </button>
            <button
              v-if="parameter.isEditing"
              @click="cancelEdit(parameter)"
              class="cancel-button"
            >
              Cancel
            </button>
            <button
              v-else
              @click="editParameter(parameter)"
              class="edit-button"
            >
              Edit
            </button>
            <button @click="deleteParameter(parameter.id)" class="delete-button">
              Delete
            </button>
          </td>
        </tr>
        <!-- Add Parameter Row -->
        <tr class="add-parameter-row">
          <td><input type="text" placeholder="New Parameter" v-model="newParameter.key" /></td>
          <td><input type="text" placeholder="Value" v-model="newParameter.value" /></td>
          <td><input type="text" placeholder="New Description" v-model="newParameter.description" /></td>
         <td></td>
          <td><button class="add-button" @click="addParameter">ADD</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import axios from 'axios';

export default {
  data() {
    return {
      showDropdown: false,
      parameters: [],
      newParameter: {
        key: '',
        value: '',
        description: '',
      }
    };
  },
  mounted() {
    console.log('DashboardPage component has been mounted.');
    this.fetchParameters();
  },
  methods: {
    async fetchParameters() {
      try {
        const response = await axios.get('http://localhost:3000/configurations', {
          headers: { Authorization: await auth.currentUser.getIdToken() }
        });
        this.parameters = response.data.map(param => ({
          ...param,
          isEditing: false,
          editKey: param.key,
          editValue: param.value,
          editDescription: param.description,
        }));
      } catch (error) {
        console.error('Error fetching parameters:', error);
        alert('Failed to fetch parameters.');
      }
    },
    async addParameter() {
      if (this.newParameter.key && this.newParameter.value && this.newParameter.description) {
        try {
          const response = await axios.post('http://localhost:3000/configurations', this.newParameter, {
            headers: { Authorization: await auth.currentUser.getIdToken() }
          });
          this.parameters.push({
            ...this.newParameter,
            createDate: new Date().toLocaleString(),
            id: response.data.id
          });
          this.newParameter = { key: '', value: '', description: '' };
        } catch (error) {
          console.error('Error adding parameter:', error);
          alert('Failed to add parameter.');
        }
      }
    },
    editParameter(parameter) {
      parameter.isEditing = true;
    },
    async saveEdit(parameter) {
      try {
        const updatedParameter = {
          key: parameter.editKey,
          value: parameter.editValue,
          description: parameter.editDescription,
        };
        await axios.put(`http://localhost:3000/configurations/${parameter.id}`, updatedParameter, {
          headers: { Authorization: await auth.currentUser.getIdToken() }
        });
        parameter.key = parameter.editKey;
        parameter.value = parameter.editValue;
        parameter.description = parameter.editDescription;
        parameter.isEditing = false;
      } catch (error) {
        console.error('Error saving parameter:', error);
        alert('Failed to save parameter.');
      }
    },
    cancelEdit(parameter) {
      parameter.isEditing = false;
    },
    async deleteParameter(id) {
      try {
        await axios.delete(`http://localhost:3000/configurations/${id}`, {
          headers: { Authorization: await auth.currentUser.getIdToken() }
        });
        this.parameters = this.parameters.filter(param => param.id !== id);
      } catch (error) {
        console.error('Error deleting parameter:', error);
        alert('Failed to delete parameter.');
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #0b0b28;
  color: #ccc;
  padding: 20px;
  border-radius: 10px;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.logo {
  height: 40px;
}

.profile-dropdown {
  position: relative;
}

.profile-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.profile-icon {
  margin-right: 5px;
  font-size: 18px;
}

.dropdown-icon {
  margin-left: 5px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #252548;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.dropdown-menu button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  text-align: left;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: #3a3a5e;
}

.parameters-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.parameters-table th, .parameters-table td {
  padding: 10px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #444;
}

.parameters-table th {
  color: #8b94bc;
}

.actions {
  display: flex;
  gap: 5px;
}

.edit-button, .delete-button, .save-button, .cancel-button, .add-button {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.edit-button {
  background-color: #3a86ff;
  color: white;
}

.delete-button {
  background-color: #ef476f;
  color: white;
}

.save-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}



input[type="text"] {
  font-size: 18px;
  width: 90%;
  padding: 1rem;
  border-radius: .5rem ;
  border: 1px solid #8b7591;
  background-color: #252548;
  color: #fff;
  outline: none;
}


.add-parameter-row td:nth-child(1),
.add-parameter-row td:nth-child(2) {
  width: 20%;
}

.add-parameter-row td:nth-child(3) {
  width: 40%;
}

.add-button {
  background-color: #00b4d8;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
}
</style>
