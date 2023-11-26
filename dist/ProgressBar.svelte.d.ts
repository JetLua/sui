import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        color?: string | undefined;
        progress?: number | undefined;
        linecap?: "butt" | "round" | "square" | "inherit" | null | undefined;
        size?: number | undefined;
        strokeWidth?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ProgressBarProps = typeof __propDef.props;
export type ProgressBarEvents = typeof __propDef.events;
export type ProgressBarSlots = typeof __propDef.slots;
export default class ProgressBar extends SvelteComponent<ProgressBarProps, ProgressBarEvents, ProgressBarSlots> {
}
export {};
