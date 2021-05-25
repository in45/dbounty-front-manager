<template>
    <b-sidebar id="report" title="Edit Report" width="600px"  text-variant="light" right backdrop-variant="transparent"
               backdrop shadow>

        <div class="px-3 py-2">
            <form >
                <div class="form-group row my-1 mx-0">
                    <label class="pb-2 col-xl-4 m-auto"> Vulnerability Title </label>
                    <b-form-input class="col-xl-8" v-model="selected_report.vuln_name" type="text" placeholder="Add your vulnerability" ></b-form-input>
                </div>
                <div class="form-group row my-1 mx-0">
                    <label class="pb-2 col-xl-4 m-auto"> Target </label>
                    <b-form-select class="col-xl-8" v-model="selected_report.target" placeholder="Add your Target" :options="['a','b','c']"></b-form-select>
                </div>
                <div class="form-group row my-1 mx-0">
                    <label class="pb-2 col-xl-4 m-auto"> Vulnerability Category </label>
                    <b-form-input list="browsers" class="col-xl-8" name="browser" v-model="selected_report.vuln.category" id="browser"></b-form-input>
                    <datalist class="col-xl-8" id="browsers">
                        <option v-for="c in categories" :key="c.id" :value="c.title">{{c.title}}</option>
                    </datalist>

                </div>
                <div class="form-group  row my-1 mx-0">
                    <label class="pb-2 pl-3"> Vulnerability Details </label>
                    <vue-editor v-model="selected_report.vuln_details"></vue-editor>
                </div>
                <div class="form-group row my-1 mx-0">
                    <label class="pb-2 pl-3"> Validations Steps </label>
                    <vue-editor v-model="selected_report.validation_steps"></vue-editor>
                </div>
                <input type="button" value="Save" class="btn btn-primary text-white float-right my-2" @click="editReport"/>
            </form>
        </div>
    </b-sidebar>
</template>

<script>

    import {VueEditor} from "vue2-editor";
    import {vuln_Category} from "@/assets/helpers/vuln_category";


    export default {
        name: "EditReport",
        props:['selected_report_p'],
        components: {
            VueEditor
        },
        data(){
            return{
                categories:vuln_Category,
                selected_report:{...this.selected_report_p}
            }
        },
        methods:{
            editReport(){
                this.$http
                    .post('companies/'+this.$store.state.company.id+'/reports/'+this.selected_report.id,this.selected_report)
                    .then(response => {
                        console.log(response.data)
                        this.$alertify.success(" success")
                        this.selected_report = response.data;

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }

    }
</script>

<style scoped>
    /deep/ .quillWrapper .ql-snow.ql-toolbar {

        background-color: white;
    }
    /deep/ .ql-container{
        height: 120px;
    }
    /deep/ .ql-formats{
        margin: 0!important;
    }
    /deep/ .ql-editor{
        min-height: 100px!important;
        font-size: 12px!important;
    }
    /deep/ .form-control,.custom-select{
        font-size: 12px!important;
    }
    /deep/ .b-sidebar{
        background-color: #00142C!important;
    }
</style>