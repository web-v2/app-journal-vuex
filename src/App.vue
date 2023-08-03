<template>
  <h1 v-if="authStatus === 'authenticating'"> >{{ authStatus }}</h1>
  <router-view v-else/>
</template>


<script>
import useAuth from './modules/auth/composables/useAuth'
export default {
  setup() {
    const {authStatus, checkAuthState} = useAuth();
    checkAuthState()
    return {
      authStatus
    }
  }
}
</script>
