<template>
  <div>
    <div id="container" ref="container" style="min-height: 450px; margin-bottom: 100px;">
      <hr />
      <template v-for="(chat, i) in chatData">
        <b-row class="mb-3" :key="i" :align-h="chat.ownUser ? 'end' : 'start'" ref="data" :id="'data_' + i">
          <b-col :align-self="chat.ownUser ? 'end' : 'start'" cols="6">
            <span class="text-secondary" v-if="!chat.ownUser">{{ chat.username }}</span>
            <b-card class="text-start p-0" :class="{ userChat: !chat.ownUser, 'bg-success': chat.ownUser }">
              <div class="p-0" :class="{ 'text-black': !chat.ownUser, 'text-light': chat.ownUser }">
                {{ chat.message }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </template>

      <div ref="lastScroll" id="lastScroll"></div>
    </div>

    <div class="position-fixed mb-3 w-100" style="bottom: 0; left: 0;">
      <div style="" class="widthProp">
        <b-form-textarea
          class="w-100"
          id="textarea"
          v-model="message"
          placeholder="Type message here"
          rows="1"
          max-rows="6"
          ></b-form-textarea>
          <b-button class="position-absolute widthPropButtom" variant="success" pill @click="sumbitMessage">
            <b-icon-arrow-up></b-icon-arrow-up>
          </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {createChat} from '@/store/helpers/chats'
import VueScrollTo from "vue-scrollto";

export default {
  name: "ChatRoomComponent",
  data () {
    return {
      message: '',
      chatData: [],
      liveData: [],
    };
  },
  props: ['room_id'],
  mounted() {
    setTimeout(async () => {
      await this.getAllChat();
      this.chatData = this.$store.getters.chatData;
      this.setChatPosition();
    }, 100)
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },

    disconnect() {
      console.log('socket disconnect')
    },
    chatChanged(data) {
      this.liveData = data.data;
      if (this.liveData.length > 0) {
        this.chatData = this.liveData;
        this.setChatPosition();
      }
    }
  },
  methods: {
    async getAllChat() {
      await this.$store.dispatch("getChatByRoom", this.room_id);
    },
    async sumbitMessage() {
      let params = {
        username: this.$store.getters.currentUser.username,
        room_id: this.room_id,
        message: this.message
      }
      let result = await createChat(params);
      if (result.code === '00') {
        this.$socket.emit('input-chat', this.room_id);
      }
    },
    setChatPosition() {
      this.chatData.forEach(val => {
        val.ownUser = this.$store.getters.currentUser.username === val.username;
      });
      this.scrollToEnd();
    },
    async scrollToEnd() {
      setTimeout(() => {
        VueScrollTo.scrollTo('#lastScroll');
      }, 500);
    },
  }

}
</script>

<style scoped>
  .card-body {
    padding: 5px;
  }
  .userChat {
    background: #e8e8e8;
  }
  .widthProp {
    margin: 0 auto;
    width: 95%;
  }
  .widthPropButtom{
    right: 5%;
    top: 13px;
  }

  @media (max-width: 576px) {
    .widthProp {
      width: 95%;
    }
  }

  @media (max-width: 768px) and (min-width: 577px) {
    .widthProp {
      width: 85%;
    }
    .widthPropButtom{
      right: 10%;
    }
  }

  @media (max-width: 992px) and (min-width: 769px) {
    .widthProp {
      width: 85%;
    }
    .widthPropButtom{
      right: 10%;
    }
  }

  @media (max-width: 1200px) and (min-width: 993px) {
    .widthProp {
      width: 95%;
    }
  }
</style>
