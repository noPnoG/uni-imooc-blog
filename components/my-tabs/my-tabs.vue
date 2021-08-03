<template>
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view id="_scroll" scroll-x class="scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabData" :key="index">
							<view class="tab-item"
							 :id="'_tab_' + index"
							 :class="{'tab-item-active':activeIndex===index}" 
							 :style="{color:activeIndex===index?defaultConfig.activeTextColor:defaultConfig.textColor}" 
							@click="tabClick(index)">{{ item.label || item }}</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view class="underLine" :style="{
						transform: 'translateX(' + slider.left + 'px)',
						width: defaultConfig.underLineWidth + 'px',
						height: defaultConfig.underLineHeight + 'px',
						backgroundColor: defaultConfig.underLineColor
		                }" />
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>


<script>
	export default {
		name: 'my-tabs',
		props: {
			// 父组件传入的 tabs 数据
			tabData: {
				type: Array,
				default: () => []
			},
			// 默认激活项
			defaultIndex: {
				type: Number,
				default: 0
			},
			// 配置对象
			config: {
				type: Object,
				default: () => {
					return {};
				}
			}
		},
		data() {
			return {
				tabList:[],
				activeIndex: -1,
				scrollLeft:0,
				slider: {
					left: 0
				},
				defaultConfig: {
					textColor: '#333333',
					activeTextColor: '#f94d2a',
					underLineWidth: 24,
					underLineHeight: 2,
					underLineColor: '#f94d2a'
				}
			}
		},
		watch: {
			defaultIndex: {
				handler(val) {
					this.activeIndex = val
					this.tabToIndex()
				},
				immediate: true
			},
			config: {
				handler(val) {
					this.defaultConfig = {
						...this.defaultConfig,
						...val
					}
				},
				immmediate: true
			},
			tabData:{
				handler(val){
					this.tabList=val
					setTimeout(()=>{
						this.updateTabWidth()
					},0)
				},
				immmediate: true
			}
		},
		methods: {
			tabClick(index) {
				this.activeIndex = index
				this.$emit('tabClick', index)
			},
			tabToIndex() {
				if(this.tabList.length===0)return
				const activeIndex = this.activeIndex
				const underLineWidth = this.defaultConfig.underLineWidth;
				this.slider = {
					left: this.tabList[activeIndex]._slider.left
				}
				this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth
			},
			updateTabWidth(){
				let data=this.tabList
				if(data.length===0)return false
				const query=uni.createSelectorQuery().in(this)
				data.forEach((item,index)=>{
					query.select('#_tab_'+index).boundingClientRect((res)=>{
						item._slider={
							left:res.left+(res.width-this.defaultConfig.underLineWidth)/2
						}
					}).exec()
					if(data.length-1===index){
						this.tabToIndex()
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tab-container {
		font-size: $uni-font-size-base;
		height: 45px;
		line-height: 45px;
		background-color: $uni-bg-color;

		.tab-box {
			width: 100%;
			height: 45px;
			display: flex;
			position: relative;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.scroll-content {
					width: 100%;
					height: 100%;
					position: relative;

					.tab-item-box {
						height: 100%;

						.tab-item {
							height: 100%;
							display: inline-block;
							text-align: center;
							padding: 0 15px;
							position: relative;
							text-align: center;
							color: $uni-text-color;

							&-active {
								color: $uni-text-color-hot;
							}
						}
					}

					.underLine {
						height: 2px;
						width: 25px;
						background-color: #f01414;
						border-radius: 3px;
						transition: 0.5s;
						position: absolute;
						bottom: 0;
					}

				}
			}
		}
	}
	/* #ifdef H5 */
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}

	/deep/.uni-scroll-view {
		scrollbar-width: none;
	}
	/* #endif */
</style>
