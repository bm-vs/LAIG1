//==============================================================================================================================================================
/*
MaterialsInfo
*/

function MaterialsInfo() {
    this.materials = [];
}

MaterialsInfo.prototype.print=function() {
	for (var i = 0; i < this.materials.length; i++) {
		this.materials[i].print();
	}
}

/*
MaterialInfo
*/

function MaterialInfo() {
	this.id;
	this.emission = new Color();
	this.ambient = new Color();
	this.diffuse = new Color();
	this.specular = new Color();
	this.shininess;

}

MaterialInfo.prototype.print= function() {
	console.log(this.id);
	console.log("emission "+this.emission.r+", "+this.emission.g+", "+this.emission.b+", "+this.emission.a);
	console.log("ambient "+this.ambient.r+", "+this.ambient.g+", "+this.ambient.b+", "+this.ambient.a);
	console.log("diffuse "+this.diffuse.r+", "+this.diffuse.g+", "+this.diffuse.b+", "+this.diffuse.a);
	console.log("specular "+this.specular.r+", "+this.specular.g+", "+this.specular.b+", "+this.specular.a);
	console.log("shininess "+this.shininess);
}