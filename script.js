// Grant Cesium access to the token
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTZjYTdmOS0yMmE1LTQxMjAtOTY4NS03NDRkMjExYjZkNjIiLCJpZCI6MjI0NzcwLCJpYXQiOjE3MjEwNTM2NTJ9.L751MLxXj3SvkYlDEJFjwhudGrwmNgiEN60R1ULLwZM"; // Replace with your Cesium Ion access token

async function loadCesiumData() {
    try {
        // Load DTM (Digital Terrain Model) data using Ion Asset ID
        const terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(2663518);

        // Initialize the Cesium Viewer with the terrain provider
        const viewer = new Cesium.Viewer("cesiumContainer", {
            terrainProvider: terrainProvider,
            requestVertexNormals: true // Needed to visualize slope
        });

        // Fly the camera to the DTM location
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-75.428846, 5.015236, 15500), // Coordinates and altitude
        });

        // Load Cesium OSM Buildings
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
        viewer.scene.primitives.add(tileset);
        await viewer.zoomTo(tileset);

        // Apply the default style if it exists
        const extras = tileset.asset.extras;
        if (
            Cesium.defined(extras) &&
            Cesium.defined(extras.ion) &&
            Cesium.defined(extras.ion.defaultStyle)
        ) {
            tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
        }

        // Define the material functions
        function getContourMaterial() {
            return new Cesium.Material({
                fabric: {
                    type: "ElevationContour",
                },
                translucent: false,
            });
        }

        // Initialize the viewModel
        const contourColor = Cesium.Color.RED.clone();
        let contourUniforms = {};

        const viewModel = {
            enableContour: false,
            contourSpacing: 150.0,
            contourWidth: 2.0,
            changeColor: function () {
                contourUniforms.color = Cesium.Color.fromRandom({ alpha: 1.0 }, contourColor);
            },
        };

        // Convert the viewModel members into knockout observables.
        Cesium.knockout.track(viewModel);

        // Bind the viewModel to the DOM elements of the UI that call for it.
        Cesium.knockout.applyBindings(viewModel, document.getElementById("toolbar"));

        function updateMaterial() {
            // Check if contour lines are enabled
            const hasContour = viewModel.enableContour;
            // Get a reference to the globe object
            const globe = viewer.scene.globe;
            // Initialize material variable
            let material;
            if (hasContour) {
                // Set up contour material if enabled
                material = getContourMaterial();
                contourUniforms = material.uniforms;
                contourUniforms.width = viewModel.contourWidth; // Set contour line width
                contourUniforms.spacing = viewModel.contourSpacing; // Set contour line spacing
                contourUniforms.color = contourColor; // Set contour line color
            } else {
                // Reset to default material if contour lines are not enabled
                material = undefined;
            }
            // Apply the material to the globe
            globe.material = material;
        }
        
        updateMaterial();

    // Watch for changes in the enableContour property
    Cesium.knockout.getObservable(viewModel, "enableContour").subscribe(function (newValue) {
        // Update the material of the globe when enableContour changes
        updateMaterial();
    });

    // Watch for changes in the contourWidth property
    Cesium.knockout.getObservable(viewModel, "contourWidth").subscribe(function (newValue) {
        // Update the contour line width when contourWidth changes
        contourUniforms.width = parseFloat(newValue);
    });

    // Watch for changes in the contourSpacing property
    Cesium.knockout.getObservable(viewModel, "contourSpacing").subscribe(function (newValue) {
        // Update the contour line spacing when contourSpacing changes
        contourUniforms.spacing = parseFloat(newValue);
    });


// Define the particle system for smoke
const smokeParticleSystem = new Cesium.ParticleSystem({
    // Set the initial position and orientation of the particle system
    modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(-75.319881, 4.89249, 5150) // Coordinates with altitude
    ),
    // Set the speed of the particles
    speed: 1.0,
    // Set the lifetime of the particles
    lifetime: 1000.0,
    // Define the shape of the emitter, here a circle with a radius of 200 meters
    emitter: new Cesium.CircleEmitter(200.0),
    // Set the size of the particle image
    imageSize: new Cesium.Cartesian2(15.0, 15.0),
    // Scale the size of the particles over their lifetime, starting from 1.0 to 24.0
    startScale: 1.0,
    endScale: 24.0,
    // Set the initial size of the particles
    particleSize: 12,
    // Set the emission rate (particles per second)
    emissionRate: 10.0,
    // Set the image used for the particles
    image: 'Img/smoke.png', 
    // Set the color and transparency of the particles
    color: Cesium.Color.LIGHTGRAY.withAlpha(0.5),
    // Set the mass of each particle
    mass: 0.1,
    // Ensure the size is interpreted in meters
    sizeInMeters: true
});
// Add the particle system to the scene
viewer.scene.primitives.add(smokeParticleSystem);

    } catch (error) {
        // Log any errors that occur during the terrain or tileset loading
        console.error(error);
    }
}
// Call the async function to load Cesium data
loadCesiumData();
