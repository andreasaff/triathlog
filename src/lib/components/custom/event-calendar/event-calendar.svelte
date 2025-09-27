<script lang="ts">
	import { formatDigitalTime, formatDigitalTimeByMinutes } from '$lib/datetime';
	import type { Event } from './event';
	import { getDateOfDay, moveWeek } from './event-calendar';
	import EventCalendarHeader from './event-calendar-header.svelte';
	import EventCalendarNav from './event-calendar-nav.svelte';

	interface Props {
		startDate: Date;
		events: Event[];
		onEventClick: (event: Event) => any;
	}

	let { startDate, events, onEventClick }: Props = $props();

	//first day shown in the calendar
	let currentWeeksStartDate = $state(startDate);

	//days and hours for the calendar grid
	const dayDates = $derived(
		Array.from({ length: 7 }, (_, i) => getDateOfDay(currentWeeksStartDate, i))
	);

	const hours = Array.from({ length: 24 }, (_, i) => formatDigitalTime(i, 0));
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
					onclick={() =>
						onEventClick({
							date: day,
							startMin: hourIndex * 60,
							durationMin: (hourIndex + 1) * 60
						})}
				></div>
			{/each}

			<!-- render events -->
			{#each events.filter((event: Event) => event.date.toDateString() === day.toDateString()) as event (event.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={() =>
						onEventClick({
							id: event.id,
							title: event.title,
							date: day,
							startMin: event.startMin,
							durationMin: event.durationMin,
							description: event.description
						})}
					class="event"
					style="
                            top: {event.startMin}px; 
                            height: {event.durationMin}px;
                        "
				>
					{event.title} <br />
					<small
						>{formatDigitalTimeByMinutes(event.startMin)} - {formatDigitalTimeByMinutes(
							event.startMin + event.durationMin
						)}</small
					>
				</div>
			{/each}
		</div>
	{/each}
</div>

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
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}
</style>
