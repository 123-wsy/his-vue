<template>
    <div>
        <div>
            <el-input class="inputarea" important placeholder="请输入部门名称" size="mini" v-model="deptname"></el-input>
            <el-button type="primary" size="mini" class="el-icon-view" @click="serchColHandler"> 查询科室</el-button>
            <el-button type="primary" size="mini" class="el-icon-edit" @click="addColHandler"> 新增科室</el-button>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="科室编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="deptname"
                        label="科室名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="deptname"
                        label="科室分类">
                </el-table-column>
                <el-table-column
                        prop="depttype"
                        label="科室类型">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="dialogVisible = true">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dept",
        data() {
            return {
                tableData: [],
                deptname:"",
                dialogVisible: false,
            }
        },
        mounted() {
            this.initDept();
        },
        methods: {
            /*点击编辑跳转*/
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },

            handleDelete(index,row) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.delRequest('/dept/'+row.id).then(resp => {
                        this.initDept();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initDept() {
                this.getRequest('/dept/deptInfos').then(resp => {
                    this.tableData = resp;
                })
            },
            serchColHandler() {
                    this.getRequest('/dept/getDept?deptname='+this.deptname).then(resp=>{
                        console.log(resp)
                        this.tableData = resp;
                    })
            },
            addColHandler() {

            },

        }
    }
</script>

<style scoped>
    .inputarea {
        width: 230px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>