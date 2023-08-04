<template>
    <div>
        <nav class="navbar bg-primary">
            <a href="" class="navbar-brand text-white">
                <img src="@/assets/logo.png" alt="Vue-logo" class="d-inline-block align-text-top mx-2" height="24">
                {{username}}
            </a>
            <div class="d-flex">
                <button class="btn btn-outline-info" @click="onLogout">
                    <i class="fa fa-sign-out-alt"></i>
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
import useAuth from '@/modules/auth/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const {username, logout} = useAuth()

        return {
            username, 
            onLogout: ()=>{
                router.push({name: 'login'})
                logout()
            } 
        }
    }
}
</script>
