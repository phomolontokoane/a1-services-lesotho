<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { users } = data;
</script>

<section class="space-y-3">
	<div class="flex items-center justify-between text-xl font-semibold">
		<h2>Users</h2>
		<Button href="/admin/users/new" class="rounded">New User</Button>
	</div>
	<Table.Root>
		<Table.Caption>Users</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Id</Table.Head>
				<Table.Head>Phone Number</Table.Head>
				<Table.Head>First Name</Table.Head>
				<Table.Head class="text-right">{''}</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each users as u, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">{u.id}</Table.Cell>
					<Table.Cell>{u.phone_number}</Table.Cell>
					<Table.Cell>{u.first_name}</Table.Cell>
					<Table.Cell class="text-right"
						><Button href={`/admin/users/${u.id}`}>View</Button></Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</section>
