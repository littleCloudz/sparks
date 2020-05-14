<template>
  <div>
    <sidebar></sidebar>
    <router-view />
  </div>
</template>
<script>
  import Sidebar from '@/components/Sidebar'
  export default {
    components: {
      Sidebar
    }
  }

</script>
