<template>
  <q-page >
    <div v-if="user?.email && (!user.wallet || !user.twitter)" class="q-pa-xl bg-negative q-mt-xl">
      <div class="container flex items-center justify-between">
        <p class="text-32 no-margin">Your profile is not ready! Make sure you've filled out all the fields.</p>
<!--        <div class="btn-dark" @click="$router.push('/request')">-->
<!--          <p class="no-margin text-white text-32">MAKE REQUEST</p>-->
<!--        </div>-->
      </div>
    </div>

    <div class="top ">
      <div class="container row q-col-gutter-md items-center">

        <div class="col-12 col-md-7 ">
          <p class="text-64 text-white">No utility?</p>
          <p class="text-24 text-bitmgothic text-white">insert a coin to evolve</p>
          <p class="text-28 text-negative text-bitmgothic">
            The Keepers are not just a set of numbers and pixels.
            We set ourselves the task of building a large,strong community, each of whose members soberly assesses the market and its prospects, understands the concept of web3 structure and contributes to its development.<br>
            The basis we want to lay in the foundation of such a community is absolute openness in our plans and actions. We don't make lofty promises and don't make people wait for things we can't or don't want to do;
            we simply take action and demonstrate it.<br>
            All the biggest things start from trust.
          </p>
        </div>
        <div class="col-12 col-md-5 ">
          <q-img src="~assets/yellow/main-1.png" alt=""/>
        </div>
      </div>

    </div>
    <div class="  pp">
      <div class="container row q-col-gutter-md items-center">
        <div class="col-12 col-md-6 ">
          <p class="text-64 text-white">k33p3rs 3ncrypt0r</p>
          <p class="text-24 text-bitmgothic text-white">d3adscr0lls.</p>
          <p class="text-28 text-bitmgothic text-negative">
            Keepers enter the blocktrans, where they connect with the blockchain and leave runes on it. Runes can be decrypted and recorded in scrolls, using a language that is understandable and familiar to everyone.<br><br>
            The secret should always remain a secret. The recorded scrolls can be read only once, by the first person to unwrap them. Afterward, the scroll burns

          </p>
        </div>
        <div class="col-12 col-md-5 offset-0 offset-md-1">
          <q-img src="~assets/yellow/main-2.png" alt=""/>
        </div>
      </div>

    </div>
    <div class="container bg-black  form">
      <q-btn-toggle
        v-model="tab"


        rounded
        :ripple="false"

        toggle-color="white"
        toggle-text-color="dark"
        text-color="negative"
        color="grey-9"
        size="26px"
        class="mb-50 fbnt"
        :spread="$q.screen.lt.md"
        unelevated
        :options="[
          {label: 'unwrap scroll', value: 'find'},
          {label: 'wrap scroll', value: 'create'},

        ]"
      />

      <div v-if="tab==='find'" class="relative-position">
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md-9">
            <q-input dark  bg-color="dark" outlined square label-color="grey-8" standout="dark text-white"
                     class="full-width  no-border-radius" color="text-white" v-model="code" label="333..."/>
          </div>
          <div class="col-12 col-md-3"><p class="no-margin btn-s" @click="getNote">unwrap</p></div>
        </div>
        <p v-if="note.text" class="bg-dark q-pa-lg text-white text-32">{{note.text}}</p>
        <div v-if="note.is_wl" class="q-mb-md ">

          <q-input dark v-if="!note.only_twitter"  bg-color="dark" square outlined label-color="grey-8" standout="dark text-white" class="full-width q-mb-md
           no-border-radius" color="text-white" v-model="wallet" label="bc1p8wdwtynk4hul2rlqgwy9lpwel94fc4684mj83lrltkf26cakr3sqh05sxw"/>
          <q-input dark  bg-color="dark" square outlined label-color="grey-8" standout="dark text-white" class="full-width q-mb-md no-border-radius"
                   color="text-white" v-model="twitter" label="x.com/btckeepers"/>
          <p class="no-margin btn-s inline-block fbnt" @click="update">s3nd</p>

        </div>
        <div v-if="note.images?.length>0" class="row q-col-gutter-md q-mb-lg">
          <div class="col-6 col-md-3" v-for="(img,index) in note.images">
            <div class="img relative-position">
              <q-img :src="img.file"/>
            </div>
          </div>
        </div>
        <p v-if="not_found" class="text-32 text-negative text-center">Not Found</p>
        <q-inner-loading :showing="loading" dark> <q-spinner size="50px" color="red" /></q-inner-loading>
      </div>
      <div v-if="tab==='create'" class="relative-position">
        <p class="text-white text-h5">
          Here you can wrap a d3adscroll. After reading, they burn out and can't be opened again.
          Send the code below to unwrap the d3adscroll
        </p>
        <div class="row q-col-gutter-lg q-mb-lg items-center ">
          <div class="col-12 col-md-2">
            <p class="no-margin text-grey-8">Your number</p>
          </div>
          <div class="col-12 col-md-10">  <p class="no-margin text-white text-32">333-{{cur_code}}-D3AD</p></div>

        </div>
        <q-input  dark  bg-color="dark" type="textarea" outlined square label-color="grey-8" standout="dark text-white"
                  class="q-mb-lg full-width  no-border-radius" color="text-white" v-model="text" label="h3r3... but shhhhhhhhhhh"/>

        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-6 col-md-3" v-for="(img,index) in images">
            <div class="img relative-position">
              <q-btn class="absolute-top-right z-max" @click="delImage(index)" round dense icon="close" flat text-color="red"/>
              <q-img :src="img.img"/>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <label for="i"  class="no-border-radius btn text-24 text-dark text-sonic bg-negative cursor-pointer fbnt" >add jpeg
            <input id="i" accept="*/image" style="display: none" type="file" @change="addImage($event)">
          </label>
          <p class="no-margin btn-s inline-block fbnt" @click="save">wrap d3adscroll</p>

        </div>
        <q-inner-loading :showing="loading" dark> <q-spinner size="50px" color="red" /></q-inner-loading>
      </div>

      <p v-if="result_text" class="no-margin text-green text-h6 text-center">{{result_text}}</p>
    </div>
    <div class="bottom">
      <div class="container">
        <p class="text-64 mb-100 text-white">D3adMAP</p>
        <div class="row q-col-gutter-md mb-200">
          <div class="col-12 col-md-3">
            <q-img src="~assets/yellow/1.png"/>
          </div>
          <div class="col-12 col-md-3">
            <q-img src="~assets/yellow/2.png"/>
          </div>
          <div class="col-12 col-md-3">
            <q-img src="~assets/yellow/3.png"/>
          </div>
          <div class="col-12 col-md-3">
            <q-img src="~assets/yellow/4.png"/>
          </div>
        </div>
        <p class="text-64 text-center text-negative">t0 b3 c0nt1nu3d...</p>
        <div class="text-center mb-100">
          <a href="https://twitter.com/btckeepers" target="_blank" class="q-mr-md"><img src="~assets/x.png" alt=""></a>
        </div>
        <div class="text-center">
          <p class="text-28 text-negative">BITCOINKEEPERS ©2024 | All d3ads reserved.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth";

const code = ref(null)
const text = ref(null)
const wallet = ref('')
const twitter = ref('')
const images = ref([])
const tab = ref('find')
const cur_code = ref(null)
const result_text = ref(null)

const not_found = ref(false)

const loading = ref(false)
const note = ref({})

onBeforeMount(()=>{
  makeid()
})

const {user} = useAuthStore()

const test = async () => {
  loginWithRedirect();
}

function makeid() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  cur_code.value = result;
}
const addImage = (e) => {
  console.log(e.target.files[0])
  images.value.push({file:e.target.files[0],img:URL.createObjectURL(e.target.files[0])},)
}
const delImage = (i) => {
  images.value.splice(i,1)
}

const getNote = async () => {
  result_text.value = ''
  if (!code.value)
    return
  note.value = {}
  not_found.value = false
  const resp = await api(`/data/note/${code.value}`)
  console.log(resp.data)
  if (resp.data.uid){
    note.value = resp.data
  }
  else {
    not_found.value = true
  }

}

const update = async () => {
  result_text.value = ''
  loading.value= !loading.value
  await api.post('/data/update',{uid:note.value.uid,wallet:wallet.value,twitter:twitter.value})
  result_text.value = 'updated !'
  loading.value= !loading.value

}
const save = async () => {
  result_text.value = ''
  if (!text.value)
    return
  loading.value= !loading.value
  let formData = new FormData()
  formData.append('uid',`333-${cur_code.value}-D3AD`)
  formData.append('text',text.value)

  for (let i of images.value){
    formData.append('files',i.file)
  }
  const resp = await api({
    method: "post",
    url: `/data/save`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  makeid()
  result_text.value = 'wrapped !'
  tab.value = 'find'
  text.value = ''
  loading.value= !loading.value

}



</script>
