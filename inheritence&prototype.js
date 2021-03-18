//INHERITENCE


// 1..fun is function constructor
function fun () { // General convention is to start name of function-constructor as Capital eg, Fun
    this.prop1 = 10;
    this.prop2 = 20;
}

fun.prototype.prop2=30;
fun.prototype.prop3=40;

const obj = new fun(); // creating object using function constructor, the new keyword creates a brand new object and takes care that the this keyword in line 3 and 4 must not point to the global and should point to the newly created object, otherwise the this by default points to global Object
//__proto__ is inherited prototype of newly created instance eg obj here,whereas prototype is of function constructor
console.log(obj.__proto__ === fun.prototype);
console.log('op...', obj.prop1, obj.prop2, obj.prop3, fun.prototype.constructor.name);
console.log(obj.hasOwnProperty('prop1'), obj.hasOwnProperty('prop3'));
console.log(obj instanceof fun);
//As Array is also an object, to view __proto__ of array use console.info
const arr = [1,2];
console.info(arr);

//Inheritence in javascript is possible due to prototype property
// When a certain property is searched in object it first searches it in the current object , then the prototype of current obj i.e __proto__,  and so on till global Object

// If every object has prototype property, then why does const obj = {}; don't have a prototype
// concept of constructor in fun.prototype
// If we can directly assign prop3 to the fun then why don't we do it, reason is: say we add 40 functions(with 100 lines each) inside fun and create 50 objects using constructor, each object will have these 40 functions which is inefficient


// 2.. Object.create
const obj2 = { prop3: 10 };

const instanceObj = Object.create(obj2, { prop1: { value: 10 }, prop2: { value: 20 } }); // Now __proto__ of instanceObj will have prop3 property

// Difference between function-constructor and Object.create    
// The instance created under function-constructor(ie. obj) inherits from function prototype while
// The instance created under Object.create(ie. instanceObj) inherits directly from the first parameter passed(i.e obj2).
// Then what's the benefit of Object.create