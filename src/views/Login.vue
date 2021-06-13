<template>
    <div class="row mr-0" style="margin-top: 12vh;">
        <div class="col-xl-5 m-auto ">
            <div class="card">
                <div class="card-header text-center">
                    <img src="@/assets/images/logo.svg"  width="100">

                </div>
                <div class="card-body">
                    <form>
                        <div class="row">

                            <div class="col-xl-9 m-auto font-size-14">
                                <form id="form"  method="POST" @submit.prevent="handleSubmit">
                                    <div class="form-group mt-3 mb-0">
                                        <label class="pb-2">Email :</label>
                                        <b-form-input type="text" v-model="manager.email" placeholder="Enter your Email"
                                                      :class="{ 'is-invalid': typesubmit && $v.manager.email.$error }"></b-form-input>
                                        <div v-if="typesubmit && $v.manager.email.$error" class="invalid-feedback ">
                                            <span v-if="!$v.manager.email.required" class="text-danger">The Value is required !</span>
                                            <span v-if="!$v.manager.email.email" class="text-danger">Invalid Email !</span>
                                        </div>

                                    </div>
                                    <div class="form-group mt-3 mb-0">
                                        <label class="pb-2">Password :</label>
                                        <!--                            <vue-fontawesome :icon="icon" size="2" color="dark" id="togglePassword" @click="visibility"></vue-fontawesome>-->
                                        <b-form-input type="password"  v-model="manager.password" id="password" placeholder="Enter your password"
                                                      :class="{ 'is-invalid': typesubmit && $v.manager.password.$error }"></b-form-input>
                                        <div v-if="typesubmit && $v.manager.password.$error" class="invalid-feedback ">
                                            <span v-if="!$v.manager.password.required" class="text-danger"> The Value is required !</span>
                                        </div>
                                    </div>

                                    <div class="mt-3">
                                        <input type="submit"  class="btn btn-block"  value="Login" />
                                    </div>
                                </form>
                                  </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {email, required} from "vuelidate/lib/validators";
    import Vue from "vue";
    export default {
        name: "Login",
        data() {
            return {
                typesubmit: false,
                manager: {
                    email: '',
                    password: '',
                }

            }
        },
        validations: {
            manager:{
                email: {required,email},
                password: {required},
            },
        },
        created(){
            this.typesubmit=false;
            this.manager={}
        },

        methods: {

            handleSubmit() {
                this.typesubmit = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.login();

            },

            login() {
                this.$http
                    .post('login', this.manager)
                    .then(response => {
                        console.log(response.data.token.access_token)
                        this.$alertify.success("Success :)")
                        const token = response.data.token.access_token;
                        localStorage.setItem('token', token)
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        this.$store.commit('me',response.data.manager)
                        this.$store.commit('mycompany',response.data.manager.company)
                        this.$router.push({'name':'Dashboard'})
                    })
                    .catch(error => {
                        console.log(error)
                        this.$alertify.error("Le mot de passe / l'email est incorrect");
                    })
            }
        }
    }
</script>

<style scoped>



    .card{
        background-color: #10233B;
        border-radius: 20px!important;
    }
    .card-header h1{
        margin: auto;
        font-size: 30px;
        font-weight: bold;

    }
    label{
        color: white;
    }



    input[type="text"],input[type="password"]{
        border: 0;
        background-color: white;
        color:#222831;
        border-bottom: solid 1px #0072bc;
        padding: 10px 10px;
    }

    i {
        cursor: pointer;
        float: right;
        position: relative;
        top: 32px;
        color: black;
        margin-left: 4px;
    }

    .btn{
        background-color: #0EC9AC;
        color: white
    }


</style>