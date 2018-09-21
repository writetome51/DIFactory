Function-naming conventions:

All functions that return something that is not boolean begin with the word 'get'.

All functions that return boolean have names that imply they return boolean, such as 'isEmpty'
or 'notEmpty', or 'isArray'.

All functions that return void have names that imply they perform an action and don't return anything, like 'alphabetize()' .

All public functions begin with lowercase letter, are camel-cased, and contain no underscores,
except for a few exceptions where the function's name is long.

If a function name begins with an underscore, it's a private function not intended for use outside of its library.