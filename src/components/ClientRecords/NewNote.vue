<template>
  <main role="main" class="container">
    <h1 class="display-4 font-weight-bold">Record Client Interaction Notes</h1>
    <div class="row">
      <p>
        Record notes for client {{$route.params.id}} in the form below and save
        to session info.
      </p>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <textarea class="form-control" rows="10"
                    placeholder="Record notes here" v-model="notes" />
          <br>
          <button class="btn btn-primary" @click="saveNotes">
            Save Notes to Session Data
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {ADD_NOTES} from "@/store/actions/advice"
export default {
  name: "NewNote.vue",
  data() {
    return {
      notes: ""
    }
  },
  methods: {
    saveNotes() {
      this.$store.commit(ADD_NOTES, {user: this.$route.params.id,
        notes: this.notes})
    }
  }
}
</script>

<style scoped>

</style>