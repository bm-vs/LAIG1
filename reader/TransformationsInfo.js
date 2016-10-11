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
	this.translate = new Vector();
	this.scale = new Vector();
	this.rotation_axis;
	this.rotation_angle;
}

TransformationInfo.prototype.print= function() {
	console.log(this.id);
	console.log("translate "+this.translate.x+", "+this.translate.y+", "+this.translate.z);
	console.log("rotate "+this.rotation_axis+", "+this.rotation_angle);
	console.log("scale "+this.scale.x+", "+this.scale.y+", "+this.scale.z);

}