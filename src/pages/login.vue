<template>
  <div class="pp padded ">
    <div class="container">
      <div class="row q-mb-lg">
        <div class="col-12 col-md-6">
          <q-btn-toggle
            v-model="tab"
            rounded
            :ripple="false"
            toggle-color="white"
            toggle-text-color="dark"
            text-color="negative"
            color="grey-9"
            size="26px"
            class="mb-50 tgbtn"
            :spread="$q.screen.lt.md"
            unelevated
            :options="[
             {label: 'Sign up', value: 'reg'},
          {label: 'Sign in', value: 'login'},
        ]"
          />
          <div v-if="tab==='login'" class="">
            <p class="text-white">Email</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="email" placeholder="..."/>
            <p class="text-white">password</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="password" placeholder="..."/>
            <p class="text-white cursor-pointer" @click="tab='lost'">Lost password?</p>
            <q-btn class="no-margin  full-width" color="negative" text-color="dark" size="20px" :loading="loading" @click="loginAction" label="login"/>
          </div>
          <div v-if="tab==='lost'" class="">
            <p class="text-white">Email</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="email" placeholder="..."/>

            <q-btn class="no-margin  full-width" color="negative" text-color="dark" size="20px" :loading="loading" @click="recovery" label="Recovery"/>
          </div>
          <div v-if="tab==='reg'" class="">
            <p class="text-white">Email</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="email" placeholder="..."/>
            <p class="text-white">password</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="password" placeholder="..."/>
            <p class="text-white">repeat password (remember your password)</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="password1" placeholder="..."/>
            <p v-if="password !== password1" class="text-red-13">Password mismatch</p>
            <p class="text-white">registration key</p>
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width q-mb-lg no-border-radius" color="text-white" v-model="code" placeholder="333-..."/>

            <q-btn v-if="email && password" class="no-margin  full-width" :disable="!(password === password1)" color="negative" text-color="dark" size="20px" :loading="loading" @click="register" label="REGISTRATION"/>
          </div>
        </div>
      </div>
<p class="text-red-14 text-28">{{error_text}}</p>
<p v-if="success_text" class="text-green-14 text-28">{{success_text}}</p>
    </div>

  </div>
<!--  <div class="q-pa-xl bg-negative">-->
<!--    <p>pdsfdsf</p>-->
<!--  </div>-->
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

const tab = ref('login')
const email = ref(null)
const password = ref(null)
const password1 = ref(null)
const code = ref(null)
const loading = ref(false)
const router = useRouter()
const error_text = ref('')
const success_text = ref(null)

import {useAuthStore} from "stores/auth"
import {useRouter} from "vue-router";
import {api} from "boot/axios";
const auth_store = useAuthStore()

const loginAction = async () => {
  loading.value = !loading.value;
  error_text.value=''
  success_text.value=''
  try {
    await auth_store.loginUser({ email: email.value, password: password.value });
    router.push('/profile')
  } catch (error) {
    error_text.value = error.response.data.non_field_errors[0]
  }
  loading.value = !loading.value;
}

const recovery = async () => {
  error_text.value=''
  success_text.value=''
  loading.value = !loading.value;
  const resp = await api.post('/user/recovery',{email:email.value})
  if (resp.data.success){
    success_text.value = 'a new password will be sent by email. check spam folder!'
  }else {
    error_text.value = 'user not found'
  }

  email.value = null
  tab.value = 'login'
  loading.value = !loading.value;
}
const register = () => {
  error_text.value=''
  success_text.value=''
  loading.value = !loading.value;
  error_text.value=''
  api.post('/auth/users/', {
    email:email.value,
    password:password1.value,
    code:code.value,
  }).then((response)=>{
    console.log(response)
    success_text.value = 'account created'
  }).catch((error)=>{
    for (let err in error.response.data){
      error_text.value += error.response.data[err] + ' '
    }
  })
    loading.value = !loading.value;
}

</script>
<style lang="sass">
.tgbtn
  width: 100%
  & button
    width: 50%
</style>
