<template>
    <main>

        <div class="row m-5">
            <h2 class="text-white col-xl-11 ">New Program</h2>
            <button @click="addProgram" id="deploy" class=" col-xl-1" >Add</button>
        </div>

        <div class="row m-0">
            <div class="col-xl-6 mx-0 ">
                <div class="card m-2">
                    <div class="form-group row mt-3 mb-0">
                        <div class="col-xl-4">
                            <label class="pb-2">Name :</label>
                            <b-form-input type="text"  v-model="program.name"></b-form-input>
                        </div>

                        <div class="col-xl-4">
                            <label class="pb-2">Begin At :</label>
                            <b-form-input type="datetime-local"  v-model="program.begin_at"></b-form-input>
                        </div>
                        <div class="col-xl-4">
                            <label class="pb-2">Finish At:</label>
                            <b-form-input type="datetime-local"  v-model="program.finish_at"></b-form-input>
                        </div>
                    </div>
                    <div class="form-group my-3 mb-0">
                        <label class="pb-2">Description :</label>
                        <vue-editor v-model="program.info"></vue-editor>
                    </div>
                    <div class="form-group row mt-3 mb-0">

                            <div class="col-xl-4">
                                <label class="pb-2">Type :</label>
                                <b-form-select v-model="program.type" :options="types"></b-form-select>
                            </div>
                            <div class="col-xl-4">
                                <label class="pb-2">Range Response (Days) :</label>
                                <b-form-select v-model="program.range_response" :options="[1,2,3,4,5,6,7]"></b-form-select>
                            </div>
                            <div class="col-xl-4">
                                <label class="pb-2">Logo:</label>
                                <b-form-file  ref="file" id="file" name="file" accept="image/*"></b-form-file>
                            </div>

                    </div>
                    <div class="form-group row mt-3 mb-0">

                            <div class="col-xl-4">
                                <label class="pb-2">Min Bounty :</label>
                                <b-form-input type="number" min="0" :max="program.max_bounty" v-model="program.min_bounty"></b-form-input>
                            </div>
                            <div class="col-xl-4">
                                <label class="pb-2">Max Bounty:</label>
                                <b-form-input type="number" :min="program.min_bounty" v-model="program.max_bounty"></b-form-input>
                            </div>
                        <div class="col-xl-4">
                            <label class="pb-2">Managed By:</label>
                            <b-form-select v-model="program.managed_by_dbounty">
                                <b-form-select-option value="1">DBounty</b-form-select-option>
                                <b-form-select-option value="0">Company</b-form-select-option>
                            </b-form-select>
                        </div>

                    </div>

                    <div class="form-group row mt-3 justify-content-center mb-0">
                        <div class="col-12 mb-2">
                            <label class="pb-2">Rewards :</label>
                        </div>

                        <div class="col-xl-4 mb-2">
                            <label class="pb-2 text-muted">None :</label>
                            <b-form-input type="text" placeholder="min-max" v-model="program.p1"></b-form-input>
                        </div>
                        <div class="col-xl-4 mb-2">
                            <label class="pb-2 text-muted">Low :</label>
                            <b-form-input type="text" placeholder="min-max" v-model="program.p2"></b-form-input>
                        </div>
                        <div class="col-xl-4 mb-2">
                            <label class="pb-2 text-muted">Medium:</label>
                            <b-form-input type="text" placeholder="min-max" v-model="program.p3"></b-form-input>
                        </div>
                        <div class="col-xl-4 mb-2">
                            <label class="pb-2 text-muted">Hard :</label>
                            <b-form-input type="text" placeholder="min-max" v-model="program.p4"></b-form-input>
                        </div>
                        <div class="col-xl-4 mb-2">
                            <label class="pb-2 text-muted">Critical :</label>
                            <b-form-input type="text" placeholder="min-max" v-model="program.p5"></b-form-input>
                        </div>

                    </div>
                </div>



            </div>

            <div class="col-xl-6 mx-0 ">
                <div class="card m-2">
                    <div class="form-group my-3 mb-0">
                        <label class="pb-2">Scopes :</label>
                        <vue-editor v-model="program.scopes"></vue-editor>
                    </div>
                    <div class="form-group my-3 mb-0">
                        <label class="pb-2">Rules :</label>
                        <vue-editor v-model="program.rules"></vue-editor>
                    </div>
                    <div class="form-group my-3 mb-0">
                        <label class="pb-2">Conditions :</label>
                        <vue-editor v-model="program.conditions"></vue-editor>
                    </div>
                </div>



            </div>


        </div>


    </main>
</template>

<script>

    import {VueEditor} from "vue2-editor";

    export default {
        name: "NewProgram",
        components: {
            VueEditor
        },
        data() {
            return {
                types: [ 'public','private'],
                status: ['none' , 'new' , 'open' , 'closed'],
                program: {},
                submitted: false,
            }
        },

        created() {

            this.program = { }
            this.submitted = false
        },

        methods: {

            addProgram() {
                let formData = new FormData();
                formData.append('name', this.program.name);
                formData.append('info', this.program.info);
                formData.append('type', this.program.type);
                formData.append('range_response', this.program.range_response);
                formData.append('managed_by_dbounty', this.program.managed_by_dbounty);
                formData.append('begin_at', this.program.begin_at);
                formData.append('min_bounty', this.program.min_bounty);
                formData.append('max_bounty', this.program.max_bounty);
                formData.append('finish_at', this.program.finish_at);
                formData.append('p1', this.program.p1);
                formData.append('p2', this.program.p2);
                formData.append('p3', this.program.p3);
                formData.append('p4', this.program.p4);
                formData.append('p5', this.program.p5);
                formData.append('scopes', this.program.scopes);
                formData.append('rules', this.program.rules);
                formData.append('conditions', this.program.conditions);
                if(this.$refs.file.files.length)formData.append('logo', this.$refs.file.files[0]);
                this.$http
                    .post('programs',formData)
                    .then(response => {
                        this.$alertify.success(" success")
                        this.$router.push({name:'ProfilProgram',params:{id:response.data.id} })
                    })
                    .catch(error => {
                        this.showError(Object.values(error.response.data.errors))
                    })
            },
            showError(e) {
                for (var i = 0; i < e.length; i++) {
                    this.$alertify.error(e[i][0]);
                }

            }
        },

    };
</script>

<style scoped>
    .card {
        color: white;
        margin-bottom: 30px;
        border-radius: 12px;
        padding :30px;
        height: fit-content;
        background-color:#00142C;
        font-family: Montserrat;
        font-style: normal;
        font-size: 14px;
        line-height: 30px;

    }
    #deploy{
        background-color: #ECBD34;
        color: #2A2E51;
        font-size: 12px;
        border-radius: 5px;
        line-height: 23px;
        font-weight: bold;
    }
    /deep/ .quillWrapper{
        background-color: white;
        color: black;
    }
    /deep/.ql-formats{
        margin:0!important;
    }
</style>