<template>
  <el-container class="v_layout">
    <el-header class="v_header">
      <el-menu
        mode="horizontal"
        router
        :default-active="prefixPath"
      >
        <template v-for="item in showRoutes">
          <el-menu-item 
            class="v_header_menu_item"
            :key="item.name || item.path"
            :index="item.path"
            v-if="!item.subMenu || !item.subMenu.length"
          >
            {{ item.title }}
          </el-menu-item>
          <el-submenu
            v-else
            class="v_header_menu_item"
            :key="item.name || item.path"
            :index="item.path"
          >
            <template slot="title">{{ item.title }}</template>
            <el-menu-item
              v-for="sub in item.subMenu"
              :key="sub.name || sub.path"
              :index="sub.path"
            >
              {{ sub.title }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>

      <div class="v_header_info">
        <span style="margin-right: 10px;font-size:20%">苏毓洲</span>
        <el-button size="small" type="danger" @click="logOff">logout</el-button>
      </div>
    </el-header>

    <router-view class="layout_main" v-if="isInit" />
    <!-- <el-main>
    </el-main> -->
  </el-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import jsCookie from "js-cookie";
import { NavRoutes } from '@/router'
import { ConfigUtil } from "../assets/js/util";

export default {
  name: 'layout',

  data () {
    return {
      navRoutes: NavRoutes.filter(item => !item.hidden),

      isInit: false,
      username:""
    }
  },

  computed: {
    path () {
      return '/' + this.$route.path.split('/')[1];
    },

    prefixPathLevel () {
      return (this.$route.meta || {}).prefixPathLevel || 1;
    },

    prefixPath () {
      const split = this.$route.path.split('/');
      return '/' + split.slice(1, this.prefixPathLevel + 1).join('/');
    },

    showRoutes () {
     
      // const hasAll = 'all';
      // return hasAll ? this.navRoutes : this.navRoutes.filter(item => {
      //   const meta = item.meta || {};
      //   const auth = meta.auth;
      //   return auth ? menu.includes(auth) : true;
      // });
      return this.navRoutes
    },
  },

  methods: {
    
    logOff(){
      jsCookie.remove("username")
      jsCookie.remove('tokenAuth')
      sessionStorage.removeItem('token')
      this.$router.push('/login');
    },
    async init () {
      const username = jsCookie.get('username');
      const loading = this.$loading({
        text: 'loading...',
      });
      if (username) {
        this.username=username
       
      }
      this.isInit = true;
      loading.close();

      if (this.$route.path === '/') {
        const firstRoutePath = this.showRoutes[0] ? this.showRoutes[0].path : '/';
        if (!firstRoutePath !== '/') {
          this.$router.replace(firstRoutePath);
        }
      }
    },
  },

  mounted () {
    this.init();
  },
}
</script>

<style lang="scss">
.v_layout {
  .v_header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    .el-menu {
      border-bottom: none;
    }
    .v_header_menu_item {
      &:hover {
        background-color: unset !important;
      }
    }

    .v_header_info {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  .layout_main {
    padding: 20px;
  }
}
</style>