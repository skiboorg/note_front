<template>
  <div v-if="!user.wallet || !user.twitter" class="q-pa-xl bg-negative q-mt-xl">
    <div class="container flex items-center justify-between">
      <p class="text-32 no-margin">Your profile is not ready! Make sure you've filled out all the fields.</p>
      <!--        <div class="btn-dark" @click="$router.push('/request')">-->
      <!--          <p class="no-margin text-white text-32">MAKE REQUEST</p>-->
      <!--        </div>-->
    </div>
  </div>
  <div class="pp padded ">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
     <p class="text-white text-64"> MY Profile</p>

     <p class="text-white text-32 bg-dark q-px-md q-py-md cursor-pointer" @click="$router.push('/earn')">d3adcoins: <span class="text-red-10">{{authStore.user.balance}}</span></p>

            <p class="text-white">my uid</p>
          <div class="flex  q-mb-lg" style="gap:8px">
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="no-border-radius col-grow" color="text-white" readonly v-model="authStore.user.uid" placeholder="..."/>
            <q-btn class="no-margin  " color="negative" text-color="dark" size="20px" @click=" copyToClipboard(authStore.user.uid)" label="copy"/>
          </div>

          <p class="text-white">my email</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" readonly v-model="authStore.user.email" placeholder="..."/>
          <p class="text-white">registration code</p>
          <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                   class="full-width q-mb-lg no-border-radius" color="text-white" readonly v-model="authStore.user.code" placeholder="..."/>
            <p class="text-white">my twitter link</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white"  v-model="authStore.user.twitter" placeholder="https://x.com/.........."/>
          <p class="text-white">my btc wallet</p>
          <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                   class="full-width q-mb-lg no-border-radius" color="text-white" v-model="authStore.user.wallet" placeholder="..."/>


        </div>

      </div>
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-3">  <q-btn class="no-margin  full-width" color="negative" text-color="dark" size="20px" :loading="loading" @click="update" label="Save"/> </div>
<!--        <div class="col-12 col-md-4"><q-btn class="no-margin  full-width" color="negative" text-color="dark" size="20px" :loading="loading" @click="check" label="CHeck my wallet in wl"/></div>-->
        <div class="col-12 col-md-3"><q-btn class="no-margin  full-width" color="negative" text-color="dark" size="20px" :loading="loading" @click="authStore.logoutUser" label="LOG OUT"/></div>

      </div>
      <p v-if="authStore.user.is_in_wl" class="text-positive text-32">d3adlisted</p>
<!--      <p v-else class="text-red-13 text-32">YOUR WALLET IS NOT IN WL.</p>-->
    </div>

  </div>
    <div class="q-pa-xl bg-negative">
      <div class="container">
        <div class="row q-col-gutter-md items-end">
          <div class="col-12 col-md-4">
            <p class="text-white">transfer d3adcoins to uid</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"

                     class="full-width  no-border-radius" color="text-white" v-model="toUser" placeholder="333gtg-yyyrte"/>
          </div>
          <div class="col-12 col-md-4">
            <p class="text-white">amount</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width  no-border-radius" color="text-white" v-model="amount" placeholder="333"/>
          </div>
          <div class="col-12 col-md-4">
            <p class="text-white">commission fee is 30 d3adcoins</p>
            <q-btn style="position: relative;top: -2px" class="no-margin  full-width" square unelevated color="dark"
                   text-color="white" size="20px" :loading="loading" :disable="!toUser || !amount" @click="send" label="s3nd"/>

          </div>
        </div>
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
</template>
<script setup>
import {ref} from "vue";
const loading = ref(false)
const tab = ref('login')
const email = ref(null)
const twitter = ref(null)
const wallet = ref(null)
import { copyToClipboard } from 'quasar'

import {useAuthStore} from "stores/auth"
import {api} from "boot/axios";
const authStore = useAuthStore()
const user = ref(authStore.user)
const toUser = ref(null)
const amount = ref(null)
import { useQuasar } from 'quasar'
const $q = useQuasar()
const update = async () => {
  loading.value = !loading.value;
  user.value.twitter = user.value.twitter
  const resp = await api.post('/user/update', user.value)
  console.log(resp.data)
  loading.value = !loading.value;
}

const check = async () => {
  const resp = await api.post('/user/check', {wallet:authStore.user.wallet})
  await authStore.getUser()

}

const send = async () => {
  loading.value=true
  const {data} = await api.post('/user/send', {to:toUser.value,amount:amount.value})
  console.log(data)
  if (data.success){
    $q.notify({
      type: 'positive',
      message: data.message
    })
    await authStore.getUser()
  }else {
    $q.notify({
      type: 'negative',
      message: data.message
    })
  }
  loading.value=false
  toUser.value = null
  amount.value = null
}
</script>
<style lang="sass">
.tgbtn
  width: 100%
  & button
    width: 50%
</style>
