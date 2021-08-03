<template>
  <view class="my-search-container">
    <!-- 搜索按钮 -->
    <view class="my-search-box">
      <image class="icon" src="@/static/images/search.png" />
      <text
        class="placeholder"
        :style="{
          color: config.textColor
        }"
        >{{ placeholderText }}</text
      >
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-search',
  props: {
    placeholderText: {
      type: String,
      default: '搜索'
    },
	config: {
	  type: Object,
	  default: () => ({
	    height: 36,
	    backgroundColor: '#ffffff',
	    icon: '/static/images/search.png',
	    textColor: '#454545',
	    border: '1px solid #c9c9c9'
	  })
	},
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 1px solid #c9c9c9;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 $uni-spacing-row-base;

    .icon {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }

    .placeholder {
      font-size: $uni-font-size-sm;
      margin-left: $uni-spacing-row-sm;
      color: #454545;
    }
  }
}
</style>

