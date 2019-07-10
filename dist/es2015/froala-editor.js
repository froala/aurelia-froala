var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject, customElement, bindable } from 'aurelia-framework';
import { ObserverLocator } from "aurelia-binding";

import { Config } from './froala-editor-config';

import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';

export let FroalaEditor1 = (_dec = customElement('froala-editor'), _dec2 = inject(Element, Config, ObserverLocator), _dec(_class = _dec2(_class = (_class2 = class FroalaEditor1 {

	constructor(element, config, observerLocator) {
		_initDefineProp(this, 'value', _descriptor, this);

		_initDefineProp(this, 'config', _descriptor2, this);

		_initDefineProp(this, 'eventHandlers', _descriptor3, this);

		_initDefineProp(this, 'instance', _descriptor4, this);

		this.element = element;

		this.config = config.options();

		this.observerLocator = observerLocator;
	}

	bind(bindingContext, overrideContext) {
		this.parent = bindingContext;
	}

	tearUp() {
		const editorSelector = this.config.iframe ? 'textarea' : 'div';

		if (this.instance != null) {
			return;
		}

		this.subscriptions = [this.observerLocator.getObserver(this, 'value').subscribe((newValue, oldValue) => {
			if (this.instance && this.instance.html.get() != newValue) {
				this.instance.html.set(newValue);
			}
		})];

		this.instance = new FroalaEditor(`#${this.element.id} ${editorSelector}`, Object.assign({}, this.config), () => {
			this.instance.html.set(this.value);

			if (this.eventHandlers && this.eventHandlers.length != 0) {
				for (let eventHandlerName in this.eventHandlers) {
					let handler = this.eventHandlers[eventHandlerName];
					this.instance.events.on(`${eventHandlerName}`, (...args) => {
						return handler.apply(this.parent, args);
					});
				}
			}
			this.instance.events.on('blur', e => this.value = this.instance.html.get());
			this.instance.events.on('contentChanged', e => this.value = this.instance.html.get());
		});
	}

	tearDown() {
		if (this.instance != null) {
			this.instance.destroy();
			this.instance = null;
		}
	}

	attached() {
		this.tearUp();
	}

	detached() {
		this.tearDown();
	}
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
	enumerable: true,
	initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'config', [bindable], {
	enumerable: true,
	initializer: function () {
		return {};
	}
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'eventHandlers', [bindable], {
	enumerable: true,
	initializer: function () {
		return {};
	}
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'instance', [bindable], {
	enumerable: true,
	initializer: null
})), _class2)) || _class) || _class);