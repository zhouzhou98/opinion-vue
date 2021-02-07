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
        <el-input placeholder="请输入舆情关键字" ></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="medium">搜索</el-button>
        <el-button type="warning" size="medium" class="add-button" @click="openAddDialog">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="address" align="center" label="舆情关键字"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope" align="center">
          <el-button size="mini" :plain="true" type="primary" @click="handleEdit(1)">编辑</el-button>
          <el-button size="mini" :plain="true" type="danger">删除</el-button>
          <el-button size="mini" :plain="true" type="success">数据导出</el-button>
          <el-button size="mini" :plain="true" type="warning" @click="handlerSearch(6)">查看报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination  :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>

     <!-- 添加弹窗 -->
    <el-dialog title="添加" width="40%" height="20%" :visible.sync="addDialog">
      <keyword-add @closeAddDialog='closeAddDialog'/>
    </el-dialog> 

    <!-- 修改弹窗 -->
    <el-dialog title="修改" width="40%" :visible.sync="updateDialog">
      <keyword-update @closeUpdateDialog='closeUpdateDialog' />
    </el-dialog>
  </div>
  
</template>

<script>
  import KeywordAdd from './keyword-info/keyword-add.vue'
  import KeywordUpdate from './keyword-info/keyword-update.vue'
  import moment from "moment";
  export default {
    components: {
     KeywordAdd,
     KeywordUpdate
    },
    data() {
      return {
        addDialog: false, // 控制添加弹窗显示
        updateDialog: false,//控制更新弹窗显示
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
    },
    methods:{
      openAddDialog() {
        //打开添加弹框
        this.addDialog = true
      },
      closeAddDialog() {
        //关闭添加弹框
        this.addDialog = false
      },
      closeUpdateDialog() {
        this.updateDialog = false
      },
      handleEdit(id) {
        this.updateDialog = true
      },
      handlerSearch(id){
        this.$router.push('/detail/summary?kid='+6);
      }
    }
  }
</script>