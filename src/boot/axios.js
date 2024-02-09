import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { createAuth0 } from '@auth0/auth0-vue';


const api = axios.create({ baseURL: process.env.API_URL })

export default boot(({ app, ssrContext }) => {
  app.use(
    createAuth0({
      domain: "dev-7zuulbddu7ii7n8g.us.auth0.com",
      clientId: "zHxIxxO0OuoYPL9bxLeRK0xyME1jqLDR",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );

})

export { api }
