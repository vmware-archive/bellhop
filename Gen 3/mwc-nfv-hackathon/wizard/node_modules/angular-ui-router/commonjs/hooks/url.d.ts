import { Transition } from "../transition/transition";
/**
 * A [[TransitionHookFn]] which updates the URL after a successful transition
 *
 * Registered using `transitionService.onSuccess({}, updateUrl);`
 */
export declare function updateUrl(transition: Transition): void;
