<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import type { AlertDialog as info } from 'bits-ui';

	interface Props extends info.RootProps {
		title: string;
		descrption?: string;
		confirmText?: string;
		action?: () => void;
	}
	let {
		open = $bindable(false),
		title,
		descrption = '',
		action = () => {},
		confirmText = 'confirm'
	}: Props = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>
				{descrption}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={action}>{confirmText}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
