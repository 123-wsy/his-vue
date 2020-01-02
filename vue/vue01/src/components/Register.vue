<template>
    <div>
        <div>
            <span class="star">* </span>
            <span>发票号：</span>
            <el-input v-model="invoicenum" size="mini" placeholder="发票号" class="input width"></el-input>
            <el-button class="el-icon-edit-outline" size="mini" type="primary" @click="register"> 挂号</el-button>
            <el-button class="el-icon-refresh" size="mini" type="primary"> 清空</el-button>
        </div>
        <div>
            <h4>挂号信息</h4>
            <span class="star">* </span>

            <span>病历号：</span>
            <el-input size="mini" placeholder="输入病历号" class="input width" v-model="casenumber"></el-input>

            <span class="star">* </span>
            <span>姓名：</span>
            <el-input size="mini" placeholder="输入姓名" class="input width" v-model="realname"></el-input>

            <span class="star">* </span>
            <span>性别：</span>
            <el-select value="男" size="mini" v-model="sexid" placeholder="请选择" class="width">
                <el-option
                        v-for="item in sex"
                        :key="item.id"
                        :label="item.constantname"
                        :value="item.id">
                </el-option>
            </el-select>

            <span class="star">* </span>
            <span>年龄：</span>
            <el-input size="mini" placeholder="输入年龄" class="input width" v-model="age"></el-input>
            <span class="star">* </span>
            <el-select size="mini" v-model="ageType" placeholder="请选择" class="width">
                <el-option
                        v-for="item in ageTypes"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <br>

            <span>出生日期：</span>
            <el-date-picker
                    style="width: 124px;margin-right: 10px"
                    size="mini"
                    v-model="birthdata"
                    type="date"
                    @change="getAge"
                    placeholder="出生日期"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>

            <span>身份证号：</span>
            <el-input size="mini" placeholder="在此输入身份证号" class="input width2" v-model="idnumber"></el-input>

            <span>家庭住址：</span>
            <el-input size="mini" placeholder="在此输入家庭住址" class="input width2" v-model="homeaddress"></el-input>
            <br>

            <span class="star">* </span>
            <span>结算类别：</span>
            <el-select class="width" size="mini" v-model="settlename" placeholder="请选择">
                <el-option
                        v-for="item in settlenames"
                        :key="item.id"
                        :label="item.settlename"
                        :value="item.id">
                </el-option>
            </el-select>

            <span class="star">* </span>
            <span>看诊日期：</span>
            <el-date-picker
                    style="width: 124px;margin-right: 10px"
                    size="mini"
                    @change="getNoon"
                    v-model="visitdate"
                    type="date"
                    placeholder="看诊日期"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>

            <span class="star">* </span>
            <span>午别：</span>
            <el-select class="width" size="mini" @change="getDept" v-model="noon" placeholder="午别">
                <el-option
                        v-for="item in noons"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>

            <span class="star">* </span>
            <span>挂号科室：</span>
            <el-select class="width" size="mini" @change="getRegistName" v-model="dept" placeholder="挂号科室">
                <el-option
                        v-for="item in depts"
                        :key="item.id"
                        :label="item.deptname"
                        :value="item.id">
                </el-option>
            </el-select>
            <br>

            <span class="star">* </span>
            <span>号别：</span>
            <el-select style="margin-right: 30px" class="width" size="mini" @change="getUserByDeptIdAndLevelAndDate"
                       v-model="level" placeholder="号别">
                <el-option
                        v-for="item in levels"
                        :key="item.id"
                        :label="item.registname"
                        :value="item.id">
                </el-option>
            </el-select>

            <span class="star">* </span>
            <span>看诊医生：</span>
            <el-select class="width" size="mini" v-model="doctor" placeholder="看诊医生" @change="getRegistQuota">
                <el-option
                        v-for="item in doctors"
                        :key="item.user.id"
                        :label="item.user.realname"
                        :value="item.user.id">
                </el-option>
            </el-select>

            <span>初始号额：</span>
            <el-input size="mini" placeholder="初始号额" class="input width" v-model="registquota"></el-input>

            <span>已用号额：</span>
            <el-input size="mini" placeholder="已用号额" class="input width" v-model="registcount"></el-input>
            <br>

            <span>病历本</span>
            <el-checkbox style="margin:0 140px 0 10px" size="mini" v-model="checked" @change="isbook"></el-checkbox>

            <span class="star">* </span>
            <span>应收金额：</span>
            <el-input size="mini" readonly class="input width" v-model="fee"></el-input>

            <span class="star">* </span>
            <span>收费方式：</span>
            <el-select class="width" size="mini" v-model="FeeType" placeholder="请选择">
                <el-option
                        v-for="item in FeeTypes"
                        :key="item.id"
                        :label="item.constantname"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                invoicenum: '',
                casenumber: '',
                realname: '',
                sex: [],
                sexid: '',
                age: '',
                ageType: '岁',
                ageTypes: [
                    '岁',
                    '月',
                    '天',
                ],
                birthdata: '',
                idnumber: '',
                homeaddress: '',
                FeeType: '现金',
                FeeTypes: [],
                settlename: '',
                settlenames: [],
                visitdate: '',
                noon: '',
                noons: [],
                dept: '',
                depts: [],
                level: '',
                levels: [],
                doctor: '',
                doctors: [],
                registquota: '',
                registcount: '',
                fee: 0,
                checked: false,
                isbookd:''
            }
        },
        mounted() {
            this.getSex();
            this.getFeeType();
            this.getSettle();
            this.getInvoicenum();
            this.getCasenumber();
        },
        methods: {
            getAge(){
                var date = this.birthdata;
                date = date.substring(0,19);
                date = date.replace(/-/g,'/'); //必须把日期'-'转为'/'
                var timestamp = new Date(date).getTime();
                let time = new Date().getTime()-timestamp;
                this.age = parseInt(time/1000/86400/365);
            },
            register() {
                if(this.checked){
                    this.isbookd = 1;
                }else{
                    this.isbookd = 0;
                }
                let registtime1 = new Date();
                let registerInfo = {
                    casenumber:this.casenumber,
                    realname:this.realname,
                    gender:this.sexid,
                    idnumber:this.idnumber,
                    birthdate:this.birthdata,
                    age:this.age,
                    agetype:this.ageType,
                    homeaddress: this.homeaddress,
                    visitdate: this.visitdate,
                    noon: this.noon,
                    deptid:this.dept,
                    userid:this.doctor,
                    registleid:this.level,
                    settleid:this.settlename,
                    isbook:this.isbookd,
                    registtime:registtime1,
                    registerid:JSON.parse(window.sessionStorage.getItem('user')).id,
                    visitstate:1
                }
                console.log(registerInfo)
                this.postRequest('/Register/insertSelective',registerInfo).then(resp => {

                })
            },
            isbook() {
                if (this.checked) {
                    this.fee += 1;
                } else {
                    this.fee -= 1;
                }
            },
            /*得到挂号限额，已用号额，应收金额*/
            getRegistQuota() {
                this.getRequest('/RegistLevel/getRegistQuota?id=' + this.level).then(resp => {
                    this.registquota = resp.registquota;
                    this.fee = resp.registfee;
                });
                this.getRequest('/Register/getRegistCount?userid=' + this.doctor).then(resp => {
                    this.registcount = resp.length;
                })
            },
            getCasenumber() {
                this.getRequest('/Register/getRegister').then(resp => {
                    this.casenumber = parseInt(resp.casenumber) + 1;
                });
            },
            getInvoicenum() {
                this.getRequest('/Invoice/getInvoice').then(resp => {
                    this.invoicenum = parseInt(resp.invoicenum) + 1;
                });
            },
            /*得到专家号*/
            getRegistName() {
                this.getRequest('/RegistLevel/getAllRegistLevel?deptid=' + this.dept + '&scheddate=' + this.visitdate + '&noon=' + this.noon).then(resp => {
                    this.levels = resp;
                });
            },
            /*改变午别得到科室*/
            getDept() {
                this.getRequest('/Scheduling/getUserByDeptIdAndLevelAndDate?scheddate=' + this.visitdate + '&noon=' + this.noon).then(resp => {
                    let arr = [];
                    let deptname = '';
                    let id = '';
                    for (let i in resp) {
                        if (deptname === resp[i].dept.deptname) {
                        } else {
                            deptname = resp[i].dept.deptname;
                            id = resp[i].dept.id;
                            let dept = {
                                id: id,
                                deptname: deptname,
                            }
                            arr.push(dept);
                        }
                    }
                    this.depts = arr;
                })
            },
            /*改变看诊日期得到午别*/
            getNoon() {
                this.getRequest('/Scheduling/getUserByDeptIdAndLevelAndDate?scheddate=' + this.visitdate).then(resp => {
                    let arr = [];
                    let noon = '';
                    for (let i in resp) {
                        if (noon === resp[i].noon) {
                        } else {
                            noon = resp[i].noon;
                            arr.push(resp[i].noon);
                        }
                    }
                    this.noons = arr;
                });
            },
            getUserByDeptIdAndLevelAndDate() {
                this.getRequest('/Scheduling/getUserByDeptIdAndLevelAndDate?deptid=' + this.dept + '&registleid=' + this.level + '&scheddate=' + this.visitdate + '&noon=' + this.noon).then(resp => {
                    this.doctors = resp;
                });
            },
            getSettle() {
                this.getRequest('/SettleCategory/getSettle').then(resp => {
                    this.settlenames = resp;
                });
            },
            getFeeType() {
                this.getRequest('/Constantitem/getConstantitem?constanttypeid=' + 5).then(resp => {
                    this.FeeTypes = resp;
                });
            },
            getSex() {
                this.getRequest('/Constantitem/getConstantitem?constanttypeid=' + 7).then(resp => {
                    this.sex = resp;
                });
            }
        }
    }
</script>

<style scoped>
    .star {
        color: red;
    }

    .input {
        width: 150px;
        margin-right: 10px;
    }

    .width {
        width: 120px
    }

    .width2 {
        width: 240px;
    }
</style>