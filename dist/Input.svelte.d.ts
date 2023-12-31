import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        label?: string | undefined;
        required?: boolean | undefined;
        rules?: {
            pattern: RegExp;
            err: string;
        }[] | undefined;
        value?: string | undefined;
        variant?: "standard" | "outlined" | undefined;
        help?: string | undefined;
        maxlength?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
}
export {};
