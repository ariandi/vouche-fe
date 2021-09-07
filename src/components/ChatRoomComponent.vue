<template>
  <div>
    <b-row class="mb-3">
      <b-col align-self="start" cols="6">
        <span class="text-secondary">test tost</span>
        <b-card class="text-start p-0" style="background: #e8e8e8;">
          <div class="text-black p-0">
            Test Message apap sdkskd sdjsjd fsjjs sds
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row align-h="end" class="mb-3">
      <b-col align-self="end" cols="6">
        <b-card class="text-start bg-success">
          <div class="text-light">
            Test Message apap sdkskd sdjsjd fsjjs sds
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row align-h="end" class="mb-3">
      <b-col align-self="end" cols="6">
        <b-card class="text-start bg-success">
          <div class="text-light">
            Test Message apap sdkskd sdjsjd fsjjs sds
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row align-h="end" class="mb-3">
      <b-col align-self="end" cols="6">
        <b-card class="text-start bg-success">
          <div class="text-light">
            Test Message apap sdkskd sdjsjd fsjjs sds
          </div>
        </b-card>
      </b-col>
    </b-row>

    <div class="position-fixed mb-3 w-100" style="bottom: 0; left: 0;">
      <div style="" class="widthProp">
        <b-form-textarea>
          class="w-100"
          id="textarea"
          v-model="message"
          placeholder="Enter something..."
          rows="1"
          max-rows="6"
          ></b-form-textarea>
          <b-button class="position-absolute widthPropButtom" variant="success" pill>
            <b-icon-arrow-up></b-icon-arrow-up>
          </b-button>
      </div>
    </div>
<!--    <b-row class="position-absolute mb-3 bottom-0">-->
<!--      <b-col cols="12">-->
<!--        <b-form-textarea-->
<!--            class="w-100"-->
<!--            id="textarea"-->
<!--            v-model="message"-->
<!--            placeholder="Enter something..."-->
<!--            rows="1"-->
<!--            max-rows="6"-->
<!--        ></b-form-textarea>-->
<!--        <b-button class="position-absolute" style="right: 20px; top: 13px;" variant="success" pill>-->
<!--          <b-icon-arrow-up></b-icon-arrow-up>-->
<!--        </b-button>-->
<!--      </b-col>-->
<!--    </b-row>-->
  </div>
</template>

<script>
export default {
  name: "ChatRoomComponent",
  data () {
    return {
      message: '',
    };
  },
  mounted() {
    console.log(123);
  },
  methods: {

  }

}
</script>

<style scoped>
  .card-body {
    padding: 5px;
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
