// Lexical scope is the abiity of a function to access variables from it's parent scope.
function f1 () {
    var a=133;
    function f2 () {
        console.log(a); // Since f2 is lexically bounded to f1, f2 can access variable a
    }
    f2();
}
f1(); 

// Whenever a function is invoked, a new scope is created for that call. The local variable declared inside the function belong to that scope and they can only be accessed from that function. When the function has finished the execution, the scope is usually destroyed.
// Closure lets the function continue to access the lexical scope it was defined in at author time.
// So as we know a variable is destroyed as soon as it's function completes the execution, but in the following example the var X(at line 23) and Y are still holding the refernce to variable b of function outer(which has finished it's execution), so that's what closure does. Closure lets the function continue to access the lexical scope it was defined in at author time. 
// A closure is a combination of a function and its lexical environment where the function was created.

function outer () {
    var b = 10;
       function inner() {
            
             var a = 20; 
             console.log(a+b);
        }
       return inner;
    }
    var X = outer(); 
    var Y = outer(); 
    
    X(); 
    Y();

// A better example

function outer() {
        let counter = 0
        const inner = function() {
                counter = counter + 1
                return counter
            }
        return inner
    }

const action = outer()
const c1 = action()
const c2 = action()
const c3 = action()
console.log(c1, c2, c3)

//----------------------------------------------------------------

// Settimeout problem:

for (var i=0;i<5;i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

// We can see Closure is already there in above example, there is outer function(a loop) and an inner function (setTimeout)
// The setTimeout has a closure over the for loop and the closure = reference to variable i, 
// the common behavior of for loop should be that i of loop should be collected by the garbage-collection but it holds the refernce to i in loop, hence a closure
// so instead of surrendering self to the js garbage collector, the for loop remains there after 800 ms

// The problem here is it prints 55555 instead of 12345. The reason is till the time first timeout occurs, loop has already completed it's execution and i has 5 at that time.


// Let's solve by applying a closure using IIFE, IIFE creates a new scope
// Although there are 5 different scopes created for IIFE, still the i in console points the same mem loc(that is global object)

for (var i=0;i<5;i++) {
    (function (){
        setTimeout(function() {
            console.log(i);
        }, 1000);
    })();
}

// In the example below there are again 5 different scopes created for IIFE, but value of j in each scope is dependent on run time of for loop.
// Question: Will i of loop be collected by Garbage collector after it's execution?
for (var i=0;i<5;i++) {
    (function (){
        var j=i; // a better example of utilising a closure
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })();
}

// A better way. Below code example is a practical Use Case for IIFEs in JavaScript
for (var i=0;i<5;i++) {
    (function (j){
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })(i);
}

// Let creates a block scope like IIFE creates, and on each iteration of for loop a scope block is created for the let keyword
// Question: diff between block, lexical and dynamic scope?
for (let i=0;i<5;i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}


// Another closure example
var fn;
function foo() {
    var a = 2;
    function baz() {
    console.log( a );
    }
    fn = baz; // assign baz to global variable
}
function bar() {
fn(); // look ma, I saw closure!
}
foo();
bar(); // 2


