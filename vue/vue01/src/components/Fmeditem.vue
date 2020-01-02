<template>
    <div>
        <div style="float: left">
            <el-input prefix-icon="el-icon-search" placeholder="请输入非药品收费项目编码或名称" size="mini"
                      style="width: 230px;margin-right: 60px" v-model="FmedName"></el-input>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-view" @click="searchFmeditem">
                查询非药品收费项目
            </el-button>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-edit" @click="addFmeditem">
                新增非药品收费项目
            </el-button>
        </div>

        <div class="form">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection">
                </el-table-column>
                <el-table-column
                        prop="itemcode"
                        label="项目编码"
                >
                </el-table-column>
                <el-table-column
                        prop="itemname"
                        label="项目名称">
                </el-table-column>
                <el-table-column
                        prop="recordtype"
                        :formatter="formatter"
                        label="项目类型">
                </el-table-column>
                <el-table-column
                        prop="format"
                        label="规格"
                        width="120px">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="单价"
                        width="120px">
                </el-table-column>
                <el-table-column
                        prop="expname"
                        label="费用科目">
                </el-table-column>
                <el-table-column
                        prop="deptname"
                        label="执行科室">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
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
            <!--新增非药品收费项目-->
            <el-dialog
                    title="新增非药品收费项目"
                    :visible.sync="dialogVisible"
                    width="50%"
                    center
                    @close="clear">
                <div style="margin-left: 50px">
                    项目编码:
                    <el-input v-model="addFmeditems.itemcode" placeholder="项目编码" size="mini" style="width: 150px; margin:0px 20px 0px 30px;"></el-input>
                    项目名称：
                    <el-input v-model="addFmeditems.itemname" placeholder="项目名称" size="mini"
                              style="width: 150px; margin:0px 50px 0px 22px;"></el-input>
                </div>
                <div style="margin-left: 50px">
                    规格:
                    <el-input v-model="addFmeditems.format" placeholder="规格" size="mini" style="width: 150px; margin:10px 20px 0px 57px;"></el-input>
                    单价：
                    <el-input v-model="addFmeditems.price" placeholder="单价" size="mini"
                               style="width: 150px; margin:10px 50px 0px 50px;"></el-input>
                </div>
                <div style="margin-left: 50px">
                    费用分类：
                    <el-select v-model="addFmeditems.expclassid" placeholder="费用分类" size="mini" class="selectSche" style="width: 150px; margin:10px 50px 0px 20px;">
                        <el-option
                                v-for="item in expenseList"
                                :key="item.id"
                                :label="item.expname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <div style="margin-left: -30px; width: 300px;display: inline-block" >执行科室：
                    <el-select v-model="addFmeditems.deptid" placeholder="执行科室" size="mini" class="selectSche" style="width: 150px; margin:10px 50px 0px 25px;">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.deptname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    </div>
                </div>
                <div style="margin-left: 50px">
                    项目类型：
                    <el-select v-model="addFmeditems.recordtype" placeholder="项目类型" size="mini" class="selectSche" style="width: 150px; margin:10px 50px 0px 20px;">
                        <el-option
                                v-for="item in recordtypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <div style="margin-left: -30px; width: 300px;display: inline-block" >
                        拼音助记码：
                        <el-input v-model="addFmeditems.mnemoniccode" placeholder="拼音助记码" size="mini"
                                   style="width: 150px; margin:10px 50px 0px 10px;"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" type="warning" size="mini">取 消</el-button>
                <el-button type="primary" @click="addBtn" size="mini">保存</el-button>
              </span>
            </el-dialog>

            <!--修改非药品收费项目-->
            <el-dialog
                    title="修改非药品收费项目"
                    :visible.sync="dialogVisible2"
                    width="50%"
                    center>
                <div style="margin-left: 50px">
                    项目编码:
                    <el-input v-model="updateFmeditems.itemcode" placeholder="项目编码" size="mini" style="width: 150px; margin:0px 20px 0px 30px;"></el-input>
                    项目名称：
                    <el-input v-model="updateFmeditems.itemname" placeholder="项目名称" size="mini"
                              style="width: 150px; margin:0px 50px 0px 22px;"></el-input>
                </div>
                <div style="margin-left: 50px">
                    规格:
                    <el-input v-model="updateFmeditems.format" placeholder="规格" size="mini" style="width: 150px; margin:10px 20px 0px 57px;"></el-input>
                    单价：
                    <el-input v-model="updateFmeditems.price" placeholder="单价" size="mini"
                              style="width: 150px; margin:10px 50px 0px 50px;"></el-input>
                </div>
                <div style="margin-left: 50px">
                    费用分类：
                    <el-select v-model="updateFmeditems.expclassid" placeholder="费用分类" size="mini" class="selectSche" style="width: 150px; margin:10px 50px 0px 20px;">
                        <el-option
                                v-for="item in expenseList"
                                :key="item.id"
                                :label="item.expname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <div style="margin-left: -30px; width: 300px;display: inline-block" >执行科室：
                        <el-select v-model="updateFmeditems.deptid" placeholder="执行科室" size="mini" class="selectSche" style="width: 150px; margin:10px 50px 0px 25px;">
                            <el-option
                                    v-for="item in deptList"
                                    :key="item.id"
                                    :label="item.deptname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="margin-left: 50px">
                    项目类型：
                    <el-select v-model="updateFmeditems.recordtype" placeholder="项目类型" size="mini" class="selectSche" style="width: 150px; margin:10px 50px 0px 20px;">
                        <el-option
                                v-for="item in recordtypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <div style="margin-left: -30px; width: 300px;display: inline-block" >
                        拼音助记码：
                        <el-input v-model="updateFmeditems.mnemoniccode" placeholder="拼音助记码" size="mini"
                                  style="width: 150px; margin:10px 50px 0px 10px;"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false" type="warning" size="mini">取 消</el-button>
                <el-button type="primary" @click="updateBtn" size="mini">保存</el-button>
              </span>
            </el-dialog>

            <!--分页-->
            <el-pagination
                     background
                    :page-size="pageSize"
                    :page-count="pageNum"
                    @current-change="currentchange"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
            <el-button type="danger" size="small" style="margin-top: 8px;" :disabled="delManyEabled" @click="doDelMany">批量删除</el-button>
    </div>
</template>

<script>
    export default {
        name: "Fmeditem",
        data(){
            return{
                tableData:[],
                FmedName:'',
                loading:true,
                pageNum:1,
                pageSize:10,
                total:1,
                dialogVisible:false,
                dialogVisible2:false,
                deptList:[],
                expenseList:[],
                recordtypeList:[
                    {"id":1,"name":"检查"},
                    {"id":2,"name":"检验"},
                    {"id":3,"name":"处置"}
                ],
                addFmeditems:{
                    id:'',
                    itemcode:'',
                    itemname:'',
                    format:'',
                    price:'',
                    expclassid:'',
                    expname:'',
                    deptname:'',
                    deptid:'',
                    mnemoniccode:'',
                    recordtype:'',
                },
                updateFmeditems:{
                    id:'',
                    itemcode:'',
                    itemname:'',
                    format:'',
                    price:'',
                    expclassid:'',
                    expname:'',
                    deptname:'',
                    deptid:'',
                    mnemoniccode:'',
                    recordtype:'',
                },
                delManyEabled:true,
                delIds:[],
            }
        },
        methods:{
            /*批量删除*/
            doDelMany() {
                this.$confirm('此操作将永久删除所选记录, 是否继续?', '批量删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postRequest('/fmeditem/delManyfmeditem',this.delIds).then(resp => {
                        if (resp) {
                            this. searchFmeditem();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*多选框监听,回调函数*/
            handleSelectionChange(data){
                if (data.length>0){
                    this.delManyEabled=false;
                    this.delIds='';
                    for (let i in data){
                        this.delIds+='ids='+data[i].id+'&'
                        // console.log(this.delIds)
                    }
                }else{
                    this.delManyEabled=true;
                }
            },
            /*删除*/
            handleDelete(row){
                this.$confirm('此操作将永久删除该常数项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postRequest('/fmeditem/delfmeditem?id='+row.id).then(resp=>{
                        if(resp){
                            this. searchFmeditem();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*关闭内容消失*/
            clear(){
                this.addFmeditems.itemcode='';
                this.addFmeditems.itemname='';
                this.addFmeditems.format='';
                this.addFmeditems.price='';
                this.addFmeditems.expclassid='';
                this.addFmeditems.expname='';
                this.addFmeditems.deptname='';
                this.addFmeditems.deptid='';
                this.addFmeditems.mnemoniccode='';
                this.addFmeditems.recordtype='';
            },
            /*修改保存*/
            updateBtn(){
                this.postRequest("/fmeditem/updfmeditem",this.updateFmeditems).then(resp=>{
                    if (resp){
                        this.dialogVisible2=false;
                        this. searchFmeditem();
                    }
                })
            },
            /*点击编辑弹出修改框*/
            handleEdit(row){
                this.dialogVisible2=true;
                this.updateFmeditems.id=row.id;
                this.updateFmeditems.itemcode=row.itemcode;
                this.updateFmeditems.itemname=row.itemname;
                this.updateFmeditems.format=row.format;
                this.updateFmeditems.price=row.price;
                this.updateFmeditems.expclassid=row.expclassid;
                this.updateFmeditems.expname=row.expname;
                this.updateFmeditems.deptname=row.deptname;
                this.updateFmeditems.deptid=row.deptid;
                this.updateFmeditems.mnemoniccode=row.mnemoniccode;
                this.updateFmeditems.recordtype=row.recordtype;
            },
            /*将数字边城汉字*/
            formatter(row,column){
                for (let i = 0; i <this.recordtypeList.length ; i++) {
                    if (this.recordtypeList[i].id==row.recordtype){
                        return this.recordtypeList[i].name;
                    }
                }
            },
            /*保存新增*/
            addBtn(){
                this.putRequest("/fmeditem/addfmeditem",this.addFmeditems).then(resp=>{
                    if (resp){
                        this.searchFmeditem();
                        this.dialogVisible=false;
                    }
                })
            },
            /*查询费用科目*/
            serchFme(){
                this.getRequest("/expenseclass/searchexpenseclass").then(resp=>{
                    if (resp){
                      /*  console.log(resp)*/
                        this.expenseList=resp;
                    }
                })
            },
            /*查询科室*/
            serchDept() {
                this.getRequest("/dept/getAllDept").then(resp => {
                    if (resp) {
                        this.deptList = resp
                    }
                })
            },
            /*新增按钮*/
            addFmeditem(){
                this.dialogVisible=true;
            },
            /*分页回调*/
            currentchange(num){
                this.pageNum=num;
                this. searchFmeditem();
            },
            /*查询所有非药品收费项目管理*/
            searchFmeditem(){
                this.getRequest("/fmeditem/searchAllFmeditem?keyword="+this.FmedName+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(resp=>{
                    if (resp){
                        this.tableData=resp.list;
                        this.total=resp.total;
                        this.loading = false;
                        this.FmedName='';
                    }
                })
            }
        },
        mounted() {
            this.searchFmeditem();
            this.serchDept();
            this.serchFme();
        }
    }
</script>

<style scoped>
    .selectSche {
        width: 150px;
        margin-top: 10px;
    }
    .form{

    }
</style>