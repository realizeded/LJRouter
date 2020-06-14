import ljView from './components/LJView/index';
import ljLink from './components/LJLink/index';
import notFound from './components/notFound/index';
install._vue = null;
function install(vue) {
     let _vue = install._vue;
     if(_vue) {
       throw new Error('Cannot be reinstalled');
     }
     install._vue = vue;
     mixinApply(vue);
}
function mixinApply(vue) {
    vue.mixin({
        beforeCreate:routerInit
    });
    definedRouter(vue);
    vue.component('ljView',ljView);
    vue.component('ljLink',ljLink);
}
function routerInit() {
    if(this.$options.router) {
        this._router = this.$options.router;
        this.$notFoundComponent = notFound;
        install._vue.util.defineReactive(this,'_route',this._router.history.currentRouter);
    } else {
        this._router = this.$parent._router;
    }

}
function definedRouter(vue) {
  Object.defineProperty(vue.prototype,'$router',{
    get() {
        return this._router.router;
    }
  });
  Object.defineProperty(vue.prototype,'$route',{
    get() {
      return this._router.route;
    }
  });
}
export default install;
