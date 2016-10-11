//==============================================================================================================================================================
/*
LightsInfo
*/

function LightsInfo() {
    this.omni_lights = [];
    this.spot_lights = [];
}

LightsInfo.prototype.print= function() {
    console.log("omni");
	for (var i = 0; i < this.omni_lights.length; i++) {
		this.omni_lights[i].print();
	}
	
	console.log("spot");
	for (var i = 0; i < this.spot_lights.length; i++) {
		this.spot_lights[i].print();
	}
}


// OmniLightsInfo
function OmniLightsInfo() {
    this.id;
    this.enabled;
    this.location = new Vector();
    this.ambient = new Color();
    this.diffuse = new Color();
    this.specular = new Color();
}

OmniLightsInfo.prototype.print= function() {
	console.log(this.id+", "+this.enabled);
	console.log("location "+this.location.x+", "+this.location.y+", "+this.location.z+", "+this.location.w);
	console.log("ambient "+this.ambient.r+", "+this.ambient.g+", "+this.ambient.b+", "+this.ambient.a);
	console.log("diffuse "+this.diffuse.r+", "+this.diffuse.g+", "+this.diffuse.b+", "+this.diffuse.a);
	console.log("specular "+this.specular.r+", "+this.specular.g+", "+this.specular.b+", "+this.specular.a);
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

SpotLightsInfo.prototype.print= function() {
	console.log(this.id+", "+this.enabled+", "+this.angle+", "+this.exponent);
	console.log("target "+this.target.x+", "+this.target.y+", "+this.target.z);
	console.log("location "+this.location.x+", "+this.location.y+", "+this.location.z);
	console.log("ambient "+this.ambient.r+", "+this.ambient.g+", "+this.ambient.b+", "+this.ambient.a);
	console.log("diffuse "+this.diffuse.r+", "+this.diffuse.g+", "+this.diffuse.b+", "+this.diffuse.a);
	console.log("specular "+this.specular.r+", "+this.specular.g+", "+this.specular.b+", "+this.specular.a);
}