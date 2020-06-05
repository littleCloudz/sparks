<template>
   <div>
      <router-link to="/401" active-class="acitve">401</router-link>
      <router-view />
   </div>
</template>
<script>
export default {
   name: 'App'
}
</script>
