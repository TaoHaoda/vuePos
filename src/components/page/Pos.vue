<template>
    <div class="pos">
        <el-row>
            <el-col :span='9' :xs='7' class="pos-order clearFix" >
                <el-tabs tab-position='center' width="100%">
                  <el-tab-pane label="点餐">点餐</el-tab-pane>
                  <el-tab-pane label="挂单">挂单</el-tab-pane>
                  <el-tab-pane label="外卖">外卖</el-tab-pane>
                </el-tabs>
                <el-table :data="tableData" border>
                    <el-table-column prop="goodsName" label="商品名称" header-align='center' align='center'>
                    </el-table-column>
                    <el-table-column prop="count" label="数量" header-align='left' align='left'>
                    </el-table-column>
                    <el-table-column prop="price" label="金额" header-align='left' align='center'>
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope='data'>
                            <!-- <el-input-number size="mini" v-model="data.row.count" @change="changeHandle" :min="1" :max="99" label="描述文字"></el-input-number> -->
                            <el-button type="text" size="small" @click="deleteSingleGoods(data.row)">删除</el-button>
                            <el-button type="text" size="small" @click="addOrderList(data.row)">增加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="tableData.length">
                    <p>
                        <span>数量:</span><span>{{totalCount}}</span>
                        <span>金额:</span><span>{{totalMoney}}元</span>
                    </p> 
                </div>
                <div>
                    <el-button type="warning" >挂单</el-button>
                    <el-button type="danger" @click="deleteAllGoods">删除全部</el-button>
                    <el-button type="success" @click="checkout">结账</el-button>
                </div>
            </el-col>
            <el-col :span='15' :xs='17' class="pos-order ">

                <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                        <ul class="clearFix">
                            <li v-for="item in oftenGoods" @click.prevent="addOrderList(item)">
                                <span>{{item.goodsName}}</span>
                                <span class="o-price">￥{{item.price}}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="test">
                    <el-tabs class="goods-type" tab-position='center'>
                      <el-tab-pane label="汉堡">
                          <h1 v-if="!type0Goods.length" class="icon iconfont icon-zanwushuju">暂无数据</h1>
                          <div>
                              <ul class="cookList">
                                <li v-for="item in type0Goods" @click="addOrderList(item)">
                                    <span class="foodImg"><img :src=item.goodsImg width="100%"></span>
                                    <span class="foodName">{{item.goodsName}}</span>
                                    <span class="foodPrice">￥{{item.price}}元</span>
                                </li>
                              </ul>
                          </div>
                      </el-tab-pane>
                      <el-tab-pane label="小食">
                          <h1 v-if="!type0Goods.length" class="icon iconfont icon-zanwushuju">暂无数据</h1>
                          <div>
                              <ul class="cookList">
                                <li v-for="item in type1Goods" @click="addOrderList(item)">
                                    <span class="foodImg"><img :src=item.goodsImg width="100%"></span>
                                    <span class="foodName">{{item.goodsName}}</span>
                                    <span class="foodPrice">￥{{item.price}}元</span>
                                </li>
                              </ul>
                          </div>
                      </el-tab-pane>
                      <el-tab-pane label="饮料">
                          <h1 v-if="!type0Goods.length" class="icon iconfont icon-zanwushuju">暂无数据</h1>
                          <div>
                              <ul class="cookList">
                                <li v-for="item in type2Goods" @click="addOrderList(item)">
                                    <span class="foodImg"><img :src=item.goodsImg width="100%"></span>
                                    <span class="foodName">{{item.goodsName}}</span>
                                    <span class="foodPrice">￥{{item.price}}元</span>
                                </li>
                              </ul>
                          </div>
                      </el-tab-pane>
                      <el-tab-pane label="套餐">
                          <h1 v-if="!type0Goods.length" class="icon iconfont icon-zanwushuju">暂无数据</h1>
                          <div>
                              <ul class="cookList">
                                <li v-for="item in type3Goods" @click="addOrderList(item)">
                                    <span class="foodImg"><img :src=item.goodsImg width="100%"></span>
                                    <span class="foodName">{{item.goodsName}}</span>
                                    <span class="foodPrice">￥{{item.price}}元</span>
                                </li>
                              </ul>
                          </div>
                      </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            tableData: [],
            oftenGoods:[],
            type0Goods:[],
            type1Goods:[],
            type2Goods:[],
            type3Goods:[],
            totalMoney:0,
            totalCount:0

        }
    },
    name:'pos',
    // 当所有的虚拟DOM完成之后的生命周期
    mounted:function(){
        
        var orderHeight = document.body.clientHeight;
        // document.getElementById('order-list').style.height = orderHeight + 'px';
    },
    created:function(){
        this.$http.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then((res)=>{
            // console.log(res.data)
            this.oftenGoods = res.data;
        })
        .catch(function(error){
            console.log(error)
        });
        this.$http.get('http://jspang.com/DemoApi/typeGoods.php')
        .then((res)=>{
            console.log(res.data)
            this.type0Goods = res.data[0];
            this.type1Goods = res.data[1];
            this.type2Goods = res.data[2];
            this.type3Goods = res.data[3];
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods:{
        addOrderList(item){
            this.totalCount = 0;
            this.totalMoney = 0;
            // 有就改变数量,没有就添加到数组中
            // 商品是否已经存在于订单列表中,如果有在原来基础上改变数量
            let isHave = true;
            let index = 0;
            for(let i = 0; i < this.tableData.length; i++){
                if(this.tableData[i].goodsId === item.goodsId){
                    isHave = false;
                    index = i;
                }
            }
            if(isHave){
                // 如果不存在直接添加到数组中
                let obj = {
                    goodsId:item.goodsId,
                    goodsName:item.goodsName,
                    price:item.price,
                    count:1
                }
                this.tableData.push(obj);
                // console.log(obj);
            }else{
                // 如果商品已经存在,在原来的基础上改变数量
                this.tableData[index].count++;
            }

            for(let i = 0; i < this.tableData.length; i++){
                this.totalCount += this.tableData[i].count;
                this.totalMoney = this.totalMoney+(this.tableData[i].count * this.tableData[i].price)
                // console.log(this.totalMoney)
            }
        },
        deleteSingleGoods(item){
            console.log(item);
            let index = 0;
            for(let i = 0; i < this.tableData.length; i++){
                if(this.tableData[i].goodsId == item.goodsId){
                    index = i;
                }
            }
            // 删除数组中对应的数据
            this.tableData.splice(index,1);
            // 对总数量和总金额进行重新计算
            this.totalCount = 0;
            this.totalMoney = 0;
            for(let i = 0; i < this.tableData.length; i++){
                this.totalCount += this.tableData[i].count;
                this.totalMoney = this.totalMoney+(this.tableData[i].count * this.tableData[i].price)
                // console.log(this.totalMoney)
            }
            
        },
        deleteAllGoods(){
            this.tableData = [];
            this.totalCount = 0;
            this.totalMoney = 0;
        },
        checkout(){
            if(this.tableData.length != 0){
                
                // this.$message({
                //     message:'结账成功',
                //     type:'success'
                // })
                this.$alert('总价格:'+ this.totalMoney + '元', '结算', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.tableData = [];
                        this.totalCount = 0;
                        this.totalMoney = 0;
                        this.$message({
                        type: 'info',
                        message: '结算成功'
                        });
                    }
                });
                
            }else{
                // this.$message.error('别着急,还没有点餐呢');
                this.$notify.warning({
                    title: '商品不能为空',
                    message: '老板知道你急切买单的心情',
                    position: 'top-left',
                    // offset:100
                });
            }
        }
    }
}
</script>

<style scoped>
.test{
    background-color: #e8e8e8;
}
.pos{
    height: 100%;
}
.pos .el-row{
    height: 100%;
}
.pos-order{
    background-color: #f9fafc;
    border-right: 1px solid #cbccda;
    height: 100%;
}
.title{
    height: 20px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding: 10px;
    text-align: left;
}
.often-goods-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 10px;
}
.o-price{
    color:#58B7FF;
}
.clearFix::after{
    content: '';
    display: block;
    clear: both;
}
.cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    /* background-color:#fff; */
    padding: 2px;
    float:left;
    margin: 2px;

}
.cookList li span{
    
    display: block;
    float:left;
}
.foodImg{
    width: 40%;
}
.foodName{
    font-size: 16px;
    padding-left: 10px;
    color:brown;

}
.foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
}
</style>
