<template>
    <div class="bg-green-500 flex justify-around h-10 text-white">
      <h3 class="self-center text-2xl font-bold">Navbar</h3>
      <ul class="self-center">
        <RouterLink to="/"  active-class="border-b-2 border-white" class="hover:border-b-4 hover:border-white p-1 rounded-sm">Home</RouterLink>
        <RouterLink to="/leaderboard"  active-class="border-b-2 border-white" class="hover:border-b-4 hover:border-white p-1 rounded-sm">Leaderboard</RouterLink>
        <RouterLink to="/login"  active-class="border-b-2 border-white" class="hover:border-b-4 hover:border-white p-1 rounded-sm">Login</RouterLink>
        <button @click="handleLogout" class="hover:border-b-2 border-white">Logout</button>
      </ul>
    </div>
  </template>
  
<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router'
import { useAuth } from '@/composable/auth.js'

const router = useRouter()
const { removeToken, accessToken } = useAuthStore()
const { tryLogOut, success, message } =  useAuth()

const handleLogout = async () => {
  // console.log("logout")
  await tryLogOut(import.meta.env.VITE_FLASK_API_BASEURL+ '/api/auth/logout', accessToken)
  if(success.value == true){
    console.log(message.value)
    removeToken()
    router.push('/login')
  }
  // removeToken()
  // router.push('/login')
}

</script>