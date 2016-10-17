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

IlluminationInfo.prototype.print= function() {
    console.log(this.doublesided+", "+this.local);
	console.log("ambient "+this.ambient.r+", "+this.ambient.g+", "+this.ambient.b+", "+this.ambient.a);
	console.log("background "+this.background.r+", "+this.background.g+", "+this.background.b+", "+this.background.a);

}