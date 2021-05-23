<template>
    <b-modal id="company-managers"   title="Company Managers" ref="modal"  title-class="font-20"
             hide-footer hide-header @shown="getManagers" >

        <div class="row m-4">

                <h4 class="mb-2">Managers</h4>
                <table class="table table-centered text-white table-nowrap">
                    <thead>
                    <tr class="text-center">
                        <td></td>
                        <td>username</td>
                        <td>role</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="data of managers" :key="data.id">
                        <td data-label="#">
                            <b-avatar :src="data.manager.avatar"></b-avatar>
                        </td>
                        <td data-label="Username ">{{data.manager.username}}</td>
                        <td data-label="Role " >
                            <b-form-select @change="changeRole(data.manager_address,data.manager.role)" v-model="data.manager.role" :options="['sysalpha', 'sysbeta']" ></b-form-select>
                        </td>
                    </tr>
                    </tbody>
                </table>

        </div>
    </b-modal>
</template>

<script>

    import {email} from "vuelidate/lib/validators";

    export default {
        name: "Managers",
        data(){
            return{
                managers: [],
                email: ''
            }
        },
        validations: {

                email: {email},
        },

    methods: {
        handleSubmit() {
            this.typesubmit = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            this.edit();

        },
        changeRole(manager_address,role){
            this.$http
                .post('companies/'+this.$store.state.company.id+'/managers/'+manager_address,{'role':role})
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
                .get('companies/'+this.$store.state.company.id+'/managers')
                .then(response => {
                    this.managers = response.data;


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
