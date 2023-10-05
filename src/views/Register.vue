<template>
    <div class="p-20">
        <Form>
            <h1 class="text-2xl text-center">Registration Form</h1>
            <p v-if="success">{{ message }}</p>
           <Input label-name="Username" v-model="userData.username" input-type="text"/>
           <Input label-name="Email" v-model="userData.email" input-type="email"/>
           <Input label-name="Password" v-model="userData.password" input-type="password"/>
           <Input label-name="Confirm Password" v-model="confirm_password" input-type="password"/>
           <Button button-type="submit" name="Submit" @click="handleRegistration"/>
           <RouterLink to="/login" class="text-blue-500 mt-4 hover:underline underline-offset-4">Back to Login!</RouterLink>
        </Form>
    </div>
</template>

<script setup>
import Form from '../components/ui/Form.vue';
import Input from '../components/ui/Input.vue';
import Button from '../components/ui/Button.vue';
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composable/auth';
import { useAuthStore } from '../stores/auth';

const {tryRegister, success, message} = useAuth()
const {accessToken} = useAuthStore()
const userData = reactive({
    username: '',
    password: '',
    email: ''
})
const confirm_password = ref('')


const handleRegistration = async() => {
    // validasi password dan confirm password
    if(confirm_password.value == userData.password){
        await tryRegister(import.meta.env.VITE_FLASK_API_BASEURL + '/api/auth/register', userData, accessToken)
    }
}


</script>