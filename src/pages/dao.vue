<script setup>
import {reactive, ref} from "vue";
import {api} from "boot/axios";

const loading = ref(false)
const error = ref(false)
const success = ref(false)
const file = ref(null)
const preview_img = ref(null)


const formData = reactive({
  twitter:null,
  dao_twitter:null,
  code:null,
})



const send = async () => {
  loading.value = !loading.value
  error.value = false
  success.value = false
  let fd = new FormData()
  fd.append('twitter',formData.twitter)
  fd.append('dao_twitter',formData.dao_twitter)
  fd.append('code',formData.code)

  if (file.value){
    console.log(file.value)
    fd.append('file',file.value)
  }


  const resp = await api({
    method: "post",
    url: `/data/dao_request`,
    data: fd,
    headers: { "Content-Type": "multipart/form-data" },
  })
  console.log(resp.data)
  resp.data.status ? success.value = true : error.value = true
  loading.value = !loading.value
}

const delImage = () => {
  file.value = null
  preview_img.value = null
}
const addImage = (e) => {
  console.log(e.target.files[0])
  file.value =e.target.files[0]
  preview_img.value = URL.createObjectURL(e.target.files[0])
}
</script>

<template>
  <div class="pp padded ">
    <div class="container">
      <p class="text-64 text-negative">COLLAB REQUEST</p>
      <p class="text-24 text-white">Here you can submit an application on behalf of your DAO for collaboration with us.</p>
      <p class="text-24 text-white">Attach proof that you are an official representative of the community. (For example, a screenshot from a Discord server where you have a role).</p>
      <p class="text-24 text-white q-mb-xl">You can get the code by contacting us on Twitter.</p>
      <div class="row">
        <div class="col-12 col-md-6">
          <p class="text-white">your personal twitter link</p>
          <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                   class="full-width q-mb-lg no-border-radius" color="text-white" v-model="formData.twitter" placeholder="x.com/btckeepers"/>
          <p class="text-white">your dao twitter link</p>
          <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                   class="full-width q-mb-lg no-border-radius" color="text-white" v-model="formData.dao_twitter" placeholder="x.com/btckeepers"/>
          <p class="text-white">request code</p>
          <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                   class="full-width q-mb-lg no-border-radius" color="text-white" v-model="formData.code" placeholder="333-....-daoChanc3"/>
          <p class="text-white">proof that you have a role in organizing collaborations in this Dao</p>
<!--          <q-btn  class="q-mb-lg relative-position" color="white" text-color="dark" size="20px"  label="CHOOSE PROOF FILE">-->
<!--            <q-file style="opacity: 0" class="absolute full-width full-height" v-model="file"/>-->
<!--          </q-btn>-->

          <div class="q-mb-lg">
            <div v-if="preview_img" class="q-mb-lg relative-position">
              <q-btn class="absolute-top-right z-max" @click="delImage" round dense icon="close" flat text-color="red"/>
              <q-img :ratio="4/3" fit="contain" :src="preview_img" alt=""/>
            </div>


            <label for="i"  class="no-border-radius btn text-24 text-dark text-sonic bg-white cursor-pointer fbnt" >CHOOSE PROOF FILE
              <input id="i" accept="*/image" style="display: none" type="file" @change="addImage($event)">
            </label>
          </div>

          <q-btn  class="q-mb-lg  full-width" :disable="!formData.code" color="negative" text-color="dark" size="20px" :loading="loading" @click="send" label="S3ND REQUEST"/>
          <p v-if="success" class="text-green-14">Your request has been sent successfully</p>
          <p v-if="error" class="text-red-14">This request code was not found. Contact us on Twitter.</p>
        </div>

      </div>
      <p class="text-64 text-white">how it works</p>
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-3"><q-img src="~assets/d1.png"/></div>
        <div class="col-12 col-md-3"><q-img src="~assets/d2.png"/></div>
        <div class="col-12 col-md-3"><q-img src="~assets/d3.png"/></div>
        <div class="col-12 col-md-3"><q-img src="~assets/d4.png"/></div>
      </div>


    </div>
  </div>
</template>

<style scoped lang="sass">

</style>
