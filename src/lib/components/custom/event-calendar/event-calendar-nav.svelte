<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	let { lastWeek, currentWeek, nextWeek, date } = $props();
</script>

<!-- <div class="flex items-center justify-between"> -->
<div class="navigation">
	<div>
		<Button variant="outline" size="icon" onclick={lastWeek}>&lt;</Button>
		<Button variant="outline" onclick={currentWeek}>Current Week</Button>
		<Button variant="outline" size="icon" onclick={nextWeek}>&gt;</Button>
	</div>
	<div>
		<strong>Week of {date.toDateString()}</strong>
	</div>
</div>

<style>
	.navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}
</style>
