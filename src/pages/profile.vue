<template>
  <div class="pp padded ">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
     <p class="text-white text-32"> MY Profile</p>

            <p class="text-white">my email</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" readonly v-model="authStore.user.email" placeholder="..."/>
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
        <div class="col-12 col-md-4"><q-btn class="no-margin  full-width" color="negative" text-color="dark" size="20px" :loading="loading" @click="check" label="CHeck my wallet in wl"/></div>
<!--        <div class="col-12 col-md-3"><p class="no-margin btn-s bg-red" @click="getNote">LOG OUT</p></div>-->
      </div>
      <p v-if="authStore.user.is_in_wl" class="text-positive text-32"> your wallet is wl на d3adlisted</p>
      <p v-else class="text-red-13 text-32">YOU WALLET IS NOT IN WL</p>
    </div>

  </div>
    <div class="q-pa-xl bg-negative">
      <p class="no-margin text-center text-24">There will be something interesting here... Or there won't be<br>
        33.33.33</p>
    </div>
  <div class="bottom
">
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

import {useAuthStore} from "stores/auth"
import {api} from "boot/axios";
const authStore = useAuthStore()
const user = ref(authStore.user)

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
</script>
<style lang="sass">
.tgbtn
  width: 100%
  & button
    width: 50%
</style>
