<template>
    <div class="p-20">
        <Form>
            <h1 class="text-2xl text-center">Login Form</h1>
           <Input label-name="Username" v-model="userData.username" input-type="text"/>
           <Input label-name="Password" v-model="userData.password" input-type="password"/>
           <Button button-type="submit" name="Submit" @click="handleLogin"/>
           <RouterLink to="/register" class="text-blue-500 mt-4 hover:underline underline-offset-4">Mendaftar Sekarang!</RouterLink>
        </Form>
    </div>
</template>

<script setup>
import Form from '../components/ui/Form.vue';
import Input from '../components/ui/Input.vue';
import Button from '../components/ui/Button.vue';
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composable/auth';
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const {tryLogin, success, accessToken, refreshToken} = useAuth()

const {setToken} = useAuthStore()
const router = useRouter()


const userData = reactive({
    username: '',
    password: ''
})

const handleLogin = async () => {
    await tryLogin(import.meta.env.VITE_FLASK_API_BASEURL + '/api/auth/login', userData)
    if(success.value = true){
        //simpan token ke localStorage dengan state
        setToken(accessToken.value, refreshToken.value)
        //redirect ke home
        router.push('/')
    }
}

</script>