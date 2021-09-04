<template>
  <b-container class="mt-3">
    <div class="text-center">
      <div class="float-start">
        <p class="text-success">exit</p>
      </div>
      <h1>Chat Room ID</h1>
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
  }
}
</script>

<style scoped>

</style>
