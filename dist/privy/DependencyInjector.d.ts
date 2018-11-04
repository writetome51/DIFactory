import { IDependencyRegistration } from '../IDependencyRegistration';
export declare class DependencyInjector {
    private _registrations;
    registerMultiple(registrations: IDependencyRegistration[]): void;
    register(registration: IDependencyRegistration): void;
    getFactory(theClass: Object): any;
    private _getInstance;
    private _chooseConstructorAndReturnResult;
    private _validateNewRegistration;
    private _getDependencyInstances;
    private _getRegistration;
}
export declare const _dInjector: DependencyInjector;
