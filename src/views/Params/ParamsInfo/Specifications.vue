<template>
	<div class="params">
		<!-- 1. 目录位置 -->
		<div class="nav">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/params' }">
					规格参数
				</el-breadcrumb-item>
				<el-breadcrumb-item>规格包装</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 2. 搜索框 -->
		<div class="header">
			<el-input v-model="inp" placeholder="模糊搜索" />
			<el-button type="primary" @click="paramsSearch">搜索</el-button>
			<el-button type="primary" @click="showParams">添加</el-button>
		</div>

		<!-- 3. 表格 -->
		<el-table
			:data="tableData"
			class="my-table"
			ref="multipleTable"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column
				prop="itemCatId"
				label="规格参数ID"
				width="120"
			></el-table-column>
			<el-table-column prop="id" label="类目ID" width="120"></el-table-column>
			<el-table-column
				prop="specsName"
				label="规格名称"
				width="120"
			></el-table-column>
			<el-table-column
				prop="paramData"
				label="规格参数"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="mini">查看</el-button>
					<el-button type="primary" size="mini" icon="el-icon-edit">
						编辑
					</el-button>
					<el-button
						size="mini"
						type="danger"
						icon="el-icon-delete"
						@click="handleDelete(scope.$index, scope.row)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 批量删除 -->
		<div class="bottom">
			<el-button type="primary" size="small" @click="batchDelete">
				批量删除
			</el-button>
		</div>
		<!-- 4. 分页 -->
		<MyPagination
			:total="total"
			:pageSize="pageSize"
			@changePage="changePage"
		/>
		<!-- 5. 弹框 -->
		<ParamsDialog ref="dialog" />
	</div>
</template>

<script>
import MyPagination from '../../../components/MyPagination.vue'
import ParamsDialog from './ParamsDialog.vue'
export default {
	components: {
		MyPagination,
		ParamsDialog,
	},
	data() {
		return {
			inp: '', //输入框
			tableData: [],
			total: 10,
			pageSize: 1,
			multipleSelection: [],
		}
	},
	methods: {
		/**
		 * 规格参数删除
		 */
		handleDelete(index, row) {
			console.log(index, row)
			this.$api.paramsDelete({ id: row.id }).then(res => {
				if (res.data.status === 200) {
					this.$message({
						type: 'success',
						message: '删除成功!',
					})
					// 更新列表
					this.http(1)
				}
			})
		},
		/**
		 * 规格参数模糊搜索
		 */
		paramsSearch() {
			this.$api.paramsSearch({ search: this.inp }).then(res => {
				if (res.data.status === 200) {
					this.tableData = res.data.result
					this.total = res.data.result.length
				}
			})
		},
		/**
		 * 批量删除规格参数
		 */
		batchDelete() {
			let batchArr = []
			this.multipleSelection.forEach(ele => {
				batchArr.push(ele.id)
			})
			this.$api.paramsBatchDelete({ idArr: batchArr }).then(res => {
				if (res.data.status === 200) {
					this.$message({
						type: 'success',
						message: '删除成功!',
					})
					// 更新列表
					this.http(1)
				}
			})
		},
		/**
		 * 多选
		 */
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		/**
		 * 点击显示弹框--配置规格参数
		 */
		showParams() {
			this.$refs.dialog.dialogVisible = true
		},
		/**
		 * 点击分页-切换
		 */
		changePage(num) {
			this.http(num)
		},
		/**
		 * 获取规格参数列表
		 */
		http(page) {
			this.$api.getParams({ page }).then(res => {
				console.log(res.data)
				if (res.data.status === 200) {
					this.tableData = res.data.data
					//获取分页
					this.total = res.data.total
					this.pageSize = res.data.pageSize
				}
			})
		},
	},
	created() {
		this.http(1)
	},
}
</script>

<style lang="less" scoped>
.params {
	margin: 10px;
}
.nav {
	padding: 10px;
}
.header {
	display: flex;
	background: #fff;
	padding: 10px;
	border: 1px solid #eee;
	button {
		margin-left: 20px;
	}
}
.my-table {
	margin: 10px auto;
}
</style>
