export interface IStoredDependencyRegistration {
    dependencies: Object[];
}
export interface IDependencyRegistration extends IStoredDependencyRegistration {
    class: Object;
}
