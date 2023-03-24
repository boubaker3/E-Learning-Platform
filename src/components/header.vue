<template>
  <header
    :style="{ overflow: showMenu ? 'hidden' : 'auto' }"
    class="flex bg-white py-4 px-6 md:px-10 lg:px-16 items-center justify-between"
  >
    <div class="flex items-center md:w-1/8">
      <button
        @click="showMenu = !showMenu"
        class="text-gray-600 hover:text-gray-700 focus:outline-none focus:text-gray-700 flex md:hidden"
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" class="h-6 md:h-8 w-6 md:w-8 fill-current">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          />
        </svg>
      </button>
      <router-link to="/">
        <div class="hidden md:flex items-center ml-4 w-full">
          <h1
            class="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-primary-variant ml-2"
          >
            ELEA
          </h1>
        </div>
      </router-link>
    </div>

    <div
      class="flex items-center w-full md:w-1/2 bg-inputs rounded-xl h-12 md:h-14 p-4 m-2"
    >
      <router-link :to="{ path: `/searchFor/${searchFor}/1` }">
        <button aria-label="Toggle menu">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </router-link>
      <input
        v-model="searchFor"
        class="w-full h-full bg-transparent outline-0 m-4 text-texts"
        placeholder="Search For courses..."
      />
    </div>

    <div v-if="!isLogged">
      <ul class="hidden items-center md:flex">
        <li @click="showLogin">
          <button
            class="text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
          >
            Login
          </button>
        </li>
        <li @click="showSignup">
          <button
            class="text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
          >
            Signup
          </button>
        </li>
      </ul>
    </div>
    <div v-if="isLogged" class="hidden items-center md:flex">
      <router-link to="/yourcart">
        <div class="w-12 w-12 rounded items-center flex justify-center p-2">
          <img class="w-full" src="../assets/shopping.png" />
          <p class="text-texts bg-primary-variant m-1 px-2 rounded font-bold">
            {{ addedCourses }}
          </p>
        </div>
      </router-link>
      <router-link to="/sharecourse">
        <div class="w-12 h-12 rounded items-center flex justify-center p-2">
          <img class="w-full" src="../assets/addCourse.png" />
        </div>
      </router-link>

      <div
        @click="toProfile"
        class="w-12 w-12 rounded items-center flex justify-center p-2"
      >
        <img class="w-full rounded-md" :src="photoPath" />
      </div>

      <a class="text-texts hover:text-gray-800 font-bold rounded"
        >Welcome {{ user.fullname }},</a
      >
    </div>
  </header>
  <div
    id="menu"
    :style="{ left: showMenu ? 0 : '-960px', zIndex: 100 }"
    class="z-100 items-center fixed top-0 bg-primary h-full w-full md:w-auto"
  >
    <div class="flex items-center m-6 w-full">
      <h1 class="text-4xl font-bold text-primary-variant ml-2">ELEA</h1>
      <button
        @click="showMenu = !showMenu"
        class="text-texts2 hover:text-gray-700 focus:outline-none absolute right-2 rounded md:hidden"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <ul class="block ml-4 md:ml-6">
      <li
        v-for="menuItem in menuItems"
        @click="menuItem.name == 'Profile' && toProfile"
      >
        <div class="flex mb-6" v-show="menuItem.id == 7" @click="toProfile">
          <span class="w-6 h-6 flex justify-center items-center">
            <i class="fas fa-user text-texts"></i>
          </span>
          <a href="#" class="text-texts px-4 font-bold">Profile</a>
        </div>

        <router-link
          class="flex"
          :to="menuItem.name != 'Profile' && menuItem.path.toLowerCase()"
        >
          <span class="w-6 h-6 flex justify-center items-center">
            <i :class="menuItem.iconClass + ' text-texts '"></i>
          </span>
          <a href="#" class="text-texts px-4 font-bold">{{ menuItem.name }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../store";
import api from "../axios";
import localhost from "../../localhost";
import userLogo from "../assets/user.png";
export default {
  name: "Header",
  data() {
    return {
      userid: JSON.parse(localStorage.getItem("user")),
      user: {
        fullname: store.state.user.fullname,
        photo: store.state.user.photo,
      },
      isLogged: store.state.isAuthenticated,
      showMenu: true,
      menuItems: [
        { id: 1, name: "Home", iconClass: "fas  fa-home", path: "/home/1" },
        {
          id: 4,
          name: "Your Sellings",
          iconClass: "fas fa-dollar",
          path: "/YourSellings/1",
        },

        {
          id: 2,
          name: "Notifications",
          iconClass: "fas fa-bell",
          path: "/Notifications/1",
        },
        {
          id: 3,
          name: "Your Cart",
          iconClass: "fas fa-shopping-cart  ",
          path: "/YourCart",
        },
        {
          id: 4,
          name: "Your Courses",
          iconClass: "fas fa-graduation-cap ",
          path: "/YourCourses/1",
        },
        {
          id: 5,
          name: "Subscriptions",
          iconClass: "fas fa-users",
          path: "/Subscriptions/1",
        },
        {
          id: 6,
          name: "Saves",
          iconClass: "fas fa-bookmark",
          path: "/Saves/1",
        },
        {
          id: 7,
          name: "Watched",
          iconClass: "fas fa-clock",
          path: "/Watched/1",
        },
      ],
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      addedCourses: 0,
      searchFor: "",
    };
  },
  mounted() {
    if (this.isLogged) {
      this.menuItems.push({
        id: 9,
        name: "Logout",
        iconClass: "fas fa-sign-out-alt",
        path: "/Logout",
      });
      api
        .get(`addedCartCourses?userid=${this.userid.userid}`)
        .then((response) => {
          this.addedCourses = response.data.cartCourses.length;
          console.log(this.addedCourses);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    showLogin() {
      store.commit("setLogin");
    },
    showSignup() {
      store.commit("setSignup");
    },
    handleResize() {
      this.windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    toProfile() {
      store.dispatch("getUserdata", {
        userid: this.userid.userid,
        redirect: true,
      });
    },
  },
  computed: {
    photoPath() {
      return this.user.photo != null
        ? localhost + "photos\\" + this.user.photo
        : userLogo;
    },
    displayValue() {
      if (this.windowSize.width >= 960) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    },
  },
  watch: {
    windowSize() {
      this.$nextTick(() => {
        this.displayValue;
      });
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
<style scoped>
#menu li {
  margin-top: 24px;
}

#menu {
  transition: all ease-in-out 0.5s;
}
</style>
