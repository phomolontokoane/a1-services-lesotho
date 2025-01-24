<script lang="ts">
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { PageData } from './$types.js';
	import SettingsForm from './settings-form.svelte';
	import type { FormSchema } from './schema.js';
	let { data }: { data: PageData } = $props();
</script>

<SettingsForm data={data as { form: SuperValidated<Infer<FormSchema>> }} />
