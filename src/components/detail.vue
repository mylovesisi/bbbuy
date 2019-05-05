<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <!-- 轮播图 -->
                <el-carousel>
                  <el-carousel-item v-for="(item,index) in imglist" :key="index">
                    <img :src="item.thumb_path" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <!---->
                        <el-input-number
                          v-model="num"
                          @change="handleChange"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                        <!---->
                        <!---->
                        <!---->
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button @click="addCart(goodsinfo.id,)" class="add">加入购物车</button>
                       
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" :class="{selected:index==1}" @click="index=1">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" :class="{selected:index==2}" @click="index=2">商品评论</a>
                  </li>
                </ul>
              </div>
              <div
                class="tab-content entry goods-content"
                style="display: block;"
                v-show="index==1"
                v-html="goodsinfo.content"
              >内容</div>
              <div class="tab-content" style="display: block;" v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model="comment"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="publishComent"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      v-show="index<0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in commentList" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{ item.add_time | formDate("YYYY年MM月DD日HH:mm:ss") }}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalcount"
                    background
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <a
                        href="javascript:void(0)"
                        @click="getCommodityDetails()"
                        class
                      >{{item.title}}</a>
                      <span>{{item.add_time | formDate}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "detail",
  data() {
    return {
      goodsinfo: "",
      hotgoodslist: [],
      imglist: [],
      index: 1, //默认为1 显示商品评论
      num: 1,
      //评论内容
      comment: "",
      //获取的评论内容
      commentList: [],
      //当前页
      pageIndex: 1,
      //页容量
      pageSize: 10,
      //评论总数
      totalcount: 0,
      //因为没有接口,所以自己保存购物车的商品的id和购买的数量 然后去购物车获取并计算
      cartNum: JSON.parse(localStorage.getItem("commodityNum")) || [],
      
    };
  },
  // 生命周期钩子函数 创造Vue实例时调用接口获取数据
  created() {
    // console.log(this.$route.params.id);
    this.getCommodityDetails();
    this.getComment();
  },
  methods: {
    /* 购买数量判断 */
    handleChange(value) {
      this.cartNum.push(value);
      // console.log(value);
      //数量拼接id 便于识别
      localStorage.setItem(
        `commodityNum+${this.goodsinfo.id}`,
        JSON.stringify(this.cartNum)
      );
      if (value == this.goodsinfo.stock_quantity) {
        Message({
          type: "warning",
          message: "库存不够了哟,亲"
        });
      }
    },
    //添加评论
    publishComent() {
      if (!this.comment) {
        Message({
          type: "warning",
          message: "不能发布空白内容"
        });
        return;
      }
      this.$axios
        .post(
          `http://111.230.232.110:8899/site/validate/comment/post/goods/${
            this.$route.params.id
          }`,
          {
            commenttxt: this.comment
          }
        )
        .then(res => {
          if (res.data.status === 0) {
            Message({
              type: "success",
              message: res.data.message
            });
            this.comment = "";
            //添加成功后刷新数据
            this.getComment();
          }
        });
    },
    //获取商品详情信息
    getCommodityDetails() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
            this.$route.params.id
          }`
        )
        .then(res => {
          // console.log(res);
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
        });
    },
    //获取评论数据
    getComment() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(res => {
          // console.log(res);
          this.commentList = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 点击之后页容量的变化并调用接口
      this.pageSize = val;
      this.getComment();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 同上
      this.pageIndex = val;
      this.getComment();
    },
    addCart(val) {
      // console.log(val);
      // console.log(this.cartNum);
      // 不需要去重,因为id是唯一的 购物车会筛选id
      //去重,因为后续的商品数量的识别会重复
      let vlas = JSON.parse(localStorage.getItem("commodityId")) || [];
      vlas.push(val);
      //es6新语法 set是一种新的数据结构,它可以接受一个新的数组或者是类数组对象,自动去重其中的重复项目,包括NaN,但是返回的是一个对象,
      //结合Array.from() 它的作用是把类数组对象,可迭代对象转为数组,不兼容IE,让他滚吧
      let newVlas = Array.from(new Set(vlas));
      vlas = newVlas;
      // console.log(vlas);
      localStorage.setItem("commodityId", JSON.stringify(vlas));
     
    }
  },
  // computed: {
  //   updatedComentList: function() {
  //     /* 当我点击分页中的上下页时,上面的评论数据也跟着变化像对应的数据
  //        这个时候页面中获取的评论的数据条数不能全部加载 需要做判断 加载的数据需要计算 为 总的评论数据/设置的分页条数
  //     */
  //     return this.commentList;
  //   }
  // },
  watch: {
    /* 监听路由中id的变化后重新调用接口渲染页面 */
    $route() {
      this.getCommodityDetails();
      this.num = 1;
      this.getComment()
    }
  }
};
</script>
  
<style>
.goods-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods-content p img {
  display: flex;
  margin-left: 50%;
  transform: translateX(-50%);
}
.pic-box {
  width: 395px;
  height: 320px;
}
.pic-box .el-carousel {
  width: 100%;
  height: 100%;
}
.pic-box .el-carousel__container {
  width: 100%;
  height: 100%;
}
.pic-box .el-carousel__container img {
  display: block;
  width: 100%;
  height: 100%;
}
#ball {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: orange;
}
</style>
