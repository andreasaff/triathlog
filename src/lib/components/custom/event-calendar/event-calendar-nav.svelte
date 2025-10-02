<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	let { lastWeek, currentWeek, nextWeek, date } = $props();
</script>

<div class="navigation" data-testid="calendar-nav">
	<div class="button-group">
		<Button variant="outline" size="icon" onclick={lastWeek}>&lt;</Button>
		<Button variant="outline" onclick={currentWeek}>Current Week</Button>
		<Button variant="outline" size="icon" onclick={nextWeek}>&gt;</Button>
	</div>
	<div class="week-label">
		<strong>Week of {date.toDateString()}</strong>
	</div>
</div>

<style>
	.navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 8px 0;
	}

	.button-group {
		display: flex;
		gap: 8px;
	}

	/* Hide week label and center buttons at small breakpoint */
	@media (max-width: 480px) {
		.navigation {
			justify-content: center;
		}

		.week-label {
			display: none;
		}
	}
</style>
