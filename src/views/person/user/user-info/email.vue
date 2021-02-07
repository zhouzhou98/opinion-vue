<template>
  <div>
    <el-card class="box-card" style="width:50%;margin-top:20px;margin-left:40px">
      <div slot="header" class="clearfix" >
        <span style="margin-right: 10px;font-size:40%">邮箱修改</span>
      </div>
      <div  class="text item">
        <el-form ref="form"  label-width="70px" size="mini">
          <el-form-item label="当前邮箱">
            <el-input  clearable style="width:40%" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="新邮箱" label-width="70px">
            <el-input  clearable style="width:40%" placeholder="请输入新邮箱" ></el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;
            
            &nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <span :class="isActive ? 'green' : 'red'">{{data}}</span> -->
            <span :class="isActive ? 'green' : 'red'">111</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" >提交</el-button>
            <el-button size="mini" >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
  </div>
</template>