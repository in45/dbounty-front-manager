<template>
    <b-modal id="company-account" centered title="Manage Account" ref="modal"  title-class="font-20"
             hide-footer hide-header-close >
       <div class="row p-4">
           <iframe title="Coinify" src="https://trade-ui.coinify.com/widget?partnerId=159&amp;primaryColor=blue&amp;fontColor=gray&amp;cryptoCurrencies=BTC,ETH,XLM,USDT&amp;defaultCryptoCurrency=ETH" width="100%" height="450px" allow="camera" style="max-width: 750px; border: 0px;"></iframe></div>

    </b-modal>
</template>

<script>

    export default {
        name: "manageAccount",
        data(){
            return{

            }
        },


    methods: {

    }


    }
</script>

<style scoped  src="@/assets/styles/popup.css"></style>
<style scoped>
    /deep/ .modal-content{
        color: #00142C;
        background-color: #fff!important;
    }
</style>