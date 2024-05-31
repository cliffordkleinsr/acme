<script lang="ts">
  import { Button } from "$lib/components/ui/button"
	import { Separator } from "$lib/components/ui/separator"

</script>
<!-- Hero -->
<div class="relative lg:h-[785px] h-[600px] overflow-hidden before:absolute bg-[rgba(0,0,0,0.45)] before:top-0 before:start-1/2 before:bg-[url(https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] dark:before:bg-[url('https://images.unsplash.com/photo-1668455199701-284281127a87?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] before:bg-no-repeat before:bg-center before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
  <div class="relative z-10">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div class="max-w-screen-xl text-start mx-auto lg:py-40">
        <!-- <p class="text-sm font-medium bg-clip-text bg-gradient-to-l from-orange-300 to-red-500 text-transparent dark:from-pink-500 dark:to-violet-500">
          The shape of tomorrow 
        </p> -->
        <!-- Title -->
        <div class="mt-5 max-w-3xl space-y-1">
          <span class="text-primary"></span>
          <h1 class="block font-semibold text-primary text-3xl md:text-4xl lg:text-5xl dark:text-neutral-200 drop-shadow-xl">
            Intuitive Insights 
          </h1>
          
          <h1 class="block font-semibold text-neutral-50 text-xl md:text-2xl lg:text-3xl dark:text-neutral-200 drop-shadow-xl">
            Corporate reputation <span class=" font-extralight">|</span> Customer experience
          </h1>
        </div>
        <!-- End Title -->
      
          <div class="flex flex-col gap-1">
            <div class="flex mt-5 max-w-2xl gap-2">
              <p class="text-5xl text-white font-extralight"> | </p>
              <p class="text-md text-neutral-50 dark:text-neutral-400 drop-shadow-md" >
                We provide strategies and insights to enhance corporate reputation and brand image, elevate brand visibility and give customers the best experience.
              </p>
            </div>
          </div>
        <div class="flex lg:justify-start justify-center gap-5 pt-10">
          <Button class="hover:bg-white hover:text-black transition ease-in-out duration-700 rounded-xl" href='/about' size="lg">Gather Insights</Button>
          <Button class="hover:bg-primary hover:text-white transition ease-in-out duration-700 rounded-xl" variant='secondary' href='/client/signin' size="lg">Client Login </Button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End Hero -->
<!-- Features -->
<div class="max-w-[80rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto lg:mt-10">
  <div class="grid md:grid-cols-2 md:gap-28 gap-12 md:items-center">
    <div class="mt-5 sm:mt-10 lg:mt-0">
      <div class="space-y-5 md:space-y-7">
        <h2 class="font-bold text-3xl lg:text-4xl text-primary">
          Welcome to Intuitive Insights
        </h2>
        <p class="text-gray-500 dark:text-neutral-500">
          Intuitive Insights offers comprehensive analysis by refining corporate reputation, brand visibility, and customer journey with our extensive techniques.
        </p>
        <h1 class="text-xl font-bold text-gray-500">Why choose Intuitive Insights ?</h1>
        <!-- List -->
        <ul class="space-y-4 sm:space-y-4">
          <li class="flex space-x-3">
            <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-orange-50 text-primary dark:bg-orange-800/30 dark:text-primary">
              <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>

            <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
              <span class="font-bold">Commitment to Excellence</span>: Quality is our top priority. We adhere to the highest standards in all our processes and deliverables, ensuring that you receive the best possible outcomes elevating your brand image. Our commitment to excellence drives us to continuously improve and excel in all aspects of our work. 
            </span>
          </li>

          <li class="flex space-x-3">
            <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-orange-50 text-primary dark:bg-orange-800/30 dark:text-primary">
              <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>

            <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
              <span class="font-bold">Expert Team</span>: Our team comprises industry experts with extensive experience and diverse skill sets. They help your organization maintain its corporate reputation and brand image. Their dedication, knowledge, and expertise which are the backbone of your success, ensures that you receive the highest level of service and insights.
            </span>
          </li>

          <li class="flex space-x-3">
            <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-orange-50 text-primary dark:bg-orange-800/30 dark:text-primary">
              <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>

            <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
              <span class="font-bold">Customer-Centric Focus</span>: We place your clients at the heart of everything we do. By understanding their unique needs and challenges, we tailor our solutions to meet your specific goals, ensuring a personalized and effective partnership for the best customer experience.
            </span>
          </li>
        </ul>
        <!-- End List -->
      </div>
    </div>
    <img class="w-[25rem] rounded-lg" src="https://images.unsplash.com/photo-1590098563176-07884b06d7f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="as" >
  </div>
</div>
<!-- Clients -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <!-- Title -->
  <div class="w-2/3 sm:w-1/2 lg:w-1/3 mx-auto text-center mb-6">
    <h2 class="text-gray-600 dark:text-neutral-400">Powered by</h2>
  </div>
  <!-- End Title -->

  <div class="flex justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
    <svg class="w-9 hover:text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767a4.1 4.1 0 0 1-.703-3.107a4 4 0 0 1 .134-.522l.105-.321l.287.21a7.2 7.2 0 0 0 2.186 1.092l.208.063l-.02.208a1.25 1.25 0 0 0 .226.83a1.34 1.34 0 0 0 1.435.533a1.2 1.2 0 0 0 .343-.15l5.59-3.562a1.16 1.16 0 0 0 .524-.778a1.24 1.24 0 0 0-.211-.937a1.34 1.34 0 0 0-1.435-.533a1.2 1.2 0 0 0-.343.15l-2.133 1.36a4 4 0 0 1-1.135.499a4.44 4.44 0 0 1-4.765-1.766a4.1 4.1 0 0 1-.702-3.108a3.86 3.86 0 0 1 1.742-2.582l5.589-3.563a4 4 0 0 1 1.135-.499a4.44 4.44 0 0 1 4.765 1.767a4.1 4.1 0 0 1 .703 3.107a4 4 0 0 1-.134.522l-.105.321l-.286-.21a7.2 7.2 0 0 0-2.187-1.093l-.208-.063l.02-.207a1.25 1.25 0 0 0-.226-.831a1.34 1.34 0 0 0-1.435-.532a1.2 1.2 0 0 0-.343.15L8.62 9.368a1.16 1.16 0 0 0-.524.778a1.24 1.24 0 0 0 .211.937a1.34 1.34 0 0 0 1.435.533a1.2 1.2 0 0 0 .344-.151l2.132-1.36a4 4 0 0 1 1.135-.498a4.44 4.44 0 0 1 4.765 1.766a4.1 4.1 0 0 1 .702 3.108a3.86 3.86 0 0 1-1.742 2.583l-5.589 3.562a4 4 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.4 6.4 0 0 0-2.896 4.295a6.75 6.75 0 0 0 .666 4.336a6.4 6.4 0 0 0-.96 2.396a6.83 6.83 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.4 6.4 0 0 0 2.896-4.295a6.76 6.76 0 0 0-.665-4.336a6.4 6.4 0 0 0 .958-2.396a6.83 6.83 0 0 0-1.167-5.168"/></svg>
    <svg class="w-9 hover:text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5.353 11.823a1.036 1.036 0 0 0-.395-1.422a1.063 1.063 0 0 0-1.437.399L.138 16.702a1.035 1.035 0 0 0 .395 1.422a1.063 1.063 0 0 0 1.437-.398zm11.216 0a1.036 1.036 0 0 0-.394-1.422a1.064 1.064 0 0 0-1.438.399l-3.382 5.902a1.036 1.036 0 0 0 .394 1.422c.506.283 1.15.104 1.438-.398zm7.293-4.525a1.036 1.036 0 0 0-.395-1.422a1.06 1.06 0 0 0-1.437.399l-3.383 5.902a1.036 1.036 0 0 0 .395 1.422a1.063 1.063 0 0 0 1.437-.399zm-11.219 0a1.035 1.035 0 0 0-.394-1.422a1.064 1.064 0 0 0-1.438.398l-3.382 5.903a1.036 1.036 0 0 0 .394 1.422c.506.282 1.15.104 1.438-.399z"/></svg>
    <svg class="w-9 hover:text-[#31648C]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M23.56 14.723a.5.5 0 0 0-.057-.12q-.21-.395-1.007-.231c-1.654.34-2.294.13-2.526-.02c1.342-2.048 2.445-4.522 3.041-6.83c.272-1.05.798-3.523.122-4.73a1.6 1.6 0 0 0-.15-.236C21.693.91 19.8.025 17.51.001c-1.495-.016-2.77.346-3.116.479a10 10 0 0 0-.516-.082a8 8 0 0 0-1.312-.127c-1.182-.019-2.203.264-3.05.84C8.66.79 4.729-.534 2.296 1.19C.935 2.153.309 3.873.43 6.304c.041.818.507 3.334 1.243 5.744q.69 2.26 1.433 3.582q.83 1.493 1.714 1.79c.448.148 1.133.143 1.858-.729a56 56 0 0 1 1.945-2.206c.435.235.906.362 1.39.377v.004a11 11 0 0 0-.247.305c-.339.43-.41.52-1.5.745c-.31.064-1.134.233-1.146.811a.6.6 0 0 0 .091.327c.227.423.922.61 1.015.633c1.335.333 2.505.092 3.372-.679c-.017 2.231.077 4.418.345 5.088c.221.553.762 1.904 2.47 1.904q.375.001.829-.094c1.782-.382 2.556-1.17 2.855-2.906c.15-.87.402-2.875.539-4.101c.017-.07.036-.12.057-.136c0 0 .07-.048.427.03l.044.007l.254.022l.015.001c.847.039 1.911-.142 2.531-.43c.644-.3 1.806-1.033 1.595-1.67M2.37 11.876c-.744-2.435-1.178-4.885-1.212-5.571c-.109-2.172.417-3.683 1.562-4.493c1.837-1.299 4.84-.54 6.108-.13l-.01.01C6.795 3.734 6.843 7.226 6.85 7.44c0 .082.006.199.016.36c.034.586.1 1.68-.074 2.918c-.16 1.15.194 2.276.973 3.089q.12.126.252.237c-.347.371-1.1 1.193-1.903 2.158c-.568.682-.96.551-1.088.508c-.392-.13-.813-.587-1.239-1.322c-.48-.839-.963-2.032-1.415-3.512m6.007 5.088a1.6 1.6 0 0 1-.432-.178c.089-.039.237-.09.483-.14c1.284-.265 1.482-.451 1.915-1a8 8 0 0 1 .367-.443a.4.4 0 0 0 .074-.13c.17-.151.272-.11.436-.042c.156.065.308.26.37.475c.03.102.062.295-.045.445c-.904 1.266-2.222 1.25-3.168 1.013m2.094-3.988l-.052.14c-.133.357-.257.689-.334 1.004c-.667-.002-1.317-.288-1.81-.803c-.628-.655-.913-1.566-.783-2.5c.183-1.308.116-2.447.08-3.059l-.013-.22c.296-.262 1.666-.996 2.643-.772c.446.102.718.406.83.928c.585 2.704.078 3.83-.33 4.736a9 9 0 0 0-.23.546m7.364 4.572q-.024.266-.062.596l-.146.438a.4.4 0 0 0-.018.108c-.006.475-.054.649-.115.87a4.8 4.8 0 0 0-.18 1.057c-.11 1.414-.878 2.227-2.417 2.556c-1.515.325-1.784-.496-2.02-1.221a7 7 0 0 0-.078-.227c-.215-.586-.19-1.412-.157-2.555c.016-.561-.025-1.901-.33-2.646q.006-.44.019-.892a.4.4 0 0 0-.016-.113a2 2 0 0 0-.044-.208c-.122-.428-.42-.786-.78-.935c-.142-.059-.403-.167-.717-.087c.067-.276.183-.587.309-.925l.053-.142c.06-.16.134-.325.213-.5c.426-.948 1.01-2.246.376-5.178c-.237-1.098-1.03-1.634-2.232-1.51c-.72.075-1.38.366-1.709.532a6 6 0 0 0-.196.104c.092-1.106.439-3.174 1.736-4.482a4 4 0 0 1 .303-.276a.35.35 0 0 0 .145-.064c.752-.57 1.695-.85 2.802-.833q.616.01 1.174.081c1.94.355 3.244 1.447 4.036 2.383c.814.962 1.255 1.931 1.431 2.454c-1.323-.134-2.223.127-2.68.78c-.992 1.418.544 4.172 1.282 5.496c.135.242.252.452.289.54c.24.583.551.972.778 1.256c.07.087.138.171.189.245c-.4.116-1.12.383-1.055 1.717a35 35 0 0 1-.084.815c-.046.208-.07.46-.1.766m.89-1.621c-.04-.832.27-.919.597-1.01l.135-.041a1 1 0 0 0 .134.103c.57.376 1.583.421 3.007.134c-.202.177-.519.4-.953.601c-.41.19-1.096.333-1.747.364c-.72.034-1.086-.08-1.173-.151m.57-9.271a7 7 0 0 1-.105 1.001c-.055.358-.112.728-.127 1.177c-.014.436.04.89.093 1.33c.107.887.216 1.8-.207 2.701a4 4 0 0 1-.188-.385a8 8 0 0 0-.325-.617c-.616-1.104-2.057-3.69-1.32-4.744c.38-.543 1.342-.566 2.179-.463m.228 7.013l-.085-.107l-.035-.044c.726-1.2.584-2.387.457-3.439c-.052-.432-.1-.84-.088-1.222c.013-.407.066-.755.118-1.092c.064-.415.13-.844.111-1.35a.6.6 0 0 0 .012-.19c-.046-.486-.6-1.938-1.73-3.253a7.8 7.8 0 0 0-2.688-2.04A9.3 9.3 0 0 1 17.62.746c2.052.046 3.675.814 4.824 2.283a1 1 0 0 1 .067.1c.723 1.356-.276 6.275-2.987 10.54m-8.816-6.116c-.025.18-.31.423-.621.423l-.081-.006a.8.8 0 0 1-.506-.315c-.046-.06-.12-.178-.106-.285a.22.22 0 0 1 .093-.149c.118-.089.352-.122.61-.086c.316.044.642.193.61.418m7.93-.411c.011.08-.049.2-.153.31a.72.72 0 0 1-.408.223l-.075.005c-.293 0-.541-.234-.56-.371c-.024-.177.264-.31.56-.352c.298-.042.612.009.636.185"/></svg>
    <svg class="w-9 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M22.219 11.784L11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305L.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305"/></svg>
  </div>
</div>
<!-- End Clients -->
