<template>
  <template v-if="user != null">
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="个人简介" is-link to="/user/edit" :value="user.profile"
              @click="toEdit('profile','个人简介',user.profile)"/>
    <van-cell title="性别" is-link to="/user/edit" :value="userGenderEnum[user.gender]"
              @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="标签" is-link to="/user/edit"
              @click="toEdit('tags','标签',user.tags)">
      <van-tag plain type="primary" v-for="tag in tags" style="margin: 0 2px">{{ tag }}</van-tag>
    </van-cell>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {userGenderEnum} from "../constamts/user.ts";

const user = ref();

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

const tags = ref([])
onMounted(async () => {
  const res = await getCurrentUser();
  if (res) {
    user.value = res.data
    const obj = JSON.parse(user.value.tags)
    for (let i in obj) {
      tags.value.push(obj [i])
    }
  } else {
    showFailToast('请重新登录');
  }
})


</script>

<style scoped>

</style>