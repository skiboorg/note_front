<script setup>
import {useAuthStore} from "stores/auth";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {api} from "boot/axios";
import { useQuasar } from 'quasar'
const $q = useQuasar()
const authStore = useAuthStore()
const user = ref(authStore.user)

const balance = computed(()=>{
  return authStore.user.balance
})
const isAuth =computed(()=>{
  return !!user.value.email
})

const URL = process.env.API_URL
const captcha = ref()
const loading = ref(false)
const interval = ref(null)
const modal = ref(false)
const code = ref(null)
const amount = ref(0)


const claim = async (num) => {
    loading.value = true

    const {data} = await api.post('/user/claim',{amount:amount.value,code:code.value,c:captcha.value.uid})
    if (!data.s){
      code.value = null
      $q.notify({
        type: 'negative',
        message: 'Captcha error! Coins have been burn3d.'
      })
      amount.value = 0
      modal.value = false
    }else {
      $q.notify({
        type: 'positive',
        message: 'Coins successfully claim3d.'
      })
      amount.value = 0
      code.value = null
      await authStore.getUser()
      modal.value = false
    }
  loading.value = false
}



onMounted(()=>{
  //startTimeOut()
})

const startTimeOut = () => {
  interval.value = setTimeout( async ()=> {
    await getCap()
    modal.value = true
  }, 22000);
}

onUnmounted(()=>{
  clearTimeout(interval.value )
})

const getCap = async () => {
  const {data} = await api('/data/captha')
  captcha.value = data
}

const reset = () => {
  amount.value = 0
  modal.value=false
}

</script>



<template>
  <q-page  >
<div style="padding-top: 0" class="pp">
  <div  v-if="isAuth" class="claim-container  flex column items-center justify-center ">
    <div class="claim">
      <p class="text-64 text-white">d3adcoin farm</p>
      <p class="text-32 text-white">my d3adcoins: <span class="text-red-10">{{balance}}</span></p>
      <p class="text-32 text-white">3arned d3adcoins: <span class="text-red-10">{{amount}}</span></p>
      <q-img :ratio="1" fit="contain" src="~assets/coin.gif" class="q-mb-lg"/>
      <q-btn disable class="q-mb-md  full-width"  color="grey-9" text-color="white" size="20px"  :loading="loading"  @click="amount+=1" label="3arn"/>
      <p class="text-24 text-white text-center">Progress updates every 22 seconds. To receive coins press Claim.</p>
    </div>


  </div>
  <div v-else class="claim-container  flex column items-center justify-center ">
    <p class="text-64 text-white">d3adcoin farm</p>
    <p class="text-32 text-white cursor-pointer" @click="$router.push('/login')">sign in to claim</p>
  </div>
</div>
    <div class="bottom">
      <p class="text-64 text-center text-negative">t0 b3 c0nt1nu3d...</p>
      <div class="text-center mb-100">
        <a href="https://twitter.com/btckeepers" target="_blank" class="q-mr-md"><img src="~assets/x.png" alt=""></a>
      </div>
      <div class="text-center">
        <p class="text-28 text-negative">BITCOINKEEPERS ©2024 | All d3ads reserved.</p>
      </div>
    </div>
    <q-dialog v-model="modal" persistent transition-show="scale" transition-hide="scale" @beforeHide="startTimeOut">
      <q-card class="ggg" style="width: 700px; max-width: 100vw;">
        <div v-if="amount<=250">
          <q-card-section v-if="user.can_claim">
            <p class="text-white text-64 text-center q-mb-none" >are you d3ad?</p>
            <p class="text-white text-24 text-center q-mb-none">Let's check if you're d3ad or a bot</p>
            <p class="text-32 text-center text-white q-mb-xl">3arned d3adcoins: <span class="text-red-10">{{amount}}</span></p>
            <q-img style="max-height: 200px" :ratio="4/3" fit="contain" class="q-mb-md" :src="URL+captcha.image"/>
            <p class="text-white  text-center">d3adcoins will not be claim3d if captcha solved incorrectly</p>
            <q-input  dark  bg-color="dark"  outlined square label-color="grey-8" standout="dark text-white"
                      class="q-mb-lg full-width  no-border-radius" color="text-white" v-model="code" label="solve captcha"/>
            <q-btn  class="no-margin  full-width"  color="negative" :disable="!code" text-color="white"
                    size="20px" :loading="loading" @click="claim"  label="claim"/>
          </q-card-section>
          <q-card-section v-else>
            <p class="text-white text-64 text-center q-mb-none">temporarily blocked</p>
            <p class="text-white text-32 text-center q-mb-none">refresh the page in 33 seconds to continue
              d3adcoin 3arning</p>
          </q-card-section>
        </div>
        <div v-else>
          <q-card-section>
            <p class="text-white text-32 text-center ">Suspicious activity. Progress will be reset.</p>
            <q-btn  class="no-margin  full-width"  color="negative"  text-color="white" size="20px" :loading="loading" @click="reset"  label="..."/>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped lang="sass">

</style>
