//==============================================================================================================================================================
/*
TexturesInfo
*/

function TexturesInfo() {
    this.textures = [];
}

TexturesInfo.prototype.print=function() {
	for (var i = 0; i < this.textures.length; i++) {
		this.textures[i].print();
	}
}

/*
TextureInfo
*/

function TextureInfo() {
	this.id;
	this.file;
	this.length_s;
	this.length_t;
}

TextureInfo.prototype.print= function() {
	console.log(this.id+", "+this.file+", "+this.length_s+", "+this.length_t);
}