<template>
  <div
    class="sticky z-20 h-14 py-2 transition ease-in-out"
    :class="{
      'shadow-md': scrolled,
      'bg-white': scrolled,
      'bg-transparent': !scrolled,
    }"
    style="top: -0.1px"
  >
    <nav class="container h-full flex items-center justify-between">
      <div class="flex items-center gap-1">
        <span
          class="lg:hidden cursor-pointer p-2 transform -translate-x-2"
          @click="collapsed = true"
        >
          <hamburger-icon />
        </span>
        <nuxt-link to="/">
          <logo-with-text class="mr-2 h-5 xs:h-6 sm:h-7 w-auto" />
        </nuxt-link>
      </div>
      <div
        class="transition left-0 transform text-sm font-medium gap-4 fixed top-0 bottom-0 w-56 flex flex-col p-6 lg:shadow-none lg:items-center lg:gap-9 lg:p-0 lg:relative lg:bg-transparent lg:w-auto lg:flex-row lg:translate-x-0"
        :class="[collapsed ? 'translate-x-0' : '-translate-x-56']"
      >
        <div class="flex justify-end lg:hidden">
          <span
            class="circle circle-15 bg-paperdazgray-100 cursor-pointer"
            @click="collapsed = false"
            >&times;</span
          >
        </div>
        <div class="w-full flex justify-center lg:hidden">
          <nuxt-link to="/">
            <logo-with-text class="mb-4 h-7" />
          </nuxt-link>
        </div>
        <a href="/#key-features-section" class="">Features </a>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <a href="/#upload-file-section" class="">Upload File </a>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="/faq" class="">FAQ</nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="/packages/?type=default" class="">Packages </nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="/about" class="">About </nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="/contact-us" class="">Contact Us </nuxt-link>
        <div
          class="h-px bg-paperdazgray-300 w-full lg:hidden"
          v-if="!$auth.loggedIn"
        ></div>
        <div
          class="flex flex-col items-center gap-4 lg:hidden"
          v-if="!$auth.loggedIn"
        >
          <nuxt-link to="/login" class="text-paperdazgreen-300 mt-5"
            >Sign in</nuxt-link
          >
          <nuxt-link
            to="/register"
            class="bg-paperdazgreen-300 text-white h-8 rounded shadow px-3 flex items-center justify-center whitespace-nowrap"
            >Get Started</nuxt-link
          >
        </div>
        <div class="grid w-full place-items-center lg:hidden">
          <el-dropdown
            trigger="click"
            @command="handleCommand"
            v-if="$auth.loggedIn"
          >
            <span class="flex items-center el-dropdown-link">
              <span
              class="border border-paperdazgreen-300 mr-2 p-0.5 overflow-hidden relative"
              :class="[
                isPaidUser
                  ? 'w-[45px] h-[45px] rounded-md'
                  : 'circle-20 rounded-full',
              ]"
            >
              <img
                :src="profilePhoto"
                class="w-full h-full profilePhoto"
                alt=""
                :class="[isPaidUser ? 'rounded-md' : 'rounded-full']"
              />
            </span>
              <span class="text-gray-500"
                ><arrow-down-icon class="h-1 w-1.5 sm:h-2.5 sm:w-4"
              /></span>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="dashboard">
                <span class="inline-flex gap-2 items-center"> Dashboard</span>
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <span class="inline-flex gap-2 items-center">
                  <gear-icon height="14" width="14" />
                  Settings</span
                >
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span class="text-red-600 inline-flex gap-2 items-center">
                  <sign-out-icon height="14" width="14" />
                  Logout</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div
        class="flex items-center gap-1.5 xs:gap-3 sm:gap-5 text-xs xs:text-sm sm:text-base md:text-ls"
      >
        <button type="button" @click="showLandingPageSearchModal = true">
          <search-icon width="15" />
        </button>
        <nuxt-link
          v-if="!$auth.loggedIn"
          to="/login"
          class="text-paperdazgreen-300"
          >Sign in</nuxt-link
        >
        <nuxt-link
          v-if="!$auth.loggedIn"
          to="/register"
          class="bg-paperdazgreen-300 text-white h-7 xs:h-8 rounded shadow px-2 xs:px-3 flex items-center justify-center whitespace-nowrap"
          >Get Started</nuxt-link
        >
        <el-dropdown
          trigger="click"
          @command="handleCommand"
          v-if="$auth.loggedIn"
        >
          <span class="flex items-center el-dropdown-link">
            <span
            class="border border-paperdazgreen-300 mr-2 p-0.5 overflow-hidden relative"
            :class="[
              isPaidUser
                ? 'w-[45px] h-[45px] rounded-md'
                : 'circle-20 rounded-full',
            ]"
          >
            <img
              :src="profilePhoto"
              class="w-full h-full profilePhoto"
              alt=""
              :class="[isPaidUser ? 'rounded-md' : 'rounded-full']"
            />
          </span>
            <span class="text-gray-500"
              ><arrow-down-icon class="h-1 w-1.5 sm:h-2.5 sm:w-4"
            /></span>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="dashboard">
              <span class="inline-flex gap-2 items-center">
                <!-- <dashboard-icon height="14" width="14" /> -->
                Dashboard</span
              >
            </el-dropdown-item>

            <el-dropdown-item command="settings">
              <span class="inline-flex gap-2 items-center">
                <gear-icon height="14" width="14" />
                Settings</span
              >
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <span class="text-red-600 inline-flex gap-2 items-center">
                <sign-out-icon height="14" width="14" />
                Logout</span
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>

    <landing-page-search-modal v-model="showLandingPageSearchModal" />
  </div>
</template>
<script>
import mixins from 'vue-typed-mixins'
import GlobalMixin from '~/mixins/GlobalMixin'
import LandingPageSearchModal from '../landing/LandingPageSearchModal.vue'
import LogoWithText from '../LogoWithText.vue'
import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'
import DashboardIcon from '../svg-icons/DashboardIcon.vue'
import GearIcon from '../svg-icons/GearIcon.vue'
import HamburgerIcon from '../svg-icons/HamburgerIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import SignOutIcon from '../svg-icons/SignOutIcon.vue'
import UserProfileSolidIcon from '../svg-icons/UserProfileSolidIcon.vue';
import UserTypeEnum from '~/models/UserTypeEnum'

export default mixins(GlobalMixin).extend({
  name: 'AppBar',
  components: {
    LogoWithText,
    SearchIcon,
    HamburgerIcon,
    ArrowDownIcon,
    UserProfileSolidIcon,
    GearIcon,
    SignOutIcon,
    DashboardIcon,
    LandingPageSearchModal,
  },
  data() {
    return {
      scrolled: false,
      collapsed: false,
      showLandingPageSearchModal: false,
    }
  },
  watch: {
    $route(formerVal, currentVal) {
      if (formerVal.fullPath !== currentVal.fullPath) {
        this.collapsed = false
      }
    },
  },
  computed: {
    routeName(){
      return (this.$nuxt.$route.name || '').replace(/-/g, ' ')
    },
    user() {
      return this.$auth.user
    },
    profilePhoto() {
      return this.$store.getters.profilePhoto
    },
    isPaidUser() {
      switch (this.$auth?.user?.role) {
        case UserTypeEnum.PAID:
          return true
        case UserTypeEnum.TEAM:
          return true
        case UserTypeEnum.FREE:
          return false
      }
    },
  },
  mounted() {
    const self = this
    this.scrollObserver()
    document.addEventListener('scroll', () => {
      if (self.collapsed) self.collapsed = false
    })
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout(false)
          break
        case 'profile':
          this.$nuxt.$router.push('/public/profile')
          break
        case 'dashboard':
          this.$nuxt.$router.push('/dashboard')
          break
        case 'settings':
          this.$nuxt.$router.push('/settings')
          break
      }
    },
    scrollObserver() {
      const options = {
        rootMargin: '0px',
        threshold: 1.0,
      }

      const self = this
      const callback = (
        entries,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        observer
      ) => {
        entries.forEach((entry) => {
          self.scrolled = !entry.isIntersecting
        })
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(this.$el)
    },
  },
})
</script>
