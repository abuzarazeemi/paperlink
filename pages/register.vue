<template>
  <section class="bg-gradient-to-t from-white to-transparent">
    <div class="container py-20">
      <div class="signup-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-form">
                <div class="signup-form">
                  <h1>Create your free account</h1>
                  <div class="social-btns">
                    <button class="btn btn-light">
                      <i class="fa-brands fa-facebook"></i>Facebook
                    </button>
                    <button class="btn btn-light">
                      <i class="fa-brands fa-google"></i>Google
                    </button>
                    <button class="btn btn-light">
                      <i class="fa-brands fa-twitter"></i>Twitter
                    </button>
                  </div>
                  <div class="or-line">
                    <div class="text">Or</div>
                    <div class="line"></div>
                  </div>
                  <div class="form">
                    <div class="row">
                      <div class="col-lg-6">
                        <input type="text" placeholder="First name" v-model="user.firstName" required :disabled="isLoading || isRedirecting" class="form-control" />
                      </div>
                      <div class="col-lg-6">
                        <input type="text" placeholder="Last name" v-model="user.lastName" :disabled="isLoading || isRedirecting" required class="form-control" />
                      </div>
                      <div class="col-lg-12">
                        <input type="text" placeholder="Email address" v-model="user.email" :disabled="isLoading || isRedirecting" required class="form-control" />
                      </div>
                      <div class="col-lg-12">
                        <button class="btn btn-success next-btn" @click="submit">Next ></button>
                      </div>
                      <div class="col-lg-12">
                        <p>
                          We’re committed to your privacy. Paperdaz uses the
                          information you provide to us to you about our relevant
                          content, products, and services. You may unsubcribe from
                          these communications at any time. For more information,
                          check out our <a href="#"> Privacy Policy</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-image">
                <img src="../static/card.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

<!-- show if verified -->
      <div class="reset-pass-section" v-if="flase">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-form">
                <div class="form form-outer">
                  <div class="heading">
                    <h1>Welcome Back!</h1>
                    <h3>{UserName}</h3>
                  </div>
                  <h6>Create a password</h6>
                  <div class="form-group">
                    <label for="">New password</label>
                    <input class="form-control" v-model="user.password" :disabled="isLoading || isRedirecting" required placeholder="Password" />
                  </div>
                  <div class="form-group">
                    <label for="">Retype new password</label>
                    <input class="form-control" v-model="confirmPassword" :disabled="isLoading || isRedirecting" placeholder="Password" />
                  </div>
                  <button class="btn btn-light register-btn">Register</button>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-image">
                <img src="../static/card2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <SignUpEmailVerify :verificationEmail="verificationEmail" v-model="showEmailVerification"/>
  </section>
</template>

<script>
import Vue from 'vue'
import SocialAuth from '~/components/auth/SocialAuth.vue'
import CheckIcon from '~/components/svg-icons/CheckIcon.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import SvgIcon from '~/components/svg-icons/SvgIcon.vue'
import InputField from '~/components/widgets/InputField.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
import axios from 'axios'
import login from '~/mixins/login'
import { ErrorHandler } from '~/components/functions/ErrorFunction'
import { countryList } from '~/assets/json/coutry'
import ExclamationIcon from '~/components/svg-icons/ExclamationIcon.vue';
import { NoAuthpages } from '~/components/functions/NoAuthPages'
import SignUpEmailVerify from '~/components/pdf/modals/SignUpEmailVerify.vue'

export default Vue.extend({
  name: 'RegisterPage',
  auth: false,
  mixins: [login],
  components: {
    SocialAuth,
    InputField,
    PasswordField,
    SvgIcon,
    CheckIcon,
    MessageAlertWidget,
    SpinnerDottedIcon,
    ExclamationIcon,
    SignUpEmailVerify
},
  layout: 'landing',
  beforeRouteEnter (to, from, next) {
    //@ts-ignore
    if(NoAuthpages.test(from.fullPath.slice(1)) && from.fullPath.slice(1) != ''){
    localStorage.setItem("redirect_paperdaz_path", from.fullPath)
    }  
    next()
  },
  data() {
    return {
      confirmPassword: undefined,
      setDropDown: false,
      countrycode: '',
      country: '',
      dropDownContent: [],
      totalCountriesArray:[],
      isTeamLoggin: false,
      teamMemberLinkMessage:"Already have an account?",
      showEmailVerification: false,
      ConfirmedPassword: false,
      verificationEmail: '',
      user: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
      },
      isLoading: false,
      errorMessage: '',
      isRedirecting: false,
      acceptTermsConditions: false,
    }
  },
  watch:{
    "user.password": function(){
      this.checkPasswordStrength()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$auth.logout()
    next()
  },
  mounted() {  
    this.setTeamIdFromQuery()
    this.fetchAllCountries()
    console.log(countryList)

  },
  methods: {
    checkPasswordStrength(){
      var charac = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      var number = /[0-9]/
      var alphabet = /[A-Za-z]/

      if(charac.test(this.user.password) && number.test(this.user.password) && 
      alphabet.test(this.user.password) &&  (this.user.password.length > 8)){
        this.ConfirmedPassword = false
      }
      else{
        this.ConfirmedPassword = true
      }
    },
    setTeamIdFromQuery(){
      if(Object.keys(this.$route.query).some(e => e == 'teamId')){
      localStorage.setItem('team_member_object', JSON.stringify({
      teamId: this.$route.query.teamId,
      action: "join_a_team",
      })
      )
    }
    },
    scrollFormToView(){
      this.$refs.form.scrollIntoView()
    },
    fetchAllCountries(){
      this.totalCountriesArray = countryList.map((item) => {
      return {
        capital:
        typeof item.capital == 'object' ? item.capital[0] : item.capital,
        countryCode: (item.idd.root + ( item.idd.suffixes == 'object'? item.idd.suffixes[0] : item.idd.suffixes )),
        country: item.name.common,
        flag: item.flags.png
      }
      })
    },
    cancleOut(e) {
      if (e.target.tagname != 'LI') {
        this.setDropDown = false
      }
    },
    termsConditionClick(event) {
      event.target.checked
        ? (this.acceptTermsConditions = true)
        : (this.acceptTermsConditions = false)
    },
    setCountryInfo(e) {
      this.country = e.target.textContent.trim().toLowerCase()
       let countryCodeArray = this.totalCountriesArray.filter((item) =>
        (item.country).toLowerCase().startsWith(this.country)
        )[0]
      this.setDropDown = false
    },
    displayCountry() {
      if (this.country.trim() != '') {
        this.setDropDown = true
        this.dropDownContent = this.totalCountriesArray.filter((item) =>
          (item.country).toLowerCase().startsWith(this.country)
        )
      } else {
        this.setDropDown = false
      }
    },
    //method to submit the user data
    submit() {
      event?.preventDefault()

      // <-- checking term and conditions -->
      if (this.acceptTermsConditions == false){
         this.errorMessage = 'Accept terms and condition to proceed'
         this.scrollFormToView()
         return
         } 

      //  <-- validating user name -->
      let inValidName = false
      var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/
      if (
        format.test(this.user.firstName.trim()) ||
        format.test(this.user.lastName.trim())
        ) {
        this.errorMessage = 'Name format not correct'
        this.$refs.form.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        inValidName = true
      }

      // <-- checking if loading or redirecting -->
      if (this.isLoading || this.isRedirecting || inValidName) return

      this.isLoading = true
      this.errorMessage = ''
      this.isRedirecting = false

      let data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        country: this.country,
      }

      const getReferalParams = Object.keys(this.$route.query)
      if (getReferalParams.includes('referreeCode')){
      data = {...data, ...this.$route.query}
      }

      // return
      this.$axios
        .post('/users', data)
        .then(async (response) => {
        this.showEmailVerification = true
        this.verificationEmail = response.data.email;
        // this.isRedirecting = true
        })
        .catch(({ response }) => {
          let message = ErrorHandler(response)
          this.errorMessage = message
          this.isRedirecting = false
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.dropdown {
  @apply absolute top-[100%] left-0 w-full bg-white;
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 5px;
  border-radius: 5px;
  box-shadow: 1px 3px 5px rgba(203, 206, 206, 0.692);
}
.dropdown::-webkit-scrollbar {
  width: 5px;
  height: 3px;
  cursor: pointer;
}
.dropdown::-webkit-scrollbar-thumb {
  @apply bg-paperdazgreen-400;
  width: 5px;
  border-radius: 50px;
  cursor: pointer;
}

.dropdown::-webkit-scrollbar-track {
  cursor: pointer;
  @apply border-[1px] border-transparent;
}
.dropdown > li {
  list-style-type: none;
  @apply py-2 px-1;
}
.custom-input {
  @apply w-12 text-center outline-none rounded-lg border-[1px] border-paperdazgray-200 mr-2;
}
.width-full {
  width: 100%;
  text-align: left;
}
</style>

