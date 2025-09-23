<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	let { open = $bindable(false), title, description, children } = $props();
</script>

<Dialog.Root bind:open>
	<!-- <Dialog.Trigger>Open Injected Thinker</Dialog.Trigger> -->
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>
				{description}
			</Dialog.Description>
		</Dialog.Header>
		{@render children()}
	</Dialog.Content>
</Dialog.Root>
