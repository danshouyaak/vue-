<template>
  <div>
    <Header></Header>
    <!-- 放置路由出口的地方 -->
    <router-view></router-view>

    <!-- 在这做判断 是否隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>