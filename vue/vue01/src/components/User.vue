<template>
    <div>
        <div style="float: left">
            <el-input prefix-icon="el-icon-search" placeholder="请输入登录名或用户姓名" size="mini" v-model="userNames"
                      style="width: 230px;margin-right: 60px"></el-input>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-view" @click="searchUser">
                查询用户
            </el-button>
            <el-button size="mini" type="primary" style="margin-right: 60px" class="el-icon-edit" @click="addNewUser">
                新增用户
            </el-button>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading="loading">
                <el-table-column
                        prop="username"
                        label="登录名">
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="真实姓名">
                </el-table-column>
                <el-table-column
                        prop="usetype"
                        label="用户类别"
                        :formatter="formatter">
                </el-table-column>
                <el-table-column
                        prop="constantname"
                        label="医生职称">
                </el-table-column>
                <el-table-column
                        prop="deptname"
                        label="所在科室">
                </el-table-column>
                <el-table-column
                        prop="registname"
                        label="挂号级别">
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
            <!--新增用户-->
            <el-dialog
                    title="新增用户"
                    :visible.sync="dialogVisible"
                    width="50%"
                    center
            @close="clear">
                    <div>
                        登录名:
                        <el-input v-model="addUsers.username" placeholder="登录名" size="mini" style="width: 150px; margin:0px 20px 0px 50px;"></el-input>
                        密码：
                        <el-input v-model="addUsers.password" placeholder="密码" size="mini"
                                  style="width: 150px; margin:0px 50px 0px 27px;"></el-input>
                    </div>
                    <div>
                        真实姓名:<el-input
                            placeholder="真实姓名"
                            v-model="addUsers.realname" size="mini" style="width: 150px; margin:10px 20px 0px 40px;"
                            clearable>
                    </el-input>
                        所在科室：
                        <el-select v-model="addUsers.deptid" placeholder="请选择" size="mini" class="selectSche">
                            <el-option
                                    v-for="item in deptList"
                                    :key="item.id"
                                    :label="item.deptname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        用户类别：
                        <el-select v-model="addUsers.usetype" placeholder="请选择" size="mini" style="width: 150px; margin:10px 20px 0px 25px;">
                            <el-option
                                    v-for="item in usertypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                        医生职称：
                        <el-select v-model="addUsers.doctitleid" placeholder="请选择" size="mini" style="width: 150px;">
                            <el-option
                                    v-for="item in constantnameList"
                                    :key="item.id"
                                    :label="item.constantName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>

                <div>
                    挂号级别：
                    <el-select v-model="addUsers.registleid" placeholder="请选择" size="mini" style="width: 150px; margin:10px 20px 0px 25px;">
                        <el-option
                                v-for="item in registLevelList"
                                :key="item.id"
                                :label="item.registname"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    是否参与排班:<template>
                        <el-radio v-model="addUsers.isscheduling" label="是" style="margin:10px 20px 0px 25px;">是</el-radio>
                        <el-radio v-model="addUsers.isscheduling" label="否">否</el-radio>
                    </template>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBtn">保存</el-button>
                <el-button @click="clean">清空</el-button>
              </span>
            </el-dialog>

            <!--编辑用户-->
            <el-dialog
                    title="修改用户"
                    :visible.sync="dialogVisible2"
                    width="50%"
                    center
                    @close="clear1">
                <div>
                    登录名:
                    <el-input v-model="updateUsers.username" placeholder="登录名" size="mini" style="width: 150px; margin:0px 20px 0px 50px;"></el-input>
                    密码：
                    <el-input v-model="updateUsers.password" placeholder="密码" size="mini"
                              style="width: 150px; margin:0px 50px 0px 27px;"></el-input>
                </div>
                <div>
                    真实姓名:<el-input
                        placeholder="真实姓名"
                        v-model="updateUsers.realname" size="mini" style="width: 150px; margin:10px 20px 0px 40px;"
                        clearable>
                </el-input>
                    所在科室：
                    <el-select v-model="updateUsers.deptid" placeholder="所在科室" size="mini" class="selectSche">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.deptname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    用户类别：
                    <el-select v-model="updateUsers.usetype" placeholder="用户类别" size="mini" style="width: 150px; margin:10px 20px 0px 25px;">
                        <el-option
                                v-for="item in usertypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    医生职称：
                    <el-select v-model="updateUsers.doctitleid" placeholder="请选择" size="mini" style="width: 150px;">
                        <el-option
                                v-for="item in constantnameList"
                                :key="item.id"
                                :label="item.constantName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <div>
                    挂号级别：
                    <el-select v-model="updateUsers.registleid" placeholder="请选择" size="mini" style="width: 150px; margin:10px 20px 0px 25px;">
                        <el-option
                                v-for="item in registLevelList"
                                :key="item.id"
                                :label="item.registname"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    是否参与排班:<template>
                    <el-radio v-model="updateUsers.isscheduling" label="是" style="margin:10px 20px 0px 25px;">是</el-radio>
                    <el-radio v-model="updateUsers.isscheduling" label="否">否</el-radio>
                </template>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateBtn">保存</el-button>
                <el-button @click="updateclean">清空</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                tableData: [],
                userNames: '',
                loading: true,
                dialogVisible: false,
                dialogVisible2:false,
                deptList:[],
                registLevelList:[],
                constantnameList:[],
                usertypeList:[
                    {"id":1,"name":"医院管理员"},
                    {"id":2,"name":"挂号收费员"},
                    {"id":3,"name":"门诊医生"},
                    {"id":4,"name":"医技医生"},
                    {"id":5,"name":"药房操作员"},
                    {"id":6,"name":"财务管理员"},
                ],
                addUsers:{
                    id:'',
                    username:'',
                    password:'',
                    realname: '',
                    usetype:'',
                    deptid:'',
                    isscheduling:'是',
                    doctitleid:'',
                    registleid:'',
                    deptname:'',
                    constantName:'',
                    registname:'',
                },
                updateUsers:{
                    id:'',
                    username:'',
                    password:'',
                    realname: '',
                    usetype:'',
                    isscheduling:'是',
                    doctitleid:'',
                    registleid:'',
                    deptid:'',
                    deptname:'',
                    constantName:'',
                    registname:'',
                },
            }
        },
        methods: {
            /*将数字变成汉字展示*/
            formatter(row,column){
                for (let i = 0; i <this.usertypeList.length ; i++) {
                    if (this.usertypeList[i].id==row.usetype){
                        return this.usertypeList[i].name;
                    }

                }
            },
            /*删除用户*/
            handleDelete(row){
                this.$confirm('此操作将永久删除该常数项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/user/delUserById?id='+row.id).then(resp=>{
                        if(resp){
                            this.searchUser();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*点编辑框修改用户*/
            updateBtn(){
                this.putRequest("/user/updateUserById",this.updateUsers).then(resp=>{
                    if (resp){
                        this.searchUser();
                        this.dialogVisible2=false;
                    }
                })
            },
            /*编辑用户出现弹框*/
            handleEdit(row){
                console.log(row)
                this.updateUsers.id=row.id;
                this.updateUsers.deptid=row.deptid;
                this.updateUsers.doctitleid=row.doctitleid;
                this.updateUsers.registleid=row.registleid;
                this.updateUsers.usetype=row.usetype;
                this.updateUsers.username=row.username;
                this.updateUsers.password=row.password;
                this.updateUsers.realname=row.realname;
                this.dialogVisible2=true;

            },
            /*编辑框关闭内容清空*/
            clear1(){
                this.updateUsers.deptid='';
                this.updateUsers.doctitleid='';
                this.updateUsers.registleid='';
                this.updateUsers.usetype='';
                this.updateUsers.username='';
                this.updateUsers.password='';
                this.updateUsers.realname='';
            },
            /*编辑用户清空*/
            updateclean(){
                this.updateUsers.deptid='';
                this.updateUsers.doctitleid='';
                this.updateUsers.registleid='';
            },
            /*新增用户*/
            addBtn(){
                this.postRequest("/user/addUsers",this.addUsers).then(resp=>{
                    if (resp){
                     this.searchUser();
                     this.dialogVisible = false;
                    }
                })

            },
            /*关闭内容消失*/
            clear(){
                this.addUsers.deptid='';
                this.addUsers.doctitleid='';
                this.addUsers.registleid='';
                this.addUsers.username='';
                this.addUsers.password='';
                this.addUsers.realname='';
                this.addUsers.usetype='';
            },
            /*清空*/
            clean(){
                this.addUsers.deptid='';
                this.addUsers.doctitleid='';
                this.addUsers.registleid='';
            },
            /*查询医生职称*/
            serchconstantnameList(){
                this.getRequest("/constanttype/serchconstantname").then(resp=>{
                    if (resp){
                     /*   console.log(resp)*/
                        this.constantnameList=resp
                    }
                })
            },
            /*查询挂号级别*/
            serchRegistLevel() {
                this.getRequest("/RegistLevel/allsaveRegistLevel").then(resp => {
                    if (resp) {
                        this.registLevelList = resp
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
            /*新增用户弹框*/
            addNewUser() {
                this.dialogVisible = true;
            },
            /*查询用户*/
            searchUser() {
                this.getRequest('/user/searchUsers?keywords=' + this.userNames).then(resp => {
                    if (resp) {
                        this.tableData = resp;
                        this.loading = false;
                        this.userNames = '';
                    }
                })
            },
        },
        mounted() {
            this.serchDept();
            this.searchUser();
            this.serchRegistLevel();
            this.serchconstantnameList();
        }
    }
</script>

<style scoped>
    .selectSche {
        width: 150px;
        margin-right: 20px;
    }
</style>