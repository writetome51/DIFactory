To use Object Factory:

To make ObjectFactory handle dependency-injection for a class, you should
register the class right below its own definition. Example:

export TheClass{

   constructor(dpendency1, dpendency2, dpendency3){ ... }

   ...code...

} // Below the closing brace, register the class with ObjectFactory:

 ObjectFactory.register(
     {
        class: TheClass,

        // Make sure the dependencies are listed in same order as they are in the constructor's parameters.
        dependencies: [
           DependencyClass1, DependencyClass2, DependencyClass3
        ]
     }
 );

 Then, wherever you want a new instance of TheClass, write:

 let instance = ObjectFactory.getInstance(TheClass, []);

 In the statement above, the empty array is there to hold any arguments that get passed
 to the constructor after the injected dependencies.  If there are no arguments after
 the dependencies, it's unnecessary to pass the array.