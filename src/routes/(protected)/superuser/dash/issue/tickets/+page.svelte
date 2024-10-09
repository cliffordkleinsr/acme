<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './(tableau)/data-table.svelte';

	// export let data: PageData;
	const mockTickets = [
		{
			id: '1',
			name: 'Alice Johnson',
			category: 'Technical',
			priority: 'High',
			status: 'Open',
			since: '3600',
			createdat: '2023-06-01'
		},
		{
			id: '2',
			name: 'Bob Smith',
			category: 'Billing',
			priority: 'Medium',
			status: 'In Progress',
			since: '7200',
			createdat: '2023-06-02'
		},
		{
			id: '3',
			name: 'Charlie Brown',
			category: 'General Inquiry',
			priority: 'Low',
			status: 'Closed',
			since: '1800',
			createdat: '2023-06-03'
		}
		// Add more mock tickets as needed
	];
</script>

<DataTable data={mockTickets} />
