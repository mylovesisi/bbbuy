<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <!-- <tr>
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>-->
                <tr class="goodsList" v-for="item in goodsList" :key="item.id">
                  <th width="48" align="center">
                    <el-switch class="switch" v-model="value" @change="getSum(item.id)"></el-switch>
                  </th>
                  <th align="left" colspan="2" id="secondTh">
                    <img :src="item.img_url" alt srcset>
                    <p>{{item.title}}</p>
                  </th>
                  <th width="84" align="left">
                    <p>{{item.sell_price}}</p>
                  </th>
                  <th width="104" align="center" >
                    <el-input-number
                      v-model="item.buycount"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                      label="描述文字"
                    ></el-input-number>
                  </th>
                  <th width="104" align="left">
                    <p>{{sum=item.sell_price*item.buycount}}</p>
                  </th>
                  <th width="54" align="center">
                    <a href="#" @click.prevent="deleteGoods(item.id)">删除</a>
                  </th>
                </tr>

                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">0</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">0</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      value: true,
      num: null,
      goodsId: JSON.parse(localStorage.getItem("commodityId")) || [],
      goodsList: [],
      goodsCount: [], //拿到了之前在本地储存的商品的数量的数据 但是没卵用,双向绑定指令无法更新迭代变量本身 这个数组无法循环 give up
      sum:0
    };
  },
  created() {
    this.getCart();
    this.splitGoodsId();
  },
  methods: {
    getCart() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getshopcargoods/${
            this.goodsId
          }`
        )
        .then(res => {
          console.log(res);
          this.goodsList = res.data.message;
        });
    },
    handleChange(value) {
      console.log(value);
    },
    deleteGoods(id) {
      //删除商品 利用删除本地里面数组的数据 然后重新调用数据渲染的方法
      //es5indexOf返回指定数组中元素的下标
      let index = this.goodsId.indexOf(id);
      //删除指定的元素
      this.goodsId.splice(index, 1);
      //保存在本地中
      localStorage.setItem("commodityId", JSON.stringify(this.goodsId));
      // 调用接口重新渲染页面
      this.getCart();
    },
    splitGoodsId() {
      this.goodsId.forEach((element, i) => {
        //es5新增的数组遍历的方法  商品id拿到后遍历 然后拆分 拼接 拿到各个本地商品数量储存的数据的数组,取最后一个
        this.goodsCount[i] = JSON.parse(localStorage.getItem(`commodityNum+${element}`)).pop();
      });
    },
    getSum(id){
      if(id){
       console.log(this.sum);
      }
    }
  }
  // watch: {
  //   num: {
  //     handler: (val, oldVal) => {
  //       // this.goodsCount.forEach((e, i) => {
  //       //   val=e
  //       // });
  //       val=2
  //     },
  //     deep:true
  //   }
  // }
};
</script>

<style>
.goodsList {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
#secondTh img {
  display: inline-block;
  width: 40px;
}
#secondTh p {
  display: inline-block;
}
</style>
