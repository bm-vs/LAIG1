function SceneReader(rootElement, reader) {
    this.rootElement = rootElement;
    this.reader = reader;
}

/*
Read Scene
*/
SceneReader.prototype.readScene= function(scene_info) {	
	var elems =  this.rootElement.getElementsByTagName("scene");
	var error = this.checkElem(elems, "scene");
	if (error != null) {return error;}

	scene_info.root = this.reader.getString(elems[0], "root", false);
	scene_info.axis_length = this.reader.getFloat(elems[0], "axis_length", false);
}


/*
Read Views
*/
SceneReader.prototype.readViews= function(views_info) {
	elems = this.rootElement.getElementsByTagName("views");
	error = this.checkElem(elems, "views");
	if (error != null) {return error;}
	
	var default_view = this.reader.getString(elems[0], "default", false);

	var subelems = elems[0].getElementsByTagName("perspective");
	for (var i = 0; i < subelems.length; i++) {
        var perspective = new PerspectiveInfo();

		perspective.id = this.reader.getString(subelems[i],"id",false);
		perspective.near = this.reader.getFloat(subelems[i],"near",false);
		perspective.far = this.reader.getFloat(subelems[i],"far",false);
		perspective.angle = this.reader.getFloat(subelems[i],"angle",false);

		var from = subelems[i].getElementsByTagName("from");
		error = this.checkElem(from, "from");
		if (error != null) {return error;}
		this.readXYZ(perspective.from, from[0], "");

		var to = subelems[i].getElementsByTagName("to");
		error = this.checkElem(to, "to");
		if (error != null) {return error;}
		this.readXYZ(perspective.to, to[0], "");

		views_info.perspectives[i] = perspective;
	}


	for (var i = 0; i < views_info.perspectives.length; i++) {
		if (views_info.perspectives[i].id == default_view) {
			views_info.default_view = i;
		}
	}	
}

/*
Read Illumination
*/
SceneReader.prototype.readIllumination= function(illumination) {
    elems = this.rootElement.getElementsByTagName("illumination");
	error = this.checkElem(elems, "illumination");
	if (error != null) {return error;}

	illumination.doublesided = this.reader.getBoolean(elems[0],"doublesided",false);
	illumination.local = this.reader.getBoolean(elems[0],"local",false);

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
SceneReader.prototype.readLights= function(lights_info) {
	elems = this.rootElement.getElementsByTagName("lights");
	error = this.checkElem(elems, "lights");
	if (error != null) {return error;}
	
	var subelems = elems[0].getElementsByTagName("omni");
	for (var i = 0; i < subelems.length; i++) {
		var light = new OmniLightsInfo();

		light.id = this.reader.getString(subelems[i],"id",false);
		light.enabled = this.reader.getBoolean(subelems[i],"enabled",false);

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

		lights_info.omni_lights[i] = light;	
	}
		

	var subelems = elems[0].getElementsByTagName("spot");
	for (var i = 0; i < subelems.length; i++) {
		var light = new SpotLightsInfo();

		light.id = this.reader.getString(subelems[i],"id",false);
		light.enabled = this.reader.getBoolean(subelems[i],"enabled",false);
		light.angle = this.reader.getFloat(subelems[i],"angle", false);
		light.exponent = this.reader.getFloat(subelems[i],"exponent", false);

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

		lights_info.spot_lights[i] = light;	
	}
}



/*
Read Textures
*/
SceneReader.prototype.readTextures= function(textures_info) {
	elems = this.rootElement.getElementsByTagName("textures");
	error = this.checkElem(elems, "textures");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("texture");
	for (var i = 0; i < subelems.length; i++) {
		var texture = new TextureInfo();

		texture.id = this.reader.getString(subelems[i],"id",false);
		texture.file = this.reader.getString(subelems[i],"file",false);
		texture.length_s= this.reader.getFloat(subelems[i],"length_s", false);
		texture.length_t = this.reader.getFloat(subelems[i],"length_t", false);

		textures_info.textures[i] = texture;
	}
}

/*
Read Materials
*/
SceneReader.prototype.readMaterials= function(materials_info) {
    
    elems = this.rootElement.getElementsByTagName("materials");
	/*
	error = this.checkElem(elems, "materials");
	if (error != null) {return error;}*/

	var subelems = elems[0].getElementsByTagName("material");
	for (var i = 0; i < subelems.length; i++) {
		var material = new MaterialInfo();

		material.id = this.reader.getString(subelems[i],"id",false);
		
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
		material.shininess = this.reader.getFloat(shininess[0], "value", false);

		materials_info.materials[i] = material;
	}
}

/*
Read Tranformations
*/
SceneReader.prototype.readTransformations= function(transformations_info) {
	elems = this.rootElement.getElementsByTagName("transformations");
	error = this.checkElem(elems, "transformations");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("transformation");
	for (var i = 0; i < subelems.length; i++) {
		transformation = new TransformationInfo();

		transformation.id = this.reader.getString(subelems[i],"id",false);

		var transformations = subelems[i].children;

		for (var j = 0; j < transformations.length; j++) {
			if (transformations[j].tagName == "translate") {
				translation = new Translation();
				this.readXYZ(translation.vector,transformations[j], "");
				transformation.transformations[j] = translation;
			}
			else if (transformations[j].tagName == "rotate") {
				rotation = new Rotation();
				rotation.axis = this.reader.getString(transformations[j], "axis", false);
				rotation.angle = this.reader.getFloat(transformations[j], "angle", false);
				transformation.transformations[j] = rotation;
			}
			else if (transformations[j].tagName == "scale") {
				scaling = new Scaling();
				this.readXYZ(scaling.vector,transformations[j], "");
				transformation.transformations[j] = scaling;
			}
		}

		transformations_info.transformations[i] = transformation;
	}
}

/*
Read Primitives
*/
SceneReader.prototype.readPrimitives= function(primitives_info) {
    elems = this.rootElement.getElementsByTagName("primitives");
	error = this.checkElem(elems, "primitives");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("primitive");
	for (var i = 0; i < subelems.length; i++) {
		var primitive = new PrimitiveInfo();

		primitive.id = this.reader.getString(subelems[i],"id",false);

		var prim = subelems[i].children;

		if (prim.length != 1) {
			// throw error
			break;
		}

		var rectangle = subelems[i].getElementsByTagName("rectangle");
		if (rectangle.length == 1) {
			primitive.primitive = new Rectangle();
			this.readXYZ(primitive.primitive.v1,rectangle[0],"1");
			this.readXYZ(primitive.primitive.v2,rectangle[0],"2");
		}
		
		var triangle = subelems[i].getElementsByTagName("triangle");
		if (triangle.length == 1) {
			primitive.primitive = new Triangle();
			this.readXYZ(primitive.primitive.v1,triangle[0],"1");
			this.readXYZ(primitive.primitive.v2,triangle[0],"2");
			this.readXYZ(primitive.primitive.v3,triangle[0],"3");
		}
		
		var cylinder = subelems[i].getElementsByTagName("cylinder");
		if (cylinder.length == 1) {
			primitive.primitive = new Cylinder();
			primitive.primitive.base = this.reader.getFloat(cylinder[0], "base", false);
			primitive.primitive.top = this.reader.getFloat(cylinder[0], "top", false);
			primitive.primitive.height = this.reader.getFloat(cylinder[0], "height", false);
			primitive.primitive.slices = this.reader.getFloat(cylinder[0], "slices", false);
			primitive.primitive.stacks = this.reader.getFloat(cylinder[0], "stacks", false);
		}

		var sphere = subelems[i].getElementsByTagName("sphere");
		if (sphere.length == 1) {
			primitive.primitive = new Sphere();
			primitive.primitive.radius = this.reader.getFloat(sphere[0], "radius", false);
			primitive.primitive.slices = this.reader.getFloat(sphere[0], "slices", false);
			primitive.primitive.stacks = this.reader.getFloat(sphere[0], "stacks", false);
		}
		
		var torus = subelems[i].getElementsByTagName("torus");
		if (torus.length == 1) {
			primitive.primitive = new Torus();
			primitive.primitive.inner = this.reader.getFloat(torus[0], "inner", false);
			primitive.primitive.outer = this.reader.getFloat(torus[0], "outer", false);
			primitive.primitive.slices = this.reader.getFloat(torus[0], "slices", false);
			primitive.primitive.loops = this.reader.getFloat(torus[0], "loops", false);
		}

		primitives_info.primitives[i] = primitive;
	}
}

/*
Read Components
*/
SceneReader.prototype.readComponents= function(components_info) {
    elems = this.rootElement.getElementsByTagName("components");
	error = this.checkElem(elems, "components");
	if (error != null) {return error;}

	var subelems = elems[0].getElementsByTagName("component");
	for (var i = 0; i < subelems.length; i++) {
		component = new ComponentInfo();

		component.id = this.reader.getString(subelems[i],"id",false);

		var transformation = subelems[i].getElementsByTagName("transformation");
		error = this.checkElem(transformation, "transformation");
		if (error != null) {return error;}
		
		var transformationref = transformation[0].getElementsByTagName("transformationref");
		error = this.checkElem(transformationref, "transformationref");

		if (error == "either zero or more than one transformationref element found.") {
			var component_transformation = new TransformationInfo();
			
			var transformations = transformation[0].children;
					
			for (var j = 0; j < transformations.length; j++) {
				if (transformations[j].tagName == "translate") {
					translation = new Translation();
					this.readXYZ(translation.vector,transformations[j], "");
					component_transformation.transformations[j] = translation;
				}
				else if (transformations[j].tagName == "rotate") {
					rotation = new Rotation();
					rotation.axis = this.reader.getString(transformations[j], "axis", false);
					rotation.angle = this.reader.getFloat(transformations[j], "angle", false);
					component_transformation.transformations[j] = rotation;
				}
				else if (transformations[j].tagName == "scale") {
					scaling = new Scaling();
					this.readXYZ(scaling.vector,transformations[j], "");
					component_transformation.transformations[j] = scaling;
				}

				component.transformations[j] = component_transformation;
			}
		}
		else if (error == null) {
			component.transformationref = this.reader.getString(transformationref[0],"id",false);
		}


		// material
		var materials = subelems[i].getElementsByTagName("materials");
		error = this.checkElem(materials, "materials");
		if (error != null) {return error;}

		var material = materials[0].getElementsByTagName("material");
		for (var j = 0; j < material.length; j++) {
			component.materials[j] = this.reader.getString(material[j],"id",false);
		}
		

		// texture
		var texture = subelems[i].getElementsByTagName("texture");
		error = this.checkElem(texture, "texture");
		if (error != null) {return error;}
		component.texture = this.reader.getString(texture[0],"id", false);

		// children
		var children = subelems[i].getElementsByTagName("children");
		error = this.checkElem(children, "children");
		if (error != null) {return error;}
	
		var componentref = children[0].getElementsByTagName("componentref");
		for (var j = 0; j < componentref.length; j++) {
			component.children_components = this.reader.getString(componentref[j],"id",false);
		}

		var primitiveref = children[0].getElementsByTagName("primitiveref");
		for (var j = 0; j < primitiveref.length; j++) {
			component.children_primitives = this.reader.getString(primitiveref[j],"id",false);
		}
		
		components_info.components[i] = component;
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
	color.r = this.reader.getFloat(node,"r"+suffix, false);
	color.g = this.reader.getFloat(node,"g"+suffix, false);
	color.b = this.reader.getFloat(node,"b"+suffix, false);
	color.a = this.reader.getFloat(node,"a"+suffix, false);
}