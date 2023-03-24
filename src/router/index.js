import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ShareCourse from "../views/ShareCourse.vue";
import Profile from "../views/Profile.vue";
import EditProfile from "../views/EditProfile.vue";
import CourseDetails from "../views/CourseDetails.vue";
import CourseView from "../views/CourseView.vue";
import Notifications from "../views/Notifications.vue";
import Cart from "../views/Cart.vue";
import Subscriptions from "../views/Subscriptions.vue";
import Saves from "../views/Saves.vue";
import SearchFor from "../views/SearchFor.vue";
import Watched from "../views/Watched.vue";
import ValidatePayment from "../views/ValidatePayment.vue";
import YourCourses from "../views/YourCourses.vue";
import CancelPayment from "../views/CancelPayment.vue";
import Logout from "../views/Logout.vue";
import notAuth from "../views/notAuth.vue";
import YourSellings from "../views/YourSellings.vue";
const routes = [
  { path: "/home/:page", name: "home", component: Home },
  {
    path: "/profile/:userid/:page",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/sharecourse",
    name: "sharecourse",
    component: ShareCourse,
    meta: { requiresAuth: true },
  },
  {
    path: "/editProfile/:userid",
    name: "editProfile",
    component: EditProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/course/:courseid/:userid",
    name: "courseDetails",
    component: CourseDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/course/:courseid/:userid/course-view",
    name: "courseView",
    component: CourseView,
    meta: { requiresAuth: true },
  },
  {
    path: "/notifications/:page",
    name: "notifications",
    component: Notifications,
    meta: { requiresAuth: true },
  },
  {
    path: "/yourSellings/:page",
    name: "yourSellings",
    component: YourSellings,
    meta: { requiresAuth: true },
  },
  {
    path: "/yourcart",
    name: "cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/subscriptions/:page",
    name: "subscriptions",
    component: Subscriptions,
    meta: { requiresAuth: true },
  },
  {
    path: "/saves/:page",
    name: "saves",
    component: Saves,
    meta: { requiresAuth: true },
  },
  {
    path: "/watched/:page",
    name: "watched",
    component: Watched,
    meta: { requiresAuth: true },
  },

  {
    path: "/yourCourses/:page",
    name: "yourCourses",
    component: YourCourses,
    meta: { requiresAuth: true },
  },
  {
    path: "/SearchFor/:searchFor/:page",
    name: "searchFor",
    component: SearchFor,
  },
  {
    path: "/validatePayment",
    name: "validatePayment",
    component: ValidatePayment,
    meta: { requiresAuth: true },
    props: (route) => ({
      userid: route.query.userid,
      courseid: route.query.courseid,
      amount: route.query.price,
      paymentId: route.query.paymentId,
      token: route.query.token,
      payerId: route.query.PayerID,
    }),
  },
  { path: "/cancelPayment", name: "cancelPayment", component: CancelPayment },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/notLogged", name: "notAuth", component: notAuth },
];

const route = createRouter({
  history: createWebHistory(),
  routes,
});
export default route;
