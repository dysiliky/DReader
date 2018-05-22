<template>
	<div class="arefresh">
		<mt-spinner type="fading-circle" color="#ffd900" :size="40"></mt-spinner>
	</div>
</template>

<script>
	import rem from '../../../static/js/rem.js'
	export default{
		name : 'refresh',
		methods : {
		}
	}
</script>

<style>
	.arefresh{
		margin-top:1rem;
		position:absolute;
		left:45%;
		top:1rem;
	}
</style>
