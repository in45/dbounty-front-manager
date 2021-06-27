<template>
    <b-modal id="bounty" centered ref="modal"   title-class="font-20" hide-footer
             hide-header >


                    <div class="form-group mt-3 mb-0">
                        <label class="m-2 text-white">Report Bounty : // Hunter Token</label>
                        <div class="row my-2 mx-0">
                            <div class="col-xl-8 ">
                                <b-form-input  type="text" v-model="bounty" ></b-form-input>
                            </div>
                            <div class="col-xl-4 ">
                                <input type="button"  class="btn btn-primary btn-block"  value="Submit" @click="Submit"/>
                            </div>

                        </div>

                    </div>


    </b-modal>
</template>

<script>
    export default {
        name: "bounty",
        data(){
            return{
                bounty:0,
            }
        },

        methods:{

            hideModal() {

                this.$refs['modal'].hide()
            },
            Submit(){

                this.$emit('bounty',this.bounty)
                this.hideModal()
            }
        }
    }
</script>

<style scoped>
    /deep/ .modal-content{
        padding: 12px;
        background-color: #10233B;
        border-radius: 20px!important;

    }


    /deep/ .nav-tabs .nav-link.active{
        background-color: inherit;
        border: 0;
        border-bottom:solid 1px white;
    }
    /deep/ .nav-tabs .nav-link.active span{
        color: white!important;
    }

    input[type='text'], input[type='file'], input[type='textarea']{
        border: 0;
        background-color: white;
        color: #222831;
        padding: 10px 10px;
    }







</style>