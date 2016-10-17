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
	this.transformations = [];
}

TransformationInfo.prototype.print= function() {
	console.log(this.id);
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