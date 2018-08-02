# jCat.toNode

<p align="center">
	<a href="#jcatcreateelement"><img alt="" src="./assets/logo.png"></a>
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/jcat-to-node/"><img alt="" src="https://nodei.co/npm/jcat-to-node.png"></a>
</p>

## Описание

Благодаря jCat.toNode, теперь Вы можете использовать свои собственные объекты в качестве параметра для методов манипуляции с DOM (`appendChild`, `insertBefore` и другие). Поддерживаемый список методов приведён ниже.
Кроме того, с помощью API Вы можете добавить поддержку в любые другие методы (например, в какие-либо полифилы). См. [этот пример](#использованиеapi).

## Установка

**1.** Вы можете установить `jcat-to-node` и подключить как модуль:

```
$ npm install jcat-to-node
```

```js
import {toNode} from "jcat-to-node";
```

**2.** Или подключить напрямую к сайту:

```html
<script src="/path_to_libs/jCat.toNode.js"></script>
```

```html
<script src="/path_to_libs/jCat.toNode.min.js"></script>
```

## Использование

Для того, чтобы Ваш объект умел преобразовываться в Node, ему необходимо присвоить метод `toNode`, который будет возвращать объект `Node` или других наследников от `Node` (см. [примеры](#примеры)).

```
{Object}.toNode = function():Node
```

## API

```
jCat.toNode.handleMethod(proto, methodName, handleParams)
```

### Параметры

+ *__`proto`__* — объект, в котором будет происходить патчинг метода.
+ *__`methodName`__* — название метода, тип - `string`.
+ *__`handleParams`__* — массив индексов параметров, которые подвержены обработке. Либо `"*"`, если нужно обрабатывать все параметры.

## Поддержка методов

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

## Примеры

### Использование `toNode`

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

Использование с [jCat.createElement](../jCat.createElement)
```js
import {createElement} from "jcat-element";

class Foo {
	
	constructor(color = "black") {
		this.element = createElement(".foo", {
			textContent: "Hello World!"
		}, {
			color: color,
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

### Использование API

Добавляем в поддержку пользовательский метод `prependChild` 

```js
Node.prototype.prependChild = function (element) {
	if (!(element instanceof Node)) {
		throw new TypeError("Failed to execute 'prependChild' on 'Node': parameter 1 is not of type 'Node'.");
	}
	
	return this.insertBefore(element, this.firstChild);
};

jCat.toNode.handleMethod(Node.prototype, "prependChild", [0]);
```

## Лицензия

[MIT](./LICENSE)

## Языки

[![](./assets/flag-eng.png) English](./README.md)  ![](./assets/flag-ru.png) Русский