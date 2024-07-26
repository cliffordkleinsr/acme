<script lang="ts">
	import type { PageData } from "./$types";
    import SettingsPayment from "./settings-payment.svelte";
    
    export let data: PageData
    const { total_payable } = data
    
</script>

<div class="" >
<SettingsPayment data={data.form} payable={total_payable}/>
</div>
