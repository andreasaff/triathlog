<script lang="ts">
	import type { Traning } from '$lib/server/db/queries/traning';
	import EventCalendarDialog from './event-calendar-dialog.svelte';
	import EventCalendarHeader from './event-calendar-header.svelte';
	import EventCalendarNav from './event-calendar-nav.svelte';

	let { startDate, events, children } = $props();

	//first day shown in the calendar
	let currentWeeksStartDate = $state(startDate);

	//days and hours for the calendar grid
	const dayDates = $derived(
		Array.from({ length: 7 }, (_, i) => getDateOfDay(currentWeeksStartDate, i))
	);
	const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

	// calcuate the dates for the week
	function getDateOfDay(startDate: Date, index: number) {
		const date = new Date(startDate);
		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + index);
		return date;
	}

	// move between weeks
	function moveWeek(startDate: Date, offset: number) {
		const date = new Date(startDate);
		date.setDate(date.getDate() + offset);
		return date;
	}

	// dialog
	let isOpen: boolean = $state(false);
	let fieldDate: Date = $state(new Date());
	let dialogTitle: string = $state('');
	let dialogDescription: string = $state('');

	function formatDescriptionDate(date: Date) {
		return date.toLocaleDateString([], {
			weekday: 'short',
			month: 'short',
			day: '2-digit',
			year: 'numeric'
		});
	}
</script>

<EventCalendarNav
	lastWeek={() => (currentWeeksStartDate = moveWeek(currentWeeksStartDate, -7))}
	currentWeek={() => (currentWeeksStartDate = startDate)}
	nextWeek={() => (currentWeeksStartDate = moveWeek(currentWeeksStartDate, 7))}
	date={currentWeeksStartDate}
/>
<EventCalendarHeader {dayDates} />
<div class="calendar">
	<!-- the time column -->
	<div class="time-column">
		{#each hours as hour}
			<div class="time-cell">{hour}</div>
		{/each}
	</div>

	<!-- the day columns -->
	{#each dayDates as day, _}
		<div class="day-column">
			{#each hours as _, hourIndex}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="day-cell"
					onclick={() => {
						isOpen = true;
						fieldDate = day;
						dialogTitle = 'Add new training';
						dialogDescription = `Add new training on ${formatDescriptionDate(fieldDate)}`;
					}}
				></div>
			{/each}

			<!-- render events -->
			{#each events.filter((event: Traning) => event.date.toDateString() === day.toDateString()) as event (event.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={() => {
						isOpen = true;
						fieldDate = event.date;
						dialogTitle = 'Edit training';
						dialogDescription = `Edit your traning planned for ${formatDescriptionDate(event.date)}`;
					}}
					class="event"
					style="
                            top: {event.startMin}px; 
                            height: {event.durationMin}px;
                        "
				>
					{event.type} <br />
					<!-- <small
						>{event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString(
							[],
							{ hour: '2-digit', minute: '2-digit' }
						)}</small
					> -->
				</div>
			{/each}
		</div>
	{/each}
</div>

<EventCalendarDialog title={dialogTitle} description={dialogDescription} bind:open={isOpen}>
	{@render children(fieldDate)}
</EventCalendarDialog>

<style>
	.calendar {
		display: grid;
		grid-template-columns: 60px repeat(7, 1fr);
		border-top: 1px solid #ccc;
	}

	.time-column {
		display: flex;
		flex-direction: column;
		border-right: 1px solid #ccc;
	}

	.time-cell {
		height: 60px;
		font-size: 12px;
		padding-right: 4px;
		text-align: right;
		line-height: 60px;
		border-bottom: 1px solid #eee;
	}

	.day-column {
		position: relative;
		border-right: 1px solid #ccc;
	}

	.day-cell {
		height: 60px;
		border-bottom: 1px solid #eee;
		cursor: pointer;
	}

	.event {
		position: absolute;
		left: 4px;
		right: 4px;
		background: rgba(0, 128, 255, 0.3);
		border-left: 4px solid #007bff;
		padding: 4px;
		font-size: 12px;
		border-radius: 3px;
	}
</style>
