<template>
  <el-container>
    <el-main>
      <el-container>
        <el-aside width="150px">
          <el-menu
            :router="true"
            :default-active="subMenuActive"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              v-for="one in subMenus"
              :index="one.name + kid"
              :key="one.name"
            >
              {{ one.display }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view 
          :app = 'app'	
          />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>

import { StringUtil, Util,ConfigUtil } from "../../../assets/js/util";
import { mapActions } from "vuex";



export default {
  name: "purchase",
  data: function () {
    return {
    	// appList:[],
      app: "",
      id:"",
      subMenus: [
        { name: "/detail/posOrNeg/positive", display: "正面舆情信息" },
        { name: "/detail/posOrNeg/negative", display: "负面舆情信息" }
       
      ],
      kid: ''
    }
  },
  created: function() {
    // console.log(this.$route.query.kid)
    if(this.$route.query.kid) {
      this.kid = '?kid=' + this.$route.query.kid;
    }
    this.init();
  },
  watch: {
    app: function (newValue, oldValue) {
      this.init();
    },
  },
  computed: {
    subMenuActive () {
      // console.log(this.$route.path)
      return this.$route.fullPath;
    },

    appList () {
      return this.$store.state.userAppList || [];
    },
  },
  methods: {
    // add(idx){
    //   if(this.id){
    //     return this.subMenus[idx].name+ "?mid="+this.id
    //   }
    //   return this.subMenus[idx].name
    // },
    handleSelectApp: function (key) {
      console.log(this.app);
      this.app = key;
      this.setUrlParams();
    },
    loadQuery: function () {
      let q = this.$route.query;
      if(StringUtil.StrNotEmpty(q.app)){
      	if(this.appList.filter(item => item.app == q.app).length==0){
      		this.app = "None"
      		this.subMenus = []
      		return
      	}
      }
      this.app = q.app || this.appList[0];
      this.setUrlParams();
    },
    setUrlParams: function () {
      this.$router
        .replace({
          query: {
            app: this.app,
          },
        })
        .catch((err) => {
          err;
        });
    },

    init: async function () {
    	// this.appList = await ConfigUtil.getApp();
      this.loadQuery();
    },
  },
};
</script>

<style lang="scss" scoped>
.app_header {
  background: #d4d4d4;
}
</style>
