<template>
  <b-container fluid class="">
    <b-row>
      <b-col cols="12" sm="4">&nbsp;</b-col>
      <b-col cols="12" sm="4">
        <b-form @submit="onSubmit">
          <b-form-group
              id="input-group-1"
              label-for="input-1"
              class="mb-3"
          >
            <b-form-input
                id="input-1"
                v-model="form.username"
                type="text"
                placeholder="Enter username"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group
              id="input-group-2"
              label-for="input-2"
              class="mb-3"
          >
            <b-form-input
                id="input-2"
                v-model="form.room_id"
                placeholder="RoomID"
                required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success" block class="w-100">Join</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </b-col>
      <b-col cols="12" sm="4">&nbsp;</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        username: '',
        room_id: '',
      },
    }
  },
  mounted() {
    console.log('entered app.');
  },
  methods : {
    onSubmit() {
      console.log('submit');
    }
  }
}
</script>

<style scoped>

</style>
