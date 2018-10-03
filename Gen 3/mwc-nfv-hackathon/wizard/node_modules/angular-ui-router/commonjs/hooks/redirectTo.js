"use strict";
/** @module hooks */ /** */
var predicates_1 = require("../common/predicates");
var coreservices_1 = require("../common/coreservices");
var targetState_1 = require("../state/targetState");
/**
 * A [[TransitionHookFn]] that redirects to a different state or params
 *
 * Registered using `transitionService.onStart({ to: (state) => !!state.redirectTo }, redirectHook);`
 *
 * See [[StateDeclaration.redirectTo]]
 */
exports.redirectToHook = function (trans) {
    var redirect = trans.to().redirectTo;
    if (!redirect)
        return;
    function handleResult(result) {
        var $state = trans.router.stateService;
        if (result instanceof targetState_1.TargetState)
            return result;
        if (predicates_1.isString(result))
            return $state.target(result, trans.params(), trans.options());
        if (result['state'] || result['params'])
            return $state.target(result['state'] || trans.to(), result['params'] || trans.params(), trans.options());
    }
    if (predicates_1.isFunction(redirect)) {
        return coreservices_1.services.$q.when(redirect(trans)).then(handleResult);
    }
    return handleResult(redirect);
};
//# sourceMappingURL=redirectTo.js.map