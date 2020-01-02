<template>
    <div>
        <div>
            <el-input class="input" v-model="keyword1" size="mini" placeholder="请输入疾病分类编码或名称"></el-input>
            <el-button size="mini" class="el-icon-view" type="primary" @click="getDiseCategory">查询疾病分类</el-button>
            <el-button size="mini" class="el-icon-edit" type="primary" @click="addDiseCategory">新增疾病分类</el-button>
            <el-button size="mini" class="el-icon-edit" type="primary" @click="getDisease">疾病管理</el-button>
        </div>
        <div>
            <el-table
                    v-loading="loading"
                    :row-key="getRowKeys"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        :reserve-selection="true"
                >
                </el-table-column>
                <el-table-column
                        prop="sequenceno"
                        label="显示顺序号"
                >
                </el-table-column>
                <el-table-column
                        prop="dicacode"
                        label="分类编码"
                >
                </el-table-column>
                <el-table-column
                        prop="dicaname"
                        label="分类名称"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog
                    title="新增疾病分类"
                    :visible.sync="dialogVisible"
                    width="40%"
                    @close="handleClose"
                    center>
                <div>
                    疾病分类编码:
                    <el-input class="input1" v-model="dicacode" size="mini" placeholder="疾病分类编码"></el-input>
                    疾病分类名称:
                    <el-input class="input1" v-model="dicaname" size="mini" placeholder="疾病分类名称"></el-input>
                    显示顺序号:
                    <el-input style="margin-left: 38px" class="input1" v-model="sequenceno" size="mini"
                              placeholder="显示顺序号"></el-input>
                    疾病类型:
                    <el-select style="margin-left: 52px" class="input1" size="mini" v-model="dicatype"
                               placeholder="请选择">
                        <el-option
                                v-for="item in dicatypes"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="insertDiseCategory">确 定</el-button>
                  </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                    title="疾病列表"
                    :visible.sync="dialogVisible2"
                    width="80%"
                    @close="handleClose2"
                    center>
                <div class="form">
                    <el-input class="input" v-model="keyword2" size="mini" placeholder="请输入疾病编码或名称"></el-input>
                    <el-button size="mini" class="el-icon-view" type="primary" @click="getDisease">查询疾病</el-button>
                    <el-button size="mini" class="el-icon-edit" type="primary" @click="addDisease">新增疾病</el-button>
                    <el-table
                            v-loading="loading"
                            :row-key="getRowKeys"
                            ref="multipleTable"
                            :data="tableData2"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                :reserve-selection="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="diseasecode"
                                label="疾病编码"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="diseasename"
                                label="疾病名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="diseaseicd"
                                label="国际ICD编码"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="disecategoryid"
                                label="疾病所属分类"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        type="primary"
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">编辑
                                </el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <el-button :disabled="disabled" size="mini" class="el-icon-edit" type="danger"
                               @click="delDiseCategorys2">批量删除
                    </el-button>
                    <el-pagination
                            style="width:500px;display: inline-block"
                            background
                            layout="prev, pager, next"
                            :page-size="pageSize2"
                            :page-count="pageNum2"
                            @current-change="change2"
                            :total="total2">
                    </el-pagination>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="handleClose2">取 消</el-button>
                    <el-button type="primary" @click="insertDiseCategory">确 定</el-button>
                  </span>
            </el-dialog>

            <el-dialog
                    title="新增疾病"
                    :visible.sync="dialogVisible3"
                    width="36%"
                    @close="handleClose3"
                    center>
                <div>
                    <div>
                        疾病编码:
                        <el-input style="width: 120px;margin:0 10px 10px 24px" v-model="diseasecode" size="mini"
                                  placeholder="疾病分类编码"></el-input>
                        疾病名称:
                        <el-input style="width: 120px;margin:0 10px 0 18px" v-model="diseasename" size="mini"
                                  placeholder="疾病分类名称"></el-input>
                    </div>
                    <div>
                        国际ICD编码:
                        <el-input style="width: 120px;" v-model="diseaseicd" size="mini" placeholder="显示顺序号"></el-input>
                        疾病所属分类:
                        <el-select style="width: 120px;" size="mini" v-model="disecategoryid" placeholder="请选择">
                            <el-option
                                    v-for="item in disecategoryids"
                                    :key="item.id"
                                    :label="item.dicaname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="handleClose3">取 消</el-button>
                    <el-button type="primary" @click="insertDisease">确 定</el-button>
                  </span>
            </el-dialog>
        </div>
        <div class="page">
            <el-button :disabled="disabled" size="mini" class="el-icon-edit" type="danger" @click="delDiseCategorys">
                批量删除
            </el-button>
            <el-pagination
                    style="width:500px;display: inline-block"
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :page-count="pageNum"
                    @current-change="change"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DiseCategory",
        data() {
            return {
                loading: true,
                keyword1: '',
                tableData: [],
                pageSize: 10,
                pageNum: 1,
                total: 0,
                disabled: true,
                delids: '',
                dialogVisible: false,
                dicaname: '',
                dicacode: '',
                sequenceno: '',
                dicatype: '',
                dicatypes: [
                    1,
                    2,
                ],
                dialogVisible2: false,
                keyword2: '',
                tableData2: [],
                pageSize2: 10,
                pageNum2: 1,
                total2: 0,
                dialogVisible3: false,
                disecategoryids: [],
                disecategoryid: '',
                diseasecode: '',
                diseasename: '',
                diseaseicd: '',

            }
        },
        mounted() {
            this.getDiseCategory();
        },
        methods: {
            delDiseCategorys2(){

            },
            handleDelete(row){
                this.$confirm('此操作将永久删除分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/DiseCategory/deleteByPrimaryKey/'+row.id).then(resp=>{
                        this.getDiseCategory();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            insertDisease(){
                let DiseaseInfo={
                    diseasecode:this.diseasecode,
                    diseasename:this.diseasename,
                    diseaseicd:this.diseaseicd,
                    disecategoryid:this.disecategoryid,
                }
                this.postRequest('/Disease/insertSelective',DiseaseInfo).then(resp=>{

                })
            },
            handleClose3() {
                this.diseasecode = '',
                this.diseasename = '',
                this.diseaseicd = '',
                this.disecategoryid='',
                this.dialogVisible3 = false;
            },
            addDisease() {
                this.dialogVisible3 = true;
                this.getRequest('/DiseCategory/getDiseCategorys').then(resp => {
                    this.disecategoryids = resp;
                })
            },
            handleClose2() {
                this.keyword2 = '';
                this.dialogVisible2 = false;
            },
            change2(data) {
                this.pageNum2 = data;
                this.getDisease();
            },
            getDisease() {
                this.dialogVisible2 = true;
                this.getRequest('/Disease/getDisease?keyword=' + this.keyword2 + '&pageSize=' + this.pageSize2 + '&pageNum=' + this.pageNum2).then(resp => {
                    this.tableData2 = resp.list;
                    this.total2 = resp.total;
                    this.loading = false;
                })
            },
            /*数据库插入*/
            insertDiseCategory() {
                let DiseInfo = {
                    dicaname: this.dicaname,
                    dicacode: this.dicacode,
                    sequenceno: this.sequenceno,
                    dicatype: this.dicatype,
                }
                this.postRequest('/DiseCategory/insertSelective', DiseInfo).then(resp => {
                })
                this.dialogVisible = false;
            },
            /*关闭对话框*/
            handleClose() {
                this.dicaname = '';
                this.dicacode = '';
                this.sequenceno = '';
                this.dialogVisible = false
            },
            /*多删*/
            delDiseCategorys() {
                this.$confirm('此操作将永久删除分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/DiseCategory/deleteByPrimaryKeyS?' + this.delids).then(resp=>{
                        this.getDiseCategory();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*表格回调函数*/
            handleSelectionChange(val) {
                if (val.length > 0) {
                    this.disabled = false;
                    this.delids = '';
                    for (let i in val) {
                        this.delids += 'ids=' + val[i].id + '&';
                    }
                } else {
                    this.disabled = true;
                }
            },
            addDiseCategory() {
                this.dialogVisible = true;
                this.getRequest('/DiseCategory/getLastId').then(resp => {
                    this.sequenceno = resp.sequenceno + 1;
                })
            },
            change(data) {
                this.pageNum = data;
                this.getDiseCategory();
            },
            getDiseCategory() {
                this.getRequest('/DiseCategory/getDiseCategory?keyword=' + this.keyword1 + '&pageSize=' + this.pageSize + '&pageNum=' + this.pageNum).then(resp => {
                    this.tableData = resp.list;
                    this.total = resp.total;
                    this.loading = false;
                })
            },
            //翻页打钩记录
            getRowKeys(row) {
                return row.id
            }
        }
    }
</script>

<style scoped>
    .input {
        width: 200px;
        margin-right: 20px;
    }

    .input1 {
        width: 120px;
        margin: 10px 24px;
    }

    .page {
        margin-top: 10px;
    }

    .form {
        text-align: center;
    }
</style>