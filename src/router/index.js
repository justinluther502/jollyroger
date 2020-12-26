import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/user/Login"
import store from "../store"
import LandingPage from "@/components/LandingPage/LandingPage"
import ClientList from "@/components/ClientRecords/ClientList"
import ClientDetail from "@/components/ClientRecords/ClientDetail"
import ClientOnboard from "@/components/ComplianceDocs/ClientOnboard"
import MPTPage from "@/components/MPTTools/MPTPage"
import newFInPlan from "@/components/FinPlans/newFInPlan"
import Compliance from "@/components/ComplianceDocs/Compliance"
import Settings from "@/components/user/Settings"
import AdvisingSession from "@/components/AdvisingSession/AdvisingSession"
import NewNote from "@/components/ClientRecords/NewNote"

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      component: LandingPage
    },
    {
      path: "/ClientList",
      component: ClientList,
      name: 'client-list'
    },
    {
      path: "/Client/:id",
      component: ClientDetail,
      name: 'client-detail'
    },
    {
      path: "/onboardCheck",
      component: ClientOnboard,
      name: 'client-on'
    },
    {
      path: "/MPT/:mpt_type",
      component: MPTPage,
      props: true
    },
    {
      path: "/finplans/new",
      component: newFInPlan,
      name: 'new-plan'
    },
    {
      path: "/compliance",
      component: Compliance,
      name: 'compliance'
    },
    {
      path: "/session",
      component: AdvisingSession,
      name: 'advising-session'
    },
    {
      path: "/Client/:id/newnotes",
      component: NewNote,
      name: 'new-note'
    },
    {
      path: "/login",
      component: Login,
      name: 'login',
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/account",
      component: Settings,
      name: 'account',
      beforeEnter: ifAuthenticated
    }
  ]
})
