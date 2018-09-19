"use strict";
/**
 * A [[TransitionHookFn]] which updates the URL after a successful transition
 *
 * Registered using `transitionService.onSuccess({}, updateUrl);`
 */
function updateUrl(transition) {
    var options = transition.options();
    var $state = transition.router.stateService;
    var $urlRouter = transition.router.urlRouter;
    if (options.location && $state.$current.navigable) {
        var urlOptions = { replace: options.location === 'replace' };
        $urlRouter.push($state.$current.navigable.url, $state.params, urlOptions);
    }
    $urlRouter.update(true);
}
exports.updateUrl = updateUrl;
//# sourceMappingURL=url.js.map