import { __dInjector } from './privy/DependencyInjector';
import { IDependencyRegistration } from './IDependencyRegistration';


/*****
 DIFactory simplifies the instantiating of a class that uses dependency injection:

 let object = DIFactory.getInstance(
 	TheClass, [ nonDependencyArg, nonDependencyArg2,...]
 );

 To accomplish this, TheClass must first be registered with DIFactory:

 DIFactory.register(
 	{ class: TheClass,  dependencies: [ DependencyClass1, DependencyClass2,...] }
 );

 If a class doesn't have any injected dependencies, it's unnecessary to register it.
 *****/


export class DIFactory {


	static register(registration: IDependencyRegistration): void {
		__dInjector.register(registration);
	}


	static registerMultiple(registrations: IDependencyRegistration[]): void {
		__dInjector.registerMultiple(registrations);
	}


	static getInstance(
		TheClass: Function, // class or constructor function
		constructor_arguments_that_come_after_the_dependencies = []
	): Object {
		let factory = __dInjector.getFactory(TheClass);
		return factory(...constructor_arguments_that_come_after_the_dependencies);
	}


}
