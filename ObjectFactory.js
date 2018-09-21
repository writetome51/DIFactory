"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DependencyInjector_1 = require("./privy/DependencyInjector");
/*****
 ObjectFactory simplifies the instantiating of a class that uses dependency injection:

 let object = ObjectFactory.getInstance(
     TheClass, [nonDependencyArg, nonDependencyArg2,...]
 );

 To accomplish this, TheClass must first be registered with ObjectFactory:

 ObjectFactory.register(
     {class: TheClass, dependencies: [DependencyClass1, DependencyClass2,...] }
 );

 If a class doesn't have any injected dependencies, it's unnecessary to register it.
 *****/
var ObjectFactory = /** @class */ (function () {
    function ObjectFactory() {
    }
    ObjectFactory.register = function (registration) {
        DependencyInjector_1._dInjector.register(registration);
    };
    ObjectFactory.registerMultiple = function (registrations) {
        DependencyInjector_1._dInjector.registerMultiple(registrations);
    };
    ObjectFactory.getInstance = function (TheClass, constructor_arguments_that_come_after_the_dependencies) {
        if (constructor_arguments_that_come_after_the_dependencies === void 0) { constructor_arguments_that_come_after_the_dependencies = []; }
        var factory = DependencyInjector_1._dInjector.getFactory(TheClass);
        return factory.apply(void 0, constructor_arguments_that_come_after_the_dependencies);
    };
    return ObjectFactory;
}());
exports.ObjectFactory = ObjectFactory;
