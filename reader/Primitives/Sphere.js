
function Sphere(scene, radius, slices, stacks) {
    CGFobject.call(this,scene);

    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor=Sphere;

Sphere.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for (var stack = 0; stack <= this.stacks; stack++) {
        var alpha = stack*Math.PI / this.stacks;
        
        for (var slice = 0; slice <= this.slices; slice++) {
            var beta = slice*2*Math.PI /this.slices;

            var x = Math.cos(beta) * Math.sin(alpha);
            var y = Math.cos(alpha);
            var z = Math.sin(alpha) * Math.sin(beta);

            var u = 1 - (slice/this.slices);
            var v = 1 - (stack/this.stacks);

            this.normals.push(x, y, z);
            this.texCoords.push(u, v);
            this.vertices.push(this.radius*x, this.radius*y, this.radius*z);            
        }
    }

    for (var stack = 0; stack < this.stacks; stack++) {        
        for (var slice = 0; slice < this.slices; slice++) {
            var first = stack*(this.slices+1) + slice;
            var second = first + this.slices + 1;

            this.indices.push(first, first+1, second, second, first+1, second+1);
        }
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}


/*
  Class that represents a Sphere primitive in the scene
*/

/*
 function Sphere(scene, radius, slices, stacks) {

 	CGFobject.call(this,scene);

  this.radius = radius;
  this.slices = slices;
  this.stacks = stacks;

  //console.debug("Sphere "+this.radius+"\n");
 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var hor_ang = (2*Math.PI) / this.slices;
	var ver_ang = (2*Math.PI) / (2*this.stacks);
	var rect = Math.PI ;

	for (i = 0; i < this.slices; i++) {
		this.vertices.push(Math.sin(rect)*Math.cos(i*hor_ang), Math.sin(rect)*Math.sin(i*hor_ang), Math.cos(rect));
		this.normals.push(Math.sin(rect)*Math.cos(i*hor_ang), Math.sin(rect)*Math.sin(i*hor_ang), Math.cos(rect));
		this.texCoords.push(0.5+0.5*Math.sin(rect)*Math.cos(i*hor_ang), 0.5*0.5*Math.sin(rect)*Math.sin(i*hor_ang));
	}

	var top = this.slices;
	var bottom = 0;

	for (k = 1; k <= this.stacks; k++) {

		this.vertices.push(Math.sin(rect - k*ver_ang)*Math.cos(0), Math.sin(rect - k*ver_ang)*Math.sin(0), Math.cos(rect - k*ver_ang));
		this.normals.push(Math.sin(rect - k*ver_ang)*Math.cos(0), Math.sin(rect - k*ver_ang)*Math.sin(0), Math.cos(rect - k*ver_ang));
		this.texCoords.push(0.5+0.5*Math.sin(rect - k*ver_ang)*Math.cos(0), 0.5+0.5*Math.sin(rect - k*ver_ang)*Math.sin(0));

		for (i = 1; i < this.slices; i++) {

			this.vertices.push(Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang), Math.cos(rect - k*ver_ang));
			this.normals.push(Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang), Math.cos(rect - k*ver_ang));
			this.texCoords.push(0.5+0.5*Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), 0.5+0.5*Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang));

			this.indices.push(top);
			this.indices.push(bottom+1);
			this.indices.push(top+1);
			this.indices.push(bottom);
			this.indices.push(bottom+1);
			this.indices.push(top);

			top++;
			bottom++;
		}

		top++;
		bottom++;

		this.indices.push(top - 1, bottom - this.slices, top - this.slices);
		this.indices.push(bottom - 1, bottom - this.slices, top - 1);
	}


    for (var i = 0; i < this.indices.length; i+=3) {
        console.log(this.indices[i], this.indices[i+1], this.indices[i+2]);
    }


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };*/