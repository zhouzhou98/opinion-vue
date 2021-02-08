<template>
  <div>
    <el-card class="box-card" style="width:50%;margin-top:20px;margin-left:40px">
      <div slot="header" class="clearfix" >
        <span style="margin-right: 10px;font-size:40%">邮箱修改</span>
      </div>
      <div  class="text item">
        <el-form ref="form" :model="user" label-width="70px" size="mini">
          <el-form-item label="当前邮箱">
            <el-input  clearable style="width:40%" v-model="user.email" disabled="true" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="新邮箱" label-width="70px">
            <el-input  clearable style="width:40%" v-model="user.newEmail" placeholder="请输入新邮箱" ></el-input> 
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="isloading" @click="updateEmail(user)">提交</el-button>
            <el-button size="mini" >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
  </div>
</template>
<script>
  import jsCookie from 'js-cookie';
  import md5 from 'md5';
  import axios from 'axios'
  import { UserApi } from '@/api'
  import store from '@/store/index.js'
  export default {
    created(){
       var email=JSON.parse(jsCookie.get('user')).email
       this.user.email=email
    },
    data() {
      return {
        isloading: false,
        user:{},
        req:{}
      };
    },
    methods: {
      updateEmail(user){
        this.isloading=true
        this.req.id=JSON.parse(jsCookie.get('user')).id
        this.req.email=user.newEmail
        UserApi.updateEmail(this.req).then(res=>{
          if(res.data.code===0){
            this.isloading=false
            location.reload()
            this.$message.success(res.data.data);
          }else{
            this.isloading=false
            this.$message.error(res.data.data);
          }
        })
      }
    }
  };
  </script>