<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{
                        c2.categoryName
                      }}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{
                          c3.categoryName
                        }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import _ from "lodash"; //引入所有功能
import throttle from "lodash/throttle"; // 按需引入    里面写的是默认暴露
export default {
  name: "TypeNav",
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   //   //鼠标移上某一个一级分类的索引值
    //   console.log(index);
    //   //   // 用户行为过快，导致浏览器反应不过来，如果当前回调函数中由一些大量业务，浏览器有可能出现卡顿现象
    //   this.currentIndex = index;
    // },
    //es5的写法
    changeIndex: throttle(function (index) {
      //引入lodash进行节流操作
      this.currentIndex = index;
      //鼠标移上某一个一级分类的索引值
      // console.log(this.currentIndex);
      // 用户行为过快，导致浏览器反应不过来，如果当前回调函数中由一些大量业务，浏览器有可能出现卡顿现象
    }, 50),
    // 一级分类鼠标移出事件的回调
    // leaveIndex() {
    //   this.currentIndex = -1;
    // },
    goSearch(event) {
      //最好的解决方案：编程式导航 + 事件委派
      //利用事件委派存在一些问题：1.点击的不一定是div
      // 存在一些问题：事件委派，是把全部的子节点【h3,dt,dl,em】的事件委派给父亲节点
      //点击a标签的时候，才会把路由进行转跳【怎么确定点击的一点是a标签】
      //存在另外一个问题：即使你能确定点击的是a标签，如何区分一级，二级，三级分类的标签

      //第一个问题：把子节点当中的a标签，我加上自定义属性：data-cate-goryname这样节点【一定是a标签】
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值

      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理出路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类，二级分类，三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //判断：如果路由跳转的时候，带有params参数，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location配置对象传递参数

          //整理完参数
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数就会立即执行一次
      //注入一个参数state，其实为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e11b1b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        // .item:hover{
        //             background: #e1251b;
        //         }
        .cur {
          background: #1bc0e1;
        }
      }
    }
    //过渡动画样式
    //过渡动画开始
    .sort-enter {
      height: 0px;
      transform: rotate(0deg);
    }
    //过渡动画结束
    .sort-enter-to {
      height: 580px;
      transform: rotate(365deg);
    }
    //定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>