import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageSettings from '@/components/PageSettings'
import PageSettingProfile from '@/components/PageSettingProfile'
import PageSettingEmail from '@/components/PageSettingEmail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/settings',
      component: PageSettings,
      children: [
        {
          path: 'profile/:userId',
          component: PageSettingProfile,
          props: true
        },
        {
          path: 'email',
          component: PageSettingEmail
        }
      ]
    }
  ]
})
