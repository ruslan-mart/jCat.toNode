function init() {
	let elementProto = Element.prototype,
		nodeProto = Node.prototype;

	let proxyMap = [{
		proto: elementProto,
		method: 'after',
		handleParams: '*'
	}, {
		proto: elementProto,
		method: 'append',
		handleParams: '*'
	}, {
		proto: nodeProto,
		method: 'appendChild',
		handleParams: [0]
	}, {
		proto: elementProto,
		method: 'before',
		handleParams: '*'
	}, {
		proto: nodeProto,
		method: 'contains',
		handleParams: [0]
	}, {
		proto: nodeProto,
		method: 'insertBefore',
		handleParams: [0, 1]
	}, {
		proto: elementProto,
		method: 'prepend',
		handleParams: '*'
	}, {
		proto: nodeProto,
		method: 'removeChild',
		handleParams: [0]
	}, {
		proto: nodeProto,
		method: 'replaceChild',
		handleParams: [0, 1]
	}, {
		proto: elementProto,
		method: 'replaceWith',
		handleParams: '*'
	}];

	proxyMap.forEach(({proto, method, handleParams}) => proxyMethod(proto, method, handleParams));
}

function getParamsHandler(originMethod, indexes) {
	let indexesObject = null;

	if (indexes !== '*') {

		if (!Array.isArray(indexes)) {
			throw new Error('');
		}

		indexesObject = {};

		indexes.forEach(item => indexesObject[item] = true);

	}

	return function () {
		for (let i = 0; i !== arguments.length; i++) {
			let item = arguments[i];

			if (item != null && (indexesObject === null || i in indexesObject) && !(item instanceof Node) && typeof item.toNode === 'function') {
				arguments[i] = item.toNode();
			}
		}

		return originMethod.apply(this, arguments);
	};
}

function proxyMethod(proto, method, handleParams) {
	let originMethod = proto[method];

	if (typeof originMethod === 'function') {
		proto[method] = getParamsHandler(originMethod, handleParams);
	}
}

init();

export const handler = proxyMethod;