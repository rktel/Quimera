import { writable } from "svelte/store";

export const s_reports = writable([]);
export const s_openDrawer = writable(false);
export const s_user = writable({});