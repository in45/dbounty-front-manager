<template>
    <main>

            <div class="row mt-5 m-0">
                <div class="col-xl-11 m-auto">
                    <div class="row mb-5">
                        <h2 class="mb-2 col-8 text-white">Dashboard</h2>
                          </div>
                    <div class="row my-2">
                        <div class="col-xl-8">
                           <reports-stats/>
                        </div>

                        <div class="col-xl-4">
                            <programs-status/>
                           </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-xl-6">
                            <bounty-evolution/>
                             </div>
                        <div class="col-xl-6">
                            <programs-stats/>
                            </div>
                    </div>
                </div>
            </div>

    </main>
</template>

<script>

    import BountyEvolution from "@/components/charts/BountyEvolution";
    import ReportsStats from "@/components/charts/ReportsStats";
    import ProgramsStatus from "@/components/charts/ProgramsStatus";
    import ProgramsStats from "@/components/charts/ProgramsStats";
    export default {
        name: "Dashboard",
        components: {ProgramsStats, ProgramsStatus, ReportsStats, BountyEvolution},

    }
</script>

<style scoped>
    /deep/ .apexcharts-legend-text,/deep/ .apexcharts-text{
        color: #eeeeee!important;
    }
    /deep/ text{
        fill: #eeeeee;
    }

</style>