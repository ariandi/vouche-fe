<template>
  <b-container class="mt-3">
    <div class="text-center">
      <div class="float-start">
        <p class="text-success" @click="logout">exit</p>
      </div>
      <h1>{{ $route.query.room_id }}</h1>
    </div>
    <ChatRoomComponent class="mt-4" />
  </b-container>
</template>

<script>
import ChatRoomComponent from '@/components/ChatRoomComponent'

export default {
  name: "ChatRoom",
  components : {
    ChatRoomComponent
  },
  mounted() {
    // alert(JSON.stringify(this.$route.query));
  },
  methods: {
    logout: function () {
      this.items = []
      this.$store.dispatch("logout", { is_logged_in: 0 }).then(() => {
        this.$router.push("/");
      });
    },
  }
}
</script>

<style scoped>

</style>
