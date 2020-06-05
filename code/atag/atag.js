Vue.component('a-tag', {
    template: `<span @click="redirect" :class="['a-tag', {'a-tag-visited': visited}]">abc</span>`,
    data(){
      return {
          visited: false
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
            this.visited = true
            window.open(this.href, this.target)
        }
    }
})

new Vue({
    el: '#app',
})





