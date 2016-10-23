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

PerspectiveInfo.prototype.print= function() {
    console.log(this.id+", "+this.near+", "+this.far+", "+this.angle);
    console.log(this.from.x+", "+this.from.y+", "+this.from.z);
    console.log(this.to.x+", "+this.to.y+", "+this.to.z);
}