# jCat.toNode

<p align="center">
	<a href="#jcatcreateelement"><img alt="" src="./assets/logo.png"></a>
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/jcat-to-node/"><img alt="" src="https://nodei.co/npm/jcat-to-node.png"></a>
</p>

## Description

Thanks to jCat.toNode now you can use your own objects as a parameter for a manipulation methods with DOM (`appendChild`, `insertBefore`, etc.). The supported list of methods you can find below.
In addition, thanks to API you can add a support into any other method (for example, into some kind of polyfill). See [the example](#usingapi).

## Installation

**1.** You can install the `jcat-to-node` and import it as a module

```
$ npm install jcat-to-node
```

```js
import {toNode} from "jcat-to-node";
```

**2.** Or import directly to your site

```html
<script src="/path_to_libs/jCat.toNode.js"></script>
```

```html
<script src="/path_to_libs/jCat.toNode.min.js"></script>
```

## Usage

To be able to transform itself into Node the object needs a `toNode` method to be assigned to it, and that will return the object `Node` or other derived classes from `Node` (see. [examples](#examples)).

```
{Object}.toNode = function():Node
```

## API

```
jCat.toNode.handleMethod(proto, methodName, handleParams)
```

### Parameters

+ *__`proto`__* — an object in which the patching of the method would take place.
+ *__`methodName`__* — a method's name, its type is `string`.
+ *__`handleParams`__* — an array of index's parameters that are subject to handling. Or `"*"` if you need to polish each parameter.

## Supporting methods

+ [Element.prototype.after](https://developer.mozilla.org/ru/docs/Web/API/ChildNode/after)
+ [Element.prototype.append](https://developer.mozilla.org/ru/docs/Web/API/ParentNode/append)
+ [Element.prototype.before](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before)
+ [Element.prototype.prepend](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend)
+ [Element.prototype.replaceWith](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith)
+ [Node.prototype.appendChild](https://developer.mozilla.org/ru/docs/Web/API/Node/appendChild)
+ [Node.prototype.contains](https://developer.mozilla.org/ru/docs/Web/API/Node/contains)
+ [Node.prototype.insertBefore](https://developer.mozilla.org/ru/docs/Web/API/Node/insertBefore)
+ [Node.prototype.removeChild](https://developer.mozilla.org/ru/docs/Web/API/Node/removeChild)
+ [Node.prototype.replaceChild](https://developer.mozilla.org/ru/docs/Web/API/Node.replaceChild)

## Examples

### Using `toNode`

```js
function Foo() {
	this.element = document.createElement("div");
	this.element.textContent = "Hello World!"
}

Foo.prototype.toNode = function () {
	return this.element;
};


var foo = new Foo();
document.body.appendChild(foo);
```

```js
function Foo() {
	var wrapper = document.createElement("div");
	wrapper.textContent = 'Hello World!';
	
	this.toNode = function () {
		return wrapper;
	};
}


var foo = new Foo();
document.body.insertBefore(foo, document.body.firstChild);
```

Using [jCat.createElement](../jCat.createElement)
```js
import {createElement} from "jcat-create-element";

class Foo {
	
	constructor(color = "black") {
		this.element = createElement(".foo", {
			textContent: "Hello World!"
		}, {
			color,
			textAlign: "center"
		});
	}
	
	toNode() {
		return this.element;
	}
	
}


let foo = new Foo();
document.body.append(foo);

let fooRed = new Foo("red");
document.body.prepend(fooRed);

let fooBlue = new Foo("blue");
document.body.append(fooBlue);

let fooPink = new Foo("pink");
document.body.replaceChild(fooPink, foo);
```

### Using API

Adding a support of a custom method `prependChild` 

```js
Node.prototype.prependChild = function (element) {
	if (!(element instanceof Node)) {
		throw new TypeError("Failed to execute 'prependChild' on 'Node': parameter 1 is not of type 'Node'.");
	}
	
	return this.insertBefore(element, this.firstChild);
};

jCat.toNode.handleMethod(Node.prototype, "prependChild", [0]);
```

## License

[MIT](./LICENSE)

## Languages

![](./assets/flag-eng.png) English  [![](./assets/flag-ru.png) Russian](./README.ru.md)