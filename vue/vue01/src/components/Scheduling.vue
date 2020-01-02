<template>
    <div>
        <div class="block">
            <span class="demonstration">开始日期</span>
            <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <span class="demonstration">结束日期</span>
            <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-button class="el-icon-view" type="primary" @click="getScheduling">查询医生排班</el-button>
            <el-button class="el-icon-edit" type="primary" @click="show">新增排班规则</el-button>
            <el-button class="el-icon-edit" type="primary" @click="searchRule">查询排版规则</el-button>
        </div>
        <div>
            <el-table
                    v-loading="loading"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column
                        type="selection"
                >
                </el-table-column>
                <el-table-column
                        prop="scheddate"
                        label="日期"
                >
                </el-table-column>
                <el-table-column
                        prop="deptname"
                        label="科室"
                >
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="医生"
                >
                </el-table-column>
                <el-table-column
                        prop="noon"
                        label="午别"
                >
                </el-table-column>
                <el-table-column
                        prop="registname"
                        label="挂号级别"
                >
                </el-table-column>
                <el-table-column
                        prop="registquota"
                        label="挂号限额"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :page-count="pageNum"
                    @current-change="change"
                    :total="total">
            </el-pagination>

            <el-dialog
                    title="新增排班规则"
                    :visible.sync="dialogVisible"
                    width="100%"
                    center
                    @close="clear"
            >
                <div class="form">
                    科室选择：
                    <el-select v-model="dept" placeholder="科室">
                        <el-option
                                :key="item.id"
                                :label="item.deptname"
                                :value="item.id"
                                v-for="(item,index) in deptname"
                        ></el-option>
                    </el-select>
                    挂号级别：
                    <el-select v-model="regist" placeholder="挂号级别">
                        <el-option
                                :key="item.id"
                                :label="item.registname"
                                :value="item.id"
                                v-for="(item,index) in registname"
                        ></el-option>
                    </el-select>
                    <el-button class="demonstration" type="primary" @click="getDoctor">查询</el-button>
                    <el-button type="primary" class="el-icon-refresh" @click="clear">清空</el-button>
                </div>
                <div>
                    <el-table
                            v-loading="loading"
                            ref="multipleTable"
                            :data="schedulingData"
                            height="250"
                            border
                            tooltip-effect="dark"
                            style="width: 100%;"
                            class="table"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                fixed
                        >
                        </el-table-column>
                        <el-table-column
                                prop="realname"
                                label="医生名称"
                                fixed
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                label="星期一 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check01" @change="updateInfos(scope.row.id,0)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期一 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check02" @change="updateInfos(scope.row.id,1)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期二 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check03" @change="updateInfos(scope.row.id,2)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期二 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check04" @change="updateInfos(scope.row.id,3)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期三 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check05" @change="updateInfos(scope.row.id,4)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期三 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check06" @change="updateInfos(scope.row.id,5)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期四 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check07" @change="updateInfos(scope.row.id,6)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期四 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check08" @change="updateInfos(scope.row.id,7)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期五 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check09" @change="updateInfos(scope.row.id,8)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期五 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check10" @change="updateInfos(scope.row.id,9)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期六 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check11" @change="updateInfos(scope.row.id,10)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期六 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check12" @change="updateInfos(scope.row.id,11)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期日 上午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check13" @change="updateInfos(scope.row.id,12)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="星期日 下午"
                                width="100px"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.check14" @change="updateInfos(scope.row.id,13)"></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="rulename">
                    规则名称：
                    <el-input placeholder="规则名称" class="input" v-model="schedInfo.ruleName"></el-input>
                    <span class="star"> *</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" type="warning">取 消</el-button>
                    <el-button type="primary" :disabled="schedInfo.userids.length <= 0" @click="saveScheduling">保 存</el-button>
                  </span>
            </el-dialog>
            <el-dialog
                    center
                    title="查询排版规则"
                    :visible.sync="dialogVisible2"
                    width="100%"
                    @close="clear"
                    >
                <div class="form">
                    科室选择：
                    <el-select v-model="dept" placeholder="科室">
                        <el-option
                                :key="item.id"
                                :label="item.deptname"
                                :value="item.id"
                                v-for="(item,index) in deptname"
                        ></el-option>
                    </el-select>
                    <el-button class="demonstration" type="primary" @click="getRule">查询</el-button>
                    <el-button type="primary" class="el-icon-refresh" @click="clear">清空</el-button>
                </div>
                <div>
                    <el-table
                            v-loading="loading"
                            ref="multipleTable"
                            :data="ruleData"
                            height="290"
                            border
                            tooltip-effect="dark"
                            style="width: 100%;"
                            class="table"
                            @selection-change="handleSelectionChange2"
                    >
                        <el-table-column
                                type="selection"
                                fixed
                        >
                        </el-table-column>
                        <el-table-column
                                prop="rulename"
                                label="规则名称"
                                fixed
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="department.deptname"
                                label="科室名称"
                                align="center"
                        >

                        </el-table-column>
                        <el-table-column
                                prop="user.realname"
                                label="医生名称"
                                align="center"
                        >

                        </el-table-column>
                        <el-table-column
                                prop="week"
                                label="时间"
                                align="center"
                        >

                        </el-table-column>
                    </el-table>
                </div>
                <!--选择时间范围-->
                <div style="text-align: center;margin-top: 8px">
                    <span class="demonstration">开始日期:</span>
                    <el-date-picker
                            v-model="planInfo.beginDate"
                            type="date"
                            placeholder="选择日期"
                            size="mini"
                            class="dateWidth"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span class="demonstration">结束日期:</span>
                    <el-date-picker
                            v-model="planInfo.finishDate"
                            type="date"
                            placeholder="选择日期"
                            size="mini"
                            class="dateWidth"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-button type="primary" size="mini" :disabled="dataLength == 0" @click="savePlan">选取规则生成排班计划</el-button>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Scheduling",
        data() {
            return {
                startDate: '',
                endDate: '',
                tableData: [],
                /*分页*/
                pageNum: 1,
                pageSize: 5,
                loading:true,
                total: 0,
                /*dialog显示不显示*/
                dialogVisible: false,
                /*新增排班，表格渲染的数据*/
                schedulingData: [],
                /*响应拿到科室列表*/
                deptname: [],
                /*响应拿到专家号还是普通号*/
                registname: [],
                /*科室*/
                dept: '',
                /*专家号还是普通号*/
                regist: '',
                /**/
                schedInfo: {
                    userids: [],// 排班者id
                    schedulingRules: [],// 排班规则,
                    deptids: [],// 科室ids
                    ruleName:'',//规则名称
                },
                dialogVisible2 : false,
                ruleData:[],
                dataLength: 0,
                planInfo:{
                    beginDate: '',// 排班起始时间
                    finishDate: '',// 排班结束时间,
                    rids: [],// 规则 id 数组
                    pbDeptids:[],
                    pbUserids:[],
                    week:[]
                }
            }
        },
        mounted() {
            this.getScheduling();
        },
        methods: {
            /*保存计划*/
            savePlan() {
                this.postRequest('/Scheduling/insertSelective',this.planInfo).then(resp => {
                    if (resp) {
                        this.dialogVisible2 = false;
                    }
                })
            },
            /*点击 排班计划 复选框 回调*/
            handleSelectionChange2(data) {
                this.dataLength = data.length;
                this.planInfo.week = [];
                this.planInfo.pbUserids = [];
                this.planInfo.pbDeptids = [];
                this.planInfo.rids = [];
                /*处理发送数据的数组*/
                for (let i in data) {
                    this.planInfo.week.push(data[i].week);
                    this.planInfo.pbUserids.push(data[i].user.id);
                    this.planInfo.pbDeptids.push(data[i].department.id);
                    this.planInfo.rids.push(data[i].id);
                }
            },
            getRule(){
                this.getRequest('/Rule/getRule?deptid='+this.dept).then(resp=>{
                    this.ruleData = resp;
                })
            },
            searchRule(){
                this.dialogVisible2 = true;
                this.getAllDept();
            },
            /*保存排班规则*/
            saveScheduling() {
                if (this.schedInfo.ruleName == null || this.schedInfo.ruleName == '' || this.schedInfo.ruleName.trim() == '' || this.schedInfo.ruleName == undefined) {
                    this.$message.warning("请填写规则名称，不能全是空格呦..");
                    // 获取焦点
                    this.$refs['ruleInput'].focus();
                }else{
                    // 发送请求，保存规则
                    this.postRequest('/Rule/addRule',this.schedInfo).then(resp => {
                        if (resp) {
                            this.dialogVisible = false;
                        }
                    })
                }
            },
            /*多选回调*/
            updateInfos(userid,index) {
                for (let i in this.schedInfo.userids) {
                    if (this.schedInfo.userids[i] == userid) {
                        if(this.schedInfo.schedulingRules[i].charAt(index) == '0'){
                            this.schedInfo.schedulingRules[i] = this.schedInfo.schedulingRules[i].substring(0, index) + '1' + this.schedInfo.schedulingRules[i].substring(index+1);
                        }else{
                            this.schedInfo.schedulingRules[i] = this.schedInfo.schedulingRules[i].substring(0, index) + '0' + this.schedInfo.schedulingRules[i].substring(index+1);
                        }
                    }
                    console.log(this.schedInfo.schedulingRules)
                }
            },
            /*多选回调*/
            handleSelectionChange(data) {
                this.schedInfo.userids = [];
                this.schedInfo.deptids = [];
                this.schedInfo.schedulingRules = [];
                for (let i in data) {
                    this.schedInfo.userids.push(data[i].id);
                    this.schedInfo.deptids.push(data[i].deptid);
                    let str = '';
                    str += Number(data[i].check01);
                    str += Number(data[i].check02);
                    str += Number(data[i].check03);
                    str += Number(data[i].check04);
                    str += Number(data[i].check05);
                    str += Number(data[i].check06);
                    str += Number(data[i].check07);
                    str += Number(data[i].check08);
                    str += Number(data[i].check09);
                    str += Number(data[i].check10);
                    str += Number(data[i].check11);
                    str += Number(data[i].check12);
                    str += Number(data[i].check13);
                    str += Number(data[i].check14);
                    this.schedInfo.schedulingRules.push(str)
                }
                console.log(this.schedInfo.userids)
                console.log(this.schedInfo.deptids)
                console.log(this.schedInfo.schedulingRules)
            },
            clear(){
                this.dept = '';
                this.regist = '';
            },
            getDoctor() {
                this.getRequest('/user/getUserByDeptAndRegist?dept=' + this.dept + '&regist=' + this.regist).then(resp => {
                    this.schedulingData = [];
                    this.schedulingData = resp;
                })
            },
            getAllRegistLevel() {
                this.getRequest('/RegistLevel/getRegistLevel').then(resp => {
                    this.registname = resp;
                })
            },
            getAllDept() {
                this.getRequest('/dept/getAllDept').then(resp => {
                    this.deptname = resp;
                })
            },
            show() {
                this.dialogVisible = true;
                this.getAllDept();
                this.getAllRegistLevel();
            },
            change(num) {
                this.pageNum = num;
                this.getScheduling();
            },
            getScheduling() {
                this.getRequest('/Scheduling/getSchedulingByDate?startDate=' + this.startDate + '&endDate=' + this.endDate + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize).then(resp => {
                    this.total = resp.total;
                    this.tableData = resp.list;
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>
    .demonstration {
        margin: 0 10px;
    }

    .el-icon-view {
        margin: 0 10px;
    }

    .form{
        text-align: center;
    }

    .table{
        margin-top: 10px;
    }

    .rulename{
        margin-top: 10px;
        text-align: center;
    }

    .input{
        width: 200px;
    }

    .star{
        color: red;
    }
</style>