//==============================================================================================================================================================
/*
ComponentsInfo
*/

function ComponentsInfo() {
    this.components = [];
}

ComponentsInfo.prototype.print=function() {
	for (var i = 0; i < this.components.length; i++) {
		this.components[i].print();
	}
}


/*
PrimitiveInfo
*/

function ComponentInfo() {
	this.id;
	this.transformationref = null;
	this.transformations = [];
	this.materials = [];
	this.texture;
	this.children_components = [];
	this.children_primitives = [];
}

ComponentInfo.prototype.print=function() {
	console.log(this.id);
	if (this.transformationref != null) {
		console.log("transformationref "+this.transformationref);
	}
	else {
		for (var i = 0; i < this.transformations.length; i++) {
			if (this.transformations[i] instanceof Translation) {
				console.log("translation");
			}
			else if (this.transformations[i] instanceof Rotation) {
				console.log("rotation");
			}
			else if (this.transformations[i] instanceof Scaling) {
				console.log("scaling");
			}

			this.transformations[i].print();
		}
	}

	console.log("materials");
	for (var i = 0; i < this.materials.length; i++) {
		console.log(this.materials[i]);
	}

	console.log("texture "+this.texture);

	console.log("children");
	for (var i = 0; i < this.children_components.length; i++) {
		console.log(this.children_components[i]);
	}
	for (var i = 0; i < this.children_primitives.length; i++) {
		console.log(this.children_primitives[i]);
	}

}