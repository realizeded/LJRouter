import createMatcher from "../createMatcher";
class Htmlhistory {
  constructor(options) {
    this.$options = options;
    let routes = options.routes;
    const {addRoutes,getCurrentRecord} = createMatcher(routes);
    this.addRoutes = addRoutes;
    this.getCurrentRecord = getCurrentRecord;
    this.currentRouter = {current:{}};
    this.beforeEachCallBack = null;
    let path = this.getPath();
    this.transitionTo(path)
    this.setUpListener();

  }
  setUpListener() {
    window.onpopstate = function() {
      let path = this.getPath();
      this.confirmTransitionTo({path});
    }.bind(this);
  }
  getPath() {
    let path = location.href.split('/')[3];
    path = path?'/'+path:'/';
    return path;
  }
  transitionTo(path) {
    this.confirmTransitionTo({path});
  }
  confirmTransitionTo({path,name,query}) {
    let currentRecord;
    currentRecord = this.getCurrentRecord({path,name,query});
    let that = this;
    function next(resolve,reject) {
      return function(path) {
        if(Object.is(undefined,path)) {
          resolve(currentRecord);
        }else {
          that.confirmTransitionTo({path});
        }
      }
    }
    new Promise(function(resolve,reject){
      if(this.beforeEachCallBack) {
        this.beforeEachCallBack(this.currentRouter.current,currentRecord,next(resolve,reject));
      }else {
        resolve(currentRecord);
      }
    }.bind(this)).then(record=>{
      this.currentRouter.current = record
    });
  }
  push({path,name,query}) {
    history.pushState(null,null,path);
    this.confirmTransitionTo({path,name,query});
  }
  back() {
    history.go(-1);
  }
  replace({path}) {
    history.replaceState(null,null,path);
    this.confirmTransitionTo({path});
  }
  //全局前置守卫
  beforeEach(fn) {
    this.beforeEachCallBack = fn;
  }
}
export default  Htmlhistory;
