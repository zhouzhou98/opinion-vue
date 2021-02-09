<template>
  <div>
     <!-- 搜索栏 -->
    <el-form :inline="true" class="user-search-form" :model="page"  size="medium">
      <el-form-item>
          <el-form-item>
            <el-date-picker type="datetime" placeholder="开始时间" v-model="page.params.startTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item>
             <el-date-picker type="datetime" placeholder="结束时间" v-model="page.params.endTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="medium" @click="getByPage">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table @selection-change="handleSelectionChange" :data="page.list" stripe style="width: 100%" @sort-change="changeSort">
      <el-table-column prop="url" align="center" label="请求地址"></el-table-column>
      <el-table-column prop="params" align="center" label="请求参数"></el-table-column>
      <el-table-column prop="status" align="center" label="请求状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0" type="success">正常</el-tag>
          <el-tag v-else type="danger">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="method" align="center" label="请求方式" width="80"></el-table-column>
      <el-table-column prop="time" align="center" label="响应时间" width="80"></el-table-column>
      <el-table-column prop="ip" align="center" label="请求IP"></el-table-column>
      <el-table-column prop="result" align="center" label="返回值" width="400"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" sortable="custom" :formatter="format_ts" 
 show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.currentPage" :page-sizes="[10,,20,50,100, 200, 300, 400]" :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
    </el-pagination>

  </div>
  
</template>

<script>
  import { LogApi } from '@/api'
  import jscookie from 'js-cookie'
  import moment from "moment";
  export default {
    created() {
      this.getByPage()
    },
    data() {
      return {
        page: {
          currentPage: 1, //当前页
          pageSize: 10, //每页显示条数
          totalPage: 0, //总页数
          totalCount: 0, //总条数
          params: {}, //查询条件
          sortColumn: 'createTime', //排序列
          sortMethod: 'desc', //排序方式
          list: [] //数据
        },
      }
    },
    methods:{
       changeSort(e) {
        if (e.order) {
          this.page.sortColumn = e.prop
          this.page.sortMethod = e.order
        } else {
          this.page.sortColumn = ''
          this.page.sortMethod = 'asc'
        }
        this.getByPage()
      },
      handleSizeChange(val) {
        this.page.pageSize = val
        console.log(`每页 ${val} 条`);
        this.getByPage()
      },
      handleCurrentChange(val) {
        this.page.currentPage = val
        console.log(`当前页: ${val}`);
        this.getByPage()
      },
      handleSelectionChange(val) {
        this.selectUsers = val
      },
      format_ts: function (row, column) {
        let v = row[column.property];
        return moment(v).format("YYYY/MM/DD HH:mm:ss");
      },
      getByPage() {
        this.page.params.uid=JSON.parse(jscookie.get('user')).id
        LogApi.getByPage(this.page).then(res=>{
          //判断是否超页
          if(this.page.currentPage > res.data.data.totalPage&&this.page.totalPage!=0) {
            this.page = res.data.data
            this.page.currentPage = 1;
            this.getByPage();
          } else {
            this.page = res.data.data
          }
        })  
      }
    }
  }
</script>