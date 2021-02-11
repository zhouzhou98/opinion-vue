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
        <el-input placeholder="请输入微博内容" v-model="page.params.content"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="medium" @click="getByPage">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table @selection-change="handleSelectionChange" :data="page.list" stripe style="width: 100%" @sort-change="changeSort">
      <el-table-column prop="content" align="center" label="微博内容"></el-table-column>
      <el-table-column prop="area" align="center" label="来源" width="80"></el-table-column>
      <el-table-column prop="author" align="center" label="作者"></el-table-column>
      <el-table-column prop="posOrNeg" align="center" label="正负面舆情" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.posOrNeg>0" type="success">正面</el-tag>
          <el-tag v-else type="danger">负面</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reason" align="center" label="文本检测结果"></el-table-column>
      <el-table-column prop="grade" align="center" label="预警等级" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.grade===1" type="info">低风险</el-tag>
          <el-tag v-else-if="scope.row.grade===2" type="success">中低风险</el-tag>
          <el-tag v-else-if="scope.row.grade===3" type="primary">中风险</el-tag>
          <el-tag v-else-if="scope.row.grade===4" type="warning">中高风险</el-tag>
          <el-tag v-else type="danger">高风险</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" sortable="custom" :formatter="format_ts" 
 show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope" align="center">
          
          <el-button size="mini" :plain="true" type="success" @click="exportMeg(scope.row.id)">数据导出</el-button>
          <el-button size="mini" :plain="true" type="warning">微博报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
   <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.currentPage" :page-sizes="[10,,20,50,100, 200, 300, 400]" :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
    </el-pagination>
    <el-divider content-position="left"></el-divider>
    <div>
      <el-radio-group v-model="radio" border size="medium" @change="messagechange">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="最近三日"></el-radio-button>
        <el-radio-button label="最近七日"></el-radio-button>
      </el-radio-group>

      <div style="margin-top:20px">
          <el-row>
            <el-col :span="24">
              <div  class="grid-content bg-purple">
                 <el-card class="origin-card">
                  <div slot="header" style="font-size:20%" class="clearfix">
                    <span>舆情趋势变化图</span>
                  </div>
                  <div  class="text item">
                    <ve-line :data="opinionData" :settings="opinionSettings"></ve-line>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>  
        </div>  
    </div>
  </div>
  
</template>

<script>

  import moment from "moment";
  import { BlogApi } from '@/api'
  import jsCookie from 'js-cookie';
  export default {
    created(){
      if(this.$route.query.kid) {
        this.kid = this.$route.query.kid;
      }
      this.getByPage()
      this.messagechange()

    },
    data() {
      this.opinionSettings = {
        metrics: ['total'],
        dimension: ['time'],
        labelMap: {
          total: '舆情事件' 
        }
      }
      return {
        radio: '今日',
        addDialog: false, // 控制添加弹窗显示
        kid:'',
        req:{},
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
        opinionData: {
          columns: ['time', 'total'],
          rows: [
            // { 'time': '1/1', 'total': 1393},
            // { 'time': '1/2', 'total': 3530},
            // { 'time': '1/3', 'total': 2923},
            // { 'time': '1/4', 'total': 1723},
            // { 'time': '1/5', 'total': 3792},
            // { 'time': '1/6', 'total': 4593}
          ]
        }
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
        this.page.params.kid=this.kid
        BlogApi.getByPage(this.page).then(res=>{
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
      messagechange(){
        this.req.kid=this.kid
        if(this.radio==='今日'){
           this.req.day='today'
        }else if(this.radio==='最近三日'){
          this.req.day='three'
        }else{
          this.req.day='seven'
        }
        BlogApi.singleTendency(this.req).then(res=>{
          if(res.data.code===0){
              this.opinionData.rows=res.data.data
            } 
        })
      },
      exportMeg(id){
        var uid=JSON.parse(jsCookie.get('user')).id
        BlogApi.exportMeg(id,uid).then(res=>{
          console.log("执行成功")
          
        }).catch(() => {
          
        })
        
      }
    }
  }
</script>