<template>
  <div class="dashboard">
    <div class="user-profile">
      <img src="@/assets/icon.png" alt="User Profile" />
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
          <td>{{ parameter.key }}</td>
          <td>{{ parameter.value }}</td>
          <td>{{ parameter.description }}</td>
          <td>{{ parameter.createDate }}</td>
          <td>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="add-parameter">
      <input type="text" placeholder="New Parameter" v-model="newParameter.key" />
      <input type="text" placeholder="Value" v-model="newParameter.value" />
      <input type="text" placeholder="New Description" v-model="newParameter.description" />
      <button class="add-button" @click="addParameter">ADD</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parameters: [
        { key: 'min_version', value: '1.4.4', description: 'Minimum required version of the app', createDate: '10/05/2021 01:58' },
        { key: 'latest_version', value: '1.4.7', description: 'Latest version of the app', createDate: '10/05/2021 01:58' },
        { key: 'pricing_tier', value: 't6', description: 'Pricing tier of the user', createDate: '07/07/2021 11:13' },
        { key: 'scroll', value: 5, description: 'Index of Scroll Paywall for free users.', createDate: '25/08/2021 10:22' },
        { key: 'scroll_limit', value: 13, description: 'Index of Scroll Limit Paywall for free users.', createDate: '25/08/2021 10:23' },
      ],
      newParameter: {
        key: '',
        value: '',
        description: '',
      }
    };
  },
  methods: {
    addParameter() {
      if (this.newParameter.key && this.newParameter.value && this.newParameter.description) {
        this.parameters.push({
          ...this.newParameter,
          createDate: new Date().toLocaleString()
        });
        this.newParameter = { key: '', value: '', description: '' };
      }
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #1b1b2f;
  color: #ccc;
  padding: 20px;
  border-radius: 10px;
}

.user-profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.parameters-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.parameters-table th, .parameters-table td {
  padding: 10px;
  text-align: left;
}

.parameters-table th {
  color: #8b94bc;
}

.parameters-table tbody tr {
  border-bottom: 1px solid #444;
}

.edit-button, .delete-button, .add-button {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.edit-button {
  background-color: #3a86ff;
  color: white;
}

.delete-button {
  background-color: #ef476f;
  color: white;
}

.add-parameter input {
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #222831;
  color: white;
}

.add-button {
  background-color: #00b4d8;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
