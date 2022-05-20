<template>
	<div class="home">
		<div class="header">
			<div class="item" v-for="item in totalData" :key="item.id">
				{{ item.title }}
				<div class="num">{{ item.total }}</div>
				<div class="bottom">今日销售额: {{ item.current }}</div>
			</div>
		</div>

		<div class="content">
			<div class="time-info">
				<div
					id="charts"
					style="width: 100%; height: 100%"
					v-on-echart-resize
				></div>
			</div>
			<div class="area">
				<div
					id="charts1"
					style="width: 100%; height: 100%"
					v-on-echart-resize
				></div>
			</div>
		</div>

		<div class="content content2">
			<div class="time-info">
				<div
					id="charts2"
					style="width: 100%; height: 100%"
					v-on-echart-resize
				></div>
			</div>
			<div class="area">
				<div
					id="charts3"
					style="width: 100%; height: 100%"
					v-on-echart-resize
				></div>
			</div>
		</div>
		<div class="content content3">
			<div class="time-info">
				<div
					id="charts4"
					style="width: 100%; height: 100%"
					v-on-echart-resize
				></div>
			</div>
		</div>
		<div class="home-footer">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>最新内容</span>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ '列表内容 ' + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>新增产品</span>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{ '列表内容 ' + o }}
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>快捷入口</span>
				</div>
				<div class="text item">
					<el-button type="primary">产品管理</el-button>
					<el-button>消息管理</el-button>
					<el-button>内容管理</el-button>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	data() {
		return {
			totalData: [],
		}
	},
	mounted() {
		/**
		 * echarts
		 */
		//进度
		//销售数据量
		this.$api.getStatistical().then(res => {
			//totalData
			if (res.data.status === 200) {
				this.totalData = res.data.list
			}
		})
		//--销售比----------------------
		this.$api.getSellTotal().then(res => {
			//获取x轴数据
			let xData = res.data.info.date
			//获取数据
			let xResult = res.data.info.xResult
			let titleArr = []
			let data = []

			xResult.forEach(ele => {
				titleArr.push(ele.xName)
				ele.data.forEach(item => {
					data.push(item.num)
				})
			})
			//折线
			this.gradientStacked(
				xData,
				data.slice(0, 6),
				data.slice(6, 12),
				data.slice(12, 18)
			)
			this.stackedLineChart(
				xData,
				data.slice(0, 6),
				data.slice(6, 12),
				data.slice(12, 18)
			)
		})
		this.piewithScrollableLegend()
		this.nightingaleChart()
		this.simpleEncode()
	},
	methods: {
		//折线图
		initCharts(data, data1, data2, data3) {
			let charts = echarts.init(document.getElementById('charts'))
			let option = {
				title: {
					text: '月销售额',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				legend: {
					data: ['家具', '手机', '家电'],
					left: 100,
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data,
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: '家具',
						type: 'line',
						smooth: true,
						areaStyle: {},
						emphasis: {
							focus: 'series',
						},
						data: data1,
					},
					{
						name: '手机',
						type: 'line',
						smooth: true,
						areaStyle: {},
						emphasis: {
							focus: 'series',
						},
						data: data2,
					},
					{
						name: '家电',
						type: 'line',
						smooth: true,
						areaStyle: {},
						emphasis: {
							focus: 'series',
						},
						data: data3,
					},
				],
			}
			charts.setOption(option)
		},
		gradientStacked(data, data1, data2, data3) {
			var chartDom = document.getElementById('charts')
			var myChart = echarts.init(chartDom)
			var option

			option = {
				color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
				title: {
					text: '渐变堆叠面积图',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				legend: {
					data: ['Line 1', 'Line 2', 'Line 3'],
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data,
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: 'Line 1',
						type: 'line',
						stack: 'Total',
						smooth: true,
						lineStyle: {
							width: 0,
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(128, 255, 165)',
								},
								{
									offset: 1,
									color: 'rgb(1, 191, 236)',
								},
							]),
						},
						emphasis: {
							focus: 'series',
						},
						data: data1,
					},
					{
						name: 'Line 2',
						type: 'line',
						stack: 'Total',
						smooth: true,
						lineStyle: {
							width: 0,
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(0, 221, 255)',
								},
								{
									offset: 1,
									color: 'rgb(77, 119, 255)',
								},
							]),
						},
						emphasis: {
							focus: 'series',
						},
						data: data2,
					},
					{
						name: 'Line 3',
						type: 'line',
						stack: 'Total',
						smooth: true,
						lineStyle: {
							width: 0,
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(55, 162, 255)',
								},
								{
									offset: 1,
									color: 'rgb(116, 21, 219)',
								},
							]),
						},
						emphasis: {
							focus: 'series',
						},
						data: data3,
					},
				],
			}

			option && myChart.setOption(option)
		},
		stackedLineChart(data, data1, data2, data3) {
			var chartDom = document.getElementById('charts1')
			var myChart = echarts.init(chartDom)
			var option

			option = {
				title: {
					text: '折线图堆叠',
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['家具', '手机', '家电'],
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data,
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						name: '家具',
						type: 'line',
						stack: 'Total',
						data: data1,
					},
					{
						name: '手机',
						type: 'line',
						stack: 'Total',
						data: data2,
					},
					{
						name: '家电',
						type: 'line',
						stack: 'Total',
						data: data3,
					},
				],
			}

			option && myChart.setOption(option)
		},
		piewithScrollableLegend() {
			var chartDom = document.getElementById('charts2')
			var myChart = echarts.init(chartDom)
			var option

			const data = genData(50)
			option = {
				title: {
					text: '同名数量统计',
					subtext: '纯属虚构',
					left: 'center',
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				legend: {
					type: 'scroll',
					orient: 'vertical',
					right: 10,
					top: 20,
					bottom: 20,
					data: data.legendData,
				},
				series: [
					{
						name: '姓名',
						type: 'pie',
						radius: '55%',
						center: ['40%', '50%'],
						data: data.seriesData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			}
			function genData(count) {
				// prettier-ignore
				const nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
				const legendData = []
				const seriesData = []
				for (var i = 0; i < count; i++) {
					var name =
						Math.random() > 0.65
							? makeWord(4, 1) + '·' + makeWord(3, 0)
							: makeWord(2, 1)
					legendData.push(name)
					seriesData.push({
						name: name,
						value: Math.round(Math.random() * 100000),
					})
				}
				return {
					legendData: legendData,
					seriesData: seriesData,
				}
				function makeWord(max, min) {
					const nameLen = Math.ceil(Math.random() * max + min)
					const name = []
					for (var i = 0; i < nameLen; i++) {
						name.push(nameList[Math.round(Math.random() * nameList.length - 1)])
					}
					return name.join('')
				}
			}

			option && myChart.setOption(option)
		},
		nightingaleChart() {
			var chartDom = document.getElementById('charts3')
			var myChart = echarts.init(chartDom)
			var option

			option = {
				title: {
					text: '基础南丁格尔玫瑰图',
					subtext: '数据纯属虚构',
					left: 'left',
				},
				legend: {
					top: 'bottom',
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						restore: { show: true },
						saveAsImage: { show: true },
					},
				},
				series: [
					{
						name: 'Nightingale Chart',
						type: 'pie',
						radius: [50, 250],
						center: ['50%', '50%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 8,
						},
						data: [
							{ value: 40, name: 'rose 1' },
							{ value: 38, name: 'rose 2' },
							{ value: 32, name: 'rose 3' },
							{ value: 30, name: 'rose 4' },
							{ value: 28, name: 'rose 5' },
							{ value: 26, name: 'rose 6' },
							{ value: 22, name: 'rose 7' },
							{ value: 18, name: 'rose 8' },
						],
					},
				],
			}

			option && myChart.setOption(option)
		},
		simpleEncode() {
			var chartDom = document.getElementById('charts4')
			var myChart = echarts.init(chartDom)
			var option

			option = {
				title: {
					text: '指定数据到坐标轴的映射',
					subtext: '数据纯属虚构',
					left: 'center',
				},
				dataset: {
					source: [
						['score', 'amount', 'product'],
						[89.3, 58212, 'Matcha Latte'],
						[57.1, 78254, 'Milk Tea'],
						[74.4, 41032, 'Cheese Cocoa'],
						[50.1, 12755, 'Cheese Brownie'],
						[89.7, 20145, 'Matcha Cocoa'],
						[68.1, 79146, 'Tea'],
						[19.6, 91852, 'Orange Juice'],
						[10.6, 101852, 'Lemon Juice'],
						[32.7, 20112, 'Walnut Brownie'],
					],
				},
				grid: { containLabel: true },
				xAxis: { name: 'amount' },
				yAxis: { type: 'category' },
				visualMap: {
					orient: 'horizontal',
					left: 'center',
					min: 10,
					max: 100,
					text: ['High Score', 'Low Score'],
					// Map the score column to color
					dimension: 0,
					inRange: {
						color: ['#65B581', '#FFCE34', '#FD665F'],
					},
				},
				series: [
					{
						type: 'bar',
						encode: {
							// Map the "amount" column to X axis.
							x: 'amount',
							// Map the "product" column to Y axis
							y: 'product',
						},
					},
				],
			}

			option && myChart.setOption(option)
		},
	},
}
</script>

<style lang="less" scoped>
.home {
	margin: 10px;
}
.header {
	display: flex;
	padding-right: 30px;
	.item {
		flex: 1;
		height: 100px;
		padding: 10px;
		background: #fff;
		border-radius: 10px;
		margin-left: 20px;
		margin-right: 20px;
		font-weight: bold;
		color: #fff;
		// text-align: center;
		position: relative;
		.num {
			font-size: 22px;
			margin: 10px;
			color: #fff;
		}
		.bottom {
			position: absolute;
			border-top: 1px solid rgb(246, 245, 245);
			padding: 10px 20px;
			bottom: 0;
			right: 0;
			left: 0;
			color: #fff;
			font-weight: normal;
		}
	}
	.item:nth-child(1) {
		background-image: linear-gradient(#f82003, #ce270d);
	}
	.item:nth-child(2) {
		background-image: linear-gradient(#9738f0, #7826c5);
	}
	.item:nth-child(3) {
		background-image: linear-gradient(#ec2fd3, #bd21a8);
	}
	.item:nth-child(4) {
		background-image: linear-gradient(#3ff11c, #33df10);
	}
}
.content {
	margin: 20px;
	display: flex;
	height: 400px;
	.time-info {
		flex: 2;
		background: #fff;
		margin-right: 20px;
		padding: 10px;
	}
	.area {
		flex: 1;
		background: #fff;
		padding: 10px;
	}
}
.content2 {
	height: 555px;
	.time-info {
		flex: 1.8;
	}
	.area {
		flex: 1.2;
	}
}
.content3 {
	height: 550px;
	.time-info {
		flex: 1;
	}
}
.home-footer {
	display: flex;
	padding-left: 20px;
	margin-bottom: 20px;
	.box-card {
		flex: 1;
		margin-right: 30px;
		span {
			font-weight: 600;
		}
	}
}
</style>
