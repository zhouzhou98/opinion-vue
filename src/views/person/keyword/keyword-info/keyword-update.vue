<template>
  <div>
    <el-form ref="form" :model="keyword"  label-width="160px" size="medium">
      <el-form-item label="舆情关键字:">
        <el-input v-model="keyword.kname" clearable style="width:50%" placeholder="请输入舆情关键字"></el-input>
      </el-form-item>
      <el-form-item label="描述:">
        <el-input v-model="keyword.description"  clearable style="width:50%" placeholder="请输入舆情关键字描述"></el-input>
      </el-form-item>
      <el-form-item label="舆情邮箱预警:">
        
          <el-switch
            v-model="keyword.isOpen"
            :active-value="1"
            :inactive-value="0"
            active-color="#02538C"
            inactive-color="#B9B9B9"
            />

       
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-s-promotion" @click="update(keyword)">提交</el-button>
        <el-button icon="el-icon-error" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  import { KeywordApi } from '@/api'
  import jsCookie from "js-cookie"
  export default {
    props:{
      keyword: {
        type:Object,
        default:null
      }
    },
    data() {
      return {
        
        req:{}
      }
    },
    methods: {
      cancel(){
        this.$emit('closeAddDialog')
      },
      update(keyword){
        KeywordApi.update(keyword).then(res=>{
          if(res.data.code===0){
            this.$message.success(res.data.data);
            this.$emit('closeUpdateDialog')
            this.$emit('getByPage') 
          }else{
            this.$message.error(res.data.data);
          }
        })
      }
    }
  }
</script>
<style lang="scss">
 .tablescope{
      .el-switch__label--left {
        position: relative;
        left: 45px;
        color: #fff;
        z-index: -1111;
      }
      .el-switch__core{
        width: 50px !important;
      }
      .el-switch__label--right {
        position: relative;
        right: 46px;
        color: #fff;
        z-index: -1111;
      }
      .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
      }
      .el-switch__label--left.is-active {
        z-index: 1111;
        color: #9c9c9c !important;
      }


}

</style>