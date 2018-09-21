import { IDependencyRegistration, IStoredDependencyRegistration }
	from '../IDependencyRegistration';
import { notArray } from 'basic-data-handling/isArray_notArray';


// DependencyInjector, intended to be used as a singleton only by ObjectFactory.
// Using ObjectFactory instead of directly accessing this class simplifies its usage.

export class DependencyInjector {

	private _registrations: IStoredDependencyRegistration[] = [];


	registerMultiple(registrations: IDependencyRegistration[]) {
		for (let i = 0; i < registrations.length; ++i) {
			this.register(registrations[i]);
		}
	}


	register(registration: IDependencyRegistration) {
		this._validateNewRegistration(registration);
		// @ts-ignore
		let className = registration.class.name;
		if (!this._registrations[className]) { // if not already registered...
			this._registrations[className] = {
				dependencies: registration.dependencies
			};
		}
	}


	getFactory(theClass: Object) {
		return this._chooseConstructorAndReturnResult(theClass,
			(theClass) => {
				return function (dependencies: object[]) {
					return function (...userAddedParams) {
						let params = dependencies.concat(userAddedParams);
						return new theClass(...params);
					};
				};
			}
		);
	}


	private _getInstance(theClass: Object) {
		return this._chooseConstructorAndReturnResult(theClass,
			(theClass) => {
				return function (dependencies) {
					return new theClass(...dependencies);
				};
			}
		);
	}


	// the getConstructor() function must take theClass as a parameter.
	private _chooseConstructorAndReturnResult(theClass, getConstructor: Function) {
		let dependencyInstances = this._getDependencyInstances(theClass.name);
		let construct = getConstructor(theClass);
		return construct(dependencyInstances);
	}


	private _validateNewRegistration(config: IDependencyRegistration) {
		if (typeof config.class !== 'function' ||
			notArray(config.dependencies)) {
			throw new Error('The properties of this dependency registration have' +
				' incorrect values');
		}

		for (let ix = 0; ix < config.dependencies.length; ++ix) {
			if (typeof config.dependencies[ix] !== 'function') {
				throw new Error('Each value of the dependencies array must be a class' +
					' or object constructor.');
			}
		}
	}


	private _getDependencyInstances(className: string) {
		let registration = this._getRegistration(className);
		let dependencyInstances = [];

		registration.dependencies.forEach((dependency) => {
			// recursive call of getInstance():
			let dependencyInstance = this._getInstance(dependency);
			dependencyInstances.push(dependencyInstance);
		});
		return dependencyInstances;
	}


	private _getRegistration(className: string): IStoredDependencyRegistration {
		let registration = this._registrations[className];
		if (!registration) {
			registration = {dependencies: []};
		}
		return registration;
	}


}


// Only intended to be imported into ObjectFactory:
export const _dInjector = new DependencyInjector();
