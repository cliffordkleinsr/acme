<script>
    import * as Select from "$lib/components/ui/select"
    import { Input } from '$lib/components/ui/input';
    import { Textarea } from '$lib/components/ui/textarea';
    import { Button } from '$lib/components/ui/button';
    import * as Card from "$lib/components/ui/card"
    
</script>
<Card.Root class="w-[400px] place-content-evenly">
    <Card.Header class="space-y-2"> 
      <Card.Title>Report an issue</Card.Title>
      <Card.Description>
        What area are you having problems with?
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-2 gap-5">
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold text-sm">
            Area
          </h1> 
          <Select.Root>
            <Select.Trigger class="w-[150px]">
              <Select.Value placeholder="Billing" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="light">Billing</Select.Item>
              <Select.Item value="dark">Submission</Select.Item>
              <Select.Item value="system">Team</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold text-sm">
            Security Level
          </h1>
          <Select.Root>
            <Select.Trigger class="w-[130px]">
              <Select.Value placeholder="Severity" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="light">Severity 1</Select.Item>
              <Select.Item value="dark">Severity 2</Select.Item>
              <Select.Item value="system">Highest</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-2 w-80">
          <h1 class=" font-semibold text-sm">
            Subject
          </h1>
          <Input placeholder="I need help with"/>
          <h1 class=" font-semibold text-sm">
            Description
          </h1>
          <Textarea placeholder="Please include all information relevant to your issue"/>
        </div>
      </div>
    </Card.Content>
    <Card.Footer class="grid grid-cols-2 gap-2 place-items-center">
      <Button variant="ghost" class="w-1/2">Cancel</Button>
      <Button variant="secondary"class="w-1/2">Submit</Button>
    </Card.Footer>
  </Card.Root>