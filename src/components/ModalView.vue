<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount } from "@vue/runtime-core";
export default {
  setup(props, { emit }) {
    let onKeyDown = event => {
      if (event.key == "Escape") {
        emit("closeModal");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", onKeyDown);
    });

    return { emit };
  }
};
</script>

<style lang="scss" scoped></style>
