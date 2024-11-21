<script setup></script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-semibold tracking-tighter text-gray-900">
      <slot name="title"></slot>
    </h1>

    <div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
