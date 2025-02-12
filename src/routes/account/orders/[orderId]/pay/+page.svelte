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

	let store = order.Store

	// Merchant Numbers
	let Ecocash = store.ecocash_merchant_id;
	let Mpesa = store.mpesa_merchant_id;
	// Merchant Names
	let ecocashName = store.ecocash_name ?? store.name
	let mpesaName = store.mpesa_name ?? store.name

	let phone_number = $state<string>();    
	let merchant = $derived.by(() => {
		if (phone_number?.at(0) == '5') {
			return 'Mpesa';
		} else if (phone_number?.at(0) == '6') {
			return 'Ecocash';
		} else return null;
	}) as "Ecocash" | 'Mpesa' | null;
</script>

{#if !Ecocash && !Mpesa}
	<h1>Store does not have online payments yet</h1>
{:else if form?.success}
	<h1>Payed for Order #{order.id}</h1>
	<Button href={`/account/orders/${order.id}`}>Go to Order</Button>
{:else}
	<section>
		<form action="?/pay" method="POST">
			<Label for="phone_number">Phone Number (+266)</Label>
			<Input
				id="phone_number"
				type="tel"
				maxlength={8}
				placeholder={'Example: 54545454'}
				name="phone-number"
				bind:value={phone_number}
			/>
			<p class="text-sm">
				Your device with phone-number will be prompted by your Mpesa or Ecocash by USSD and you will
				enter your password
			</p>

			<!-- Hidden inputs -->
			<input type="hidden" name="orderId" value={order.id} />
			<input type="hidden" name="amount" value={order.price} />
			<input type="hidden" name="ecocash" value={Ecocash} />
			<input type="hidden" name="mpesa" value={Mpesa} />
			<input type="hidden" name="ecocash_name" value={ecocashName} />
			<input type="hidden" name="mpesa_name" value={mpesaName} />

			<!-- Submit -->
			{#if Ecocash && merchant == "Ecocash"}
				<Button formaction="?/payEconet">Pay</Button>
			{:else if Mpesa && merchant == "Mpesa"}
				<Button formaction="?/payMpesa">Pay</Button>
			{:else}
				<p>Enter PhoneNumber</p>
			{/if}

			<!-- Errors -->
			 {#if form?.error}
				<p>{form.error}</p>
			 {/if}
		</form>
	</section>
{/if}
