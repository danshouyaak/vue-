<template>
  <div>
    <!-- 三级联动组件   已经是全局组建了 不需要注册 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");

    // 获取用户信息在首页展示 getUserInfo
    // this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
};
</script>

<style>
</style>