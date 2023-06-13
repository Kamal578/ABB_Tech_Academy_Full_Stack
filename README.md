# ABB Tech Academy Full Stack
Homework and etc. for ABB Tech Academy Full Stack Course

# Homework 1

- Getting started with npm and gulp

# Homework 2

- Using npm and gulp to create a simple web server and using sass to create a simple web page

# Homework 3

# Answers to theoretical questions:

## 1. How Prototypical Inheritance Works in JavaScript

Prototypical inheritance is a mechanism in JavaScript that allows objects to inherit properties and methods from other objects. In JavaScript, every object has an internal link to another object called its prototype. When a property or method is accessed on an object, and it doesn't exist on that object itself, JavaScript will look for it in its prototype.

The prototype chain is formed by linking objects together through their prototypes. If a property or method is not found in the current object's prototype, JavaScript will continue searching up the chain until it either finds the desired property or reaches the end of the chain (i.e., the object's prototype is null).

This mechanism allows objects to inherit properties and methods from their prototypes, creating a hierarchical relationship between objects. By modifying the prototype of an object, changes can be made to the behavior of all objects that inherit from it.

## 2. The Purpose of Calling super() in a Child Class Constructor

In JavaScript, when creating a child class that extends a parent class, it is necessary to call the `super()` function within the child class constructor. The `super()` function is used to call the constructor of the parent class and initialize the inherited properties and methods defined in the parent class.

By calling `super()`, the child class ensures that the parent class's constructor is executed, allowing the child class to inherit the parent's properties and methods. This initialization step is crucial to establish the proper state and behavior of the child class.

Additionally, calling `super()` enables the child class to pass any required arguments to the parent class constructor, ensuring that the parent class is properly initialized based on the specific requirements of the child class.

