<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <header class="header-wrapper">
        <div class="container ">
          <div class="header flex items-center justify-between ">
            <div class="logo cursor-pointer" @click="$router.push('/')">
              <img src="~assets/yellow/logo.png" alt="">
              <p class="no-margin text-negative text-28">
                bitcoin<br>keepers
              </p>
            </div>
            <p class="no-margin text-32 gt-sm text-menu">3</p>
            <p class="no-margin text-32 gt-sm text-menu">33</p>
            <p class="no-margin text-32 gt-sm text-menu">RAFFLES</p>
            <p class="no-margin text-32 gt-sm text-menu">3333</p>
<!--            -->

            <q-btn v-if="!auth.user.email" no-caps unelevated color="negative" text-color="black" size="20px" class="no-border-radius btn gt-sm" @click="$router.push('/login')" label="Sign in/Sign up"/>
            <q-btn v-else no-caps unelevated color="negative" text-color="black" size="20px" class="no-border-radius btn gt-sm" @click="$router.push('/profile')" label="Profile"/>
            <q-btn  icon="menu" @click="leftDrawerOpen=true" flat round text-color="negative" class="lt-md"/>
          </div>
        </div>
      </header>
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
<!--          @click="$router.push('/auth')"-->
          <q-btn  no-caps unelevated color="negative" text-color="black" size="20px" class="no-border-radius btn " @click="$router.push('/login')" label="Sign in/Sign up"/>
        </div>

      </q-drawer>
      <router-view />

    </q-page-container>
  </q-layout>
</template>


<style lang="sass">
.header-wrapper
  position: relative
  z-index: 1
</style>
<script setup>
import {ref} from "vue";
import {useAuthStore} from "stores/auth";

const leftDrawerOpen = ref(false)

const auth = useAuthStore()
</script>
