function MyInterface() {
    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
    CGFinterface.prototype.init.call(this, application);

    return true;
}


MyInterface.prototype.processKeyboard = function(event) {
    CGFinterface.prototype.processKeyboard.call(this,event);

    switch(event.keyCode) {
        case(86):
        case(118):
            this.scene.setCamera("change");
    }


}