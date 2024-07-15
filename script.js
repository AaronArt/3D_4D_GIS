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


             /*function updates the globe's material based on whether contour lines are enabled or not. 
            If contour lines are enabled, it sets up the material with the specified width, spacing, and color. 
            If they are not enabled, it resets the globe to its default material*/
            function updateMaterial() {
                const hasContour = viewModel.enableContour;
                const globe = viewer.scene.globe;
                let material;
                if (hasContour) {
                    material = getContourMaterial();
                    contourUniforms = material.uniforms;
                    contourUniforms.width = viewModel.contourWidth;
                    contourUniforms.spacing = viewModel.contourSpacing;
                    contourUniforms.color = contourColor;
                } else {
                    material = undefined; // Reset to default material
                }

                globe.material = material;
            }

            updateMaterial();


            /*Each of these lines uses Cesium.knockout.getObservable to watch for changes in specific properties of 
            the viewModel and update corresponding uniform values or call functions to reflect these changes in the 
            visualization dynamically.*/
            Cesium.knockout.getObservable(viewModel, "enableContour").subscribe(function (newValue) {
                updateMaterial();
            });
            Cesium.knockout.getObservable(viewModel, "contourWidth").subscribe(function (newValue) {
                contourUniforms.width = parseFloat(newValue);
            });
            Cesium.knockout.getObservable(viewModel, "contourSpacing").subscribe(function (newValue) {
                contourUniforms.spacing = parseFloat(newValue);
            });
        } catch (error) {
            // Log any errors that occur during the terrain or tileset loading
            console.error(error);
        }
    }
    // Call the async function to load Cesium data
    loadCesiumData();