
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph = this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);
	
	// <scene>
	this.root_id;
	this.axis_length;

	// <views>
	this.default_view = -1;
	this.views = [];
	
	

	this.illumination_info = new IlluminationInfo();
	this.lights_info = new LightsInfo();
	this.textures_info = new TexturesInfo();
	this.materials_info = new MaterialsInfo();
	this.transformations_info = new TransformationsInfo();
	this.primitives_info = new PrimitivesInfo();
	this.components_info = new ComponentsInfo();

	this.root;
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseDSX(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Parses elements of one block and stores information in a specific data structure
 */

MySceneGraph.prototype.parseDSX= function(rootElement) {

	var scene_reader = new SceneReader(rootElement, this);
	
	scene_reader.readScene();
	scene_reader.readViews(this.views_info);
	scene_reader.readIllumination(this.illumination_info);
	scene_reader.readLights(this.lights_info);
	scene_reader.readTextures(this.textures_info);
	scene_reader.readMaterials(this.materials_info);
	scene_reader.readTransformations(this.transformations_info);
	scene_reader.readPrimitives(this.primitives_info);
	scene_reader.readComponents(this.components_info);
	scene_reader.addChildrenToComponents(this.components_info);

	this.root = new Node(null, this.searchComponentByID(this.root_id), this.scene);
	//this.printinfo();
};



	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


MySceneGraph.prototype.searchComponentByID=function(id) {	
    for (var i = 0; i < this.components_info.components.length; i++) {
        if (this.components_info.components[i].id == id) {
            return this.components_info.components[i];
        }
    }
}

MySceneGraph.prototype.display = function() {
    this.root.display();
}

MySceneGraph.prototype.changeMaterials = function() {
	this.root.changeMaterial();
}

/*
Print Info
*/
MySceneGraph.prototype.printinfo=function () {
	console.log("======================================================================");
	console.log("VIEWS");
	this.views_info.print();
	
	console.log("======================================================================");
	console.log("ILLUMINATION");
	this.illumination_info.print();

	console.log("======================================================================");
	console.log("LIGHTS");
	this.lights_info.print();
	
	console.log("======================================================================");
	console.log("TEXTURES");
	this.textures_info.print();

	console.log("======================================================================");
	console.log("MATERIALS");
	this.materials_info.print();

	console.log("======================================================================");
	console.log("TRANSFORMATIONS");
	this.transformations_info.print();

	console.log("======================================================================");
	console.log("PRIMITIVES");
	this.primitives_info.print();

	console.log("======================================================================");
	console.log("COMPONENTS");
	this.components_info.print();
	
}