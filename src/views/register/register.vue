<template>
    <div class="login-container">
      <el-form ref="form"  :model="form" label-width="80px" class="login-form">
        <h4 class="login-title">舆论情报管理系统</h4>
        <br>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="submitForm('form')" :loading="isloading">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  import jscookie from 'js-cookie';
  import md5 from 'md5';
  import axios from 'axios'
  
  import store from '@/store/index.js'
  export default {
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
            
          ],
          email: [
            {required: true, message: "邮箱不能为空", trigger: 'blur'},
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            
          ]
        },
        isloading: false,
        req:{}
      };
    },
    methods: {
      submitForm(formName) {
          this.isloading = true;
          this.$refs[formName].validate(valid => {
            // console.log(valid) 验证通过为true，有一个不通过就是false
            if (valid) {
              // 通过的逻辑
              
              this.req.username=this.form.username
              this.req.password= md5(this.form.password)
              console.log(md5(this.form.password))
              // UserApi.getLogin(this.req).then(res=>{
                
              //   var code=res.data.code
              //   if(code===0){
              //     this.isloading = false;
              //     this.$message.success('登陆成功！');
              //     var data= res.data.data
              //     var token=data.token
              //     var user=data.user
              //     jscookie.set('tokenAuth',token)
              //     jscookie.set('username',user.realName)
              //     jscookie.set('user',user)

              //     this.$store.commit('set_token', token);
                
              //     if (store.state.token) {
              //       this.$router.push('/')
                    
              //     } else {
              //       this.$router.replace('/login');
              //     }
              //     // this.$router.push('/');
              //   }else{
              //     this.isloading = false;
              //     this.$message.error(res.data.data);
              //   }
              // }) .catch(err => {
              //   this.isloading = false;
              //   this.$message.error('登陆失败：' + err);
              // });
            } else {
              console.log('验证失败');
              return false;
            }
          });
      }
    }
  };
  </script>

  <style acoped>
  .login-form {
    width: 350px;
    margin: 160px auto; /* 上下间距160px，左右自动居中*/
    background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
    padding: 30px;
    border-radius: 20px; /* 圆角 */
  }

  /* 背景 */
  .login-container {
    position: absolute;
    width: 100%;
    height:100%;
    background: url("../../assets/login.jpg");
  }

  /* 标题 */
  .login-title {
    color: #303133;
    text-align: center;
    font-size: 30%;
  }
/*按钮*/
  .login-button {
    text-align: center;
    width: 270px;
    height:37px;
  }
  </style>
