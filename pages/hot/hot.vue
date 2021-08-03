<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png" />
    <view class="search-box">
      <my-search placeholderText="uni-app自定义组件" />
    </view>
	<view class="tab-sticky">
		<my-tabs
		:tabData="tabData"
		@tabClick="tabClick"
		:config="{textColor:'#333333'}"
		:defaultIndex="currentIndex"
		></my-tabs>
	</view>
    <swiper @change="onSwiperChange" classs="swiper" :current="currentIndex" :style="{height:currentSwiperHeight+'px'}" @animationfinish="onSwiperEnd">
      <swiper-item v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
        <view>
          <uni-load-more status="loading" v-if="isLoading" />
          <block v-else>
            <hot-list-item :class="'hot-list-item-'+tabIndex" :data="item" v-for="(item,index) in listData[tabIndex]" :key="index" :ranking="index + 1"></hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getHotTabs, getHotListFromTabType } from "@/api/hot.js";
export default {
  data() {
    return {
      tabData: [],
      currentIndex: 0,
      isLoading: false,
      listData: {},
	  currentSwiperHeight:0,
	  swiperHeightData:{},
	  currentPageScrollTop:0
    };
  },
  created() {
    this.getHotTabs();
  },
  onPageScroll({ scrollTop }) {
	  this.currentPageScrollTop=scrollTop
  },
  methods: {
	  onSwiperChange(e){
		  if(this.currentPageScrollTop>130){
			  uni.pageScrollTo({ scrollTop: 130 })
		  }
		  this.currentIndex=e.detail.current
	  },
    async getHotTabs() {
      let { data: res } = await getHotTabs();
      this.tabData = res.list;
      this.getHotListFromTab();
    },
    tabClick(index) {
      this.currentIndex = index;
      
    },
    async getHotListFromTab() {
      this.isLoading = true;
      if (!this.listData[this.currentIndex]) {
        let { data: res } = await getHotListFromTabType(this.currentIndex);
        this.listData[this.currentIndex] = res.list;
      }
      this.isLoading = false;
	  setTimeout(async ()=>{
		  this.currentSwiperHeight=await this.getCurrentSwiperHeight()
		  this.swiperHeightData[this.currentIndex]=this.currentSwiperHeight
	  },0 )
    },
	getCurrentSwiperHeight(){
		return new Promise((resolve,reject)=>{
			let sum=0
			const query=uni.createSelectorQuery().in(this)
			query.selectAll(`.hot-list-item-${this.currentIndex}`)
			.boundingClientRect((res)=>{
				res.forEach((item)=>{
					sum+=item.height
				})
				resolve(sum)
			})
			.exec()
		})
	},
	onSwiperEnd(){
		if(!this.listData[this.currentIndex]){
			this.getHotListFromTab();
			return
		}
		this.currentSwiperHeight=this.swiperHeightData[this.currentIndex]
	}
  },
};
</script>
<style lang="scss" scoped>
.tab-sticky{
	position:sticky;
	position:-webkit-sticky;
	z-index:99;
	/* #ifndef H5 */
    top: 0;
    /* #endif */
    /* #ifdef H5 */
    top: 44px;
    /* #endif */
}
.hot-container {
  background-color: $uni-bg-color;

  .logo {
    width: 100%;
    height: 80px;
  }

  .search-box {
    padding: 0 16px;
    margin-bottom: $uni-spacing-col-base;
  }
}
</style>
