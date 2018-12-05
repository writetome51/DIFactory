To include in your project:

import { DIFactory } from '@writetome51/di-factory';

DIFactory simplifies the instantiating of a class that uses dependency injection:

 let object = DIFactory.getInstance( TheClass, [nonDependencyArg, nonDependencyArg2,...] );

To use DIFactory:

To make DIFactory handle dependency-injection for a class, you need to register that class
with DIFactory.  In this example, a class is registered right below its own definition:

export class TheClass{

   constructor(dpendency1, dpendency2, dpendency3){ ... }

   ...code...

} // Below the closing brace, TheClass is registered with DIFactory:

 DIFactory.register(
     {
        class: TheClass,

        // Make sure the dependencies are listed in same order as they are in the constructor
        // parameters above:
        dependencies: [
           DependencyClass1, DependencyClass2, DependencyClass3
        ]
     }
 );

 Then, wherever you want a new instance of TheClass, write:

 let instance = DIFactory.getInstance(TheClass, []);  // notice the empty array?

 In the statement above, the empty array is there to hold any arguments that get passed
 to TheClass' constructor after the injected dependencies.  If there are no arguments after
 the dependencies, it's unnecessary to pass the array.