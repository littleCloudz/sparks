Vue.component('a-tag', {
    template: '<span @click="redirect" :class="tagClassName">abc</span>',
    data(){
      return {
          tagClassName: 'atag'
      }
    },
    props: {
        href: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        }
    },
    methods: {
        redirect(){
            window.open(this.href, this.target)
        }
    }
})

new Vue({
    el: '#app',


})





