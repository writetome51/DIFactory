export interface IStoredDependencyRegistration {
	dependencies: Object[]  // array of classes
}

export interface IDependencyRegistration extends IStoredDependencyRegistration{
	class: Object
}
