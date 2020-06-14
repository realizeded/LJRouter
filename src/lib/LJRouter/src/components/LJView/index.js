let LJView = {
  functional:true,
  render(c,context) {
    let root = context.parent.$root;
    let component = root._route.current.component;
    if(!component) {
       return c(root.$notFoundComponent);
    }

    return c(root._route.current.component);
  }
}
export default LJView;
