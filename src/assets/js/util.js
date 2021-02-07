/*
 * @Author: Willie Chen
 * @LastEditors: Willie Chen
 * @Date: 2019-10-16 10:42:21
 * @LastEditTime: 2021-01-07 17:55:26
 * @Description: 工具集
 */

import jsCookie from 'js-cookie';
// import channelApi from "../../api/modules/channelApi";
// import appApi from "../../api/modules/appApi";
// import userApi from "../../api/modules/userApi";


const TOKEN_KEY = 'tokenAuth';
export const tokenFn = {
  getToken() {
    return jsCookie.get(TOKEN_KEY);
  },
  setToken(token, expires = 7) {
    return jsCookie.set(TOKEN_KEY, token, {
      expires
    });
  },
  removeToken() {
    return jsCookie.remove(TOKEN_KEY);
  }
};

export const UtilFn = {
  // 关闭当前激活的标签
  closeCurrentTab() {
    let elem = document.querySelector('.tags-view-container .tags-view-item.active');

    if (elem) {
      elem.querySelector('.el-icon-close') && elem.querySelector('.el-icon-close').click();
    }
  },

  createUuid () {
    return Math.random().toString(36).substring(2) + ((new Date()).getTime() + ((Math.random() * 10 | 0) << 24)).toString(36);
  },
};

export const StringUtil = {
  StrNotEmpty(v) {
    return typeof (v) == "string" && v.length > 0;
  },
  StrOr(v1, v2) {
    if (this.StrNotEmpty(v1)) return v1;
    else return v2;
  },
  StrOrUndefine(v) {
    if (typeof (v) == "string" && v.length > 0) return v
    else undefined
  }
}


export const ConfigUtil = {
	async getChannel(app){
		let data = await channelApi.list({
          pageNo: 1,
          pageNum: 2000,
          app: app,
        });
        console.log(data);
        return data.data
	},
	
	async getAuth(){
		const userInfos = await userApi.queryUserByUserName({"username":jsCookie.get("username")});
        // console.info(" UserInfos", userInfos);

	    let userInfo = userInfos[0];
	    let roleInfos = await userApi.queryRoleById({id:userInfo.roleId})
	    // console.info(roleInfos[0].info)
	    return roleInfos[0].info
	},
	
	async getApp(type=""){
		let data = await appApi.list({
          pageNo: 1,
          pageNum: 2000,
          app: "",
        });
        const userInfos = await userApi.queryUserByUserName({"username":jsCookie.get("username")});
        // console.info(" UserInfos", userInfos);
	    let userInfo = userInfos[0];
	    if(userInfo.apps.indexOf("所有应用")>-1 || type=='all'){
	    	return data.data
	    }else{
			return data.data.filter(function(v){ return userInfo.apps.split(",").indexOf(v.app) > -1 })
		}
	},
	
	async getRole(){
		let data = await userApi.queryRole();
        
	    return data
	    
	},
	
	
	async getAppConf(app) {
		console.info(app)
    	let data = await appApi.list({
          pageNo: 1,
          pageNum: 1,
          app:app,
        });
        console.info(data)
//      
//      console.info(data.data[0].app_conf)
//      this.app_id = data.data[0].id
//      return JSON.parse(data.data[0].app_conf)
//      
        return data.data[0]
    },
	
}

export const Util = {
  JumpUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.id = "jump_url_id";
    document.body.appendChild(a);
    var alink = document.getElementById("jump_url_id");
    alink.click();
    alink.parentNode.removeChild(a);
  },
  /*
 * @params {string} text
 */
  copyText(text) {
    text = text + '';
    try {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', text);
      input.select();
      if (document.execCommand) {
        document.execCommand('copy');
      } else {
        console.error('复制失败');
      }
      document.body.removeChild(input);
    } catch (e) {
      console.error('复制失败');
    }
  },

  /**
   * @param {number} time 毫秒
   */
  sleep (time = 2000) {
    return new Promise((resolve, reject) => {
      window.setTimeout(resolve, time);
    });
  },

  /**
   * rgb设置转16进制
   * @param {number} r 0-255
   * @param {number} g 0-255
   * @param {number} b 0-255
   */
  rgb2Hex (r, g, b) {
    r = r - 0 || 0;
    g = g - 0 || 0;
    b = b - 0 || 0;
    return r.toString(16) + g.toString(16) + b.toString(16);
  },
}