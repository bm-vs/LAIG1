//==============================================================================================================================================================

// PerspectiveInfo
function PerspectiveInfo() {
    this.id; 
    this.near;
    this.far;
    this.angle;
    this.from = new Vector();
    this.to = new Vector();
}


//==============================================================================================================================================================
/*
IlluminationInfo
*/
function IlluminationInfo() {
    this.doublesided;
    this.local;
    this.ambient = new Color();
    this.background = new Color();
}

//==============================================================================================================================================================
/*
LightsInfo
*/


// OmniLightsInfo
function OmniLightsInfo() {
    this.id;
    this.enabled;
    this.location = new Vector();
    this.ambient = new Color();
    this.diffuse = new Color();
    this.specular = new Color();
}

// SpotLightsInfo
function SpotLightsInfo() {
    this.id;
    this.enabled;
    this.angle;
    this.exponent;
    this.target = new Vector();
    this.location = new Vector();
    this.ambient = new Color();
    this.diffuse = new Color();
    this.specular = new Color();
}

//==============================================================================================================================================================

/*
TextureInfo
*/

function TextureInfo() {
	this.id;
	this.file;
	this.length_s;
	this.length_t;
}

//==============================================================================================================================================================
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

//==============================================================================================================================================================
/*
TranformationInfo
*/

function TransformationInfo() {
	this.id;
	this.transformations = [];
}

/*
Translation
*/
function Translation() {
	this.vector = new Vector();
}

/*
Rotation
*/
function Rotation() {
	this.axis;
	this.angle;
}

/*
Scaling
*/
function Scaling() {
	this.vector = new Vector();
}


//==============================================================================================================================================================
/*
PrimitiveInfo
*/

function PrimitiveInfo() {
	this.id;
	this.primitive;
}

//==============================================================================================================================================================
/*
ComponentInfo
*/

function ComponentInfo() {
	this.id;
	this.transformationref = null;
	this.transformations = [];
	this.materials = [];
	this.texture;
	this.children_components = [];
	this.children_primitives = [];
}