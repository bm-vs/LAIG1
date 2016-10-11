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
	this.translations = [];
	this.rotations = [];
	this.scalings = [];
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
		console.log("translations");
		for (var i = 0; i < this.transformations.length; i++) {
			this.translations[i].print();
		}
		console.log("rotations");
		for (var i = 0; i < this.rotations.length; i++) {
			this.rotations[i].print();
		}
		console.log("scalings");
		for (var i = 0; i < this.scalings.length; i++) {
			this.scalings[i].print();
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

/*
Translation
*/
function Translation() {
	this.vector = new Vector();
}

Translation.prototype.print= function() {
	console.log(this.vector.x+", "+this.vector.y+", "+this.vector.z);
}

/*
Rotation
*/
function Rotation() {
	this.axis;
	this.angle;
}

Rotation.prototype.print= function() {
	console.log(this.axis+", "+this.angle);
}

/*
Scaling
*/
function Scaling() {
	this.vector = new Vector();
}

Scaling.prototype.print= function() {
	console.log(this.vector.x+", "+this.vector.y+", "+this.vector.z)
}