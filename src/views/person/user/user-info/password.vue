<template>
  <div>
    <el-card class="box-card" style="width:50%;margin-top:20px;margin-left:40px">
      <div slot="header" class="clearfix" >
        <span style="margin-right: 10px;font-size:40%">密码修改</span>
      </div>
      <div  class="text item">
        <el-form ref="form" :model="user"  label-width="70px" size="mini">
          <el-form-item label="旧密码">
            <el-input  clearable style="width:40%" v-model="user.oldPad" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="70px">
            <el-input  clearable style="width:40%" v-model="user.newPad" placeholder="请输入新密码" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="70px">
            <el-input  clearable style="width:40%" v-model="user.conPad" placeholder="请输入密码" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="isloading" @click="updatePad(user)">提交</el-button>
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
       var username=JSON.parse(jsCookie.get('user')).username
       this.user.username=username
    },
    data() {
      return {
        isloading: false,
        user:{},
        req:{}
      };
    },
    methods: {
      updatePad(user){
        this.isloading=true
        this.req.id=JSON.parse(jsCookie.get('user')).id
        this.req.username=JSON.parse(jsCookie.get('user')).username
        this.req.oldPad=user.oldPad
        var newPad=user.newPad
        var conPad=user.conPad
        if(newOld==null||conPad==null||newPad!=conPad){
          this.$message.error("两次输入的密码不相等");
          return;
        }
        this.req.newPad=md5(newPad)
        UserApi.updatePad(this.req).then(res=>{
          if(res.data.code===0){
            this.isloading=false
            
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