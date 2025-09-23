<script lang="ts">
	import EventCalendarHeader from './event-calendar-header.svelte';
	import EventCalendarNav from './event-calendar-nav.svelte';
	import type { Event } from './event.ts';

	let { startDate } = $props();

	//eventstore
	let events: Event[] = $state([]);

	//current weeks monday
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

	// needed as long as we don't write to db
	function addEvent(eventStartTime: Date, hour: number) {
		console.log('Adding event at ', eventStartTime);
		//TODO: just a quick and dirty way to test the concept.
		const eventStartTimeWithHour = new Date(eventStartTime);
		eventStartTimeWithHour.setHours(hour);
		eventStartTimeWithHour.setMinutes(25);
		eventStartTimeWithHour.setSeconds(0);
		eventStartTimeWithHour.setMilliseconds(0);

		const title = prompt('Event title:');
		if (title) {
			const event: Event = {
				title,
				start: new Date(eventStartTimeWithHour),
				end: new Date(eventStartTimeWithHour.getTime() + 60 * 60 * 1000) // getTime is in milliseconds + 60 * 60 * 1000 = 1 hour
			};
			events = [...events, event];
			console.log('Current events:', events);
		}
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
				<div class="day-cell" onclick={() => addEvent(day, hourIndex)}></div>
			{/each}

			<!-- render events -->
			{#each events.filter((event: Event) => event.start.toDateString() === day.toDateString()) as event (event.title)}
				<div
					class="event"
					style="
                            top: {event.start.getHours() * 60 + event.start.getMinutes()}px; 
                            height: {(event.end.getTime() - event.start.getTime()) / (1000 * 60)}px;
                        "
				>
					{event.title} <br />
					<small
						>{event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString(
							[],
							{ hour: '2-digit', minute: '2-digit' }
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
	}
</style>
