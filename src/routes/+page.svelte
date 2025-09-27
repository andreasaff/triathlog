<script lang="ts">
	import type { Event } from '$lib/components/custom/event-calendar/event';
	import EventCalendar from '$lib/components/custom/event-calendar/event-calendar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { trainingFormSchema } from './schema';
	import Dialog from '$lib/components/custom/dialog/dialog.svelte';
	import { formatDigitalTime } from '$lib/datetime';

	let { data }: { data: PageData } = $props();

	// clientside validation of the form
	const form = superForm(data.form, {
		validators: zodClient(trainingFormSchema),
		resetForm: true,
		clearOnSubmit: 'errors-and-message'
	});

	const { form: formData, enhance } = form;

	//start date for calendar (monday of current week)
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - (startDate.getDay() || 7) + 1);

	// time and duration options
	const MAXDURATIONHOURS = 8;

	//start times
	type Times = {
		digital: string;
		minutes: number;
	};

	const times: Times[] = [];
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 15) {
			times.push({ digital: formatDigitalTime(hour, minute), minutes: 60 * hour + minute });
		}
	}

	//duration
	let durations: Times[] = $state([]);

	$effect(() => {
		const setStartTime = $formData.startTime;
		if (!setStartTime) {
			durations = times.slice(1, 4 * MAXDURATIONHOURS + 1);
		} else {
			durations = times.filter((t) => {
				return t.minutes + parseInt(setStartTime) <= 1440 && t.minutes <= MAXDURATIONHOURS * 60;
			});
		}
	});

	//callback prop event handler for calendar
	let event: Event | undefined = $state();
	let isOpen: boolean = $state(false);

	function handleEventClick(ev: Event) {
		event = {
			id: ev.id,
			title: ev.title,
			date: ev.date,
			startMin: ev.startMin,
			durationMin: ev.durationMin,
			description: ev.description
		};
		isOpen = true;
	}

	let events: Event[] = $state(
		data.trainings.map((t) => ({
			id: t.id,
			title: t.type,
			date: t.date,
			startMin: t.startMin,
			durationMin: t.durationMin,
			description: t.description ? t.description : undefined
		}))
	);
</script>

<EventCalendar {startDate} {events} onEventClick={handleEventClick} />

<Dialog
	title={event?.id ? `Edit ${event.title} training` : 'Add new training'}
	description={event?.id
		? `Edit your ${event.title} training, planned for ${event.date.toLocaleDateString([], { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}`
		: `Add new training on ${event?.date.toLocaleDateString([], { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}`}
	bind:open={isOpen}
>
	{#snippet children()}
		<form method="POST" action="?/saveTraining" use:enhance>
			<!-- event id -->
			<input type="hidden" value={event?.id} name="id" />
			<!-- date -->
			<input type="hidden" value={event?.date} name="date" />
			<!-- traning type -->
			<Form.Field {form} name="type">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Type</Form.Label>
						<Select.Root type="single" bind:value={$formData.type} name={props.name}>
							<Select.Trigger {...props}>
								{$formData.type ? $formData.type : 'Select a tranings type...'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Running" label="Running" />
								<Select.Item value="Cycling" label="Cycling" />
								<Select.Item value="Swimming" label="Swimming" />
								<Select.Item value="Strength" label="Strength" />
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- startTime-->
			<Form.Field {form} name="startTime" class="pt-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Start at</Form.Label>
						<Select.Root type="single" bind:value={$formData.startTime} name={props.name}>
							<Select.Trigger {...props}>
								{$formData.startTime
									? times.find((t) => t.minutes.toString() === $formData.startTime)?.digital
									: 'Select time...'}
							</Select.Trigger>
							<Select.Content class="overflow:auto max-h-[200px]">
								{#each times as time}
									<Select.Item value={time.minutes.toString()} label={time.digital} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!--  duration -->
			<Form.Field {form} name="duration" class="pt-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Duration</Form.Label>
						<Select.Root type="single" bind:value={$formData.duration} name={props.name}>
							<Select.Trigger {...props}>
								{$formData.duration
									? durations.find((d) => d.minutes.toString() === $formData.duration)?.digital
									: 'Select time...'}
							</Select.Trigger>
							<Select.Content class="overflow:auto max-h-[200px]">
								{#each durations as duration}
									<Select.Item value={duration.minutes.toString()} label={duration.digital} />
								{/each}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- description -->
			<Form.Field {form} name="description" class="pt-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Notes</Form.Label>
						<Textarea
							class="h-[120px] resize-none break-all"
							{...props}
							placeholder="Add some notes..."
							bind:value={$formData.description}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex flex-row-reverse justify-around pt-2">
				<Form.Field {form} name="isCompleted">
					<Form.Control>
						{#snippet children({ props })}
							<Button
								{...props}
								class="text-white {$formData.isCompleted
									? 'bg-green-500 hover:bg-green-400'
									: 'bg-red-500 hover:bg-red-400'}"
								onclick={() => {
									$formData.isCompleted = !$formData.isCompleted;
								}}>{$formData.isCompleted ? 'Done!' : 'ToDo'}</Button
							>
						{/snippet}
					</Form.Control>
				</Form.Field>
				<Form.Button>Save</Form.Button>
			</div>
		</form>
	{/snippet}
</Dialog>
