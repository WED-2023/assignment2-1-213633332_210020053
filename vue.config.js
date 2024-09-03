module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    //host:  "http://idan-david.cs.bgu.ac.il"
    //host: "132.73.84.114"
    host: "localhost"
    //host: this.$root.store.server_domain
  }  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
