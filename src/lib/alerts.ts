import { writable, type Writable } from "svelte/store";


export interface Alert {
    name: string,
    body: string,
    type: "INFO" | "WARN" | "ERROR" | "MESSAGE" | "EVENT"
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    time?: number
}

export const alerts: Writable<Alert[]> = writable([]);

export const createAlert = (alert: Alert) => {
    alerts.update(x => x.push(alert) && x);
};