<template>
    <div class="home">
        <el-container>
            <el-header class="header">
                <h3>His</h3>
                <el-dropdown @command="onclick">
                    <span class="el-dropdown-link">
                      下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="hidden" v-if="style">隐藏</el-dropdown-item>
                        <el-dropdown-item command="hidden" v-if="!style">显示</el-dropdown-item>
                        <el-dropdown-item command="out" divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px" v-show="style" class="aside">
                    <el-menu router class="menu">
                        <el-submenu :key="index" :index="index+''" v-for="(item,index) in this.$router.options.routes"
                                    v-if="!item.hidden">
                            <template slot="title">
                                <span>{{item.meta.title}}</span>
                            </template>
                            <el-menu-item @click="addTab(child.meta.title)" :index="child.path"
                                          v-for="(child,i) in item.children">
                                {{child.meta.title}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-tabs @tab-click="replace" v-model="editableTabsValue" type="card" closable
                             @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item, index) in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                                :path="item.path"
                        >
                            {{item.content}}
                        </el-tab-pane>
                    </el-tabs>
                    <div class="maintitle" v-if="this.$route.path == '/home'">
                        <h2>这是首页</h2>
                    </div>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                style: true,
                editableTabsValue: '2',
                editableTabs: [],
                tabIndex: 0,
            }
        },
        methods: {
            onclick(command) {
                if (command == 'out') {
                    this.$confirm('退出, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        window.sessionStorage.removeItem('user');
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        });
                    });
                }
                if (command == 'hidden') {
                    this.style = !this.style;
                }
            },
            /*点选项*/
            addTab(title) {
                for (let i in this.editableTabs) {
                    if (this.editableTabs[i].title == title) {
                        this.editableTabsValue = this.editableTabs[i].name;
                        return;
                    }
                }
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: title,
                    name: newTabName,
                    path: this.$route.path,
                });
                this.editableTabsValue = newTabName;
            },
            /*点小×*/
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                                this.$router.push(nextTab.path);
                            } else {
                                this.$router.push('/home');
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            /*点击标签页*/
            replace(data) {
                this.$router.push(data.$attrs.path);
            }
        }
    }
</script>
<style scoped>
    .header {
        background: #409EFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #FFFFFF;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #FFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .aside {
        height: calc(100vh - 60px);
        background: aliceblue;
    }

    .aside .menu {
        background: aliceblue;
    }

    .maintitle {
        text-align: center;
        font-size: 2em;
        color: #409EFF;
    }
</style>
