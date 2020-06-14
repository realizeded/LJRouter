import createMatcher from "../createMatcher";
class Hashhistory {
  constructor(options) {
    this.$options = options;
    let routes = options.routes;
    const {addRoutes,getCurrentRecord} = createMatcher(routes);
    this.addRoutes = addRoutes;
    this.getCurrentRecord = getCurrentRecord;
    this.currentRouter = {current:{}};
    this.pathQueue = [];
    this.beforeEachCallBack = null;
    this.transitionTo();
    this.setUpListener();
  }
  setUpListener() {
    window.onhashchange = function() {
      let hash = location.hash;


      if(hash==='') {
        location.href = location.href+'#/';
        hash = '/';
      } else if(hash === '#/') {
        hash = '/'
      }
      else {
        hash = hash.slice(1);
      }
      this.confirmTransitionTo({hash});
    }.bind(this);
  }
  transitionTo() {
    let hash = location.hash;
    if(hash.indexOf('#')===-1) {
        location.href = location.href+'#/';
        hash = '/';
    } else {
        hash = hash.slice(1);
    }
    if(hash==='') {
        hash = '/';
    }
    this.pathQueue.push(hash);
    this.confirmTransitionTo({hash});
  }
  confirmTransitionTo({hash,name,query}) {
    let currentRecord;
    currentRecord = this.getCurrentRecord({path:hash,name,query});
    let that = this;
    function next(resolve,reject) {
        return function(path) {
            if(Object.is(undefined,path)) {
               resolve(currentRecord);
            }else {
               location.hash = '#'+path;
               that.confirmTransitionTo({hash:path});
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
    this.pathQueue.push(path);
    this.confirmTransitionTo({hash:path,name,query});
  }
  back() {
    let pathQueue = this.pathQueue;
    let path = null;
    if(pathQueue.length<=1) {
      console.error('pathQueue value is < 2:redirect to /');
      path = '/'
    } else {
      path = pathQueue[pathQueue.length-2];
      pathQueue.length = pathQueue.length-2;
    }
    this.pathQueue.push(path);
    this.confirmTransitionTo({hash:path});
  }
  replace({path}) {
    this.pathQueue.length = 0;
    this.confirmTransitionTo({hash:path});
  }
  //全局前置守卫
  beforeEach(fn) {
    this.beforeEachCallBack = fn;
  }
}
export default  Hashhistory;
