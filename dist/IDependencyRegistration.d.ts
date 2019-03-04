export interface IStoredDependencyRegistration {
    dependencies: Function[];
}
export interface IDependencyRegistration extends IStoredDependencyRegistration {
    class: Function;
}
