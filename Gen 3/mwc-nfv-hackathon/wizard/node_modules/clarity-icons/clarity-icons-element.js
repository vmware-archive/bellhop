"use strict";
var clarity_icons_api_1 = require("./clarity-icons-api");
var allClrIconsShapes = clarity_icons_api_1.ClarityIconsApi.instance.get();
/* CLR-ICON CUSTOM ELEMENT */
var parentConstructor = function () {
    return HTMLElement.apply(this, arguments);
};
if (typeof Reflect === "object") {
    parentConstructor = function () {
        return Reflect.construct(HTMLElement, arguments, this.constructor);
    };
}
function ClarityIconElement() {
    "use strict";
    return parentConstructor.apply(this, arguments);
}
exports.ClarityIconElement = ClarityIconElement;
ClarityIconElement.observedAttributes = ["shape", "size"];
ClarityIconElement.prototype = Object.create(HTMLElement.prototype);
ClarityIconElement.prototype.constructor = ClarityIconElement;
var generateIcon = function (element, shape) {
    shape = shape.split(/\s/)[0];
    if (shape !== element._shape) {
        element._shape = shape;
        element.innerHTML =
            allClrIconsShapes[shape] ||
                (function () {
                    console.error("'" + shape + "' is not found in the Clarity Icons set.");
                    return allClrIconsShapes["error"];
                }());
    }
};
var setIconSize = function (element, size) {
    if (!Number(size) || Number(size) < 0) {
        element.style.width = null; // fallback to the original stylesheet value
        element.style.height = null; // fallback to the original stylesheet value
    }
    else {
        element.style.width = size + "px";
        element.style.height = size + "px";
    }
};
ClarityIconElement.prototype.connectedCallback =
    function () {
        var host = this;
        if (host.hasAttribute("shape")) {
            generateIcon(host, host.getAttribute("shape"));
        }
        if (host.hasAttribute("size")) {
            setIconSize(host, host.getAttribute("size"));
        }
    };
ClarityIconElement.prototype.attributeChangedCallback =
    function (attributeName, oldValue, newValue) {
        var host = this;
        if (attributeName === "shape") {
            generateIcon(host, newValue);
        }
        if (attributeName === "size") {
            setIconSize(host, newValue);
        }
    };
