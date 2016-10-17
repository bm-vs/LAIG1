
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
};


XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    this.view_number;
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.axis=new CGFaxis(this,this.graph.scene_info.axis_length);
	
	this.gl.clearColor(this.graph.illumination_info.background.r,this.graph.illumination_info.background.g,this.graph.illumination_info.background.b,this.graph.illumination_info.background.a);
	this.setGlobalAmbientLight(this.graph.illumination_info.ambient.r,this.graph.illumination_info.ambient.g,this.graph.illumination_info.ambient.b,this.graph.illumination_info.ambient.a);

	// Camera
	this.setCamera("default");
	
	// Lights
	this.setLights();
	
	/*
	// Textures
	this.textures = [];
	for (var i = 0; i < this.graph.textures_info.textures.length; i++) {
		this.textures[i] = new CGFappearance(this);

		this.textures[i].loadTexture(this.graph.textures_info.textures[i].file);
		this.textures[i].setTextureWrap(this.graph.textures_info.textures[i].length_s, this.graph.textures_info.textures[i].length_t);
	}
	*/

};

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		for (var i = 0; i < this.lights.length; i++) {
			this.lights[i].update();
		}
	};	
};


XMLscene.prototype.setCamera = function(action) {
	if (action == "change") {
		this.view_number = (this.view_number + 1) % this.graph.views_info.perspectives.length;
	}
	else if (action == "default") {
		this.view_number = this.graph.views_info.default_view;
	}

	var perspective = this.graph.views_info.perspectives[this.view_number];

	var fov = DegToRad(perspective.angle);
	var near = perspective.near;
	var far = perspective.far;
	var positionx = perspective.from.x;
	var positiony = perspective.from.y;
	var positionz = perspective.from.z;
	var targetx = perspective.to.x;
	var targety = perspective.to.y;
	var targetz = perspective.to.z;

	this.camera = new CGFcamera(fov, near, far, vec3.fromValues(positionx, positiony, positionz), vec3.fromValues(targetx, targety, targetz));
}


XMLscene.prototype.setLights = function() {
	var n = 0;

	for (var i = 0; i < this.graph.lights_info.omni_lights.length; i++) {
		var light = this.graph.lights_info.omni_lights[i];

		this.lights[n].setPosition(light.location.x, light.location.y, light.location.z, light.location.w);
		this.lights[n].setAmbient(light.ambient.r,light.ambient.g,light.ambient.b,light.ambient.a);
		this.lights[n].setDiffuse(light.diffuse.r,light.diffuse.g,light.diffuse.b,light.diffuse.a);
		this.lights[n].setSpecular(light.specular.r,light.specular.g,light.specular.b,light.specular.a);
		this.lights[n].update();
		this.lights[n].setVisible(true);

		if (light.enabled) {
			this.lights[n].enable();
		}

		n++;
	}

	for (var i = 0; i < this.graph.lights_info.spot_lights.length; i++) {
		var light = this.graph.lights_info.spot_lights[i];

		this.lights[n].setSpotCutOff(light.angle);
		this.lights[n].setSpotDirection(light.target.x, light.target.y, light.target.z);
		this.lights[n].setSpotExponent(light.exponent);
		this.lights[n].setPosition(light.location.x, light.location.y, light.location.z, light.location.w);
		this.lights[n].setAmbient(light.ambient.r,light.ambient.g,light.ambient.b,light.ambient.a);
		this.lights[n].setDiffuse(light.diffuse.r,light.diffuse.g,light.diffuse.b,light.diffuse.a);
		this.lights[n].setSpecular(light.specular.r,light.specular.g,light.specular.b,light.specular.a);
		this.lights[n].update();
		this.lights[n].setVisible(true);

		if (light.enabled) {
			this.lights[n].enable();
		}

		n++;
	}




}