<template>
  <div>
    <div class="payemnt-form-card">
      <div class="banner">
        <img src="assets/images/pay.png" alt="" />
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="form-group">
            <label for="">Name of card holder</label>
            <input
              type="text"
              :disabled="loading"
              required
              v-model="name"
              class="form-control"
              placeholder="Name Surname"
            />
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <label for="">Card Number</label>
            <input
              type="text"
              :disabled="loading"
              :value="cardNumberWithDashes"
              @input="inputCardNumber"
              required
              class="form-control"
              placeholder="0000-0000-0000-0000"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="">Expiration Date</label>
            <input
              type="date"
              :disabled="loading"
              required
              :value="expirationDateWithSlashes"
              @input="inputExpirationDate"
              class="form-control"
              placeholder="Name Surname"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="">CVV</label>
            <input
              type="text"
              :disabled="loading"
              required
              v-model="cvv"
              maxlength="3"
              class="form-control"
              placeholder="000"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <button class="btn btn-success" @click="submit" :disabled="loading">
            Pay via Stripe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
import login from '~/mixins/login'
import { ErrorHandler } from '~/components/functions/ErrorFunction'
import UserTypeEnum from '~/models/UserTypeEnum'

export default Vue.extend({
  components: { SpinnerDottedIcon, MessageAlertWidget },
  name: 'PackagePaymentTab',
  data() {
    return {
      loading: false,
      errorMessage: '',
      cardNumberWithDashes: '',
      name: '',
      cvv: '',
      cardId: undefined,
      expirationDateWithSlashes: '',
    }
  },
  props: {
    stagingPackageInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState(['setPackage', 'createPackage']),
    packageData() {
      let newPackageData
      let {
        name,
        paperlink,
        teamMembers,
        monthlyPrice,
        id,
        isMonthly,
        userId,
        yearlyPrice,
        publicProfile,
        companyLedger,
        activationCode,
        cc,
        companyName,
        companyEmail,
      } = this.setPackage
      if (this.createPackage && this.createPackage == true) {
        newPackageData = {
          plan: isMonthly ? 'monthly' : 'yearly',
          action: 'subscribe',
          companyName,
          companyEmail,
          custom: {
            name,
            paperlink,
            teamMembers,
            publicProfile,
            companyLedger,
            cc,
          },
        }
        return newPackageData
      } else if (this.createPackage == false) {
        newPackageData = {
          packageId: id,
          action: 'subscribe',
          companyName,
          companyEmail,
          plan: isMonthly ? 'monthly' : 'yearly',
        }
        return newPackageData
      }
    },
    cardNumber() {
      return this.cardNumberWithDashes.replace(/-+/g, '')
    },
    expirationDateString() {
      return this.expirationDateWithSlashes.split('/').join('') || ''
    },
    expYear() {
      return this.expirationDateString.split('').splice(2, 4).join('')
    },
    expMonth() {
      return this.expirationDateString.split('').splice(0, 2).join('')
    },
  },
  methods: {
    inputCardNumber(val) {
      let temp = val.replace(/(-+)|([^0-9]+)/g, '')
      this.cardNumberWithDashes = (temp.match(/.{1,4}/g) || []).join('-')
    },
    inputExpirationDate(val) {
      let temp = val.replace(/\/+|[^0-9]+/g, '')
      if (temp.length > 4) return

      // Check if the month is greater than 12
      if (temp.length === 2) {
        if (Number(temp) > 12) temp = '0' + temp
        if (Number(temp) == 0) temp = '01'
      }

      if (temp.length == 4 && Number(temp.substring(2, 4)) == 0) {
        temp = temp.substring(0, 2) + '01'
      }

      let finalVal = (temp.match(/.{1,2}/g) || []).join('/')
      this.expirationDateWithSlashes = finalVal
    },
    updateCard(id, data) {
      return this.$axios.$patch(`/card/${id}`, data).catch((error) => {
        let message = ''
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          message = error.response.data.message
        } else {
          message = 'Server not reachable'
        }
        this.errorMessage = message
        this.loading = false
      })
    },
    async submit(event) {
      event?.preventDefault()

      if (!this.expYear || !this.expMonth || isNaN(this.cvv)) {
        this.errorMessage = 'Please review the inputed information'
        return
      }

      //code to check if name contains special symbols
      var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/
      this.errorMessage = 'Name not correct'
      if (format.test(this.name.trim())) return

      if (this.loading) return

      const userId = (this.$auth.user || { id: '' }).id

      const data = {
        card_holder_name: this.name,
        card_number: this.cardNumber,
        exp_year: this.expYear,
        exp_month: this.expMonth,
        cvv: this.cvv,
      }
      console.log(data)
      this.loading = true
      this.errorMessage = ''

      let proceedToPayment = false

      await this.$axios
        .$post('/cards', data)
        .then((response) => {
          console.log(response)
          let { id } = response
          this.cardId = id
          proceedToPayment = true
        })
        .catch(async ({ response }) => {
          this.errorMessage = ErrorHandler(response)
          this.loading = false
        })

      if (!proceedToPayment) {
        this.loading = false
        return
      }

      this.$axios
        .$post('/subscriptions', {
          ...this.packageData,
        })
        .then(async () => {
          this.$notify.success({
            title: 'Package Subscription',
            message: 'You have successfully subscribed for this package',
          })
          setTimeout(() => {
            this.$nuxt.$router.push('/dashboard')
          }, 1000)
        })
        .catch(async ({ response }) => {
          this.errorMessage = ErrorHandler(response)
          await this.$axios.$delete(`/cards/${this.cardId}`)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },

  mounted() {
    if (Object.keys(this.stagingPackageInfo).length < 1)
      this.$nuxt.$router.push(`/package?tablevel=1`)

    if (this.$auth.user.role == UserTypeEnum.TEAM) {
      this.errorMessage =
        'Proceeding to payment as a team member, payment may not reflect on the account. create a free account to access payment'
    }
  },
})
</script>

<style lang="scss" scoped>
form {
  @apply p-6 rounded-xl border-4 border-paperdazgreen-400 bg-white;
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.input-label {
  @apply font-medium text-sm block;

  & + * {
    @apply mt-1;
  }
}

.form-group {
  &:not(:last-child) {
    @apply mb-5;
  }
}
</style>
