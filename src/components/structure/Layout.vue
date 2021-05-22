<template>
  <div>
        <NavBar></NavBar>
        <router-view style="min-height: 75vh"></router-view>
      <footer class="footer">
          <hr class="my-2 bg-white"/>
          <div class="row p-2 m-0">
              <div class="col-6">{{ new Date().getFullYear() }} © ShellBoxes.</div>
              <div class="col-6 text-right">All Right Reserved</div>
          </div>
      </footer>

    </div>
</template>


<script>


    import NavBar from "./Navbar";
 export default {
        name: "Layout",
         components: {NavBar},
 }
</script>


<style scoped>
    .footer{

        color: white;
    }

</style>