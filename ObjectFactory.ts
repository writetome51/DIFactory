import { dInjector } from './DependencyInjector';
import { IDependencyRegistration } from './IDependencyRegistration';


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


export class ObjectFactory {


	static register(registration: IDependencyRegistration) {
		dInjector.register(registration);
	}


	static registerMultiple(registrations: IDependencyRegistration[]) {
		dInjector.registerMultiple(registrations);
	}


	static getInstance(TheClass: Object, constructor_arguments_that_come_after_the_dependencies = []) {
		let factory = dInjector.getFactory(TheClass);
		return factory(...constructor_arguments_that_come_after_the_dependencies);
	}


}
