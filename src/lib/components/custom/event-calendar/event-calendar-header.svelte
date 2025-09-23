<script lang="ts">
	let { dayDates } = $props();
</script>

<!--- <div class="grid gap-4" style="grid-template-columns: repeat({days.length}, 1fr);"> -->
<div class="header">
	<div></div>
	{#each dayDates as dayDate}
		<div>
			{dayDate.toLocaleDateString('en-US', { weekday: 'short' })}<br />
			{dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
		</div>
	{/each}
</div>

<style>
	.header {
		display: grid;
		grid-template-columns: 60px repeat(7, 1fr);
		font-weight: bold;
		background: #f8f8f8;
		border-bottom: 1px solid #ccc;
		padding: 4px 0;
	}

	.header div {
		text-align: center;
		font-size: medium;
		font-weight: normal;
	}
</style>
