<script lang="ts">
	import EventCalendarHeader from "./event-calendar-header.svelte";
	import EventCalendarNav from "./event-calendar-nav.svelte";
	import EventCalendarTimeGrid from "./event-calendar-time-grid.svelte";
	import type { Event } from "./event.ts";


	//eventstore
	let events: Event[] = [];

	//days and hours for the calendar grid
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

	//calculate the current week's Monday date
	let currentWeeksMondayDate = getCurrentWeek();

	function getCurrentWeek(): Date {
		return getMonday(new Date());
	}

	function getMonday(date: Date): Date {
		const monday = new Date(date);
		monday.setDate(monday.getDate() - (monday.getDay() || 7) + 1);
		return monday;
	}

	function moveWeek(offset: number) {
		currentWeeksMondayDate.setDate(currentWeeksMondayDate.getDate() + offset);
		currentWeeksMondayDate = new Date(currentWeeksMondayDate); // needed to trigger reactivity
	}

	function getDateOfDay(index: number) {
		const date = new Date(currentWeeksMondayDate);
		date.setDate(date.getDate() + index);
		return date;
	}

	function addEvent(eventStartTime: Date, hour: number){
		console.log("Adding event at ", eventStartTime);
		//TODO: just a quick and dirty way to test the concept.
		const eventStartTimeWithHour = new Date(eventStartTime);
		eventStartTimeWithHour.setHours(hour);
		eventStartTimeWithHour.setMinutes(25);
		eventStartTimeWithHour.setSeconds(0);
		eventStartTimeWithHour.setMilliseconds(0);

		const title = prompt("Event title:");
		if(title){
			const event: Event= { 
				title,
				start: new Date(eventStartTimeWithHour),
				end: new Date(eventStartTimeWithHour.getTime() + 60 * 60 * 1000),  // getTime is in milliseconds + 60 * 60 * 1000 = 1 hour
			};
			events = [...events, event];
			console.log("Current events:", events);
		}
	}

</script>

<!-- TODO: refactor the days mapper out into a function -->
<EventCalendarNav 
    lastWeek={() => moveWeek(-7)} 
    currentWeek={() => { currentWeeksMondayDate = getCurrentWeek(); }} 
    nextWeek={() => moveWeek(7)} 
    date={currentWeeksMondayDate} />    
<EventCalendarHeader days={days.map((_, index) => getDateOfDay(index))}/>
<EventCalendarTimeGrid days={days.map((_, index) => getDateOfDay(index))} {hours} {addEvent} {events}/>