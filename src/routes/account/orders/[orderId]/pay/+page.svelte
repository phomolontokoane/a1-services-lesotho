<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { PageData, ActionData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	let { data, form }: Props = $props();
	let { order } = data;

	let store = order.Store;

	// Merchant Numbers
	let Ecocash = store.ecocash_merchant_id;
	let Mpesa = store.mpesa_merchant_id;
	// Merchant Names
	let ecocashName = store.ecocash_name ?? store.name;
	let mpesaName = store.mpesa_name ?? store.name;

	let phone_number = $state<string>();
	let merchant = $derived.by(() => {
		if (phone_number?.at(0) == '5') {
			return 'Mpesa';
		} else if (phone_number?.at(0) == '6') {
			return 'Ecocash';
		} else return null;
	}) as 'Ecocash' | 'Mpesa' | null;
</script>

{#if !Ecocash && !Mpesa}
	<h1>Store does not have online payments yet</h1>
{:else if form?.success}
	<h1>You will recieve a message in a moment</h1>
	<Button href={`/account/orders/${order.id}`}>Go to Order</Button>
{:else}
	<section class="space-y-4">
		<div>
			<h1 class="text-2xl">Paying for Order #{order.id} - R {order.price.toPrecision(3)}</h1>
			<p class="text-xs my-1">Enter details below</p>
		</div>
		<form action="?/payEconet" method="POST">
			<Label for="phone_number">Phone Number (+266)</Label>
			<Input
				id="phone_number"
				type="tel"
				placeholder={'Example: 54545454'}
				name="phone_number"
				bind:value={phone_number}
				required
			/>

			<p class="text-xs text-white/60">
				Your device with phone-number will be prompted by your Mpesa or Ecocash by USSD and you
				will enter your password
			</p>

			<!-- Hidden inputs -->
			<input type="hidden" name="orderId" value={order.id} />
			<input type="hidden" name="amount" value={order.price} />
			<input type="hidden" name="ecocash" value={Ecocash} />
			<input type="hidden" name="mpesa" value={Mpesa} />
			<input type="hidden" name="ecocash_name" value={ecocashName} />
			<input type="hidden" name="mpesa_name" value={mpesaName} />

			<!-- Submit -->
			<div class="my-4">
				{#if Ecocash && merchant == 'Ecocash'}
					<Button class="w-full rounded" formaction="?/payEconet" type="submit">Pay Ecocash</Button>
				{:else if Mpesa && merchant == 'Mpesa'}
					<Button class="w-full rounded" formaction="?/payMpesa" type="submit">Pay Mpesa</Button>	
				{/if}
			</div>

			<!-- Errors -->
			{#if form?.error}
				<p class="text-sm text-red-600">Error: {form.error}</p>
			{/if}
		</form>
	</section>
{/if}
