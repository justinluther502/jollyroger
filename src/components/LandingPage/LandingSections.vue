<template>
  <div class="container">
    <div class="card-deck">
      <div class="card bg-light" v-for="card in desc_cards" :key="card.id"
           style="border: none">
        <component :is="card.icon" class="text-primary"/>
        <div class="card-body">
          <h2 class="card-title text-secondary">{{ card.name }}</h2>
          <p class="card-text text-justify">{{ card.body }}</p>
        </div>
        <div class="card-footer bg-light" style="border: none;">
          <router-link tag="button" class="btn btn-secondary" :to=card.link>
            See more >>
          </router-link>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import graphUp from "@/components/Icons/graphUp"
import checklist from "@/components/Icons/checklist"
import pieFilled from "@/components/Icons/pieFilled"

export default {
  name: "LandingSections.vue",
  components: {graphUp, checklist, pieFilled},
  data() {
    return {
      desc_cards: {
        mpt_tools: {
          id: 1,
          name: "Portfolio Tools",
          icon: pieFilled,
          body: "Build efficient portfolios based on client risk tolerance, " +
              "available and allowed asset classes, and our risk model. " +
              "Supports floors and caps on individual asset class weights.",
          link: "/MPT/advanced"
        },
        finplans: {
          id: 2,
          name: "Financial Planning",
          icon: graphUp,
          body: "Create financial plans and cash flow forecasts for your " +
              "clients. Model income, expenses, savings, expected returns, " +
              "and tax profiles to analyze your clients' retirement " +
              "positioning.",
          link: "/finplans/new"
        },
        compliance: {
          id: 3,
          name: "Compliance Aids",
          icon: checklist,
          body: "Keep track of your required compliance tasks and documents " +
              "so you can focus on providing valuable advice to your clients.",
          link: "/onboardCheck"
        }
      }
    }
  }
}
</script>

<style scoped>
.card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: .5rem;
}
</style>