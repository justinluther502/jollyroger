<template>
  <main role="main" class="container">
    <h1 class="display-4">Indie Adviser Demo Feedback</h1>
    <form @submit.prevent="sendFeedback">
      <div class="row">
        <div class="col col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">Name</label>
            <input class="form-control" name="user_name"
                   type="text" placeholder="Name"/>
            <label class="mt-2 font-weight-bold">Email Address</label>
            <input class="form-control" name="user_email"
                   type="email" placeholder="Email"/>
            <label class="mt-2 font-weight-bold">My Feedback</label>
            <textarea class="form-control" name="message"
                      rows="10" :placeholder="fbprompt"/>
            <br>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col col-12 col-md-6">
          <b-button block type="submit" class="mr-1" variant="primary">
            Send Feedback
          </b-button>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  name: "DemoFeedback.vue",
  data() {
    return {
      fbprompt: "Leave some feedback! I am particularly interested in any " +
          "feedback from current RIAs that would be interested in " +
          "participating in a beta test period. And I am not, by any means, " +
          "a professional developer so any criticism on the site itself is " +
          "welcome as well. Thanks!"
    }
  },
  methods: {
    sendFeedback(e) {
      const svc = process.env.VUE_APP_EMAIL_SVC_ID
      const template = process.env.VUE_APP_EMAIL_TEMPLATE
      const userid = process.env.VUE_APP_EMAIL_USERID
      emailjs.sendForm(svc, template, e.target, userid)
          .then((result) => {
            console.log('SUCCESS!', result.status, result.text)
          }, (error) => {
            console.log('FAILED...', error)
          })
    }
  }
}
</script>

<style scoped>

</style>