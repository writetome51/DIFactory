import { IDependencyRegistration } from './IDependencyRegistration';


/*****
 DIFactory simplifies the instantiating of a class that uses dependency injection:

 let object = DIFactory.getInstance(TheClass, [nonDependencyArg, nonDependencyArg2,...]);

 To accomplish this, TheClass must first be registered with DIFactory:

 DIFactory.register({class: TheClass, dependencies: [DependencyClass1, DependencyClass2,...] });

 If a class doesn't have any injected dependencies, it's unnecessary to register it.
 *****/

export declare class DIFactory {

	static register(registration: IDependencyRegistration): void;


	static registerMultiple(registrations: IDependencyRegistration[]): void;


	static getInstance(
		TheClass: Function,
		constructor_arguments_that_come_after_the_dependencies?: any[]
	): Object;
}
