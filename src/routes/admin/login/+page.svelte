<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {Label} from '$lib/components/ui/label/index';
    import type { PageData, ActionData } from './$types';

    interface Props {
        data: PageData;
        form: ActionData
    }

    let { data, form }: Props = $props();
</script>

<h1>
    Login Page
</h1>

<form method="POST" action="?/login_admin">
    <Label for="email">Email</Label>
    <Input id="email" name="email" type="email" required/>

    <Label for="password">Password</Label>
    <Input id="password" name="password" type="password" required/>

    <Button type="submit" class="w-full my-4">Login Admin</Button>
</form>

{#if form?.success}
    <p>Logged In</p>
{/if}

{#if form?.error}
    <p>{form.error}</p>
{/if}