<template>
  <div>{{ this.$route.params.keyword }}</div>
</template>
  
  <script>
export default {
  name: "Search",
  data(){
    return{
    }
  },
  created(){
    console.log(this.$route.params.keyword);
  }
};
</script>
  
  <style>
</style>