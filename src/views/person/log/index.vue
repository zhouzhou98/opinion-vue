<template>
  <div>
     <!-- 搜索栏 -->
    <el-form :inline="true" class="user-search-form"  size="medium">
      <el-form-item>
          <el-form-item>
            <el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item>
             <el-date-picker type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="请输入请求地址" ></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="medium" @click="getByPage">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="address" align="center" label="请求地址"></el-table-column>
      <el-table-column prop="param" align="center" label="请求参数"></el-table-column>
      <el-table-column prop="status" align="center" label="请求状态"></el-table-column>
      <el-table-column prop="way" align="center" label="请求方式"></el-table-column>
      <el-table-column prop="time" align="center" label="响应时间"></el-table-column>
      <el-table-column prop="ip" align="center" label="请求IP"></el-table-column>
      <el-table-column prop="code" align="center" label="返回值"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            address: '上海市普陀区金沙江路 1518 弄',
            param: '2016-05-02',
            status: '王小虎',
            way: '王小虎',
            time: 3,
            ip:'0.0.0.0.1',
            code:'王小虎',
            createTime:'2016-05-02'
          }, 
          {
            address: '上海市普陀区金沙江路 1518 弄',
            param: '2016-05-02',
            status: '王小虎',
            way: '王小虎',
            time: 3,
            ip:'0.0.0.0.1',
            code:'王小虎',
            createTime:'2016-05-02'
          }, 
          {
            address: '上海市普陀区金沙江路 1518 弄',
            param: '2016-05-02',
            status: '王小虎',
            way: '王小虎',
            time: 3,
            ip:'0.0.0.0.1',
            code:'王小虎',
            createTime:'2016-05-02'
          }, 
          {
            address: '上海市普陀区金沙江路 1518 弄',
            param: '2016-05-02',
            status: '王小虎',
            way: '王小虎',
            time: 3,
            ip:'0.0.0.0.1',
            code:'王小虎',
            createTime:'2016-05-02'
          }, 
          {
            address: '上海市普陀区金沙江路 1518 弄',
            param: '2016-05-02',
            status: '王小虎',
            way: '王小虎',
            time: 3,
            ip:'0.0.0.0.1',
            code:'王小虎',
            createTime:'2016-05-02'
          }
        ]
      }
    }
  }
</script>