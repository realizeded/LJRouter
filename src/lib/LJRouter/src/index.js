import install from './install.js';
import Hashhistory from "./history/Hashhistory";
import Htmlhistory from './history/Htmlhistory';
import {deepCopy} from './util/util.js'
class LJRouter {
  static install = install;
  constructor(options) {
    this.$options = options;
    this.mode = options.mode||'hash';
    switch (this.mode) {
      case "hash":this.history = new Hashhistory(options);break;
      case "history":this.history = new Htmlhistory(options);break;
    }
  }
  addRoutes(routes) {
    this.history.addRoutes(routes);
  }
  get router() {
    return {
      push:this.push.bind(this),
      back:this.back.bind(this),
      replace:this.replace.bind(this)
    };
  }
  get route() {
    let query = this.history.currentRouter.current.query;
    query = deepCopy(query);
    return {query}
  }
  push({path,name,query}) {
    this.history.push({path,name,query});
  }
  replace({path}) {
    this.history.replace({path});
  }
  back() {
    this.history.back();
  }
  //全局前置守卫
  beforeEach(fn) {
    if(this.mode === 'hash'||this.mode === 'history') {
      this.history.beforeEach(fn);
    } else {
      throw new TypeError('beforeEach is undefined');
    }
  }
}
export default LJRouter;
