<template>
    <nav
      class="px-5 bg-white lg:rounded-lg w-full flex items-center justify-between shadow"
      :class="[compact ? 'py-1 h-12' : 'min-h-[60px] sm:min-h-[70px] py-4 h-16']"
    >
      <p
        class="capitalize inline-flex items-center gap-3"
        :class="[compact ? 'text-sm sm:text-base' : 'text-base sm:text-xl']"
      >
        <span
          class="inline-block lg:hidden mr-3 sm:mr-4 cursor-pointer"
          @click="$emit('open-sidebar')"
          ><hamburger-icon /></span
        ><a :href="`/public/profile/${title.route}`"  target="_blanck">{{ title.name || routeName }}</a>
      </p>
      <div v-if="$auth.loggedIn" class="h-full self-stretch flex items-center">
  
        <!-- container for user name -->
        <div
          v-if="login || false"
          class="hidden lg:flex flex-col mr-3 text-sm leading-[15px] flex-wrap justify-end"
        >
          <span class="text-black text-[13px] font-[600] capitalize text-right">
            {{ userCompanyName || '' }}
          </span>
  
          <span class="text-[#524D5B] text-[11.5px] text-right leading-0">
            {{ userFullName || '' }}
          </span>
        </div>
        <!-- end of container for user name -->
  
        <!-- <--- START: navbar dropdown --- -->
        <el-dropdown trigger="click" @command="handleCommand">
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
            <span class="text-black"
              ><arrow-down-icon class="h-2 w-3 sm:h-2.5 sm:w-4"
            /></span>
          </span>
  
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="hidden" command="dashboard" v-if="!profile">
              <span class="inline-flex gap-2 items-center">
                <!-- <dashboard-icon height="14" width="14" /> -->
                Dashboard</span
              >
            </el-dropdown-item>
            <el-dropdown-item class="hidden" command="profile" v-if="!profile">
              <span class="inline-flex gap-2 items-center">
                <user-profile-solid-icon height="14" width="14" />
                Profile</span
              >
            </el-dropdown-item>
  
            <!-- START: user accounts -->
            <div
              v-for="(account, index) in account"
              :key="index + 'account'"
              class="cursor-pointer"
              @click="switchAccount(account.id, account.status)"
            >
              <div
                class="flex items-center justify-start hover:bg-paperdazgray-200/60 relative top-2 p-1 mb-1 w-[160px] border-t-[1px] border-paperdazgray-100"
              >
                <span>
                  <img
                    :src="
                    (account || {}).teampicture  ||
                      (account || {}).profilePicture ||
                      '/img/placeholder_picture.png'
                    "
                    class="w-8 h-8"
                    alt=""
                   :class="[ isAccountPaid(account.role) ? 'rounded-full' : ' rounded-md']"
                  />
                </span>
                <div class="w-[calc(100%-1.75rem)] pl-2 leading-[12px] relative flex flex-wrap items-center">
                <span
                  class="text-[12px] truncate font-[500] capitalize inline-block my-0 w-full"
                  >{{(account.teamName || account.companyName || account.firstName || '')}}</span
                >
                <span class="text-[9px] truncate font-[500] capitalize inline-block my-0 w-full">
                  {{account.status}}
                  <i class="absolute w-[3px] h-[3px] inline-block rounded-full left-[calc(100%-16px)] -bottom-[2px] p-[3px] border-[2px] border-white"
                  :class="[checkStatus(account.status)]"
                  ></i>
                </span>
              </div>
              </div>
            </div>
            <!-- END: user account -->
  
            <el-dropdown-item
              class="lg:hidden"
              command="settings"
              divided
              v-if="!profile"
            >
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
          <!-- <--- END: navbar dropdown --- -->
        </el-dropdown>
      </div>
      
      <div v-else class="h-full self-stretch flex items-center">
        <button type="button" @click="showLandingPageSearchModal = true">
          <search-icon width="15" />
        </button>
        <nuxt-link
          v-if="!$auth.loggedIn"
          to="/login"
          class="text-paperdazgreen-300 mx-2"
          >Sign in</nuxt-link
        >
        <nuxt-link
          v-if="!$auth.loggedIn"
          to="/register"
          class="bg-paperdazgreen-300 text-white h-7 xs:h-8 rounded shadow px-2 xs:px-3 flex items-center justify-center whitespace-nowrap mx-2"
          >Get Started</nuxt-link
        >
      </div>
      <landing-page-search-modal v-model="showLandingPageSearchModal" />
    </nav>
  </template>
  
  <script>
  import mixins from 'vue-typed-mixins'
  import GlobalMixin from '~/mixins/GlobalMixin'
  import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'
  import BellIcon from '../svg-icons/BellIcon.vue'
  import GearIcon from '../svg-icons/GearIcon.vue'
  import HamburgerIcon from '../svg-icons/HamburgerIcon.vue'
  import HeartOutlineIcon from '../svg-icons/HeartOutlineIcon.vue'
  import NotificationDropdownIcon from '../svg-icons/NotificationDropdownIcon.vue'
  import SearchIcon from '../svg-icons/SearchIcon.vue'
  import ShareOutlineIcon from '../svg-icons/ShareOutlineIcon.vue'
  import SignOutIcon from '../svg-icons/SignOutIcon.vue'
  import UserProfileIcon from '../svg-icons/UserProfileIcon.vue'
  import UserProfileSolidIcon from '../svg-icons/UserProfileSolidIcon.vue'
  import UserTypeEnum from '~/models/UserTypeEnum'
  import login from '@/mixins/login'
  import TrashCanIcon from '../svg-icons/TrashCanIcon.vue'
  import SpinnerDottedIcon from '../svg-icons/SpinnerDottedIcon.vue'
  import StatusUser from '~/models/StatusUser'
  import LandingPageSearchModal from '../landing/LandingPageSearchModal.vue'
  import SearchShare from '../search-strips/component/SearchShare.vue'
  
  
  // email-acout emauil,password-referal-code
  export default mixins(GlobalMixin, login).extend({
    name: 'DashboardNavbar',
    components: {
      SearchIcon,
      BellIcon,
      GearIcon,
      ArrowDownIcon,
      HamburgerIcon,
      SignOutIcon,
      UserProfileIcon,
      UserProfileSolidIcon,
      NotificationDropdownIcon,
      HeartOutlineIcon,
      ShareOutlineIcon,
      TrashCanIcon,
      SpinnerDottedIcon,
      SpinnerDottedIcon,
      SearchIcon,
      LandingPageSearchModal,
      SearchShare
  },
    props: {
      compact: {
        type: Boolean,
        default: false,
      },
      title: {},
    },
    data() {
      return {
        searchString: '',
        profile: '',
        account: [],
        notification: [],
        notificationSpinner: false,
        notificationPage: 0,
        totalNotification: null,
        topSearchContent: [],
        notificationPerPage:10,
        isLoadedSuccess: false,
        isRead: true,
        showLandingPageSearchModal: false,
        _cancleReloadUsers:false
      }
    },
    computed: {
      searchResult() {
        if (!this.searchString) return []
        return [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
        ]
      },
      routeName() {
        return (this.$nuxt.$route.name || '').replace(/-/g, ' ')
      },
  
      user() {
        return this.$auth?.user
      },
      loadMoreNotifications(){
       return (this.totalNotification > this.notificationPage)  && (this.totalNotification > this.notificationPerPage)
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
   
      userFullName() {
        return this.isPaidUser
          ? (this.user || {}).firstName
          : (this.user || {}).email
      },
      userCompanyName() {
        return this.isPaidUser
          ? (this.user || {}).companyName
          : (this.user || {}).firstName
      },
      login() {
        return this.$auth?.loggedIn
      },
      profilePhoto() {
        return this.$store.getters.profilePhoto
      },
    },
    methods: {
      isAccountPaid(val){
          return val == UserTypeEnum.FREE
      },
      checkStatus(val){
        switch (val) {
          case StatusUser.ACTIVE:
           return 'activeIcon'
          case StatusUser.DISABLE:
           return 'disableIcon'
          case StatusUser.PENDING:
           return 'pendingIcon' 
        }
      },


      async deleteNotification(id) {
        this.notificationSpinner = true
        await this.$axios
          .$delete(`/notification/${id}`)
          .then(async () => {
            this.notification = this.notification.filter((el)=> el.id != id)
          })
          .finally(() => {
          this.notificationSpinner = false
          })
        // this.getUserNotification()
      },
      async fetchMainTeam(val){
        if(this._cancleReloadUsers) return;
        let fetchUserArray = [];
        
         [...val].forEach(async (element)=>{
          let fetAccounts = element.role == UserTypeEnum.TEAM ?  element.teamId : element.mainAccountId
           await this.$axios.get(`users/${fetAccounts}`)
           .then((response)=>{
            if((element.role == UserTypeEnum.TEAM || element.role == UserTypeEnum.PAID) && element.id == this.$auth.user.id) return
  
            if((element.role == UserTypeEnum.PAID && this.$auth.user.role == UserTypeEnum.FREE)) return
  
            if(element.role == UserTypeEnum.TEAM ){
              element.teamName = response.data.companyName || response.data.firstName;
              element.teampicture = response.data.profilePicture
            }
            
            fetchUserArray.push(element)
            console.log(">>>>>>>>>>>>>>>>refetch account",fetchUserArray)
            this.account.push(element)
            this._cancleReloadUsers = true
           })
         });
  
         this.account = [...this.account, ...fetchUserArray];
         console.log(">>>>>>>>>>>>>>>>new account",this.account)
      },
      async fetchUsersInitialAccount(){
        if(this._cancleReloadUsers) return;
        this.account = []
        let initialAccount = {}
              switch (this.$auth?.user?.role) {
                case UserTypeEnum.PAID:
                let paidAcc = await this.$axios.$get(`users/${this.$auth?.user?.mainAccountId}&$sort[createdAt]=-1`)
                 initialAccount = [{...paidAcc}]
                 break;
  
                 case UserTypeEnum.TEAM:
                 let teamAcc = await this.$axios.$get(`users/${this.$auth?.user?.mainAccountId}&$sort[createdAt]=-1`)
                 initialAccount = [{...teamAcc}]
                 break;
              
                case UserTypeEnum.FREE:
                let freeAcct = await this.$axios.$get(`users/?mainAccountId=${this.$auth?.user?.id}&$sort[createdAt]=-1`)
                initialAccount = freeAcct.data
                break;
              }
        
              console.log("::::::::::", initialAccount)
          this.account = initialAccount.filter((item)=> item.role !=  UserTypeEnum.TEAM)
      },
      async getUsersAccount() {
        // return
        let acccountId = this.$auth?.user?.role != UserTypeEnum.FREE ? this.$auth?.user?.mainAccountId : this.$auth?.user?.id;
        let userAccount =  await this.$axios.$get(`users/?mainAccountId=${acccountId}&$sort[createdAt]=-1`)
          console.log("tttttttttttttttttttt",userAccount)
          let accounts = userAccount.data || [{ ...userAccount }]
          console.log("XXXXXXXXXXXXXXXXX", accounts)
          await this.fetchMainTeam(accounts)
          
  
          console.log('mainAcountId', this.account)
      },
   
      async switchAccount(val , status) {
        if(this.$route.path.includes("pdf")){
          this.$notify.error({
            title:'',
            message:`Cannot switch account in file manager`
          })
          return
         }
         if(StatusUser.ACTIVE != status){
          this.$notify.error({
            title:'',
            message:`Oops cannot switch, account is ${status} contact team`
          })
          return
         }
       
  
        let filteredAccount = this.account.filter(
          (element) => element.id == val
        )[0]
  
        if (this.$auth?.user?.role == UserTypeEnum.TEAM || this.$auth?.user?.role == UserTypeEnum.PAID) {
          this.$auth.strategy.token.set(
            localStorage.getItem('main_user_paperdaz_token')
          )
          localStorage.setItem('paperdaz_userID', filteredAccount.id)
          window.location.assign("/dashboard")
          return
        }
        // get switching account user details
        let user = {
          email: filteredAccount.email,
          password: this.$auth?.user?.referralCode,
          strategy: 'local',
        }
        // making axios request to login
        await this.$axios
          .$post(`/authentication`, user)
          .then(async (response) => {
            this.$auth.strategy.token.set(response.accessToken)
            localStorage.setItem('paperdaz_userID', response.user.id)
            console.log(response)
            window.location.assign("/dashboard")
            // this.$auth.strategy.token.set('...')
            //@ts-ignore
            // await this.loginUser(response)
          })
          .catch((error) => {})
          .finally(() => {
            // this.isLoading = false
          })
      },
      querySearch(_queryString, cb) {
        cb(this.searchResult)
      },
      handleCommand(command) {
        switch (command) {
          case 'logout':
            localStorage.removeItem('redirect_paperdaz_path')
            this.logout()
            break
        }
      },
      setProfileDisplay(data) {
        this.profile = data
      },
    },
    watch: {
      $route(to, from) {
        if (to.name.includes('profile')) {
          this.setProfileDisplay(true)
        } else {
          this.setProfileDisplay(false)
        }
      },
      '$auth.user': function () {
        this.fetchUsersInitialAccount()
        this.getUsersAccount()
      },
    },
    mounted() {
      if (!this.user?.id) return
      this.fetchUsersInitialAccount()
      this.getUsersAccount()
      console.log('shoepjc eou efkeu,ee', this.user)
    },
  })
  </script>
  
  <style scoped lang="scss">
  .profile-circle {
    --circle-size: 20;
    height: calc(2px * var(--circle-size));
    width: calc(2px * var(--circle-size));
    min-height: calc(2px * var(--circle-size));
    min-width: calc(2px * var(--circle-size));
    @media screen and (min-width: 640px) {
      --circle-size: 22;
    }
  }
  .notifyBox:hover .trash-box {
    transition: 0.3s;
    right: 0px;
  }
  .activeIcon{
    @apply bg-green-400;
    box-shadow: 0 0 0 1px  rgb(74 222 128);
  }
  .disableIcon{
    @apply bg-[#909090];
    box-shadow: 0 0 0 1px  #909090;
  }
  .pendingIcon{
    @apply bg-[#5078b5];
    box-shadow: 0 0 0 1px #5078b5;
  }
  .el-dropdown-indicator{
    @apply absolute w-[10px] h-[10px] rounded-full bg-red-500 top-[2px] left-2 border-[2px] border-white
  }
  </style>
  