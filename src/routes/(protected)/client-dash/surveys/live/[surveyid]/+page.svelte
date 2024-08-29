<script lang="ts">
    import * as Card from "$lib/components/ui/card"
	  import { Separator } from '$lib/components/ui/separator'
    import Cackender from "$lib/components/blocks/liveComponent/cackendar.svelte"
	  import Issue from "$lib/components/blocks/liveComponent/issue.svelte"

    export let data
    export let form
    const { Role, survey_data, features:{gender_active, ages, maxagents}} = data

    let Props = {
      user: Role,
      gen_act: gender_active!,
      age_act: ages!,
      target: maxagents!,
      form
    }

</script>
<!-- If is premium -->
<div class="flex flex-col m-4 gap-10">
    <h1 class="text-3xl font-semi-bold text-start font-mono ml-2">
        Going live
    </h1>
    <div class="grid lg:grid-cols-3 gap-3">
      {#each survey_data as s}
        <Card.Root class="lg:w-11/12 lg:col-span-2">
          <Card.Header class="space-y-4">
            <Card.Title><span class="font-mono text-xl">Name</span>: {s.title}</Card.Title>
            <Card.Description>ID : {s.id}</Card.Description>
            <Separator />
          </Card.Header>
          <Card.Content class="lg:flex gap-7 mr-9">
            <img class="w-52" src="https://i.postimg.cc/TY3g7WHD/vector3.png" alt="s">
            <div class="flex flex-col space-y-4 mt-16 ">
              <h1 class="text-xl font-semibold font-mono">
                Description
              </h1>
              <p class="text-lg">{s.desc}</p>
            </div>
          </Card.Content>
          <Card.Footer class="flex flex-col gap-2 float-start space-y-2">
              <Cackender {...Props} />
          </Card.Footer>
        </Card.Root>
        {/each}
        <Issue />
        <p class="font-mono text-sm m-2">All rights reserved Acme Inc</p>
    </div>
</div>