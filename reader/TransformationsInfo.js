//==============================================================================================================================================================
/*
TranformationsInfo
*/

function TransformationsInfo() {
    this.transformations = [];
}

TransformationsInfo.prototype.print=function() {
	for (var i = 0; i < this.transformations.length; i++) {
		this.transformations[i].print();
	}
}

/*
TranformationInfo
*/

function TransformationInfo() {
	this.id;
	this.translations = [];
	this.scalings = [];
	this.rotations = [];
}

TransformationInfo.prototype.print= function() {
	console.log(this.id);
	console.log("translations");
	for (var i = 0; i < this.translations.length; i++) {
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