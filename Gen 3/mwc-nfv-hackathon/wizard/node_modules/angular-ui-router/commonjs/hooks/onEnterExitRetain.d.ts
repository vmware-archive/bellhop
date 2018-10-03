/** @module hooks */ /** for typedoc */
import { TransitionStateHookFn } from "../transition/interface";
/**
 * The [[TransitionStateHookFn]] for onExit
 *
 * When the state is being exited, the state's .onExit function is invoked.
 *
 * Registered using `transitionService.onExit({ exiting: (state) => !!state.onExit }, onExitHook);`
 */
export declare const onExitHook: TransitionStateHookFn;
/**
 * The [[TransitionStateHookFn]] for onRetain
 *
 * When the state is being exited, the state's .onRetain function is invoked.
 *
 * Registered using `transitionService.onRetain({ retained: (state) => !!state.onRetain }, onRetainHook);`
 */
export declare const onRetainHook: TransitionStateHookFn;
/**
 * The [[TransitionStateHookFn]] for onEnter
 *
 * When the state is being exited, the state's .onEnter function is invoked.
 *
 * Registered using `transitionService.onEnter({ entering: (state) => !!state.onEnter }, onEnterHook);`
 */
export declare const onEnterHook: TransitionStateHookFn;
