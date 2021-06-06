<template>
    <b-navbar toggleable="lg" class="nav">
        <b-navbar-brand @click="$router.push({name:'LandingPage'})" class="ml-5 mr-5" style="cursor: pointer">
            DBOUNTY
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class=" w-80 ">
                <b-nav-item  :to="{name: 'Dashboard'}" >Dashboard</b-nav-item>
                <b-nav-item  :to="{name: 'Programs'}"  >Programs</b-nav-item>
                <b-nav-item  :to="{name: 'Reports'}">Reports</b-nav-item>
                <b-nav-item  :to="{name: 'Hacktivity'}">Hacktivity</b-nav-item>
                <b-nav-item  :to="{name: 'Messages'}">Messages</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item right>
                    <button class="add"  @click="$router.push({name:'NewProgram'})">New Program</button>
                </b-nav-item>
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <b-avatar :src="$store.state.company.logo"></b-avatar>
                    </template>
                    <b-dropdown-item href="" v-b-modal.modal-profil>Profile</b-dropdown-item>
                    <b-dropdown-item href="" v-b-modal.profil-company>My Company</b-dropdown-item>
                    <b-dropdown-item href="" v-b-modal.company-managers>Managers</b-dropdown-item>
                    <b-dropdown-item href="" v-b-modal.company-account>Manage Account</b-dropdown-item>
                    <b-dropdown-item href="#">Logout</b-dropdown-item>
                </b-nav-item-dropdown>

            </b-navbar-nav>


        </b-collapse>
        <profil/>
        <company/>
        <managers/>
        <manage-account/>
    </b-navbar>



</template>

<script>

    import Profil from "@/components/profil";
    import Company from "@/components/company";
    import Managers from "@/components/managers";
    import ManageAccount from "@/components/manageAccount";
    export default {
        name: "NavBar",
        components: {ManageAccount, Managers, Company, Profil},
        data(){
            return{

            }

        },
        created(){
            this.me()
        },methods:{
            me(){
                this.$http
                    .get('me')
                    .then(response => {
                        console.log(response.data)
                        this.$store.commit('me',response.data)
                    })
                    .catch(error => {
                        console.log(error)

                    })
            }
        }

        }

</script>
<style scoped>

    .navbar-light .navbar-brand ,.nav-link,button,.nav-item{
        color: #eeeeee!important;
        font-family: "Heebo";
       font-weight: 600;
       line-height: 1.5em;
        text-align: center;
    }
    .nav-link.router-link-exact-active.router-link-active{
        color:  #0EC9AC!important;
        border-bottom: 2px solid  #0EC9AC;
    }

    /deep/ .nav-item.nav-item.nav-item a:hover {
        color: #0EC9AC!important;
    }
    /deep/ .nav-link.active {
        color:  #0EC9AC!important;
    }
    /deep/.navbar,.nav{
        background: #011936!important;

    }
    /deep/ .dropdown-toggle::after{
        display: none!important;
    }
    .add {
        color: white;
        padding: 8px;
        margin: auto;
        border-radius: 12px;
        background: #0EC9AC;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.4s;
    }

</style>