<script setup>
import {useAuthStore} from "stores/auth"
const authStore = useAuthStore()

</script>

<template>
  <div v-if="user?.email && (!user.wallet || !user.twitter)" class="q-pa-xl bg-negative q-mt-xl">
    <div class="container flex items-center justify-between">
      <p class="text-32 no-margin">Your profile is not ready! Make sure you've filled out all the fields.</p>
      <!--        <div class="btn-dark" @click="$router.push('/request')">-->
      <!--          <p class="no-margin text-white text-32">MAKE REQUEST</p>-->
      <!--        </div>-->
    </div>
  </div>2
  <div class="pp padded ">
    <div v-if="authStore.user?.email" class="container">
          <p class="text-white text-64">tx history</p>
      <div class="table-wrapper">
        <table class="text-white table">
          <tr>
            <td>uid from</td>
            <td>uid to</td>
            <td>amount</td>
            <td>status</td>
            <td>tx fee</td>
            <td>load</td>
            <td>time</td>
          </tr>
          <tr class="inner" v-for="item in authStore.user?.outcome">
            <td>{{item.from_user}}</td>
            <td>{{item.to_user}}</td>
            <td>{{item.amount}}</td>
            <td class="text-positive">success</td>
            <td>30 coins</td>
            <td class="text-positive">low</td>
            <td>{{new Date(item.created_at).toLocaleString()}}</td>
          </tr>
        </table>
      </div>


    </div>
    <div v-else class="container">
    <p class="text-white text-64">Not logged in</p>
  </div>
  </div>
</template>

<style scoped lang="sass">
.table-wrapper
  width: 100%
  overflow-x: auto
.table
  width: 1220px
.inner
  background: #1E1E1E
</style>
