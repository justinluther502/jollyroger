<template>
  <b-navbar-nav>
    <ul class="navbar-nav mr-auto">
      <b-nav-item-dropdown v-for="category in menu_categories"
                           :key="category.id" :text="category.title" right>
        <b-dropdown-item v-for="selection in category.buttons"
                         :key="selection.id" :to="selection.destination">
          {{ selection.title }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>
  </b-navbar-nav>
</template>

<script>
export default {
  name: "SiteNavWidget.vue",
  data() {
    return {
      menu_categories: {
        client_options: {
          id: 1,
          title: "Manage Clients",
          buttons: {
            client_list: {
              id: 0,
              title: "Client List (IBKR users only)",
              destination: "/ClientList",
              icon_component: "ClientSVG",
              show: true
            },
            fake_client_list: {
              id: 3,
              title: "Demo Client List",
              destination: "/FakeClientList",
              icon_component: "ClientSVG",
              show: true
            },
            // new_client: {
            //   id: 1,
            //   title: "Add A New Client",
            //   destination: "/addClient",
            //   icon_component: "ClientSVG",
            //   show: true
            // },
            // client_dashboard: {
            //   id: 2,
            //   title: "Client Dashboard",
            //   destination: "/",
            //   icon_component: "PaperDocSVG",
            //   show: true
            // }
          }
        },
        mpt_options: {
          id: 2,
          title: "Portfolio Optimization",
          buttons: {
            basic_mpt: {
              id: 0,
              title: "Basic MPT - Normally Distributed Returns",
              destination: "/MPT/basic",
              icon_component: "BarchartSVG",
              show: true
            },
            adv_mpt: {
              id: 1,
              title: "Advanced MPT - Non-Normal Returns and Dynamic " +
                  "Correlations",
              destination: "/MPT/advanced",
              icon_component: "BarchartSVG",
              show: true
            }
          }
        },
        fin_plans: {
          id: 3,
          title: "Cashflow Planning",
          buttons: {
            new_plan: {
              title: "Create a New Financial Plan",
              destination: "/finplans/new",
              icon_component: "PaperStackSVG",
              show: true
            }
          }
        },
        regulatory: {
          id: 4,
          title: "Compliance Aids",
          buttons: {
            new_client_checklist: {
              id: 0,
              title: "Onboarding Checklist",
              destination: "/onboardCheck",
              icon_component: "PaperDocSVG",
              show: true
            },
            documentation: {
              id: 1,
              title: "Compliance Documentation Tracker",
              destination: "/compliance",
              icon_component: "PaperStackSVG",
              show: true
            }
          }
        },
        advsession: {
          id: 5,
          title: "Session Logs",
          buttons: {
            viewsession: {
              id: 0,
              title: "View and Save Session Data",
              destination: "/session",
              show: true
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>