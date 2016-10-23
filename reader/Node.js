function Node(parent, component_info, scene) {
    this.scene = scene;
    this.component_info = component_info;
    this.parent = parent;
    this.matrix;

    if (this.parent == null) {
        this.matrix = mat4.create();
    }
    else {
        this.matrix = mat4.clone(parent.matrix);
    }
    
    for (var i = component_info.transformations.length - 1; i >= 0; i--) {
    //for (var i = 0; i < component_info.transformations.length; i++) {
        var m = this.createMatrix(component_info.transformations[i]);
        
        mat4.multiply(this.matrix,this.matrix,m);
    }

    this.texture;
    if (component_info.texture == "inherit") {
        this.texture = parent.texture;
    }
    else {
        this.texture = component_info.texture;
    }

    this.materials = [];
    for (var i = 0; i < component_info.materials.length; i++) {
        this.materials[i] = component_info.materials[i];
    }

    this.current_material_pos = 0;
    this.active_material;

    this.setActiveMaterial();

    this.children = [];
    for (var i = 0; i < component_info.children_components.length; i++) {
        this.children[i] = new Node(this, component_info.children_components[i], scene);
    }
}


Node.prototype.createMatrix = function(transformation) {
    var m = mat4.create();

    if (transformation instanceof Translation) {
        mat4.translate(m,m,vec3.fromValues(transformation.vector.x, transformation.vector.y, transformation.vector.z));
    }
    else if (transformation instanceof Rotation) {
        if (transformation.axis == "x") {
            mat4.rotateX(m,m,transformation.angle);
        }
        else if (transformation.axis = "y") {
            mat4.rotateY(m,m,transformation.angle);
        }
        else if (transformation.axis = "z") {
            mat4.rotateZ(m,m,transformation.angle);
        }

    }
    else if (transformation instanceof Scaling) {
        mat4.scale(m,m,vec3.fromValues(transformation.vector.x, transformation.vector.y, transformation.vector.z));
    }

    return m;
}

Node.prototype.display = function() {

    this.scene.pushMatrix();
    this.active_material.apply();
    this.scene.multMatrix(this.matrix);

    for (var i = 0; i < this.component_info.children_primitives.length; i++) {
        this.component_info.children_primitives[i].primitive.display();
    }
    
    this.scene.popMatrix();

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].display();
    }
}

Node.prototype.setActiveMaterial = function() {
    if (this.materials[this.current_material_pos] == "inherit") {
        this.active_material = this.parent.active_material;
    }
    else {
        var m = this.component_info.materials[this.current_material_pos];  
            
        this.active_material = new CGFappearance(this.scene);
        
        this.active_material.setAmbient(m.ambient.r, m.ambient.g, m.ambient.b, m.ambient.a); 
        this.active_material.setEmission(m.emission.r, m.emission.g, m.emission.b, m.emission.a);
        this.active_material.setDiffuse(m.diffuse.r, m.diffuse.g, m.diffuse.b, m.diffuse.a);
        this.active_material.setSpecular(m.specular.r, m.specular.g, m.specular.b, m.specular.a);
        this.active_material.loadTexture(this.texture.file);
        this.active_material.setTextureWrap(this.texture.length_s, this.texture.length_t);
    }
}

Node.prototype.changeMaterial = function() {
    this.current_material_pos = (this.current_material_pos+1)%this.materials.length;
    this.setActiveMaterial();

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].changeMaterial();
    }
}

Node.prototype.getNumberOfNodes = function() {
    var sum = 0;
    
    for (var i = 0; i < this.children.length; i++) {
        sum += this.children[i].getNumberOfNodes();
    }

    return sum + 1;
}