<template>
    <b-modal id="profil-company"  title="Profil Company" ref="modal"  title-class="font-20"
             hide-footer hide-header @shown="getCompany" @hide="typesubmit=false">

        <div class="row p-4 text-center m-auto">
            <b-avatar class="outer"  :src="company.logo" size="6rem" ></b-avatar>
            <upload-avatar class="inner"  :url="'me/avatar'" v-on:refresh-avatar="refresh"/>
        </div>
        <div class="row  px-4">
            <h4 class="col-9">Infos</h4>
            <div class="col-3 text-right">
                <i role="button" v-b-modal.company-code class="fa fa-lock fa-1x mr-2 text-danger"  title="code" ></i>
                <company-code :alpha_code="company.alpha_code"  :beta_code="company.beta_code"/>
            </div>
        </div>
        <div class=" p-4">
               <div class="form-group mb-3">
                       <b-form-input type="text" class="text-center " v-model="company.name" placeholder="change your Company Name"></b-form-input>
               </div>
               <div class="form-group d-flex mb-3">
                   <i class="fa fa-globe my-auto mr-3"></i>
                       <b-form-input type="text" v-model="company.website" placeholder="change  Website"></b-form-input>
               </div>
               <div class="form-group  d-flex mb-3">
                   <i class="fa fa-phone my-auto mr-3"></i>
                   <b-form-input type="text" v-model="company.phone" placeholder="change  Phone Number"></b-form-input>
               </div>
               <div class="form-group  d-flex mb-3">
                   <i class="fa fa-at my-auto mr-3"></i>
                       <b-form-input type="email" v-model="company.email" placeholder="change  email"
                                     :class="{ 'is-invalid': typesubmit && $v.company.email.$error }"></b-form-input>
                       <div v-if="typesubmit && $v.company.email.$error" class="invalid-feedback ">
                           <span v-if="!$v.company.email.email" class="text-danger">Email Invalid !</span>
                       </div>
               </div>

               <div class="form-group  d-flex mb-3">
                   <i class="flaticon-ethereum-1 my-auto mr-3"></i>
                   <b-form-input type="text"  v-model="company.balance" disabled/></div>
            <div class="form-group mb-3">
                <div class="pt-2">Description</div>
                <b-form-textarea rows="4" style="resize: none" type="text"  v-model="company.description" />
            </div>


       </div>

        <b-button class="m-0 text-center btn-info w-100" style="border-radius:0 0 20px 20px;" @click="edit">Edit Profil</b-button>

    </b-modal>
</template>

<script>

    import {email} from "vuelidate/lib/validators";
    import UploadAvatar from "@/components/avatar/uploadAvatar";
    import CompanyCode from "@/components/companyCode";
    export default {
        name: "Company",
        components: {CompanyCode, UploadAvatar},
        data(){
            return{
                typesubmit: false,
                company: { }
            }
        },
        validations: {
            company:{
                email: {email},
            },
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
        getCompany(){
            this.$http
                .get('companies/'+this.$store.state.company.id)
                .then(response => {
                    this.company = response.data;


                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },

        edit() {
            this.$http
                .post('companies/'+this.company.id, this.company)
                .then(response => {
                    this.company = response.data;
                    this.$store.commit('mycompany',response.data)
                    this.$alertify.success("L'opération a réussi :)")
                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },
        refresh(img) {
            this.company.logo = img
            this.$store.commit('me',this.manager)

        },
    }


    }
</script>

<style scoped  src="@/assets/styles/popup.css"></style>
<style scoped>
    .inner{
        top: 86px;
        left: 280px;
    }
</style>