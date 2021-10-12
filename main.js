class elementMatch {

  elementArray = [];
  elementObject = {};
  #heightMax = 0;
  #widthMax = 0;

  constructor(elements) {

		if(
			!elements
		){
			console.warn('No Elements Passed');
			return;
		}

		this.addElements(elements);

		if(
			!Array.isArray(this.elementArray) ||
			this.elementArray.length < 2
		){
      console.warn('Only Contains One Element/s');
      return;
    }

		this.#setElementsObject();

  }

	#setElementsObject(){

		if(!this.elementArray){
			console.warn('Please Add Element/s');
			return;
		}

		return new Promise((resolve, reject) => {
			this.#loopElements( this.#loopElementAdd.bind(this) );
			resolve(true);
		});

	}

	#loopElements( passedFunction ){

		this.elementArray.forEach( (element, key) => {
			if(element instanceof Element){
        passedFunction(element, key);
      }
		});

	}

	#loopElementAdd(element, key){

		element.style.removeProperty("height");
		element.style.removeProperty("width");

		this.elementObject[key] = {
			width: element.offsetWidth,
			height: element.offsetHeight,
		};

		this.#addWidthMax(element.offsetWidth);
		this.#addHeightMax(element.offsetHeight);

	}

	#loopSizeHeightMatch(element, key){

		element.style.height = `${this.#heightMax}px`;

	}

	#loopSizeWidthMatch(element, key){

		element.style.width = `${this.#widthMax}px`;

	}

	#addHeightMax(height){

		(height > this.#heightMax) ? this.#heightMax = height : null;

	}

	#addWidthMax(width){

		(width > this.#widthMax) ? this.#widthMax = width : null;

	}

	// Chainable Methods

	addElements(elements){

		if(Array.isArray(elements)){
      this.elementArray.push(...elements);
      this.#setElementsObject();
      return this;
    }

		this.elementArray.push(elements);

		this.#setElementsObject();

		return this;

	}

	runHeightMatch(){

		this.#heightMax = 0;

		this.#setElementsObject().then(
			this.#loopElements( this.#loopSizeHeightMatch.bind(this) )
		);

		return this;

	}

	runWidthMatch(){

		this.#widthMax = 0;

		this.#setElementsObject().then(
			this.#loopElements( this.#loopSizeWidthMatch.bind(this) )
		);

		return this;

	}

}


window.onload = () => {

	const classElementMatch = new elementMatch(
		[...document.querySelectorAll('.unifyheight_match')]
	)
	.runHeightMatch();

	window.addEventListener("resize", () => {
			classElementMatch.runHeightMatch();
	});

};
