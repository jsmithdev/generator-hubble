import { LitElement, html } from "lit";
import { customElement, } from 'lit/decorators.js';
import { TWStyles } from "../artifacts/twlit.js";


@customElement('hello-world')
class HelloWorld extends LitElement {

	static styles = [TWStyles];

	static properties = {};

	_init = false;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
		if(!this._init) {
			this._initialize();
			this._init = true;
		}
	}

	private _initialize() {
	}

	render() {
		return getHtml();
	}
	
}

function getHtml() {
return html`
<div class="flex justify-center items-center h-screen">
	<div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
		Hello World
	</div>
</div>
`;
}


declare global {
	interface HTMLElementTagNameMap {
	  "hello-world": HelloWorld;
	}
}