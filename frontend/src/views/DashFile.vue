<template>
    <div class="dash-file-container">
        <DashSidebar class="dash-file-sidebar"></DashSidebar>
        <div class="dash-file-main">
            <div class="dash-file-upload-box">
                <div class="dash-file-upload-file-box">
                    <input @change="onFileChange" type="file" multiple class="dash-file-upload-file-input">
                </div>
                <div class="dash-file-upload-remark-box">
                    <div type="text" class="dash-file-upload-remark-text">备注: </div>
                    <input v-model="uploadFile.remark" type="text" class="dash-file-upload-remark-input">
                </div>
                <div class="dash-file-upload-buttons-box">
                    <button @click="upLoadCancel" class="dash-file-upload-button">清空</button>
                    <button @click="uploadSubmit" class="dash-file-upload-button">提交</button>
                </div>
            </div>
            <div v-viewer class="dash-file-list">
                <div class="dash-file-box" v-for="file in files">
                    <img class="dash-file-img" :src="'https://blog.0031400.xyz/i/' + file.time + '.' + file.ext">
                    <div class="dash-file-time">{{ file.time }}</div>
                    <input v-model="file.remark" type="text" class="dash-file-remark">
                    <div class="dash-file-buttons">

                        <button @click="deleteFile(file.time)" class="dash-file-button">删除</button>
                        <button @click="updateFile(file)" class="dash-file-button">修改</button>
                        <button @click="paste(file)" class="dash-file-button">复制</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const files = ref([])
const uploadFile = ref({})
if (!localStorage.getItem('Authorization')) {
    alert('请登录')
    router.push('/login')
}
const query = () => {
    axios.get('https://blog.0031400.xyz/api/img/query', { headers: { 'Authorization': localStorage.getItem('Authorization') } }).then(res => {
        files.value = res.data.data;
    })
}
const paste=(file)=>{
    console.log(file);
    
    navigator.clipboard.writeText('https://blog.0031400.xyz/i/'+file.time+'.'+file.ext)
}
query()
const onFileChange = (event) => {
    uploadFile.value.files = event.target.files
}
const upLoadCancel = () => {
    uploadFile.value = {}
}
const uploadSubmit = () => {
    if (!uploadFile.value.files.length) {
        alert('文件为空')
        return
    }
    if (confirm('确认上传?')) {
        const list = []
        const PromiseList = []
        for (let i = 0; i < uploadFile.value.files.length; i++) {
            const formData = new FormData()
            formData.append('file', uploadFile.value.files[i])
            formData.append('remark', uploadFile.value.remark)
            PromiseList.push(
                axios.post('https://blog.0031400.xyz/api/img/upload', formData, { headers: { 'Authorization': localStorage.getItem('Authorization') } }).then(res => {
                    if (res.data.status) {
                        list.push(0)
                        console.log(res.data);

                    } else {
                        list.push(1)
                        uploadFile.value.files = null
                        uploadFile.value.remark = ''
                    }
                })
            )
        }
        Promise.all(PromiseList).then(() => {
            query()
            alert('上传情况: ' + list.map(item=>item?'成功':'失败').join(' '))
        })
    }
}
const deleteFile = (time) => {
    if (confirm('确认删除?')) {
        axios.get('https://blog.0031400.xyz/api/img/delete?time=' + time, { headers: { 'Authorization': localStorage.getItem('Authorization') } }).then(res => {
            if (res.data.status) {
                alert('删除失败')
                console.log(res.data.data);
            } else {
                alert('删除成功')
                query()
            }
        })
    }
}
const updateFile = (file) => {
    if (confirm('确认修改?')) {
        axios.get('https://blog.0031400.xyz/api/img/update?time=' + file.time + '&remark=' + file.remark, { headers: { 'Authorization': localStorage.getItem('Authorization') } }).then(res => {
            // axios.post('http://localhost/api/img/update',{time:uploadFile.value.time,remark:uploadFile.value.remark},{headers:{'Authorization':localStorage.getItem('Authorization')}}).then(res=>{
            if (res.data.status) {
                alert('修改失败')
                console.log(res.data.data);
            } else {
                alert('修改成功')
                query()
            }
        })
    }
}
</script>

<style scoped>
.dash-file-container {
    width: 100vw;
    display: flex;
}

.dash-file-sidebar {
    width: 350px;
    box-sizing: border-box;
}

@media screen and (min-width:800px) {
    .dash-file-sidebar {
        border-right: 1px solid black;
    }

    .dash-file-container {
        flex-direction: row;
        justify-content: center;
        height: 100vh;
        overflow-y: auto;
    }

    .dash-file-main {
        margin-left: 20px;
        max-width: 800px;
    }
}

@media screen and (max-width:800px) {
    .dash-file-container {
        flex-direction: column;
        align-items: center;
    }

    .dash-file-main {
        width: 100%;
    }

}

.dash-file-upload-box {
    margin: 10px;
}

.dash-file-upload-file-input {
    width: 200px;
}

.dash-file-upload-file-box,
.dash-file-upload-remark-box {
    margin-top: 10px;
}

.dash-file-upload-file-box,
.dash-file-upload-remark-box,
.dash-file-upload-buttons-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

* {
    font-size: 20px;
}

.dash-file-upload-remark-input {
    margin-left: 10px;
    padding-bottom: 2px;
    border-bottom: 1px solid black;
}

button {
    padding: 1px;
    font-size: 20px;
}

.dash-file-upload-buttons-box {
    margin-top: 10px;
}

.dash-file-upload-button {
    margin-left: 10px;
}

.dash-file-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.dash-file-box {
    width: 150px;
}

.dash-file-box,
.dash-file-upload-box {
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dash-file-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.dash-file-button {
    margin-left: 2px;
}

.dash-file-remark {
    text-align: center;
}
</style>