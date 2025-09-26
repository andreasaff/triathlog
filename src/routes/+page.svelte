<script lang="ts">
	import EventCalendar from '$lib/components/custom/event-calendar/event-calendar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { traningFormSchema, type TraningFormSchema } from './schema';

	let { data }: { data: PageData } = $props();

	// clientside validation of the form
	const form = superForm(data.form, {
		validators: zodClient(traningFormSchema)
	});

	const { form: formData, enhance } = form;

	//start date for calendar (monday of current week)
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - (startDate.getDay() || 7) + 1);

	// time and duration options
	const maxDurationHours = 8;

	//start times
	type Times = {
		digital: string;
		minutes: number;
	};

	const times: Times[] = [];
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 15) {
			const hh = String(hour).padStart(2, '0');
			const mm = String(minute).padStart(2, '0');
			times.push({ digital: `${hh}:${mm}`, minutes: 60 * hour + minute });
		}
	}

	//duration
	let durations: Times[] = $state([]);

	$effect(() => {
		const setStartTime = $formData.startTime;
		if (!setStartTime) {
			durations = times.slice(1, 4 * maxDurationHours + 1);
		} else {
			durations = times.filter((t) => {
				return t.minutes + parseInt(setStartTime) <= 1440 && t.minutes <= 480;
			});
		}
	});
</script>

<EventCalendar {startDate} events={data.tranings}>
	{#snippet children(date: Date)}
		<form method="POST" action="?/addTraning" use:enhance>
			<!--date -->
			<input type="hidden" value={date.toISOString()} name="date" />
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
							class="h-[120px] resize-none"
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
</EventCalendar>
