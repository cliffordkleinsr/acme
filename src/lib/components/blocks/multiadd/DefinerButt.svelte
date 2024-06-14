<script lang="ts">
    import { Button } from "$lib/components/ui/button"
    
    // Options.svelte
    // export let options; // The array to be modified
    export let addOption; // Function to add an option
    export let remOption; // Function to remove an option
  
    // Other props and component logic...
  </script>
  
  <div>
    <Button variant="secondary" on:click={addOption}>Add Option</Button>
    <Button variant="secondary" on:click={remOption}>Remove Option</Button>
  </div>
  
  <!-- Usage -->