<template>
  <div>
     <!-- 搜索栏 -->
    <el-form :inline="true" :model="page" class="user-search-form"  size="medium">
      <el-form-item>
          <el-form-item>
            <el-date-picker type="datetime" placeholder="开始时间" v-model="page.params.startTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item>
             <el-date-picker type="datetime" placeholder="结束时间" v-model="page.params.endTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="请输入舆情关键字"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="medium"  @click="getByPage">搜索</el-button>
        <el-button type="warning" size="medium" class="add-button" @click="openAddDialog">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="page.list" stripe style="width: 100%;">
      <el-table-column prop="kname" align="center" label="舆情关键字"></el-table-column>
      <el-table-column prop="description" align="center" label="描述"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" sortable="custom" :formatter="format_ts" 
 show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateTime" align="center" label="更新时间" sortable="custom" :formatter="format_ts" 
 show-overflow-tooltip></el-table-column>
      <el-table-column prop="isOpen" align="center" label="是否开启邮箱预警">
        <template slot-scope="scope">
           <el-switch
            v-model="scope.row.isOpen"
            :active-value="1"
            :inactive-value="0"
            active-color="#02538C"
            inactive-color="#B9B9B9"
            />
       
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400">
        <template slot-scope="scope" align="center">
          <el-button size="mini" :plain="true" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" :plain="true" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button size="mini" :plain="true" type="success" @click="exportMeg(scope.row)" :loading="scope.row.isLoading">数据导出</el-button>
          <el-button size="mini" :plain="true" type="warning" @click="handlerSearch(scope.row.id)">查看报告</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.currentPage" :page-sizes="[10,,20,50,100, 200, 300, 400]" :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
    </el-pagination>
     <!-- 添加弹窗 -->
    <el-dialog  width="40%" height="20%" :visible.sync="addDialog">
      <keyword-add @closeAddDialog='closeAddDialog' @getByPage='getByPage'/>
    </el-dialog> 

    <!-- 修改弹窗 -->
    <el-dialog  width="40%" :visible.sync="updateDialog">
      <keyword-update @closeUpdateDialog='closeUpdateDialog' :keyword='keyword' @getByPage='getByPage'/>
    </el-dialog>
  </div>
  
</template>

<script>
  import KeywordAdd from './keyword-info/keyword-add.vue'
  import KeywordUpdate from './keyword-info/keyword-update.vue'
  import moment from "moment";
  import { KeywordApi } from '@/api'
  import jscookie from 'js-cookie'
  export default {
    components: {
     KeywordAdd,
     KeywordUpdate
    },
    created() {
      this.getByPage()
    },
    data() {
      return {
        addDialog: false, // 控制添加弹窗显示
        updateDialog: false,//控制更新弹窗显示
        isLoading:false,
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
        keyword:{}
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
        KeywordApi.get(id).then(res=>{
          console.log(res.data.data)
          this.keyword=res.data.data
        })
      },
      handlerSearch(id){
        this.$router.push('/detail/summary?kid='+id);
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
      getByPage() {
        this.page.params.uid=JSON.parse(jscookie.get('user')).id
        KeywordApi.getByPage(this.page).then(res=>{
          //判断是否超页
          if(this.page.currentPage > res.data.data.totalPage&&this.page.totalPage!=0) {
            this.page = res.data.data
            this.page.currentPage = 1;
            this.getByPage();
          } else {
            this.page = res.data.data
          }
        })  
      },
      format_ts: function (row, column) {
        let v = row[column.property];
        return moment(v).format("YYYY/MM/DD HH:mm:ss");
      },
      handleDelete(id){
        this.$confirm('是否删除该邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          KeywordApi.delete(id).then(res=>{
            if(res.data.code===0){
              this.$message.success(res.data.data);
              this.getByPage();
            }else{
              this.$message.error(res.data.data);
              this.getByPage();
            }
          })
        })
      },
      exportMeg(keyword){
        keyword.isLoading=true
        var id=keyword.id
        // window.open('/api/keyword/exportMeg/'+id,"_parent")
        // keyword.isLoading=false
        KeywordApi.exportMeg(id).then(res=>{
          console.log(res)
          // //对流的处理
          // const blob=new Blob([res],{type:'application/vnd.ms-excel'})
          // //创建节点
          // const elink=document.createElement('a')
          // elink.download="关键字-"+keyword.kname +".xlsx"
          // elink.style.display="none"
          // elink.href=URL.createObjectURL(blob)
          // document.body.appendChild(elink)
          // elink.click()
          // //释放链接
          // URL.revokeObjectURL(elink.href)
          // document.body.removeChild(elink)
          keyword.isLoading=false
        }).catch(() => {
          keyword.loading = false
        })
      }
    }
  }
</script>