---
author: Cem Karakurt
pubDatetime: 2022-01-14T00:00:00Z
modDatetime: 2022-01-14T00:00:00Z
title: "Typescript Quick Introduction"
slug: typescript-quick-introduction
featured: false
draft: false
tags:
  - typescript
  - javascript
  - frontend
description:
  Do you hate errors in production? If yes, use TypeScript for type-safe
  development. Learn about types, advanced types, and utilities in this quick
  introduction.
---

Do you hate errors in production ? If yes use [**typescript**](https://cemkarakurt.com/tags/typescript "typescript") for type-safety development.

**_TypeScript_** is an [open-source](https://github.com/microsoft/TypeScript) strongly typed programming language built over JavaScript.

With typescript, we define a type for variables and functions, after that by using a typescript compiler, we compile typescript code to javascript code. We use typescript for development, but for production, javascript is the latest output.

![](https://cdn-images-1.medium.com/max/2000/1*mqPkWg2RtbzJ5irB5FCTbg.png)

## Installation

Since we will use the NODEJS environment, firstly, you need to install NODEJS and NPM.

Install the typescript compiler

```bash
npm install -g typescript ts-node
```

To check the installation, you can run

```bash
tsc -v
```

If you are seeing a version of typescript it means, it installed successfully.

![](https://cdn-images-1.medium.com/max/2568/1*L42ZIw2V4-xVtgb1t6jgKA.png)

## Types

### String

For texts, we use the “string” type. Just like [**javascript**](https://cemkarakurt.com/tags/javascript "javascript"), [**typescript**](https://cemkarakurt.com/tags/typescript "typescript") also uses double quotes (“) or single quotes (‘) or backquote (`) characters to surround string data.

```ts
let language: string = "Javascript";
let language: string = "";
let language: string = "Javascript";
```

### Number

Number type is valid for integers, float numbers.

```ts
let sum: number = 0;
let sum: number = -5;
let sum: number = 0.7;
```

For big integers, you can use the “bigint” type.

```ts
let big: bigint = 100n;
```

### Boolean

One of the most known type is boolean. To define true/false status, boolean is useful.

```ts
let isApproved: boolean = false;
let isApproved: boolean = true;
```

### Symbol

```ts
let sym1: Symbol = Symbol();
let sym2: Symbol = Symbol("key");
```

### Functions

```ts
function add(a:number, b:number) : number {
    return a + b;
}

function (a:number, b:number) : number {
    return a + b;
}

const add = (firstName: string, lastName: string) : string => {
    return firstName + ' ' + lastName;
}
```

if you don't return anything you need use the void type.

```ts
const logger = (a: number): void => {
  console.log(a);
};
```

### Object Destruction

Object destruction is one of the popular features of modern Javascript. Using typescript is also possible with object destruction.

```ts
const { foo }: { foo: string } = bar;
```

### Array Destruction

Same as object destruction, you can use typescript for array destruction easily.

```ts
function f([a, b, c]: [number, string, number]) {}
```

### Array

We use arrays for storing a list of elements. There are two ways to define a type for an array.

```ts
let nums: number[] = [1, 2, 3, 3];
let multi: number[][] = [
  [1, 2, 3],
  [23, 24, 25],
];
// or
let list: Array<number> = [1, 2, 3];
```

### Class

If you need to return an instance of class, you can use class as a type.

```ts
class A {}

function create(ctor: { new (): A }): A {
  return new ctor();
}

let a = create(A);
```

### Any

Any means, it might be any type. If you use any, then you don’t need to use typescript, because any type will skip all typescript checks.

```ts
let result: any;

let getUser = (id: number): any => {
  return this.db.getUser(id);
};
```

### Interface

To create a new type you can use interfaces. In the below example, I defined the User Interface. According to the definition, the user type includes id and name attributes.

```ts
interface User {
  id: number;
  name: string;
}

const user = res.data as User;
console.log(user.name);
```

### Using Multiple Types

You can assign multiple types to variables. Let’s look at the below example, we have a function to find the user record in the database. If the id parameter is exists in the database, it returns the User. If not, it will return null. In this case, we have 2 different return types “User” and “null”. So, you can use multiple types for this type of case.

```ts
let getUser = (id: number): User | null => {
  return this.db.getUser(id);
};
```

## Advanced Types and Utilities

[**Typescript**](https://cemkarakurt.com/tags/typescript "typescript") offers powerful type utilities like `Partial<T>`, `Readonly<T>`, and `Record<K, T>`, which allow for more flexible and safe type transformations. For example:

```ts
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
```

### Generics

Generics enhance code reusability and type safety. They allow you to create components that work with any type:

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
```

### Decorators

TypeScript decorators provide a way to add annotations and a meta-programming syntax for class declarations and members. Decorators can be used to modify class properties, methods, and accessors.

```ts
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {...}`
```

### Advanced Type Manipulation

Type manipulation features like Mapped Types, Conditional Types, and Utility Types allow for more dynamic and flexible code structures.

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };`
```

## Final

If you are familiar with any statically typed language(java, c, etc.), learning typescript is really easy. And typescript helps us catch errors on [**development**](https://cemkarakurt.com/tags/software-development "software development") by assigning types to variables. For less bug on production, use typescript.

## Source

- [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
