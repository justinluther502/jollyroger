import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/user/Login"
import store from "../store"
import LandingPage from "@/components/LandingPage/LandingPage"
import ClientList from "@/components/ClientRecords/ClientList"
import ClientDetail from "@/components/ClientRecords/ClientDetail"
// import ClientOnboard from "@/components/ComplianceDocs/ClientOnboard"
import MPTPage from "@/components/MPTTools/MPTPage"
import newFInPlan from "@/components/FinPlans/newFInPlan"
// import Compliance from "@/components/ComplianceDocs/Compliance"
import Settings from "@/components/user/Settings"
import AdvisingSession from "@/components/AdvisingSession/AdvisingSession"
import NewNote from "@/components/ClientRecords/NewNote"
import NewAdviser from "@/components/user/NewAdviser"
import FakeClientList from "@/components/ClientRecords/FakeClientList"
import FakeClientDetail from "@/components/ClientRecords/FakeClientDetail"
import DemoFeedback from "@/components/DemoFeedback"
import EditClientProfile from "@/components/ClientRecords/EditClientProfile"

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next("/")
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next("/login")
}

export default new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
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
      name: 'client-list',
      beforeEnter: ifAuthenticated
    },
    {
      path: "/FakeClientList",
      component: FakeClientList,
      name: 'fake-client-list',
      beforeEnter: ifAuthenticated
    },
    {
      path: "/FakeClientDetail/:id",
      component: FakeClientDetail,
      name: 'fake-client-detail',
      beforeEnter: ifAuthenticated
    },
    {
      path: "/Client/:id",
      component: ClientDetail,
      name: 'client-detail',
      beforeEnter: ifAuthenticated
    },
    // {
    //   path: "/onboardCheck",
    //   component: ClientOnboard,
    //   name: 'client-on'
    // },
    {
      path: "/MPT/:mpt_type",
      component: MPTPage,
      props: true,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/finplans/new",
      component: newFInPlan,
      name: 'new-plan',
      beforeEnter: ifAuthenticated
    },
    // {
    //   path: "/compliance",
    //   component: Compliance,
    //   name: 'compliance'
    // },
    {
      path: "/session",
      component: AdvisingSession,
      name: 'advising-session',
      beforeEnter: ifAuthenticated
    },
    {
      path: "/Client/:id/newnotes",
      component: NewNote,
      name: 'new-note',
      beforeEnter: ifAuthenticated
    },
    {
      path: "/Client/:id/editprofile",
      component: EditClientProfile,
      name: 'edit-client-profile',
      beforeEnter: ifAuthenticated
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
    },
    {
      path: "/register",
      component: NewAdviser,
      name: 'register'
    },
    {
      path: "/feedback",
      component: DemoFeedback,
      name: 'feedback'
    }
  ]
})
