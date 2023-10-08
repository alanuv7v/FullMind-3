import { writable } from "svelte/store";
import {attributes} from "structure"

export const menuItem = attributes({
  name: String,
  target: Object,
  function: Function
})(
  class menuItem {
    greet() {
      return `Hello ${this.name}`;
    }
  }
);

export const menuItems = writable([
])

export const menus = writable([])



/* The attributes "wraps" the Class, still providing access to its methods: */