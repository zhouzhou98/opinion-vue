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
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="content" align="center" label="微博内容"></el-table-column>
      <el-table-column prop="origin" align="center" label="来源"></el-table-column>
      <el-table-column prop="opiOrNeg" align="center" label="正负面舆情"></el-table-column>
      <el-table-column prop="senOrNon" align="center" label="文本检测结果"></el-table-column>
      <el-table-column prop="grade" align="center" label="预警等级"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope" align="center">
          
          <el-button size="mini" :plain="true" type="success">数据导出</el-button>
          <el-button size="mini" :plain="true" type="warning">微博报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination  :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    <el-divider content-position="left"></el-divider>
    <div>
      <el-radio-group v-model="radio" border size="medium">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="最近三天"></el-radio-button>
        <el-radio-button label="最近七天"></el-radio-button>
      </el-radio-group>
      <!-- <el-divider content-position="left"></el-divider> -->
      <div style="margin-top:20px">
          <el-row>
            <el-col :span="24">
              <div  class="grid-content bg-purple">
                 <el-card class="origin-card">
                  <div slot="header" style="font-size:20%" class="clearfix">
                    <span>正负舆情占比分析图</span>
                  </div>
                  <div  class="text item">
                    <ve-pie :data="positiveData" :extend="positiveExtend"  :settings="positiveSettings"></ve-pie>
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
  import { mapGetters } from 'vuex'
  import moment from "moment";
  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      this.positiveSettings ={
        
        dataType: 'percent'
      }
      this.positiveExtend = {
          
          series: {
            // radius: ['50%', '65%'],
            radius:'70%',
            center: ['50%', '50%']
          }
      }
      return {
        radio: '今日',
        addDialog: false, // 控制添加弹窗显示
        updateDialog: false,//控制更新弹窗显示
        tableData: [
          {
            content: '上海市普陀区金沙江路 1518 弄',
            origin: '2016-05-02',
            senOrNon: '王小虎',
            grade: '王小虎',
            opiOrNeg: 3,
           
            createTime:'2016-05-02'
          }, 
          {
           content: '上海市普陀区金沙江路 1518 弄',
            origin: '2016-05-02',
            senOrNon: '王小虎',
            grade: '王小虎',
            opiOrNeg: 3,
           
            createTime:'2016-05-02'
          }, 
          {
            content: '上海市普陀区金沙江路 1518 弄',
            origin: '2016-05-02',
            senOrNon: '王小虎',
            grade: '王小虎',
            opiOrNeg: 3,
           
            createTime:'2016-05-02'
          }, 
          {
            content: '上海市普陀区金沙江路 1518 弄',
            origin: '2016-05-02',
            senOrNon: '王小虎',
            grade: '王小虎',
            opiOrNeg: 3,
           
            createTime:'2016-05-02'
          }, 
          {
            content: '上海市普陀区金沙江路 1518 弄',
            origin: '2016-05-02',
            senOrNon: '王小虎',
            grade: '王小虎',
            opiOrNeg: 3,
           
            createTime:'2016-05-02'
          }
        ],
        positiveData: {
          columns: ['数据', '数量'],
          rows: [
            { '数据': '正面舆情', '数量': 1393 },
            { '数据': '负面舆情', '数量': 3530 },
            
          ]
        }
      }
      
    }
  }
</script>