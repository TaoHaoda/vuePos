<template>
  <div class="leftNav">
      <ul>
          <li>
              <router-link to="/">
                <i class="icon iconfont icon-qian01"></i>
                <div>收银</div>
              </router-link>
          </li>
          <li>
              <router-link to="/shop">
                <i class="icon iconfont icon-dianpu"></i>
                <div>店铺</div>
              </router-link>
          </li>
          <li>
              <router-link to="/goods">
                <i class="icon iconfont icon-icon27401"></i>
                <div>商品</div>
              </router-link>
          </li>
          <li> 
              <router-link to="/menber">
                <i class="icon iconfont icon-huiyuan"></i>
                <div>会员</div>
              </router-link>
              
          </li>
          <li>
              <router-link to="/settings">
                <i class="icon iconfont icon-ttpodicon"></i>
                <div>设置</div>
              </router-link>
              
          </li>          
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
a{
    text-decoration: none;
    color: #fff;
}
.leftNav{
    color: #fff;
    font-size: 10px;
    width: 5%;
    height: 100%;
    background-color: #1d8ce0;
    float: left;
}
.iconfont{
    font-size: 24px;
}
.leftNav ul{
    padding: 0px;
    margin: 0px;
}
.leftNav li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
}
</style>

