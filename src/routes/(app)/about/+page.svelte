<script lang="ts">
  import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
	import type { PageData } from "./$types";
	import SettingsQuestion from "./settings-question.svelte";

  export let data:PageData
</script>
<main class="flex-1">
  <section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div class="container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
      <div class="flex flex-col justify-center space-y-4">
        <div class="space-y-2">
          <div class="inline-block rounded-lg bg-primary text-white px-3 py-1 text-sm">Intuitive Insights</div>
          <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Premier platform for comprehensive solutions.
          </h1>
          <p class="max-w-[600px] text-muted-foreground md:text-xl">
            Intuitive Insight is the premier platform for comprehensive solutions. We focus in offering solutions tailored to the unique needs of businesses across various sectors. 
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1664575603992-0f17b771dd91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxnWU16VDN6TFBTNHx8ZW58MHx8fHx8"
        alt="Hero"
        class="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-auto"
      />
    </div>
  </section>
  
  <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <div class="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Mission</div>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
            Empowering Businesses with Insightful Data
          </h2>
          <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            At Intuitive Insights, our mission is to provide businesses with a powerful and user-friendly platform to
            gather valuable insights that drive informed decision-making. We believe that data-driven strategies
            are the key to sustainable growth and success.
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div class="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
      <div class="space-y-4">
        <div class="inline-block rounded-lg bg-primary text-white px-3 py-1 text-sm">Our Values</div>
        <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">Guiding Principles for Success</h2>
        <p class="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          At the core of Intuitive Insights are our values: innovation, customer-centricity, integrity, and continuous
          improvement. These principles shape our approach and drive us to deliver exceptional experiences for our
          clients.
        </p>
      </div>
      <div class="grid gap-6">
        <div class="grid gap-1">
          <h3 class="text-lg font-bold">Innovation</h3>
          <p class="text-sm text-muted-foreground">
            We constantly explore new technologies and methodologies to enhance the Insight gathering and provide
            cutting-edge solutions.
          </p>
        </div>
        <div class="grid gap-1">
          <h3 class="text-lg font-bold">Customer-Centricity</h3>
          <p class="text-sm text-muted-foreground">
            Our clients' success is our top priority. We work closely with them to understand their unique needs
            and deliver tailored solutions.
          </p>
        </div>
        <div class="grid gap-1">
          <h3 class="text-lg font-bold">Integrity</h3>
          <p class="text-sm text-muted-foreground">
            We are committed to maintaining the highest standards of ethics and transparency in all our dealings,
            ensuring the reliability of our platform and services.
          </p>
        </div>
        <div class="grid gap-1">
          <h3 class="text-lg font-bold">Continuous Improvement</h3>
          <p class="text-sm text-muted-foreground">
            We constantly seek feedback and explore new ways to enhance our platform, ensuring that our clients
            always have access to the latest and most effective tools.
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="w-full py-12 md:py-24 lg:py-32" id='contact'>
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <div class="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact Us</div>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch with Intuitive Insights</h2>
          <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or need assistance? Our team is here to help. Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
        </div>
      </div>
      <div class="mx-auto grid max-w-md gap-6 py-12">
        <SettingsQuestion data={data.form} />
      </div>
    </div>
  </section>
  
</main>