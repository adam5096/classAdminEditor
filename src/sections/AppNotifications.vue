<template>
  <notifications>
    <template #body="{ item, close }">
      <div
        class="notification relative mx-4 mb-4 bg-white rounded-lg shadow-lg overflow-hidden"
        :class="`notification-${item.type || 'default'}`"
      >
        <!-- icon -->
        <div class="notification-inner flex p-3 border-l-4 border-green-500">
          <div>
            <HeroiconsOutlineCheckCircle
              v-if="item.type === 'success'"
              class="notification-icon"
            />
            <HeroiconsOutlineInformationCircle
              v-else-if="item.type === 'warn'"
              class="notification-icon"
            />
            <HeroiconsOutlineXCircle
              v-else-if="item.type === 'error'"
              class="notification-icon"
            />
            <HeroiconsOutlineInformationCircle
              v-else
              class="notification-icon"
            />
          </div>

          <div class="ml-2">
            <div class="mt-0.5 text-gray-600 font-normal tracking-wider">
              {{ item.title }}
            </div>
            <div
              v-if="item.text"
              class="mt-0.5 text-gray-400 text-sm"
            >
              {{ item.text }}
            </div>

            <button
              type="button"
              class="absolute right-2 top-2 w-6 h-6 flex justify-center items-center text-gray-400 hover:text-gray-500 transition-colors duration-100"
              :class="item.text ? 'top-2' : 'top-4'"
              @click="close"
            >
              <HeroiconsOutlineX class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<style scoped></style>
