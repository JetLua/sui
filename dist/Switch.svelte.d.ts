import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        width?: number | undefined;
        height?: number | undefined;
        gap?: number | undefined;
        checked?: boolean | undefined;
        activeColor?: string | undefined;
        color?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SwitchProps = typeof __propDef.props;
export type SwitchEvents = typeof __propDef.events;
export type SwitchSlots = typeof __propDef.slots;
export default class Switch extends SvelteComponent<SwitchProps, SwitchEvents, SwitchSlots> {
}
export {};
