import { createRouter, createWebHistory } from 'vue-router'
const HomeScreen = () => import ('./view/StartScreen.vue')
const QuestionScreen = () => import ('./view/Questions.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'HomeScreen',
        component: HomeScreen,
    },
    {
        path: '/questions',
        name: 'Questions',
        component: QuestionScreen
    }
  ]
})