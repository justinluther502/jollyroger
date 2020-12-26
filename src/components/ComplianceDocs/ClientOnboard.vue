<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <h1 class="display-4">New Client Onboarding Checklist</h1>
    <div class="row">
      <div class="col-lg">
        <div class="form-check" v-for="item in listItems" v-bind:key="item">
          <input type="checkbox" class="form-check-input">
          <label class="form-check-label">
            {{item}}
          </label>
        </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "ClientOnboard",
    data () {
      return {
        listItems: {
          initCall: "Have an initial call. Determine state of residence and " +
            "estimated investable assets. Discuss overall onboarding" +
            " process. Provide introduction to Luther Wealth Management.",
          qForm: "Send client a copy of Luther Wealth Management Initial " +
            "Client Questionnaire using the most recent dated version in " +
            "the client records directory.",
          reviewForm: "Review completed client questionnaire. Record " +
            "initial determination of risk willingness and ability in " +
            "client notes file.",
          draftIPS: "Draft an IPS. Do not include securities and funds " +
            "at this time. Use the most recent dated IPS in the client" +
            "agreements directory.",
          followUpCall: "Schedule a follow up call with the client. During " +
            "this call determine what type of accounts will be established: " +
            "IRAs, joint, etc. Determine the appropriate investable " +
            "universe of funds. Walk through each document that will govern " +
            "the client relationship: agreement, IPS, ADV form. Discuss " +
            "fee structure. Discuss risks of investment. Discuss " +
            "relationship with custodian bank. Notify client that they may" +
            "incur fees and charges at banks they are transferring money " +
            "from and that LWM has no way of stopping this or knowing what " +
            "the charge will be, and that there may be unwanted tax " +
            "consequences if their previous bank is forced to liquidate " +
            "sheltered assets to pay the fee. Record exactly which source " +
            "accounts will be used and their tax status, and what " +
            "destination accounts will be matched to them.",
          MPT: "Use the MPT optimizer tool to generate an efficient " +
            "frontier for the client defined investable universe. Include " +
            "any requested caps and floors. Use the frontier in combination " +
            "with willingness and ability to take risk to select a model" +
            "MPT portfolio for an appropriate risk level.",
          finalIPS: "Use MPT portfolio results along with adviser " +
            "discretion to select fund target weight ranges. Add target " +
            "ranges and re-balancing policy to IPS. Final edit / revisions.",
          draftAgreement: "Add IPS to standard agreement and fill in all " +
            "contact details.",
          docSend: "Send finalized agreement, IPS, ADV forms to client for " +
            "signature.",
          coolOff: "72-hour cool-off period to allow client to review " +
            "documents.",
        }
      }
    }
  }
</script>

<style scoped>

</style>
