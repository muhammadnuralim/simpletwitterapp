<template>
    <div class="flex flex-col mx-40 mt-20">
        <h1 class="text-2xl font-bold mb-5">Home Pages</h1>
        <Form>
            <TextArea id="textarea-input" label="Tweet" v-model="content" row="5" />
            <div class="flex flex-row space-x-3">
                <Button type="submit" name="Submit"
                    class="bg-green-500 p-2 mt-3 rounded-md text-white hover:bg-green-800" @click="handleSubmit"/>
                <Button type="button" name="Upload Image"
                    class="bg-green-500 p-2 mt-3 rounded-md text-white hover:bg-green-800" @click="toggleModal" />
            </div>
        </Form>
        <section>
            <p class="text-2xl font-semibold mt-4">Other Tweets</p>
            <Card v-for="item in tweets" :key="item.user_id" :user="item.user.username" :tweet="item.content" :imgPath="item.image_path" :imgName="item.image_name"/>
        </section>

        <!-- section overlay -->
        <Teleport to="body">
            <ModalUpload @toggle-modal="toggleModal" :show-modal="showModal">
                <Form>
                    <label for="uploadBtn">Upload</label>
                    <label for="uploadFile" class="flex border-2 border-green-500 justify-center p-5 rounded-md">
                        <InputFile button-text="Upload" id="uploadBtn" v-model="formData.file" />
                    </label>
                    <TextArea id="textarea-input" label="Tweet" v-model="formData.content" row="5" />
                    <div class="flex flex-row space-x-3">
                        <Button type="submit" name="Submit"
                            @click="handleUploadFile"/>
                        <Button type="button" name="Close"
                             @click="toggleModal" />
                    </div>
                </Form>
            </ModalUpload>
        </Teleport>
    </div>
    <Teleport to="body">
    <ModalNotifikasi @toggle-modal="toggleModal" :show-modal="showModalNotif" modal-title="Notifikasi" :modal-desc="msg">    
        <Button type="button" name="Close"
                             @click="toggleModalNotif" />
    </ModalNotifikasi>
    </Teleport>

</template>
  
<script setup>
import Card from '@/components/ui/Card.vue';
import Form from '../components/ui/Form.vue';
import TextArea from '../components/ui/TextareaLabel.vue'
import Button from '../components/ui/Button.vue';
import { ref, onMounted, reactive } from 'vue'
import ModalUpload from '../components/ui/ModalUpload.vue';
import InputFile from '../components/ui/InputFile.vue';
import { useFetch } from '../composable/useFetch';
import ModalNotifikasi from '../components/ui/ModalNotifikasi.vue'

const {tryFetching,data, tryPosting, success, tryUpload} = useFetch()

const formData = reactive({
    content: '',
    file: ''
})
const content = ref('')
// const content = ref('')
// const uploadedFile = ref(null)
const tweets = ref('')

onMounted(async() => {
    await tryFetching('/api/tweets')
    tweets.value = data.value
})

const showModalNotif = ref(false)
const showModal = ref(false)
const msg = ref('')
const toggleModal = () => {
    showModal.value = !showModal.value
}
const toggleModalNotif = () => {
    showModalNotif.value = !showModalNotif.value
}

const handleSubmit = async () => {
    await tryPosting("/api/tweets",{"content":content.value} )
    if(success.value = true){
        showModalNotif.value = true
        msg.value = "Berhasil Menambahkan tweet!"

    }
}

const handleUploadFile = async () => {
    await tryUpload("/api/tweets", formData)
    if(success.value == true){
        toggleModal()
    }

}

</script>
  
