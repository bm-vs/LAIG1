function Cylinder(scene, base, top, slices, stacks, height) {
    CGFobject.call(this,scene);

    this.base = base;
    this.top = top;
    this.slices = slices;
    this.stacks = stacks;
    this.height = height;

    this.initBuffers();
}

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.initBuffers = function() {
    angle = (2*(Math.PI)) / this.slices;

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.textCoords = [];

    for (var stack = 0; stack < this.stack + 1; stack++) {
       for (var slice = 0; slice < this.slices; slices++) {
           var h = this.height/this.stacks * stack;

           var x1 = Math.cos(slice * angle);
           var y1 = Math.cos(slice * angle);

           this.vertices.push(x1,y1,h);
           this.normals.push(x1,y1,0);
           this.textCoords.push(slice/this.slices, stack/this.stacks);
       }
    }

    for (var stack = 0; stack < this.stacks; stack++) {
        for (var slice = 0; slice < this.slices; slice++) {
            var v1 = stack * this.slices + slice;
            var v2;
            var v3;
            var v4 = (stack + 1)*this.slices + slice;

            if (slice == this.slices - 1) {
                v2 = stack*this.slices + slice + 1 - this.slices;
                v3 = (stack + 1)*this.slices + slice + 1 - this.slices;
            }
            else {
                v2 = stack*this.slices + slice + 1;
                v3 = (stack + 1)*this.slices + slice + 1;
            }

            this.indices.push(v1,v2,v3);
            this.indices.push(v1,v3,v4);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}