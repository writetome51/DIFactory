import { IDependencyRegistration, IStoredDependencyRegistration }
	from '../IDependencyRegistration';
import { notArray } from '@writetome51/is-array-not-array';


// DependencyInjector, intended to be used as a singleton only by DIFactory.
// Using DIFactory instead of directly accessing this class simplifies its usage.

export class DependencyInjector {

	private __registrations: IStoredDependencyRegistration[] = [];


	registerMultiple(registrations: IDependencyRegistration[]) {
		for (let i = 0; i < registrations.length; ++i) {
			this.register(registrations[i]);
		}
	}


	register(registration: IDependencyRegistration) {
		this.__validateNewRegistration(registration);
		// @ts-ignore
		let className = registration.class.name;
		if (!this.__registrations[className]) { // if not already registered...
			this.__registrations[className] = {
				dependencies: registration.dependencies
			};
		}
	}


	getFactory(
		theClass: Function  // class or constructor function
	): Function {

		return this.__callClassFactoryAndReturnResult(
			theClass,

			(theClass) => {
				// This function is the class factory:
				return function (dependencies: Object[]) {

					// This is the factory result that will be returned:
					return function (...userAddedParams) {
						let params = dependencies.concat(userAddedParams);
						return new theClass(...params);
					};
				};
			}
		);
	}


	private __getInstance(
		theClass: Function  // class or constructor function
	): Object {

		return this.__callClassFactoryAndReturnResult(
			theClass,

			(theClass) => {
				// This function is the class factory:
				return function (dependencies: Object[]) {

					// This is the factory result that will be returned:
					return new theClass(...dependencies);
				};
			}
		);
	}


	// `getFactory` must return a factory function, that, when called, returns either a class
	// instance or another factory function.  The function `getFactory` returns must take an
	// array of dependency instances as an argument.

	private __callClassFactoryAndReturnResult(theClass, getFactory: Function) {
		let dependencyInstances = this.__getDependencyInstances(theClass.name);
		let getFactoryResult = getFactory(theClass);
		return getFactoryResult(dependencyInstances);
	}


	private __validateNewRegistration(registration: IDependencyRegistration) {
		if (typeof registration.class !== 'function' ||
			notArray(registration.dependencies)) {
			throw new Error('The properties of this dependency registration have' +
				' incorrect values');
		}

		for (let ix = 0; ix < registration.dependencies.length; ++ix) {
			if (typeof registration.dependencies[ix] !== 'function') {
				throw new Error('Each value of the dependencies array must be a class' +
					' or object constructor.');
			}
		}
	}


	private __getDependencyInstances(className: string) {
		let registration = this.__getRegistration(className);
		let dependencyInstances = [];

		registration.dependencies.forEach((dependency) => {
			// recursive call of getInstance():
			let dependencyInstance = this.__getInstance(dependency);
			dependencyInstances.push(dependencyInstance);
		});
		return dependencyInstances;
	}


	private __getRegistration(className: string): IStoredDependencyRegistration {
		let registration = this.__registrations[className];
		if (!registration) {
			registration = {dependencies: []};
		}
		return registration;
	}


}


// Only intended to be imported into DIFactory:
export const __dInjector = new DependencyInjector();
