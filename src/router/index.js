import Vue from "vue";
import VueRouter from "vue-router";

import CoachesList from "@/views/coaches/CoachesList.vue";
import NotFoundPage from "@/views/NotFoundView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", redirect: "/coaches" },
  { path: "/coaches", name: "coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    name: "coach",
    component: () =>
      import(
        /*webpackChunkName: "coach-details"*/ "@/views/coaches/CoachDetails.vue"
      ),
    props: true,
    children: [
      {
        path: "contact",
        name: "contact",
        component: () =>
          import(
            /*webpackChunkName: "coach-contact"*/ "@/views/requests/ContactCoach.vue"
          ),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /*webpackChunkName: "coach-registration"*/ "@/views/coaches/CoachRegistration.vue"
      ),
  },
  {
    path: "/requests",
    name: "requests",
    component: () =>
      import(
        /*webpackChunkName: "requests-received"*/ "@/views/requests/RequestsReceived.vue"
      ),
  },
  { path: "/:notFound(.*)", component: NotFoundPage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
