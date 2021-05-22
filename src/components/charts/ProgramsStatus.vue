<template>
    <apexchart type="bar" width="420" :options="chartOptions" :series="series"></apexchart>

</template>

<script>
    export default {
        name: "ProgramsStatus",
        data(){
            return{
                series: [{
                    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                }],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    title: {
                        text: 'Programs Status',
                        align: 'left',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            color:  '#fff'
                        },
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 4,
                            horizontal: true,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        labels: {
                            formatter: function (val) {
                                return val.toFixed(0)
                            }
                        },
                    }

                },
            }
        },
        created(){
            this.loadProgramsStatus()
        },
        methods:{
            loadProgramsStatus() {
                this.$http
                    .get('companies/24/programs_status')
                    .then(response => {
                        console.log("programs status",response.data)
                        let status = []
                        let series = []
                        response.data.forEach(function(element) {
                            series.push(parseInt(element.count))
                            status.push(element.status)
                        })
                        this.$set(this.series, 0, {name: 'Number', data: series})

                        this.chartOptions = {...this.chartOptions, ...{
                                labels: status
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