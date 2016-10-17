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
	this.rectangle = new Rectangle();
	this.triangle = new Triangle();
	this.cylinder = new Cylinder();
	this.sphere = new Sphere();
	this.torus = new Torus();
}

PrimitiveInfo.prototype.print= function() {
	console.log(this.id);
	console.log("rectangle "+this.rectangle.v1.x+", "+this.rectangle.v1.y+", "+this.rectangle.v2.x+", "+this.rectangle.v2.y);
	console.log("triangle "+this.triangle.v1.x+", "+this.triangle.v1.y+", "+this.triangle.v1.z+", "+this.triangle.v2.x+", "+this.triangle.v2.y+", "+this.triangle.v2.z+", "+this.triangle.v3.x+", "+this.triangle.v3.y+", "+this.triangle.v3.z);
	console.log("cylinder "+this.cylinder.base+", "+this.cylinder.top+", "+this.cylinder.height+", "+this.cylinder.slices+", "+this.cylinder.stacks);
	console.log("sphere "+this.sphere.radius+", "+this.sphere.slices+", "+this.sphere.stacks);
	console.log("torus "+this.torus.inner+", "+this.torus.outer+", "+this.torus.slices+", "+this.torus.loops);
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