<script lang="ts">
	import { browser } from "$app/environment";
    import Grid from "gridjs-svelte"
    import "gridjs/dist/theme/mermaid.min.css"
    type ClientSubs = {
        name:string
        email:string
        amount:string,
        package:string
    }
   
    let isDesktop = true
    
    if (browser) {
      isDesktop = window.innerWidth >= 768
    }
    export let subscriptions:ClientSubs[] =[]
    const columns = [
        {
            id: 'name',
            name: 'Name'
        },
        {
            id: 'email',
            name: 'Email',
            formatter: (cell:string) => cell.toLocaleLowerCase()
        },
        ,
        {
            id: 'package',
            name: 'Package Type'
        },
        {
            id: 'amount',
            name:'Amount (USD)',
            formatter: (cell: string) => `$${cell}`
        }
    ]
</script>
<Grid 
    {columns}
    data={subscriptions} 
    pagination={{enabled:true, limit:7}}
    autoWidth
    className={{
        td: 'text-sm',
        pagination:'text-sm'
    }}
/>





