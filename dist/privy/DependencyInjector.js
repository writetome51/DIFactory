"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_array_not_array_1 = require("@writetome51/is-array-not-array");
// DependencyInjector, intended to be used as a singleton only by DIFactory.
// Using DIFactory instead of directly accessing this class simplifies its usage.
var DependencyInjector = /** @class */ (function () {
    function DependencyInjector() {
        this.__registrations = [];
    }
    DependencyInjector.prototype.registerMultiple = function (registrations) {
        for (var i = 0; i < registrations.length; ++i) {
            this.register(registrations[i]);
        }
    };
    DependencyInjector.prototype.register = function (registration) {
        this.__validateNewRegistration(registration);
        // @ts-ignore
        var className = registration.class.name;
        if (!this.__registrations[className]) { // if not already registered...
            this.__registrations[className] = {
                dependencies: registration.dependencies
            };
        }
    };
    DependencyInjector.prototype.getFactory = function (theClass // class or constructor function
    ) {
        return this.__callClassFactoryAndReturnResult(theClass, function (theClass) {
            // This function is the class factory:
            return function (dependencies) {
                // This is the factory result that will be returned:
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
    DependencyInjector.prototype.__getInstance = function (theClass // class or constructor function
    ) {
        return this.__callClassFactoryAndReturnResult(theClass, function (theClass) {
            // This function is the class factory:
            return function (dependencies) {
                // This is the factory result that will be returned:
                return new (theClass.bind.apply(theClass, [void 0].concat(dependencies)))();
            };
        });
    };
    // `getFactory` must return a factory function, that, when called, returns either a class
    // instance or another factory function.  The function `getFactory` returns must take an
    // array of dependency instances as an argument.
    DependencyInjector.prototype.__callClassFactoryAndReturnResult = function (theClass, getFactory) {
        var dependencyInstances = this.__getDependencyInstances(theClass.name);
        var getFactoryResult = getFactory(theClass);
        return getFactoryResult(dependencyInstances);
    };
    DependencyInjector.prototype.__validateNewRegistration = function (registration) {
        if (typeof registration.class !== 'function' ||
            is_array_not_array_1.notArray(registration.dependencies)) {
            throw new Error('The properties of this dependency registration have' +
                ' incorrect values');
        }
        for (var ix = 0; ix < registration.dependencies.length; ++ix) {
            if (typeof registration.dependencies[ix] !== 'function') {
                throw new Error('Each value of the dependencies array must be a class' +
                    ' or object constructor.');
            }
        }
    };
    DependencyInjector.prototype.__getDependencyInstances = function (className) {
        var _this = this;
        var registration = this.__getRegistration(className);
        var dependencyInstances = [];
        registration.dependencies.forEach(function (dependency) {
            // recursive call of getInstance():
            var dependencyInstance = _this.__getInstance(dependency);
            dependencyInstances.push(dependencyInstance);
        });
        return dependencyInstances;
    };
    DependencyInjector.prototype.__getRegistration = function (className) {
        var registration = this.__registrations[className];
        if (!registration) {
            registration = { dependencies: [] };
        }
        return registration;
    };
    return DependencyInjector;
}());
exports.DependencyInjector = DependencyInjector;
// Only intended to be imported into DIFactory:
exports.__dInjector = new DependencyInjector();
