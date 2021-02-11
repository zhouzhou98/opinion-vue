<template>
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
                  <span>词云分析</span>
                </div>
                <div  class="box" >
                  <img :src="wordCloud" style="margin:0 auto">
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>  
      </div>
      <div style="margin-top:20px">
        <el-row>
          <el-col :span="24">
            <div  class="grid-content bg-purple">
                <el-card class="origin-card">
                <div slot="header" style="font-size:20%" class="clearfix">
                  <span>词汇频率分析</span>
                </div>
                <div  class="text item">
                  <ve-funnel :data="wordData" :settings="wordSettings"></ve-funnel>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>  
      </div>  
    </div>
</template>
<script>
 import { mapGetters } from 'vuex'
 import { BlogApi } from '@/api'
  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created(){
      if(this.$route.query.kid) {
        this.kid = this.$route.query.kid;
      }
      this.messagechange()
    },
    data () {
      
      this.wordSettings = {
        useDefaultOrder: true,
        filterZero: true
      }
      return {
        radio: '今日',
        wordCloud:"",
        req:{},
        kid:'',
        wordData: {
          columns: ['data', 'count'],
          rows: [
            // { '词汇': '展示', '数值': 400 },
            // { '词汇': '访问', '数值': 100 },
            // { '词汇': '零', '数值': 200 },
            // { '词汇': '点击', '数值': 300 },
            // { '词汇': '订单', '数值': 200 }
          ]
        }
      }
    },
    methods:{
      
      messagechange(){
        this.req.kid=this.kid
        if(this.radio==='今日'){
           this.req.day='today'
        }else if(this.radio==='最近三日'){
          this.req.day='three'
        }else{
          this.req.day='seven'
        }
        this.wordCloud="/api/blog/wordCloud?kid="+this.kid+"&day="+this.req.day
        BlogApi.wordFrequency(this.req).then(res=>{
          this.wordData.rows=res.data.data
        })
      }
    }
  }
</script>
<style scoped>
.box{
  text-align: center;
  margin: 0 auto
}

</style>
