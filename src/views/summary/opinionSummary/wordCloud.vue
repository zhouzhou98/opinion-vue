<template>
  <div>
      <el-radio-group v-model="radio" border size="medium">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="最近三天"></el-radio-button>
        <el-radio-button label="最近七天"></el-radio-button>
      </el-radio-group>
      <div style="margin-top:20px">
        <el-row>
          <el-col :span="24">
            <div  class="grid-content bg-purple">
                <el-card class="origin-card">
                <div slot="header" style="font-size:20%" class="clearfix">
                  <span>词云分析</span>
                </div>
                <div  class="text item">
                  <ve-line :data="opinionData" :settings="opinionSettings"></ve-line>
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
  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data () {
      this.opinionSettings = {
        metrics: ['舆情事件', '敏感事件', '非敏感事件','正面舆情事件','负面舆情事件'],
        dimension: ['日期']
      }
      this.wordSettings = {
        useDefaultOrder: true,
        filterZero: true
      }
      return {
        radio: '今日',
        opinionData: {
          columns: ['日期', '舆情事件', '敏感事件', '非敏感事件','正面舆情事件','负面舆情事件'],
          rows: [
            { '日期': '1/1', '舆情事件': 1393, '敏感事件': 1093, '非敏感事件': 25 ,'正面舆情事件':150,'负面舆情事件':690},
            { '日期': '1/2', '舆情事件': 3530, '敏感事件': 3230, '非敏感事件': 69 ,'正面舆情事件':160 ,'负面舆情事件':650},
            { '日期': '1/3', '舆情事件': 2923, '敏感事件': 2623, '非敏感事件': 80 ,'正面舆情事件':120,'负面舆情事件':630},
            { '日期': '1/4', '舆情事件': 1723, '敏感事件': 1423, '非敏感事件': 1500 ,'正面舆情事件':150,'负面舆情事件':720},
            { '日期': '1/5', '舆情事件': 3792, '敏感事件': 3492, '非敏感事件': 1200 ,'正面舆情事件':110,'负面舆情事件':100},
            { '日期': '1/6', '舆情事件': 4593, '敏感事件': 4293, '非敏感事件': 70 ,'正面舆情事件':180,'负面舆情事件':120}
          ]
        },
        wordData: {
          columns: ['词汇', '数值'],
          rows: [
            { '词汇': '展示', '数值': 400 },
            { '词汇': '访问', '数值': 100 },
            { '词汇': '零', '数值': 200 },
            { '词汇': '点击', '数值': 300 },
            { '词汇': '订单', '数值': 200 }
          ]
        }
      }
    }
  }
</script>