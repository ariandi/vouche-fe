<template>
  <b-container fluid class="">
    <b-row>
      <b-col cols="12" sm="4">&nbsp;</b-col>
      <b-col cols="12" sm="4">
        <b-form>
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
                v-model="form.room_chat_id"
                placeholder="RoomID"
                required
            ></b-form-input>
          </b-form-group>

          <b-button
              variant="success"
              block
              class="w-100"
              :disabled="$store.getters.isLoading"
              @click="onSubmit"
          >
            Join
          </b-button>
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
import {login} from "@/store/helpers/auth";

export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        username: '',
        room_chat_id: '',
      },
      isConnected: false,
      socketMessage: '',
    }
  },
  mounted() {
    console.log('entered app.');
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log('socket connected')
    },

    disconnect() {
      this.isConnected = false;
      console.log('socket disconnect')
    },

    // Fired when the server sends something on the "messageChannel" channel.
    usersChanged(data) {
      this.socketMessage = data
    }
  },
  methods : {
    async onSubmit() {
      // console.log(this.form);
      await this.$store.dispatch('login');
      await this.checkForm();
      console.log(this.$store.getters.authError)
      if (this.$store.getters.authError) {
        alert(this.$store.getters.authError);
        return false;
      }
      // this.$socket.emit('set-name', this.form.username);
      try {
        let resp = await login(this.form);
        if (resp.code === '00') {
          this.$store.commit('loginSuccess', resp);
          await this.$router.push({path: '/chat-room'});
        } else {
          alert(resp.message);
        }
      } catch (e) {
        console.log(e);
        this.$store.commit('loginFailed', e.message);
        alert(e.message);
      }


      // login(this.form)
      //     .then((resp) => {
      //       console.log('res',resp)

            // if(resp === 'Invalid Username or Password'){
            //   this.$store.commit('loginFailed', {resp})
            //   this.errorMsg = this.$store.getters.authError
            //   this.overlay = false
            //   return false
            // }
            //
            // if(resp.error){
            //   this.errorMsg = 'Invalid Username or Password'
            //   this.overlay = false
            //   return false
            // }
            //
            // this.$store.commit('loginSuccess', resp)
            // this.$router.push({path: '/'})
          // })
          // .catch((error) => {
          //   this.$store.commit('loginFailed', {error})
          //   this.errorMsg = this.$store.getters.authError
          // });
    },
    checkForm(){
      let msg = null;
      if (!this.form.username) {
        msg = 'username column can\'t empty';
      } else if (!this.form.room_chat_id) {
        msg = 'room id column can\'t empty';
      }

      this.$store.commit('loginFailed', msg);
      return msg;
    }
  }
}
</script>

<style scoped>

</style>
