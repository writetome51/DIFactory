"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObject_1 = require("../BaseObject");
var isArray_notArray_1 = require("basic-data-handling/isArray_notArray");
var prepend_append_1 = require("datatype-handlers/arrays/modify/return_void/prepend_append");
// DependencyInjector, intended to be used as a singleton only by ObjectFactory.
// Using ObjectFactory instead of directly accessing this class simplifies its usage.
var DependencyInjector = /** @class */ (function (_super) {
    __extends(DependencyInjector, _super);
    function DependencyInjector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._registrations = [];
        return _this;
    }
    DependencyInjector.prototype.registerMultiple = function (registrations) {
        for (var i = 0; i < registrations.length; ++i) {
            this.register(registrations[i]);
        }
    };
    DependencyInjector.prototype.register = function (registration) {
        this._validateNewRegistration(registration);
        // @ts-ignore
        var className = registration.class.name;
        if (!this._registrations[className]) { // if not already registered...
            this._registrations[className] = {
                dependencies: registration.dependencies
            };
        }
    };
    DependencyInjector.prototype.getFactory = function (theClass) {
        return this._chooseConstructorAndReturnResult(theClass, function (theClass) {
            return function (dependencies) {
                return function () {
                    var userAddedParams = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        userAddedParams[_i] = arguments[_i];
                    }
                    var params = dependencies.concat(userAddedParams);
                    return new (theClass.bind.apply(theClass, [void 0].concat(params)))();
                };
            };
        });
    };
    DependencyInjector.prototype._getInstance = function (theClass) {
        return this._chooseConstructorAndReturnResult(theClass, function (theClass) {
            return function (dependencies) {
                return new (theClass.bind.apply(theClass, [void 0].concat(dependencies)))();
            };
        });
    };
    // the getConstructor() function must take theClass as a parameter.
    DependencyInjector.prototype._chooseConstructorAndReturnResult = function (theClass, getConstructor) {
        var dependencyInstances = this._getDependencyInstances(theClass.name);
        var construct = getConstructor(theClass);
        return construct(dependencyInstances);
    };
    DependencyInjector.prototype._validateNewRegistration = function (config) {
        if (typeof config.class !== 'function' ||
            isArray_notArray_1.notArray(config.dependencies)) {
            throw new Error('The properties of this dependency registration have' +
                ' incorrect values');
        }
        for (var ix = 0; ix < config.dependencies.length; ++ix) {
            if (typeof config.dependencies[ix] !== 'function') {
                throw new Error('Each value of the dependencies array must be a class' +
                    ' or object constructor.');
            }
        }
    };
    DependencyInjector.prototype._getDependencyInstances = function (className) {
        var _this = this;
        var registration = this._getRegistration(className);
        var dependencyInstances = [];
        registration.dependencies.forEach(function (dependency) {
            // recursive call of getInstance():
            var dependencyInstance = _this._getInstance(dependency);
            prepend_append_1.appendOne(dependencyInstance, dependencyInstances);
        });
        return dependencyInstances;
    };
    DependencyInjector.prototype._getRegistration = function (className) {
        var registration = this._registrations[className];
        if (!registration) {
            registration = { dependencies: [] };
        }
        return registration;
    };
    return DependencyInjector;
}(BaseObject_1.BaseObject));
exports.DependencyInjector = DependencyInjector;
// Only intended to be imported into ObjectFactory:
exports.dInjector = new DependencyInjector();
