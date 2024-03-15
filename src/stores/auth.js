import { ref } from 'vue';
import { defineStore } from 'pinia';
import {api} from "boot/axios";
import {Cookies, Notify, Screen} from 'quasar'
import {useRouter} from "vue-router"



export const useAuthStore = defineStore('auth', () => {
    let user = ref({})
    const loggedIn = ref(false)
    const router = useRouter()

    async function logoutUser() {
      await api.post('/auth/token/logout/')
        api.defaults.headers.common['Authorization'] = null
      user.value={}
        if (!process.env.SERVER) {
          Cookies.remove('auth_token')
          //this.loggedIn = false
          //this.user = {}
        }
      this.router.push('/')
    }

    function  loginUser(data) {
      let that = this
      return new Promise((resolve, reject) => {
        api.post('/auth/token/login/', data)
          .then(async function (response) {
            Cookies.set('auth_token', response.data.auth_token);
            api.defaults.headers.common['Authorization'] = 'Token ' + response.data.auth_token;
            await that.getUser();
            resolve(response); // Resolve the promise with the response data
          })
          .catch(function (error) {
            console.log(error);
            reject(error); // Reject the promise with the error
          });
      });
    }
    async function getUser() {
      console.log('get user')
      console.log(api.defaults.headers.common['Authorization'])
      let response
      try {
        response = await api.get('/user/me')
        this.loggedIn = true
        this.user = response.data
        console.log('get user done')
      } catch (e) {
        api.defaults.headers.common['Authorization'] = null
        if (!process.env.SERVER) {
          Cookies.remove('auth_token')
          this.loggedIn = false
          this.user = {}
        }
        return
      }
    }

    return{
      user,
      loginUser,
      getUser,
      loggedIn,
      logoutUser

    }
  }
)
