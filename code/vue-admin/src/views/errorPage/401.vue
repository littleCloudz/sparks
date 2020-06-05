<template>
   <router-link to="/login">跳转登陆页</router-link>
</template>
<script>

   export default {
       name: 'Page401',
       data: ()=> {
         return {
             des: 'i am 401'
         }
       },
       beforeRouteEnter(to, from, next) {
           next(vm => {
               vm.des = 'i am modifyied'
           })
       },
       beforeRouteUpdate(to, from, next) {
           console.log('我是组件，我被复用了')
           console.log(this.des)
           next()

       },
       beforeRouteLeave(to, from, next){
           console.log(this.des)
           next()
       }
   }
</script>
