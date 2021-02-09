<template>
  <div>
    <el-card class="box-card" style="width:50%;margin-top:20px;margin-left:40px">
      <div slot="header" class="clearfix" >
        <span style="margin-right: 10px;font-size:40%">用户名修改</span>
      </div>
      <div  class="text item">
        <el-form ref="form" :model="user" label-width="70px" size="mini">
          <el-form-item label="旧用户名">
            <el-input  clearable style="width:40%" disabled v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="新用户名" label-width="70px">
            <el-input  clearable style="width:40%" v-model="user.newName" placeholder="请输入用户名" ></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" size="mini" @click="updateUsername(user)" :loading="isloading">提交</el-button>
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
       var id=JSON.parse(jsCookie.get('user')).id
       this.get(id)
       
    },
    data() {
      return {
        isloading: false,
        user:{},
        req:{}
      };
    },
    methods: {
      updateUsername(user){
        this.isloading=true
        this.req.id=JSON.parse(jsCookie.get('user')).id
        this.req.username=user.newName
        UserApi.updateUsername(this.req).then(res=>{
          if(res.data.code===0){
            this.isloading=false
            this.get(this.req.id)
            this.$message.success(res.data.data);
          }else{
            this.isloading=false
            this.$message.error(res.data.data);
          }
        })
      },
      get(id){
        UserApi.get(id).then(res=>{
          if(res.data.code===0){
            
            this.user=res.data.data
          }
        })
      }
    }
  };
  </script>