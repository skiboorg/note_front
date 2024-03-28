<script setup>
import {useRoute} from "vue-router";
import {computed, onBeforeMount, onBeforeUnmount, ref} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth";
const authStore = useAuthStore()
import { useQuasar } from 'quasar'
const $q = useQuasar()
const route = useRoute()
const raffle = ref(null)
const loading = ref(false)
const ownVotes = ref()
const timer = ref()

onBeforeMount(async ()=>{
  await getVote()
  await getVotes()
  startTimer()
})

const getVote = async () => {
  const {data:voteInfo} = await api(`/data/raffle/${route.params.id}`)
  raffle.value = voteInfo
}
const getVotes = async () => {
  const {data:owmVoteInfo} = await api(`/data/user_votes?id=${route.params.id}`)
  ownVotes.value = owmVoteInfo
  for (let i of raffle.value.teams){
    i.ownVotes = ownVotes.value.find(x=>x.id===i.id).votes
  }
}

const startTimer = () => {
  if (raffle.value.is_active){
    timer.value = setInterval(async ()=>{
      await getVote()
      await getVotes()
    },60000)
  }

}

onBeforeUnmount(()=>{
  clearInterval(timer.value)
})

const timeLeft = computed(()=>{

  var m = raffle.value.time_left % 60;

  var h = (raffle.value.time_left-m)/60;

  var HHMM = (h < 10 ? "0" : "") + h.toString() + "H" + (m < 10 ? "0" : "") + m.toString() +'M';
  return HHMM
})

const vote = async (team_id) => {
  loading.value=!loading.value
  const {data} = await api.post('/data/vote', {team_id})
  console.log(data)
  if (data.success){
    await getVotes()
    await authStore.getUser()
    $q.notify({
      type: 'positive',
      message: data.message
    })
  }else {
    $q.notify({
      type: 'negative',
      message: data.message
    })
  }
  loading.value=!loading.value
}
</script>

<template>
  <div v-if="raffle" class="pp text-white ">
    <div class="container">
     <div class="flex items-center justify-between">
       <div class="">
         <p class="text-64 lh-100 no-margin">{{timeLeft}}</p>
         <p>remaining time</p>
       </div>
       <p class="text-white text-32 bg-dark q-px-md cursor-pointer" >d3adcoins: <span class="text-red-10">{{authStore.user.balance}}</span></p>
     </div>
      <div class="row q-col-gutter-md">

        <div class="col-12 col-md-6" v-for="team in raffle.teams">
          <q-img :ratio="4/3" fit="contain" :src="team.image"/>
          <p>{{team.name}}</p>
          <q-btn class="no-margin  full-width" :disable="!raffle.is_active" :color="team.button_color" size="20px" :loading="loading" @click="vote(team.id)">
            <span class="text-dark">vot3 for <span class="text-white">{{raffle.vote_price}}</span> d3adcoins</span>
          </q-btn>
          <p>your vot3s {{team.ownVotes}}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

</style>
