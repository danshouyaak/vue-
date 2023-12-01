<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo == 1}">
        1
    </button>
    
    <button v-if="startNumAndEndNum.start > 2">•••</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo == page}">
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">•••</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active:pageNo == totalPage}">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', total + 1)">下一页</button>

    <button style="margin-left: 20px">共 {{ total }} 条</button>
    <!-- <span>{{ startNumAndEndNum.start }}</span>
    <span>{{  startNumAndEndNum.end }}</span> -->
  </div>


</template>
  

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字  连续的页码数字至少是5
    startNumAndEndNum() {
      const { pageNo, totalPage, continues } = this;
      // 先定义两个变量存储起始的数字与结束的数字
      let start = 0,
        end = 0;
      // 注意 连续的页码数 可能大于 总页码数
      if (continues > totalPage) {
        (start = 1), (end = totalPage);
      } else {
        (start = pageNo - parseInt(continues / 2)),
          (end = pageNo + parseInt(continues / 2));
        if (start <= 0) {
          // start 小于等于0 修正
          start = 1;
          end = continues;
        }
        if (end > this.totalPage) {
          // 大于总页码数
          end = this.totalPage;
          start = this.totalPage - continues + 1;
        }
      }
    //   console.log(start, end);
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
