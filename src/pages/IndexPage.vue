<template>
  <q-page >
        <q-drawer
          v-model="leftDrawerOpen"

          side="right"
          dark
        >
          <div class="q-pa-lg text-right mb-200">
            <q-btn icon="close" @click="leftDrawerOpen=false" flat round text-color="white" />
          </div>
          <div class="flex column items-center justify-center">
            <p class="text-32 text-white text-center">3</p>
            <p class="text-32 text-white text-center">33</p>
            <p class="text-32 text-white text-center">3333</p>
          </div>

        </q-drawer>

    <div class="top mb-200">
    <div class="container">
      <div class="header flex items-center justify-between mb-100">
        <div class="logo">
          <img src="~assets/logo.png" alt="">
          <p class="no-margin">
            bitcoin<br>keepers
          </p>
        </div>
        <p class="no-margin text-32 gt-sm">3 33  333</p>
        <q-btn no-caps unelevated color="black" text-color="grey-8" class="no-border-radius btn gt-sm" label="Connect wallet"/>
        <q-btn icon="menu" @click="leftDrawerOpen=true" flat round text-color="dark" class="lt-md"/>
      </div>
    </div>

    <div class="container row q-col-gutter-md items-center">

      <div class="col-12 col-md-6 ">
        <p class="text-64">NO Ut1l1ty.</p>
        <p class="text-28">The Keepers were born in the flames of a dying blockchain when it seemed that all hope was lost, when the last block had been processed and the last ASIC had been shut down.<br><br>
          Keepers exist against all logic and beyond any laws; their primary purpose became the fact of their own existence.</p>
      </div>
      <div class="col-12 col-md-5 offset-0 offset-md-1 ">
        <q-img src="~assets/topimg.png" alt=""/>
      </div>
    </div>

  </div>
    <div class="container row q-col-gutter-md items-center mb-150">
      <div class="col-12 col-md-6 ">
        <p class="text-64 mb-100 text-white">D3ADSCROLLS</p>
        <p class="text-64 text-white">t0 h1d3 c0nv3rsat10ns fr0m sly d3vs</p>
      </div>
      <div class="col-12 col-md-5 offset-0 offset-md-1">
        <q-img src="~assets/img1.png" alt=""/>
      </div>
    </div>
    <div class="container bg-black mb-200 form">
      <div class="flex items-center justify-between mb-50">
        <p class="no-margin text-32 cursor-pointer" @click="tab='find'" :class="tab === 'find' ? 'text-white' : 'text-negative'">enter d3adscroll</p>
        <p class="no-margin text-32 cursor-pointer" @click="makeid(), tab='create'" :class="tab === 'create' ? 'text-white' : 'text-negative'">Cr3ate d3adscroll</p>
      </div>
      <div v-if="tab==='find'">
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md-9">
            <q-input dark  bg-color="dark" square label-color="grey-8" standout="dark text-white" class="full-width  no-border-radius" color="text-white" v-model="code" label="h3r3... but shhhhhhhhhhh"/>
          </div>
          <div class="col-12 col-md-3"><p class="no-margin btn-s" @click="getNote">s3arch</p></div>
        </div>
   <p v-if="note.text" class="bg-dark q-pa-lg text-white text-32">{{note.text}}</p>
        <div v-if="note.images?.length>0" class="row q-col-gutter-md q-mb-lg">
          <div class="col-6 col-md-3" v-for="(img,index) in note.images">
            <div class="img relative-position">
              <q-img :src="img.file"/>
            </div>
          </div>
        </div>
        <p v-if="not_found" class="text-32 text-negative text-center">Not Found</p>
      </div>
      <div v-if="tab==='create'">
        <div class="row q-col-gutter-lg q-mb-lg items-center ">
          <div class="col-12 col-md-2">  <p class="no-margin text-grey-8">Your number</p></div>
          <div class="col-12 col-md-10">  <p class="no-margin text-white text-32">333-{{cur_code}}-D3AD</p></div>

        </div>
        <q-input  dark  bg-color="dark" type="textarea" square label-color="grey-8" standout="dark text-white" class="q-mb-lg full-width  no-border-radius" color="text-white" v-model="text" label="h3r3... but shhhhhhhhhhh"/>

        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-6 col-md-3" v-for="(img,index) in images">
            <div class="img relative-position">
              <q-btn class="absolute-top-right z-max" @click="delImage(index)" round dense icon="close" flat text-color="red"/>
              <q-img :src="img.img"/>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <label for="i"  class="no-border-radius btn text-white bg-dark cursor-pointer fbnt" >+add image
            <input id="i" accept="*/image" style="display: none" type="file" @change="addImage($event)">
          </label>
          <q-btn @click="save" no-caps unelevated color="negative" text-color="dark" class="no-border-radius btn fbnt" label="post d3adscroll"/>
        </div>
      </div>


    </div>
    <div class="bottom">
      <div class="container">
        <p class="text-64 mb-100">D3ADMAP</p>
        <div class="row q-col-gutter-md mb-200">
          <div class="col-12 col-md-3">
            <q-img src="~assets/1.png"/>
          </div>
          <div class="col-12 col-md-3">
            <q-img src="~assets/2.png"/>
          </div>
          <div class="col-12 col-md-3">
            <q-img src="~assets/3.png"/>
          </div>
          <div class="col-12 col-md-3">
            <q-img src="~assets/4.png"/>
          </div>
        </div>
        <p class="text-64 text-center">t0 b3 c0nt1nu3d...</p>
        <div class="text-center mb-100">
          <a href="#" target="_blank" class="q-mr-md"><img src="~assets/t.png" alt=""></a>
          <a href="#" target="_blank"><img src="~assets/d.png" alt=""></a>
        </div>
        <div class="text-center">
          <p class="text-28">BITCOINKEEPERS ©2024 | All d3ads reserved.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";

const code = ref(null)
const text = ref(null)
const images = ref([])
const tab = ref('find')
const cur_code = ref(null)
const leftDrawerOpen = ref(false)
const not_found = ref(false)
const note = ref({})



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
  if (!code.value)
    return
  note.value = {}
  not_found.value = false
  const resp = await api(`/data/note/${code.value.split('-')[1]}`)
  console.log(resp.data)
  if (resp.data.uid){
    note.value = resp.data
  }
  else {
    not_found.value = true
  }
  code.value = null
}

const save = async () => {
  if (!text.value)
    return
  let formData = new FormData()
  formData.append('uid',cur_code.value)
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
  images.value = []
  text.value = null
}



</script>
