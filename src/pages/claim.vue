<script setup>
import {useAuthStore} from "stores/auth";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {api} from "boot/axios";

const authStore = useAuthStore()
const user = ref(authStore.user)

const balance = computed(()=>{
  return authStore.user.balance
})
const isAuth =computed(()=>{
  return !!user.value.email
})

const loading = ref(false)
const interval = ref(null)
const modal = ref(false)
const magic_number = ref(0)

const claim = async (num) => {
    loading.value = !loading.value
    const resp = await api.post('/user/claim',{e:user.value.email})
    await authStore.getUser()
    loading.value = !loading.value


}

const closeM=(n)=>{
  console.log(n)
  if (magic_number.value === n){
    modal.value = false
  }
}

onMounted(()=>{

    interval.value = setInterval( async ()=> {
      modal.value = true
      magic_number.value = Math.floor(Math.random() * 3) + 1
      console.log(magic_number.value)
     }, 20000);

})

onUnmounted(()=>{
  clearInterval(interval.value )
})

</script>



<template>
  <q-page  >
<div style="padding-top: 0" class="pp">
  <div  v-if="isAuth" class="claim-container  flex column items-center justify-center ">
    <div class="claim">
      <p class="text-64 text-white">d3adcoin farm</p>
      <p class="text-32 text-white">my d3adcoins: <span class="red-10">{{balance}}</span></p>
      <q-img :ratio="1" fit="contain" src="~assets/coin.gif" class="q-mb-lg"/>
      <q-btn  class="no-margin  full-width"  color="negative" text-color="dark" size="20px" :loading="loading"  @click="claim" label="claim"/>
    </div>


  </div>
  <div v-else class="claim-container  flex column items-center justify-center ">
    <p class="text-64 text-white">d3adcoin farm</p>
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
    <q-dialog v-model="modal" persistent transition-show="scale" transition-hide="scale">
      <q-card class="ggg" style="width: 700px; max-width: 100vw;">
        <q-card-section>
         <p class="text-white text-64 text-center q-mb-none" >are you d3ad?</p>
          <p class="text-white text-24 text-center q-mb-xl">Let's check if you're d3ad or a bot</p>
          <div class="row q-col-gutter-md justify-center">
            <div class="col-12 col-sm-3" v-for="i in 3">
              <q-btn v-show="i===magic_number"  class="no-margin  full-width"  color="negative" text-color="dark" size="20px" :loading="loading" @click="closeM(i)"  label="333."/>
            </div>
<!--            <div class="col-12 col-sm-3"> <q-btn  class="no-margin  full-width"  color="negative" text-color="dark" size="20px" :loading="loading" @click="closeM(2)"  label="333."/></div>-->
<!--            <div class="col-12 col-sm-3"> <q-btn  class="no-margin  full-width"  color="negative" text-color="dark" size="20px" :loading="loading" @click="closeM(3)"  label="333."/></div>-->


          </div>
        </q-card-section>




      </q-card>
    </q-dialog>

  </q-page>

</template>

<style scoped lang="sass">

</style>
