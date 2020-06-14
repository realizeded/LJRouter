class Record {
  constructor(path,url,query,params,name,component) {
    this.url = url;
    this.path = path;
    this.query = query;
    this.params = params;
    this.name = name;
    this.component = component;
  }
}
function addRecord(pathList,pathMap,nameMap,route) {
    let record  = new Record(route.path,route.url,route.query,route.params,route.name,route.component);
    if(route.path) {
      pathList.push(route.path);
    }
    if(route.name) {
      nameMap[route.name] = record;
    }
    if(route.path) {
      pathMap[route.path] = record;
    }
}
function addRouterRecord(pathList,pathMap,nameMap,routes) {
  routes.forEach(item=>{
    addRecord(pathList,pathMap,nameMap,item);
  });
}
function createMatcher(routes) {
  let pathList = [];
  let pathMap = {};
  let nameMap = {};
  addRouterRecord(pathList,pathMap,nameMap,routes);
  function getCurrentRecord({path,name,query}) {
    let record =  null;
    if(name) {
        record = nameMap[name];
    }
    if(path) {
      record = pathMap[path];
    }
    if(record) {
      record.query = query;
    }
    return record||{};
  }
  function addRoutes(appendRoutes) {
    addRouterRecord(pathList,pathMap,nameMap,appendRoutes);
  }
  return{getCurrentRecord,addRoutes};
}
export default  createMatcher;
