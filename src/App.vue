<template>
  <div>
    <Header></Header>
    <!-- 放置路由出口的地方 -->
    <router-view to="/home"></router-view>

    <!-- 在这做判断 是否隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
// import TypeNav from "./components/TypeNav";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    // TypeNav,
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储在仓库当中
    this.$store.dispatch("categoryList");
    // this.$store.dispatch('getUserInfo')
  },
};
</script>;