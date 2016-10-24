function SceneReader(rootElement, scene_graph) {
    this.rootElement = rootElement;
    this.reader = scene_graph.reader;
    this.scene_graph = scene_graph;
}

/*
Check nodes
*/

SceneReader.prototype.checkNodes = function() {
	var elems = this.rootElement.children;

	if (elems.length != 9) {
		this.scene_graph.onXMLError("Wrong number of tags on dsx.");
	}

	if (elems[0].nodeName != "scene") {
		this.scene_graph.onXMLError("Scene tag missing.");
	}

	if (elems[1].nodeName != "views") {
		this.scene_graph.onXMLError("Views tag missing.");
	}

	if (elems[2].nodeName != "illumination") {
		this.scene_graph.onXMLError("Illumination tag missing.");
	}

	if (elems[3].nodeName != "lights") {
		this.scene_graph.onXMLError("Lights tag missing.");
	}

	if (elems[4].nodeName != "textures") {
		this.scene_graph.onXMLError("Textures tag missing.");
	}

	if (elems[5].nodeName != "materials") {
		this.scene_graph.onXMLError("Materials tag missing.");
	}

	if (elems[6].nodeName != "transformations") {
		this.scene_graph.onXMLError("Tranformations tag missing.");
	}

	if (elems[7].nodeName != "primitives") {
		this.scene_graph.onXMLError("Primitives tag missing.");
	}

	if (elems[8].nodeName != "components") {
		this.scene_graph.onXMLError("Components tag missing.");
	}
}




/*
Read Scene
*/
SceneReader.prototype.readScene= function() {
	var elems =  this.rootElement.getElementsByTagName("scene");
	error = this.checkElem(elems, "scene");
	if (error != null) {return error;}

	this.scene_graph.root_id = this.reader.getString(elems[0], "root", true);
	this.scene_graph.axis_length = this.reader.getFloat(elems[0], "axis_length", true);
}


/*
Read Views
*/
SceneReader.prototype.readViews= function() {
	var ids = [];

	elems = this.rootElement.getElementsByTagName("views");
	error = this.checkElem(elems, "views");
	if (error != null) {return error;}
	
	var default_view = this.reader.getString(elems[0], "default", true);

	var subelems = elems[0].getElementsByTagName("perspective");
	for (var i = 0; i < subelems.length; i++) {
        var perspective = new PerspectiveInfo();

		perspective.id = this.reader.getString(subelems[i],"id",true);
		perspective.near = this.reader.getFloat(subelems[i],"near",true);
		perspective.far = this.reader.getFloat(subelems[i],"far",true);
		perspective.angle = this.reader.getFloat(subelems[i],"angle",true);

		var from = subelems[i].getElementsByTagName("from");
		error = this.checkElem(from, "from");
		if (error != null) {return error;}
		this.readXYZ(perspective.from, from[0], "");

		var to = subelems[i].getElementsByTagName("to");
		error = this.checkElem(to, "to");
		if (error != null) {return error;}
		this.readXYZ(perspective.to, to[0], "");

		this.scene_graph.views[i] = perspective;
		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == perspective.id) {
				this.scene_graph.onXMLError("Repeated IDs in <views>.");
			}
		}

		ids[i] = perspective.id;
	}


	for (var i = 0; i < this.scene_graph.views.length; i++) {
		if (this.scene_graph.views[i].id == default_view) {
			this.scene_graph.default_view = i;
			return;
		}
	}

	this.scene_graph.onXMLError("Default view not found.");
}

/*
Read Illumination
*/
SceneReader.prototype.readIllumination= function(illumination) {
    elems = this.rootElement.getElementsByTagName("illumination");
	error = this.checkElem(elems, "illumination");
	if (error != null) {return error;}

	illumination.doublesided = this.reader.getBoolean(elems[0],"doublesided",true);
	illumination.local = this.reader.getBoolean(elems[0],"local",true);

	var ambient = elems[0].getElementsByTagName("ambient");
	error = this.checkElem(ambient, "ambient");
	if (error != null) {return error;}
	this.readRGBA(illumination.ambient, ambient[0], "");

	var background = elems[0].getElementsByTagName("background");
	error = this.checkElem(background, "background");
	if (error != null) {return error;}
	this.readRGBA(illumination.background, background[0], "");
}


/*
Read Lights
*/
SceneReader.prototype.readLights= function() {
	var n = 0;
	var ids = [];

	elems = this.rootElement.getElementsByTagName("lights");
	error = this.checkElem(elems, "lights");
	if (error != null) {return error;}

	var n = elems[0].children.length;
	if (n > 8) {
		this.scene_graph.onXMLError("Too many lights. Max. handled: 8.");
	}
	
	var subelems = elems[0].getElementsByTagName("omni");
	for (var i = 0; i < subelems.length; i++) {
		var light = new OmniLightsInfo();

		light.id = this.reader.getString(subelems[i],"id",true);
		light.enabled = this.reader.getBoolean(subelems[i],"enabled",true);

		var location = subelems[i].getElementsByTagName("location");
		error = this.checkElem(location, "location");
		if (error != null) {return error;}
		this.readXYZ(light.location,location[0],"");

		var ambient = subelems[i].getElementsByTagName("ambient");
		error = this.checkElem(ambient, "ambient");
		if (error != null) {return error;}
		this.readRGBA(light.ambient,ambient[0],"");

		var diffuse = subelems[i].getElementsByTagName("diffuse");
		error = this.checkElem(diffuse, "diffuse");
		if (error != null) {return error;}
		this.readRGBA(light.diffuse,diffuse[0],"");

		var specular = subelems[i].getElementsByTagName("specular");
		error = this.checkElem(specular, "specular");
		if (error != null) {return error;}
		this.readRGBA(light.specular,specular[0],"");

		this.scene_graph.omni_lights[i] = light;
		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == light.id) {
				this.scene_graph.onXMLError("Repeated IDs in <lights>.");
			}
		}
		ids[n] = light.id;

		n++;
	}
		

	var subelems = elems[0].getElementsByTagName("spot");
	for (var i = 0; i < subelems.length; i++) {
		var light = new SpotLightsInfo();

		light.id = this.reader.getString(subelems[i],"id",true);
		light.enabled = this.reader.getBoolean(subelems[i],"enabled",true);
		light.angle = this.reader.getFloat(subelems[i],"angle", true);
		light.exponent = this.reader.getFloat(subelems[i],"exponent", true);

		var target = subelems[i].getElementsByTagName("target");
		error = this.checkElem(target, "target");
		if (error != null) {return error;}
		this.readXYZ(light.target,target[0],"");

		var location = subelems[i].getElementsByTagName("location");
		error = this.checkElem(location, "location");
		if (error != null) {return error;}
		this.readXYZ(light.location,location[0],"");

		var ambient = subelems[i].getElementsByTagName("ambient");
		error = this.checkElem(ambient, "ambient");
		if (error != null) {return error;}
		this.readRGBA(light.ambient,ambient[0],"");

		var diffuse = subelems[i].getElementsByTagName("diffuse");
		error = this.checkElem(diffuse, "diffuse");
		if (error != null) {return error;}
		this.readRGBA(light.diffuse,diffuse[0],"");

		var specular = subelems[i].getElementsByTagName("specular");
		error = this.checkElem(specular, "specular");
		if (error != null) {return error;}
		this.readRGBA(light.specular,specular[0],"");

		this.scene_graph.spot_lights[i] = light;

		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == light.id) {
				this.scene_graph.onXMLError("Repeated IDs in <lights>.");
			}
		}
		ids[n] = light.id;

		n++;
	}
}



/*
Read Textures
*/
SceneReader.prototype.readTextures= function() {
	var ids = [];

	elems = this.rootElement.getElementsByTagName("textures");
	error = this.checkElem(elems, "textures");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("texture");
	for (var i = 0; i < subelems.length; i++) {
		var texture = new TextureInfo();

		texture.id = this.reader.getString(subelems[i],"id",true);
		texture.file = this.reader.getString(subelems[i],"file",true);
		texture.length_s= this.reader.getFloat(subelems[i],"length_s", true);
		texture.length_t = this.reader.getFloat(subelems[i],"length_t", true);

		this.scene_graph.textures[i] = texture;

		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == texture.id) {
				this.scene_graph.onXMLError("Repeated IDs in <textures>.");
			}
		}
		ids[i] = texture.id;
	}
}

/*
Read Materials
*/
SceneReader.prototype.readMaterials= function() {
	var ids = [];
    
    elems = this.rootElement.getElementsByTagName("materials");
    
	var subelems = elems[0].getElementsByTagName("material");
	for (var i = 0; i < subelems.length; i++) {
		var material = new MaterialInfo();

		material.id = this.reader.getString(subelems[i],"id",true);
		
		var emission = subelems[i].getElementsByTagName("emission");
		error = this.checkElem(emission, "emission");
		if (error != null) {return error;}
		this.readRGBA(material.emission,emission[0],"");

		var ambient = subelems[i].getElementsByTagName("ambient");
		error = this.checkElem(ambient, "ambient");
		if (error != null) {return error;}
		this.readRGBA(material.ambient,ambient[0],"");

		var diffuse = subelems[i].getElementsByTagName("diffuse");
		error = this.checkElem(diffuse, "diffuse");
		if (error != null) {return error;}
		this.readRGBA(material.diffuse,diffuse[0],"");

		var specular = subelems[i].getElementsByTagName("specular");
		error = this.checkElem(specular, "specular");
		if (error != null) {return error;}
		this.readRGBA(material.specular,specular[0],"");

		var shininess = subelems[i].getElementsByTagName("shininess");
		error = this.checkElem(shininess, "shininess");
		if (error != null) {return error;}
		material.shininess = this.reader.getFloat(shininess[0], "value", true);

		this.scene_graph.materials[i] = material;

		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == material.id) {
				this.scene_graph.onXMLError("Repeated IDs in <materials>.");
			}
		}
		ids[i] = material.id;
	}
}

/*
Read Tranformations
*/
SceneReader.prototype.readTransformations= function() {
	var ids = [];

	elems = this.rootElement.getElementsByTagName("transformations");
	error = this.checkElem(elems, "transformations");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("transformation");
	for (var i = 0; i < subelems.length; i++) {
		transformation = new TransformationInfo();

		transformation.id = this.reader.getString(subelems[i],"id",true);

		var transformations = subelems[i].children;

		for (var j = 0; j < transformations.length; j++) {
			if (transformations[j].tagName == "translate") {
				translation = new Translation();
				this.readXYZ(translation.vector,transformations[j], "");
				transformation.transformations[j] = translation;
			}
			else if (transformations[j].tagName == "rotate") {
				rotation = new Rotation();
				rotation.axis = this.reader.getString(transformations[j], "axis", true);
				rotation.angle = this.degToRad(this.reader.getFloat(transformations[j], "angle", true));
				transformation.transformations[j] = rotation;
			}
			else if (transformations[j].tagName == "scale") {
				scaling = new Scaling();
				this.readXYZ(scaling.vector,transformations[j], "");
				transformation.transformations[j] = scaling;
			}
		}

		this.scene_graph.transformations[i] = transformation;

		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == transformation.id) {
				this.scene_graph.onXMLError("Repeated IDs in <transformations>.");
			}
		}
		ids[i] = transformation.id;
	}
}

/*
Read Primitives
*/
SceneReader.prototype.readPrimitives= function() {
	var ids = [];

    elems = this.rootElement.getElementsByTagName("primitives");
	error = this.checkElem(elems, "primitives");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("primitive");
	for (var i = 0; i < subelems.length; i++) {
		var primitive = new PrimitiveInfo();

		primitive.id = this.reader.getString(subelems[i],"id",true);

		var prim = subelems[i].children;

		if (prim.length != 1) {
			this.scene_graph.onXMLError("More than one primitive in <primitive> block");
			break;
		}

		var rectangle = subelems[i].getElementsByTagName("rectangle");
		if (rectangle.length == 1) {
			var v1 = new Vector();
			var v2 = new Vector();

			this.readXYZ(v1,rectangle[0],"1");
			this.readXYZ(v2,rectangle[0],"2");

			primitive.primitive = new Rectangle(this.scene_graph.scene, v1.x, v1.y, v2.x, v2.y);

		}
		
		var triangle = subelems[i].getElementsByTagName("triangle");
		if (triangle.length == 1) {
			var v1 = new Vector();
			var v2 = new Vector();
			var v3 = new Vector();

			this.readXYZ(v1,triangle[0],"1");
			this.readXYZ(v2,triangle[0],"2");
			this.readXYZ(v3,triangle[0],"3");

			primitive.primitive = new Triangle(this.scene_graph.scene, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
		}
		
		
		var cylinder = subelems[i].getElementsByTagName("cylinder");
		if (cylinder.length == 1) {
			var base = this.reader.getFloat(cylinder[0], "base", true);
			var top = this.reader.getFloat(cylinder[0], "top", true);
			var height = this.reader.getFloat(cylinder[0], "height", true);
			var slices = this.reader.getFloat(cylinder[0], "slices", true);
			var stacks = this.reader.getFloat(cylinder[0], "stacks", true);

			primitive.primitive = new Cylinder(this.scene_graph.scene, base, top, slices, stacks, height);
		}


		var sphere = subelems[i].getElementsByTagName("sphere");
		if (sphere.length == 1) {
			var radius = this.reader.getFloat(sphere[0], "radius", true);
			var slices = this.reader.getFloat(sphere[0], "slices", true);
			var stacks = this.reader.getFloat(sphere[0], "stacks", true);

			primitive.primitive = new Sphere(this.scene_graph.scene, radius, slices, stacks);
		}
		
		var torus = subelems[i].getElementsByTagName("torus");
		if (torus.length == 1) {
			var inner = this.reader.getFloat(torus[0], "inner", true);
			var outer = this.reader.getFloat(torus[0], "outer", true);
			var slices = this.reader.getFloat(torus[0], "slices", true);
			var loops = this.reader.getFloat(torus[0], "loops", true);

			primitive.primitive = new Torus(this.scene_graph.scene, inner, outer, slices, loops);
		}

		this.scene_graph.primitives[i] = primitive;

		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == primitive.id) {
				this.scene_graph.onXMLError("Repeated IDs in <primitives>.");
			}
		}
		ids[i] = primitive.id;
	}
}

/*
Read Components
*/
SceneReader.prototype.readComponents= function() {
	var ids = [];

    elems = this.rootElement.getElementsByTagName("components");
	error = this.checkElem(elems, "components");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("component");
	for (var i = 0; i < subelems.length; i++) {
		component = new ComponentInfo();

		component.id = this.reader.getString(subelems[i],"id",true);

		var transformation = subelems[i].getElementsByTagName("transformation");
		error = this.checkElem(transformation, "transformation");
		if (error != null) {return error;}
		
		var transformationref = transformation[0].getElementsByTagName("transformationref");
		error = this.checkElem(transformationref, "transformationref");

		if (error == "either zero or more than one transformationref element found.") {
			var component_transformation = [];
			
			var transformations = transformation[0].children;
					
			for (var j = 0; j < transformations.length; j++) {
				if (transformations[j].tagName == "translate") {
					translation = new Translation();
					this.readXYZ(translation.vector,transformations[j], "");
					component_transformation[j] = translation;
				}
				else if (transformations[j].tagName == "rotate") {
					rotation = new Rotation();
					rotation.axis = this.reader.getString(transformations[j], "axis", true);
					rotation.angle = this.degToRad(this.reader.getFloat(transformations[j], "angle", true));
					component_transformation[j] = rotation;
				}
				else if (transformations[j].tagName == "scale") {
					scaling = new Scaling();
					this.readXYZ(scaling.vector,transformations[j], "");
					component_transformation[j] = scaling;
				}

				component.transformations = component_transformation;
			}
		}
		else if (error == null) {
			component.transformationref = this.reader.getString(transformationref[0],"id",true);

			for (var k = 0; k < this.scene_graph.transformations.length; k++) {
				if (component.transformationref == this.scene_graph.transformations[k].id) {
					for (var j = 0; j < this.scene_graph.transformations[k].transformations.length; j++) {
						component.transformations[j] = this.scene_graph.transformations[k].transformations[j];	
					}
				}
			}
		}

		// material
		var materials = subelems[i].getElementsByTagName("materials");
		error = this.checkElem(materials, "materials");
		if (error != null) {return error;}

		var material = materials[0].getElementsByTagName("material");
		for (var j = 0; j < material.length; j++) {
			var m = this.reader.getString(material[j],"id",true);

			if (m == "inherit") {
				component.materials[j] = "inherit";
			}

			for (var k = 0; k < this.scene_graph.materials.length; k++) {
				if (m == this.scene_graph.materials[k].id) {
					component.materials[j] = this.scene_graph.materials[k];
				}
			}
		}
		

		// texture
		var texture = subelems[i].getElementsByTagName("texture");
		error = this.checkElem(texture, "texture");
		if (error != null) {return error;}
		var t = this.reader.getString(texture[0],"id", true);

		if (t == "inherit") {
			component.texture = "inherit";
		}
		else if (t == "none") {
			component.texture = "none";
		}
		else {
			for (var k = 0; k < this.scene_graph.textures.length; k++) {
				if (t == this.scene_graph.textures[k].id) {
					component.texture = this.scene_graph.textures[k];
				}
			}
		}

		// children
		var children = subelems[i].getElementsByTagName("children");
		error = this.checkElem(children, "children");
		if (error != null) {return error;}

		var primitiveref = children[0].getElementsByTagName("primitiveref");
		for (var j = 0; j < primitiveref.length; j++) {
			var p = this.reader.getString(primitiveref[j],"id",true);

			for (var k = 0; k < this.scene_graph.primitives.length; k++) {
				if (p == this.scene_graph.primitives[k].id) {
					component.children_primitives[j] = this.scene_graph.primitives[k];
				}
			}			
		}

	
		var componentref = children[0].getElementsByTagName("componentref");
		for (var j = 0; j < componentref.length; j++) {
			component.children_components[j] = this.reader.getString(componentref[j],"id",true);
		}

		this.scene_graph.components[i] = component;

		for (var j = 0; j < ids.length; j++) {
			if (ids[j] == component.id) {
				this.scene_graph.onXMLError("Repeated IDs in <components>.");
			}
		}
		ids[i] = component.id;
	}
}


/*
Swap the children_components ids of a component with the actual children
*/
SceneReader.prototype.addChildrenToComponents = function() {
	for (var i = 0; i < this.scene_graph.components.length; i++) {
		for (var j = 0; j < this.scene_graph.components[i].children_components.length; j++) {
			for (var k = 0; k < this.scene_graph.components.length; k++) {
				if (this.scene_graph.components[k].id == this.scene_graph.components[i].children_components[j]) {
					this.scene_graph.components[i].children_components[j] = this.scene_graph.components[k];					
				}
			}
		}
	}
}


/*
Checks if the elems structure is empty or has more than one tag
*/

SceneReader.prototype.checkElem= function(elems, name) {
	if (elems == null) {
		return name+" element is missing.";
	}
	
	if (elems.length != 1) {
		return "either zero or more than one "+name+" element found.";
	}
		
	return null;
}

/*
Read x,y,z
suffix used for case where there x1,y1... instead of x,y...
*/
SceneReader.prototype.readXYZ= function(vector,node,suffix) {
	vector.x = this.reader.getFloat(node,"x"+suffix, false);
	vector.y = this.reader.getFloat(node,"y"+suffix, false);
	vector.z = this.reader.getFloat(node,"z"+suffix, false);
	vector.w = this.reader.getFloat(node,"w"+suffix, false);
}

/*
Read r,g,b,a
*/
SceneReader.prototype.readRGBA= function(color,node,suffix) {
	color.r = this.reader.getFloat(node,"r"+suffix, true);
	color.g = this.reader.getFloat(node,"g"+suffix, true);
	color.b = this.reader.getFloat(node,"b"+suffix, true);
	color.a = this.reader.getFloat(node,"a"+suffix, true);
}

SceneReader.prototype.degToRad = function(deg) {
	return deg*Math.PI/180.0;
}