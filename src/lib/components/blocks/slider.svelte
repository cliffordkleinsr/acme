<script>
    import * as Carousel from "$lib/components/ui/carousel"
    import Autoplay from "embla-carousel-autoplay"
</script>
<div class="lg:flex mt-2 absolute 2xl:-bottom-11 xl:-bottom-72 lg:left-80 hidden">
    <Carousel.Root class="max-w-[340px] xl:max-w-[800px] 2xl:max-w-[1080px] lg:mb-20"
    plugins={[
      Autoplay({
        delay: 5000,
      }),
    ]}
    >
      <Carousel.Content>
          <Carousel.Item >
            <!-- Browser Device -->
            <figure class="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
              <div class="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24 dark:bg-neutral-800 dark:border-neutral-700">
                <div class="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
                  <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                  <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                  <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                </div>
                <div class="flex justify-center items-center size-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem] dark:bg-neutral-700 dark:text-neutral-200">www.acme.co</div>
              </div>
  
              <div class="bg-gray-800 rounded-b-lg">
                <img class="max-w-full h-auto rounded-b-lg" src="https://i.ibb.co/23500wm/image.png" alt="s">
              </div>
            </figure>
            <!-- End Browser Device -->
        </Carousel.Item>
        <Carousel.Item >
          <!-- Browser Device -->
          <figure class="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
            <div class="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24 dark:bg-neutral-800 dark:border-neutral-700">
              <div class="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
                <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
              </div>
              <div class="flex justify-center items-center size-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem] dark:bg-neutral-700 dark:text-neutral-200">www.acme.co</div>
            </div>
  
            <div class="bg-gray-800 rounded-b-lg">
              <img class="max-w-full h-auto rounded-b-lg" src="https://i.ibb.co/XFmTbDR/image.png" alt="s">
            </div>
          </figure>
          <!-- End Browser Device -->
      </Carousel.Item>
      <Carousel.Item >
        <!-- Browser Device -->
        <figure class="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
          <div class="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24 dark:bg-neutral-800 dark:border-neutral-700">
            <div class="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
              <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
              <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
              <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
            </div>
            <div class="flex justify-center items-center size-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem] dark:bg-neutral-700 dark:text-neutral-200">www.acme.co</div>
          </div>
  
          <div class="bg-gray-800 rounded-b-lg">
            <img class="max-w-full h-auto rounded-b-lg" src="https://i.ibb.co/xsxTZMF/image.png" alt="s">
          </div>
        </figure>
        <!-- End Browser Device -->
    </Carousel.Item>
    <Carousel.Item >
      <!-- Browser Device -->
      <figure class="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
        <div class="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24 dark:bg-neutral-800 dark:border-neutral-700">
          <div class="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
            <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
            <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
            <span class="size-2 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
          </div>
          <div class="flex justify-center items-center size-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem] dark:bg-neutral-700 dark:text-neutral-200">www.acme.co</div>
        </div>
  
        <div class="bg-gray-800 rounded-b-lg">
          <img class="max-w-full h-auto rounded-b-lg" src="https://i.ibb.co/XbFXyjY/image.png" alt="s">
        </div>
      </figure>
      <!-- End Browser Device -->
  </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
    <!-- End Devices -->
  </div>