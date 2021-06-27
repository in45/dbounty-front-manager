<template>
    <b-modal id="company-managers"  size="lg"  title="Company Managers" ref="modal"  title-class="font-20"
             hide-footer hide-header @shown="create" @hide="managers = []">

        <div class="row m-4">

                <h4 class="mb-2">Managers</h4>
                <table class="table table-centered text-white table-nowrap">
                    <thead>
                    <tr class="text-center">
                        <td></td>
                        <td class="text-xl-left">manager</td>
                        <td >role</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="data of managers" :key="data.id">
                        <td data-label="#">
                            <b-avatar :src="data.avatar"></b-avatar>
                        </td>
                        <td data-label="Username " class="text-xl-left">{{data.username}}</td>
                        <td data-label="Role " style="max-width: 60px">
                            <b-form-select :disabled="$store.state.manager.role == 'sysbeta'" @change="changeRole(data.id,data.role)" v-model="data.role" :options="['sysalpha', 'sysbeta']" ></b-form-select>
                        </td>
                    </tr>
                    </tbody>
                </table>

        </div>
        <hr class="bg-white" v-if="$store.state.manager.role == 'sysalpha'"/>
        <div class="form-group mx-4" v-if="$store.state.manager.role == 'sysalpha'">
            <label>Or add new manager</label>
            <div class="row my-3 mx-0" >


                <b-form-input type="text" class="form-control col-xl-7 mb-2"
                              placeholder="Enter Email to invite new manager"
                              v-model="new_manager.manager_email"
                              :class="{ 'is-invalid': typesubmit && $v.new_manager.manager_email.$error }">
                </b-form-input>
                <b-form-select  v-model="new_manager.manager_role" class="col-xl-2 mb-2"
                                :class="{ 'is-invalid': typesubmit && $v.new_manager.manager_role.$error }">
                    <b-form-select-option value="" disabled selected>Role</b-form-select-option>
                    <b-form-select-option value="sysalpha">SysAlpha</b-form-select-option>
                    <b-form-select-option value="sysbeta">SysBeta</b-form-select-option>
                </b-form-select>
                <div v-if="typesubmit && ($v.new_manager.manager_email.$error || $v.new_manager.manager_role.$error)"
                     class="invalid-feedback">
                    <span v-if="!$v.new_manager.manager_email.required">Email Required</span><br/>
                    <span v-if="!$v.new_manager.manager_role.required">Role Required</span><br/>
                    <span v-if="!$v.new_manager.manager_email.email">Email Invalid</span>
                </div>


                <button class="btn btn-primary submit col-xl-2 ml-auto mb-2" @click="handleSubmit">Add manager</button>

            </div>
        </div>

    </b-modal>
</template>

<script>

    import {email,required} from "vuelidate/lib/validators";

    export default {
        name: "Managers",
        data(){
            return{
                managers: [],
                typesubmit:false,
                new_manager:{
                    manager_email: '',
                    manager_role:''
                }

            }
        },
        validations: {
            new_manager:{
                manager_email: {required,email},
                manager_role: {required},

            }

        },

    methods: {
            create(){
                this.new_manager={
                    manager_email: '',
                        manager_role:''
                }
                this.typesubmit = false

                this.getManagers()
            },
        handleSubmit() {
            this.typesubmit = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            this.addManager();

        },
        changeRole(manager_id,role){
            this.$http
                .post('managers/'+manager_id,{'role':role})
                .then(response => {
                    console.log(response.data);
                    this.$alertify.success("L'opération a réussi :)")

                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },
        getManagers(){
            this.$http
                .get('managers')
                .then(response => {
                    this.managers = [...new Set(response.data.map(x=>x.manager))];


                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },
        addManager(){
            this.$http
                .post('invite_manager',this.new_manager)
                .then(response => {
                    this.managers.push(response.data);
                    this.$alertify.success("L'opération a réussi :)")
                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },


    }


    }
</script>

<style scoped  src="@/assets/styles/popup.css"></style>
