let LJLink = {
    props:{
      to:{
        type:String,
        default:""
      },
      tag:{
        type:String,
        default:'a'
      }
    },
    render(c) {
      let tag = this.tag;
      return c(tag,{on:{click:()=>{this.$router.push({path:this.to})}}},this.$slots.default[0].text);
    }
}
export default LJLink;
