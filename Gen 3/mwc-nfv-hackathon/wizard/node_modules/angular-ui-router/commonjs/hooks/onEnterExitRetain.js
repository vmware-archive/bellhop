"use strict";
/**
 * A factory which creates an onEnter, onExit or onRetain transition hook function
 *
 * The returned function invokes the (for instance) state.onEnter hook when the
 * state is being entered.
 *
 * @hidden
 */
function makeEnterExitRetainHook(hookName) {
    return function (transition, state) {
        return state[hookName](transition, state);
    };
}
/**
 * The [[TransitionStateHookFn]] for onExit
 *
 * When the state is being exited, the state's .onExit function is invoked.
 *
 * Registered using `transitionService.onExit({ exiting: (state) => !!state.onExit }, onExitHook);`
 */
exports.onExitHook = makeEnterExitRetainHook('onExit');
/**
 * The [[TransitionStateHookFn]] for onRetain
 *
 * When the state is being exited, the state's .onRetain function is invoked.
 *
 * Registered using `transitionService.onRetain({ retained: (state) => !!state.onRetain }, onRetainHook);`
 */
exports.onRetainHook = makeEnterExitRetainHook('onRetain');
/**
 * The [[TransitionStateHookFn]] for onEnter
 *
 * When the state is being exited, the state's .onEnter function is invoked.
 *
 * Registered using `transitionService.onEnter({ entering: (state) => !!state.onEnter }, onEnterHook);`
 */
exports.onEnterHook = makeEnterExitRetainHook('onEnter');
//# sourceMappingURL=onEnterExitRetain.js.map