<template>
	<div id="app">
        <app-header v-if="isRenderHeader"/>
		<main>
			<div class="container">
				<router-view></router-view>
			</div>
		</main>
        <app-footer v-if="isRenderFooter"/>
		<loading :class="{show: isLoading}" />
	</div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import Loading from './components/Loading'

import { mapState, mapActions } from 'vuex'
export default {
	name: "app",
    components:{
        AppHeader, AppFooter, Loading
       
    },
	data() {
		return {
			
		};
	},
	computed:{
		...mapState([
			'isLoading'
		]),
		isRenderHeader(){
			var arrRouter = ['login', 'register']
			// console.log(this.$route)
			var routerName = this.$route.name
			if(arrRouter.indexOf(routerName) !== -1 ) return false; // neu != -1 thì có tồn tại 
			return true;
		},
		isRenderFooter(){
			var arrRouter = ['login', 'register','home-page']
			var routerName = this.$route.name
			if(arrRouter.indexOf(routerName) !== -1 ) return false; // neu != -1 thì có tồn tại 
			return true;
		},
		
	},
	methods: {
		...mapActions(['checkLogin'])
	},
	created(){
		//APP always chay dau tien
		this.checkLogin()
	}
};
</script>

<style>
</style>
