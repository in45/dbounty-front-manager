<template>
    <div class="row mx-0">
        <div class="col-xl-6">
            <apexchart type="pie" width="420" :options="chartOptions" :series="series" v-if="series.length"></apexchart>
        </div>
        <div class="col-xl-6">
            <apexchart type="donut" width="380" :options="chartOptions2" :series="series2" v-if="series2.length"></apexchart>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ReportsStats",
        data(){
            return{
                series: [],
                chartOptions: {
                    chart: {
                        type: 'pie',
                    },
                    title: {
                        text: 'Reports Status',
                        align: 'left',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            color:  '#fff'
                        },
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
                series2: [],
                chartOptions2: {
                    chart: {
                        type: 'donut',
                    },
                    title: {
                        text: 'Reports Severity',
                        align: 'left',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            color:  '#fff'
                        },
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            }
        },
        created(){
            this.loadReportsStats()
        },
        methods:{
            loadReportsStats() {
                this.$http
                    .get('companies/24/reports_stats')
                    .then(response => {
                        let data  = response.data;
                        console.log("reports status",data.status)
                        console.log("reports severity",data.severity)
                       let status = []
                       let severity = []
                        let series = []
                        let series2 = []
                        data.status.forEach(function(element) {
                            series.push(parseInt(element.status_count))
                            status.push(element.status)
                        })
                        data.severity.forEach(function(element) {
                            series2.push(parseInt(element.severity_count))
                            severity.push(element.severity)
                        })

                        this.series=series
                        this.series2=series2
                        this.chartOptions = {...this.chartOptions, ...{
                                labels: status
                            }}
                        this.chartOptions2 = {...this.chartOptions2, ...{
                                labels: severity
                            }}
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        }
    }
</script>

<style scoped>

</style>