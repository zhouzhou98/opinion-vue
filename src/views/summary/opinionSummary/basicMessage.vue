<template>
  <div>
    <div>
      <el-radio-group v-model="radio" border size="medium">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="最近三天"></el-radio-button>
        <el-radio-button label="最近七天"></el-radio-button>
      </el-radio-group>
      <el-divider content-position="left"></el-divider>
      <div >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" style="font-size:20%" class="clearfix">
                  <span>事件总数</span>
                </div>
                <div style="font-size:15%" class="text item">
                  24
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" style="font-size:20%" class="clearfix">
                    <span>事件均值</span>
                  </div>
                  <div style="font-size:15%" class="text item">
                    24
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" style="font-size:20%" class="clearfix">
                    <span>事件峰值</span>
                  </div>
                  <div style="font-size:15%" class="text item">
                    24
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <div>
        <el-divider content-position="left">
          <div style="font-size:20px">
            舆情摘要
          </div>
        </el-divider>
        <div>
          <el-row>
            <el-col :span="12">
              <div  class="grid-content bg-purple">
                 <el-card class="sensitive-card">
                  <div slot="header" style="font-size:20%" class="clearfix">
                    <span>敏感事件分布图</span>
                  </div>
                  <div  class="text item">
                    <ve-ring :data="sensitiveData" ></ve-ring>
                  </div>
                </el-card>
                
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                 <el-card class="opiOrNeg-card">
                    <div slot="header" style="font-size:20%" class="clearfix">
                      <span>正负舆情分布图</span>
                    </div>
                    <div  class="text item">
                      <ve-ring :data="opiOrNegData" ></ve-ring>
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
                    <span>数据来源统计图</span>
                  </div>
                  <div  class="text item">
                    <ve-pie :data="originData" :extend="chartExtend"  :settings="chartSettings"></ve-pie>
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
        <div style="margin-top:20px">
          <el-row>
            <el-col :span="24">
              <div  class="grid-content bg-purple">
                 <el-card class="origin-card">
                  <div slot="header" style="font-size:20%" class="clearfix">
                    <span>舆情区域变化图</span>
                  </div>
                  <div  class="mapCard">
                    <ve-map :data="mapData" height='600px' :settings="mapSettings"></ve-map>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>  
        </div> 
      </div>
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
      this.chartSettings ={
        
        dataType: 'percent'
      }
      this.chartExtend = {
          
          series: {
            // radius: ['50%', '65%'],
            radius:'70%',
            center: ['50%', '50%']
          }
      }
      this.opinionSettings = {
        metrics: ['舆情事件', '敏感事件', '非敏感事件','正面舆情事件','负面舆情事件'],
        dimension: ['日期']
      }
      this.mapSettings = {
        position: 'china',
        // selectData: true,
        selectedMode: 'single'
      }
      this.mapEvents = {
        click: (v) => {
          this.cityName = v.name
        }
      }
      return {
        radio: '今日',
        sensitiveData: {
          columns: ['数据', '数量'],
          rows: [
            { '数据': '非敏感词', '数量': 1393 },
            { '数据': '敏感词', '数量': 3530 },
            
          ]
        },
        opiOrNegData: {
          columns: ['数据', '数量'],
          rows: [
            { '数据': '正面舆情', '数量': 1393 },
            { '数据': '负面舆情', '数量': 3530 },
            
          ]
        },
        originData: {
          columns: ['博主', '博文数量'],
          rows: [
            { '博主': '1/1', '博文数量': 1393 },
            { '博主': '1/2', '博文数量': 3530 },
            { '博主': '1/3', '博文数量': 2923 },
            { '博主': '1/4', '博文数量': 1723 },
            { '博主': '1/5', '博文数量': 3792 },
            { '博主': '1/6', '博文数量': 4593 }
          ]
        },
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
        cityName: '',
        mapData: {
          columns: ['位置', '事件总数'],
          rows: [
            { '位置': '吉林', '事件总数': 123 },
            { '位置': '北京', '事件总数': 1223 },
            { '位置': '上海', '事件总数': 2123 },
            { '位置': '浙江', '事件总数': 4123 }
          ]
        }
      }
    }
  }
</script>
<style scoped>
  .box-card {
    width: 400px;
  }
  .sensitive-card {
    width: 600px;
  }
  .opiOrNeg-card{
    width: 600px;
  }
  .mapCard{
   height: 650px;
  }
</style>
  

