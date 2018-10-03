/** @module transition */ /** for typedoc */
import { TransitionHookOptions, HookFn } from "./interface";
import { ResolveContext } from "../resolve/resolveContext";
import { Transition } from "./transition";
import { State } from "../state/stateObject";
/** @hidden */
export declare class TransitionHook {
    private transition;
    private stateContext;
    private hookFn;
    private resolveContext;
    private options;
    constructor(transition: Transition, stateContext: State, hookFn: HookFn, resolveContext: ResolveContext, options: TransitionHookOptions);
    private isSuperseded;
    invokeHook(): Promise<any>;
    /**
     * This method handles the return value of a Transition Hook.
     *
     * A hook can return false, a redirect (TargetState), or a promise (which may resolve to false or a redirect)
     */
    handleHookResult(hookResult: any): Promise<any>;
    toString(): string;
    /**
     * Given an array of TransitionHooks, runs each one synchronously and sequentially.
     *
     * Returns a promise chain composed of any promises returned from each hook.invokeStep() call
     */
    static runSynchronousHooks(hooks: TransitionHook[], swallowExceptions?: boolean): Promise<any>;
}
