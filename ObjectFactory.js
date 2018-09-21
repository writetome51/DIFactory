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
var DependencyInjector_1 = require("./DependencyInjector");
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
var ObjectFactory = /** @class */ (function (_super) {
    __extends(ObjectFactory, _super);
    function ObjectFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectFactory.register = function (registration) {
        DependencyInjector_1.dInjector.register(registration);
    };
    ObjectFactory.registerMultiple = function (registrations) {
        DependencyInjector_1.dInjector.registerMultiple(registrations);
    };
    ObjectFactory.getInstance = function (TheClass, constructor_arguments_that_come_after_the_dependencies) {
        if (constructor_arguments_that_come_after_the_dependencies === void 0) { constructor_arguments_that_come_after_the_dependencies = []; }
        var factory = DependencyInjector_1.dInjector.getFactory(TheClass);
        return factory.apply(void 0, constructor_arguments_that_come_after_the_dependencies);
    };
    return ObjectFactory;
}(BaseObject_1.BaseObject));
exports.ObjectFactory = ObjectFactory;
