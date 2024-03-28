<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
const raffles = ref()
onBeforeMount(async ()=>{
  await getData()
})

const getData = async () => {
  const {data} = await api(`/data/raffles`)
  raffles.value = data
}
</script>

<template>
  <div  class="pp text-white ">
    <div class="container">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4 cursor-pointer" v-for="i in raffles" @click="$router.push(`/raffles/${i.id}`)">
          <q-img :src="i.image" :ratio="4/3" fit="contain"/>
          <p>{{i.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

</style>
