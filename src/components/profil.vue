<template>
    <b-modal id="modal-profil" centered :title="'Profil // '+manager.username" ref="modal"  title-class="font-20"
             hide-footer hide-header-close @shown="me" @hide="typesubmit=false">
       <div class="row p-4">
           <div class="col-xl-8">
               <h6 class="text-warning text-center my-3">{{manager.public_address}}</h6>
               <div class="row mb-3">
                   <div class="col-xl-4 pt-2">First Name</div>
                   <div class="col-xl-8">
                       <b-form-input type="text" v-model="manager.first_name" placeholder="change your First Name"></b-form-input>
                   </div>
               </div>
               <div class="row mb-3">
                   <div class="col-xl-4 pt-2">Last Name</div>
                   <div class="col-xl-8">
                       <b-form-input type="text" v-model="manager.last_name" placeholder="change your Last Name"></b-form-input>
                   </div>
               </div>
               <div class="row mb-3">
                   <div class="col-xl-4 pt-2">Email</div>
                   <div class="col-xl-8">
                       <b-form-input type="email" v-model="manager.email" placeholder="change your email"
                                     :class="{ 'is-invalid': typesubmit && $v.manager.email.$error }"></b-form-input>
                       <div v-if="typesubmit && $v.manager.email.$error" class="invalid-feedback ">
                           <span v-if="!$v.manager.email.email" class="text-danger">Email Invalid !</span>
                       </div>
                   </div>
               </div>

               <div class="row mb-3">
                   <div class="col-xl-4 pt-2">Role</div>
                   <div class="col-xl-8"><b-form-input type="text"  v-model="manager.role" disabled/></div>
               </div>

           </div>

               <div class="col-xl-4 text-center m-auto">
                   <b-avatar class="outer"  :src="manager.avatar" size="6rem" ></b-avatar>
                   <upload-avatar class="inner"  :url="'me/avatar'" v-on:refresh-avatar="refresh"/>
               </div>

       </div>
        <b-button class="m-0 text-center btn-info w-100" style="border-radius:0 0 20px 20px;" @click="edit">
           Edit Profil
        </b-button>
    </b-modal>
</template>

<script>

    import {email} from "vuelidate/lib/validators";
    import UploadAvatar from "@/components/avatar/uploadAvatar";
    export default {
        name: "profil",
        components: {UploadAvatar},
        data(){
            return{
                typesubmit: false,
                manager: { }
            }
        },
        validations: {
            manager:{
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

        edit() {
            this.$http
                .post('edit', this.manager)
                .then(response => {
                    this.manager = response.data;
                    this.$store.commit('me',response.data)
                    this.$alertify.success("L'opération a réussi :)")
                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },
        me() {
            this.$http
                .get('me')
                .then(response => {
                    this.manager = response.data;

                })
                .catch(error => {
                        console.log(error)
                    }
                )
        },
        refresh(img) {
            this.manager.avatar = img
            this.$store.commit('me',this.manager)

        },
    }


    }
</script>

<style scoped  src="@/assets/styles/popup.css"></style>