import { onBeforeUnmount } from "@vue/runtime-core";

let useKeydown = keyCombos => {
  let onKeyDown = event => {
    let kc = keyCombos.find(kc => kc.key == event.key);
    if (kc) {
      kc.fn();
    }
  };

  window.addEventListener("keydown", onKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
};

export default useKeydown;
