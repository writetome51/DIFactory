export interface IStoredDependencyRegistration {
	dependencies: Function[]  // array of classes or constructor functions.
}

export interface IDependencyRegistration extends IStoredDependencyRegistration{
	class: Function  // class or constructor function.
}
