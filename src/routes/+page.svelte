<script lang="ts">
	import EventCalendar from "$lib/components/custom/event-calendar/event-calendar.svelte";
	import EventCalendarDialog from "./event-calendar-dialog.svelte";
	import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<EventCalendar />
<EventCalendarDialog {data} date={new Date()}/>