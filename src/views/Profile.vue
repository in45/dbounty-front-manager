<template>
    <main>
        <div class="row mt-5 m-0">
            <div class="col-xl-9 m-auto">
                <div class="row  m-0">
                    <div class="col-xl-3 content border" style="border-radius: 12px 0 0  12px ;height: fit-content">
                        <div class="row m-0 py-3">
                            <i class="fas fa-envelope fa-2x" title="Messages" v-b-toggle.messages></i>
                            <report-messages/>
                            <i class="fa fa-edit fa-2x ml-auto" title="Edit Infos"></i>
                        </div>

                        <div class="text-center py-2">
                            <b-avatar class="outer"  :src="user.avatar" size="6rem" ></b-avatar>
                            <upload-avatar class="inner"  :url="'me/avatar'" v-on:refresh-avatar="refresh"/>
                        </div>
                        <h4 class="mb-2 text-center">Inas Hasnaoui</h4>
                        <h6 class="mb-4 text-center">@IN4SS</h6>
                        <div style="margin-left: 7%">
                            <p class="mb-2">i.hasnaoui@shellboxes.com</p>
                            <p class="mb-2">06.36.03.19.91</p>
                            <p class="mb-2">Morocco</p>
                        </div>
                        <div class="d-flex my-3 justify-content-center">
                            <i class="fab fa-linkedin fa-2x m-2 "></i>
                            <i class="fas fa-globe fa-2x m-2 "></i>
                            <i class="fab fa-twitter fa-2x m-2 "></i>
                            <i class="fab fa-github fa-2x m-2 "></i>
                        </div>

                    </div>
                    <div class="col-xl-9 content border  mx-0 mb-4 p-2" style="border-radius: 0 12px 12px 0;">

                          <div class="row my-3 p-0">
                              <div class="col-xl-2 col-md-6 col-sm-6 w-50 text-center">
                                  <b-avatar class="mb-2" variant="primary" text="300"></b-avatar>
                                  <h6>Rank</h6>
                              </div>
                              <div class="col-xl-2  col-md-6 col-sm-6 w-50 text-center">
                                  <b-avatar class="mb-2" variant="primary" text="30"></b-avatar>
                                  <h6>Reports</h6>
                              </div>
                              <div class="col-xl-2 col-md-6 col-sm-6 w-50 text-center">
                                  <b-avatar class="mb-2" variant="primary" text="30"></b-avatar>
                                  <h6>Thanks</h6>
                              </div>
                              <div class="col-xl-2 col-md-6 col-sm-6 w-50 text-center">
                                  <b-avatar class="mb-2" variant="primary" text="30"></b-avatar>
                                  <h6>Bugs Found</h6>
                              </div>
                              <div class="col-xl-2 col-md-6 col-sm-6 w-50 text-center">
                                  <b-avatar class="mb-2" variant="primary" text="30"></b-avatar>
                                  <h6>Bounty</h6>
                              </div>
                              <div class="col-xl-2 col-md-6 col-sm-6 w-50 text-center">
                                  <b-avatar class="mb-2" variant="primary" text="30"></b-avatar>
                                  <h6>Tokens</h6>
                              </div>

                          </div>
                            <b-tabs pills justified content-class="pt-3">
                                <b-tab  class="border-0">
                                    <template v-slot:title>
                                        <span class=" d-sm-inline-block ">My Programs</span>
                                    </template>
                                    <div>
                                        <div class="row mx-1 my-4 p-3 prio " v-for="data of reports" :key="data.id">
                                            <div class="col-xl-12">
                                                <p class="text-muted float-right" style="font-size: 11px">{{data.time_diff}}</p>
                                                <h6 class="aspect-name ">{{data.title}}</h6>
                                                <h6 class="text-muted " v-if="data.vuln_id">{{data.vuln.name}}</h6>
                                                <h6 class="text-muted " v-else>{{data.vuln_name}}</h6>
                                                <b-badge  class="p-1 float-right" variant="info">{{data.status}}</b-badge>
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <b-tab  class="border-0">
                                    <template v-slot:title>
                                        <span class=" d-sm-inline-block ">My Reports</span>
                                    </template>
                                    <div>
                                    </div>
                                </b-tab>
                                <b-tab  class="border-0">
                                    <template v-slot:title>
                                        <span class=" d-sm-inline-block ">Account</span>
                                    </template>
                                    <div>
                                    </div>
                                </b-tab>
                                <b-tab  class="border-0">
                                    <template v-slot:title>
                                        <span class=" d-sm-inline-block ">Stats</span>
                                    </template>
                                    <div>
                                    </div>
                                </b-tab>

                            </b-tabs>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<script>
    import UploadAvatar from "../components/avatar/uploadAvatar";
    import ReportMessages from "@/components/ReportMessages";
    export default {
        name: "Profile",
        components: {ReportMessages, UploadAvatar},
        data(){
            return{
                user:{
                    avatar:''
                },
                reports:[]
            }
        },
        created(){
            this.getReports()
        },
        methods:{
            refresh(img){
                this.user.avatar = img
            },
            getReports(){
                this.$http
                    .get('users/0xPXphgeacj41rJfxMfMvCbccicZkOxQ4CRyaaEirD/reports')
                    .then(response => {
                        console.log(response.data)
                        this.reports = response.data;

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        }
    }
</script>

<style scoped>
    .content{
        background-color: #00142C;
        color: white;
    }
    /deep/ .nav-pills .nav-link{
        color: white;
        border-radius: 0;
    }
    /deep/ .nav-pills .nav-link.active{
        background-color:  #80b1ff;
    }
    /deep/ .nav-justified .nav-item{
        border: solid 0.5px #bbb;
        margin-right: 2px;
        margin-left: 2px;
    }
    /deep/ .tab-content {
        color: #ddd;
        padding: 12px;
    }
    .outer {
        margin: auto;
        position: relative;
    }

    .inner {
        position: relative;
        left: 38px;
        top: -30px;
        cursor:pointer;

    }
    i{
        cursor: pointer;
        color: white;
    }
    i:hover{
        color: #80b1ff;
    }
    .prio{
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .2);
        border-radius: 12px;
        border: 1px solid #242a32;
        background-color: #10233B;
    }
</style>