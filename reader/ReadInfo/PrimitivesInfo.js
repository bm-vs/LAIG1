//==============================================================================================================================================================
/*
PrimitivesInfo
*/

function PrimitivesInfo() {
    this.primitives = [];
}

PrimitivesInfo.prototype.print=function() {
	for (var i = 0; i < this.primitives.length; i++) {
		this.primitives[i].print();
	}
}


/*
PrimitiveInfo
*/

function PrimitiveInfo() {
	this.id;
	this.primitive;
}

PrimitiveInfo.prototype.print= function() {
	console.log(this.id);
	if (this.primitive instanceof Rectangle) {
		console.log("rectangle "+this.primitive.v1.x+", "+this.primitive.v1.y+", "+this.primitive.v2.x+", "+this.primitive.v2.y);
	}
	else if (this.primitive instanceof Triangle) {
		console.log("triangle "+this.primitive.v1.x+", "+this.primitive.v1.y+", "+this.primitive.v1.z+", "+this.primitive.v2.x+", "+this.primitive.v2.y+", "+this.primitive.v2.z+", "+this.primitive.v3.x+", "+this.primitive.v3.y+", "+this.primitive.v3.z);
	}
	else if (this.primitive instanceof Cylinder) {
		console.log("cylinder "+this.primitive.base+", "+this.primitive.top+", "+this.primitive.height+", "+this.primitive.slices+", "+this.primitive.stacks);
	}
	else if (this.primitive instanceof Sphere) {
		console.log("sphere "+this.primitive.radius+", "+this.primitive.slices+", "+this.primitive.stacks);
	}
	else if (this.primitive instanceof Torus) {
		console.log("torus "+this.primitive.inner+", "+this.primitive.outer+", "+this.primitive.slices+", "+this.primitive.loops);
	}
}


/*
PrimitivesInfo
*/

function Rectangle() {
	this.v1 = new Vector();
	this.v2 = new Vector();
}

function Triangle() {
	this.v1 = new Vector();
	this.v2 = new Vector();
	this.v3 = new Vector();
}

function Cylinder() {
	this.base;
	this.top;
	this.height;
	this.slices;
	this.stacks;
}

function Sphere() {
	this.radius;
	this.slices;
	this.stacks;
}

function Torus() {
	this.inner;
	this.outer;
	this.slices;
	this.loops;
}