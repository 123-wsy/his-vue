<template>
    <div>
        <div style="float: left">
            <el-input prefix-icon="el-icon-search" placeholder="请输入挂号级别编码或名称" size="mini"
                      style="width: 230px;margin-right: 60px" v-model="registName"></el-input>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-view" @click="searchRegistLevel">
                查询挂号级别
            </el-button>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-edit" @click="addRegistLevel">
                新增挂号级别
            </el-button>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading="loading">
                <el-table-column
                        prop="sequenceno"
                        label="显示顺序号">
                </el-table-column>
                <el-table-column
                        prop="registcode"
                        label="号别编码">
                </el-table-column>
                <el-table-column
                        prop="registname"
                        label="号别名称">
                </el-table-column>
                <el-table-column
                        prop="registfee"
                        label="挂号费">
                </el-table-column>
                <el-table-column
                        prop="registquota"
                        label="挂号限额">
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
        <!--新增挂号级别-->
        <div>
            <el-dialog
                    title="新增挂号级别"
                    :visible.sync="dialogVisible"
                    width="50%"
                    center
                    @close="clear">
                <div style="margin-left: 50px">
                    号别编码:
                    <el-input  placeholder="号别编码" size="mini" style="width: 150px; margin:0px 20px 0px 50px;" v-model="addRegist.registcode"></el-input>
                    号别名称：
                    <el-input  placeholder="号别名称" size="mini"
                              style="width: 150px; margin:0px 50px 0px 27px;" v-model="addRegist.registname"></el-input>
                </div>
                <div style="margin-left: 50px">
                    显示顺序号:
                    <el-input  placeholder="显示顺序号" size="mini" style="width: 150px; margin:10px 20px 0px 35px;" v-model="addRegist.sequenceno"></el-input>
                    挂号费：
                    <el-input  placeholder="挂号费" size="mini"
                               style="width: 150px; margin:10px 50px 0px 40px;" v-model="addRegist.registfee"></el-input>
                </div>
                <div style="margin-left: 50px">
                    挂号限额:
                    <el-input  placeholder="挂号限额" size="mini" style="width: 150px; margin:10px 20px 0px 50px;" v-model="addRegist.registquota"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini" type="warning">取 消</el-button>
    <el-button type="primary" @click="saveaddRegistLevel" size="mini">保 存</el-button>
  </span>
            </el-dialog>
        </div>
        <!--编辑弹出框-->
        <div>
            <el-dialog
                    title="修改挂号级别"
                    :visible.sync="dialogVisible2"
                    width="50%"
                    center>
                <div style="margin-left: 50px">
                    号别编码:
                    <el-input  placeholder="号别编码" size="mini" style="width: 150px; margin:0px 20px 0px 50px;" v-model="updateRegist.registcode"></el-input>
                    号别名称：
                    <el-input  placeholder="号别名称" size="mini"
                               style="width: 150px; margin:0px 50px 0px 27px;" v-model="updateRegist.registname"></el-input>
                </div>
                <div style="margin-left: 50px">
                    显示顺序号:
                    <el-input  placeholder="显示顺序号" size="mini" style="width: 150px; margin:10px 20px 0px 35px;" v-model="updateRegist.sequenceno"></el-input>
                    挂号费：
                    <el-input  placeholder="挂号费" size="mini"
                               style="width: 150px; margin:10px 50px 0px 40px;" v-model="updateRegist.registfee"></el-input>
                </div>
                <div style="margin-left: 50px">
                    挂号限额:
                    <el-input  placeholder="挂号限额" size="mini" style="width: 150px; margin:10px 20px 0px 50px;" v-model="updateRegist.registquota"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false" size="mini" type="warning">取 消</el-button>
    <el-button type="primary" @click="saveRegistLevel" size="mini">保 存</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Registlevel",
        data(){
            return{
                loading: true,
                tableData:[],
                registName:'',
                dialogVisible:false,
                dialogVisible2:false,
                addRegist:{
                    id:'',
                    registcode:"",
                    registname:"",
                    sequenceno:"",
                    registfee:"",
                    registquota:"",
                    delmark:1
                },
                updateRegist:{
                    id:'',
                    registcode:"",
                    registname:"",
                    sequenceno:"",
                    registfee:"",
                    registquota:"",

                }
            }
        },
        mounted(){
            this.searchRegistLevel();
        },
        methods:{
            /*清空新增内容*/
            clear(){
                this.addRegist.id='';
                this.addRegist.registcode='';
                this.addRegist.registname='';
                this.addRegist.sequenceno='';
                this.addRegist.registfee='';
                this.addRegist.registquota='';
            },
            /*删除级别*/
            handleDelete(row){
                this.$confirm('此操作将永久删除该挂号级别, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/RegistLevel/delRegistLevel?id='+row.id).then(resp=>{
                        if(resp){
                            this.searchRegistLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*保存编辑*/
            saveRegistLevel(){
               this.putRequest("/RegistLevel/updateRegistLevel/",this.updateRegist).then(resp=>{
                   if (resp){
                       this.searchRegistLevel();
                       this.dialogVisible2=false;
                   }
               })
            },
            /*编辑*/
            handleEdit(row){
             this.dialogVisible2=true;
             this.updateRegist.id=row.id;
             this.updateRegist.registcode=row.registcode;
             this.updateRegist.registname=row.registname;
             this.updateRegist.sequenceno=row.sequenceno;
             this.updateRegist.registfee=row.registfee;
             this.updateRegist.registquota=row.registquota;
            },
            /*保存新增信息*/
            saveaddRegistLevel(){
              this.postRequest("/RegistLevel/addsaveRegistLevel",this.addRegist).then(resp=>{
                  if (resp){
                      console.log(resp)
                      this.searchRegistLevel();
                  }
              })
            },
            /*点击新增挂号级别*/
            addRegistLevel(){
                this.dialogVisible=true;
            },
            /*查询挂号级别*/
            searchRegistLevel(){
                this.getRequest("/RegistLevel/searchRegByKeyWords?keywords="+this.registName).then(resp=>{
                    if (resp){
                        this.loading=false;
                        this.tableData = resp;
                        this.registName='';
                        this.dialogVisible=false;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>