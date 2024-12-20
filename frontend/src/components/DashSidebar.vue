<template>
  <div class="dash-sidebar-container">
    <div class="dash-sidebar-self">
      <div class="logo-image-box">
        <img src="https://file.0031400.xyz/i/1733410026409.png" alt="" class="logo-image">
      </div>
      <div class="name-box">
        <div class="name">0031400</div>
      </div>
      <div class="motto-box">

        <div class="motto">我爱数学 数学爱我</div>
      </div>
    </div>
    <div class="dash-sidebar-links-box">
      <div class="link-box">
        <router-link to="/dash" class="link">文章列表</router-link>
      </div>
      <div class="link-box">
        <router-link to="/newpost" class="link">撰写文章</router-link>
      </div>
      <div class="link-box">
        <div @click="blogDBDownload" class="link">文章数据库下载</div>
      </div>
      <div class="link-box">
        <div @click="logOut"  class="link">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
const router=useRouter()
const blogDBDownload = async()=>{
  const res=await axios.get('https://blog.0031400.xyz/api/blog/dbdownload',{
    responseType:'blob',
    headers:{'Authorization':localStorage.getItem('Authorization')}})
    const blob=new Blob([res.data])
    const link=document.createElement('a')
    link.href=URL.createObjectURL(blob)
    link.download='db.sqlite3'
    link.click()
    URL.revokeObjectURL(link.href)
}
const logOut=()=>{
  localStorage.removeItem('Authorization')
  router.push('/')
}
</script>

<style scoped>
a{
  color: black;
}
.dash-sidebar-container {
  padding: 20px;
    width: 350px;
    box-sizing: border-box;
}
.dash-sidebar-self {
  margin-top: 60px;
}

.logo-image-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.logo-image {
  width: 200px;
  height: 200px;
}

.name-box {
  margin-top: 20px;
}

.motto-box {
  margin-top: 10px;
}
.link-box,
.name-box,
.motto-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.name {
  font-size: 36px;
}

.motto {
  font-size: 24px;
}

.link {
  font-size: 24px;
}

.links-box {
  margin-top: 20px;
}

.link-box {
  margin-top: 8px;
}
</style>