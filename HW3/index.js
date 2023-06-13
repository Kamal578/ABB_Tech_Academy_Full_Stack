// find the answers for the theoretical questions in the README.md file

/*
Tasks

1. Create a class called Employee with the following properties: (name), (age), (salary). Ensure that these properties are initialized when an object is created.
2. Create getters and setters for these properties.
3. Create a class called Programmer that inherits from the Employee class and has an additional property called lang (list of programming languages).
4. Override the getter for the salary property in the Programmer class. Let it return the salary property multiplied by 3.
5. Create multiple instances of the Programmer class and display them in the console.
*/

class Employee {
  constructor(name, age, salary) {
    this._name = name;
    this._age = age;
    this._salary = salary;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }

  get salary() {
    return this._salary;
  }

  set salary(value) {
    this._salary = value;
  }
}

class Programmer extends Employee {
  constructor(name, age, salary, lang) {
    super(name, age, salary);
    this.lang = lang;
  }

  get salaryMultiplier() {
    return this.salary * 3;
  }
}

const programmer1 = new Programmer("Kamal", 19, 2000, ["JavaScript", "Python"]);
const programmer2 = new Programmer("Mahammad", 20, 2000, ["C#", "C++"]);
const programmer3 = new Programmer("Rashad", 21, 2200, ["Java", "C"]);
const programmer4 = new Programmer("Ramin", 22, 2300, ["PHP", "Ruby"]);

console.log(programmer1);
console.log(programmer2);
console.log(programmer3);
console.log(programmer4);
