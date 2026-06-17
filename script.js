// =============================================================
//  Geovisor 3D/4D - Manizales & Nevado del Ruiz
//  CesiumJS application bootstrap + UI wiring
//  Bilingual edition (EN / ES) with dynamic translations
// =============================================================

// --- Cesium Ion token ---------------------------------------------------------
Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTZjYTdmOS0yMmE1LTQxMjAtOTY4NS03NDRkMjExYjZkNjIiLCJpZCI6MjI0NzcwLCJpYXQiOjE3MjEwNTM2NTJ9.L751MLxXj3SvkYlDEJFjwhudGrwmNgiEN60R1ULLwZM";

// --- Predefined camera viewpoints --------------------------------------------
const VIEWPOINTS = {
    overview: {
        destination: Cesium.Cartesian3.fromDegrees(-75.30, 4.95, 35000),
        orientation: { heading: 0, pitch: Cesium.Math.toRadians(-55), roll: 0 }
    },
    manizales: {
        destination: Cesium.Cartesian3.fromDegrees(-75.5138, 5.0689, 4500),
        orientation: { heading: Cesium.Math.toRadians(30), pitch: Cesium.Math.toRadians(-35), roll: 0 }
    },
    ruiz: {
        destination: Cesium.Cartesian3.fromDegrees(-75.3500, 4.8700, 9000),
        orientation: { heading: Cesium.Math.toRadians(45), pitch: Cesium.Math.toRadians(-25), roll: 0 }
    },
};

// --- Volcano (smoke source) coordinates --------------------------------------
const RUIZ_CRATER = { lon: -75.3220, lat: 4.8950, alt: 5400 };

// --- SGC hazard map (Mapa de Amenaza Volcán Nevado del Ruiz, 2015) ----------
const HAZARD_GEOJSON_URL = encodeURI("AME_VNRuiz_2015/Nevado del Ruiz.geojson");

// --- Lahar flow path (digitized polyline, direction crater -> Chinchiná) ----
const LAHAR_PATH_URL = encodeURI("AME_VNRuiz_2015/Direccion_Lahar.geojson");

// =============================================================
//  Bilingual Translation Dictionary (i18n)
// =============================================================
const I18N_DICTS = {
    en: {
        splash_badge_masters: "MASTER'S PROJECT",
        splash_title: "Reliving Nevado del Ruiz",
        splash_subtitle: "3D/4D Geovisor · Manizales, Colombia",
        splash_tagline: "An interactive visualization of the geography, volcanic risk, and historical memory of the region. Explore the terrain, activate geoscientific layers, and simulate eruptive scenarios in a 4D timeline.",
        splash_start_btn: "Start Geovisor",
        splash_credits: "Sources: Cesium Ion · OSM Buildings · SGC (Colombian Geological Service)",
        loading_text: "Loading terrain and buildings…",
        topbar_title: "Manizales Geovisor",
        topbar_breadcrumb: "Nevado del Ruiz · Caldas, Colombia",
        tooltip_toggle_panel: "Show / hide panel",
        tooltip_home: "Initial view",
        tooltip_fullscreen: "Fullscreen",
        tooltip_help: "Help",
        tab_layers: "Layers",
        tab_eruption: "Eruption",
        tab_tools: "Tools",
        tab_about: "About",
        sec_terrain: "Terrain",
        layer_contours: "Elevation contours",
        contour_interval: "Interval",
        contour_thickness: "Line thickness",
        btn_change_contour_color: "Change contour color",
        sec_basemaps: "Base maps & overlays",
        layer_buildings: "3D Buildings (OSM)",
        layer_hazard: "Volcanic Hazard (SGC)",
        hazard_attribution: "Official SGC Map 2015 · Nevado del Ruiz Volcano",
        sec_eruptive_scenario: "Eruptive scenario",
        eruptive_scenario_desc: "Educational visualization of a <strong>hypothetical lahar</strong>, inspired by the November 13, 1985 event (Nevado del Ruiz · VEI 3 · Armero Tragedy). It is not an exact reconstruction of that lahar.",
        layer_smoke: "Eruptive column (smoke)",
        layer_cdp: "Pyroclastic flows, lava & debris (CDP)",
        layer_ash: "Ash fall",
        layer_lahars: "Lahars (mudflow)",
        layer_lahar_path: "Lahar trajectory",
        sec_trigger_event: "Trigger event",
        btn_start_eruption: "Start eruption",
        btn_reset: "Reset",
        sec_lahar_status: "Lahar status",
        hud_elapsed_time: "Elapsed time",
        hud_distance: "Distance covered",
        hud_velocity: "Local velocity",
        hud_model_desc: "Model: v = clamp(5 + 40·tan(α), 5, 18) m/s, where α is local downhill slope. Calibrated with Armero lahar data (1985).",
        sec_quick_views: "Quick views",
        view_manizales: "Manizales",
        view_ruiz: "Nevado del Ruiz",
        view_armero: "Armero",
        view_overview: "General view",
        sec_gis_analysis: "GIS analysis",
        btn_measure_distance: "Measure distance",
        btn_measure_area: "Measure area",
        btn_elevation_profile: "Elevation profile",
        btn_load_geojson: "Load GeoJSON / KML",
        gis_analysis_note: "Future versions · next steps of the project",
        sec_about_project: "About the project",
        about_project_desc: "This geovisor demonstrates the use of CesiumJS as an open-source tool for SIG/GIS professionals to publish their results in a 3D, interactive, and geodesically correct (WGS84 globe) manner on the web — without expensive proprietary software.",
        sec_ruiz_info: "Nevado del Ruiz Volcano",
        stat_altitude: "Altitude",
        stat_type: "Type",
        stat_type_val: "Stratovolcano",
        stat_last_eruption: "Last major eruption",
        stat_casualties: "Armero casualties",
        sec_sources: "Sources",
        sources_desc: "· Cesium Ion · DTM Terrain<br>· OpenStreetMap · 3D Buildings<br>· SGC · Volcanic hazard map<br>· IDEAM · Water network<br>· USGS · Historical data",
        sec_disclaimer: "Disclaimer",
        disclaimer_desc: "Visualization for educational purposes only. It does not constitute an operational forecast or an official evacuation map. For official information, consult the Colombian Geological Service (SGC).",
        tooltip_play: "Play/pause time",
        tooltip_speed: "Speed",
        // Dynamically generated:
        toast_ready: "Geovisor ready. Explore the sidepanel tabs.",
        toast_flying: "Flying to: {0}",
        toast_hazard_on: "SGC Hazard map enabled · click a polygon for details.",
        toast_hazard_group: "Showing: {0}",
        toast_lahar_path: "Lahar trajectory: ~{0} km · crater -> downstream.",
        toast_eruption_on: "⚠ Eruption 13-Nov-1985 21:08 · Lahar {0} km · {1} min · avg velocity {2} km/h",
        toast_reset: "Simulation reset.",
        toast_err_loading: "Error loading data. Check console.",
        loading_hazard: "Loading SGC hazard map…",
        loading_lahar_heights: "Sampling DTM heights for lahar trajectory…",
        loading_terrain: "Loading terrain…",
        loading_buildings: "Loading 3D buildings…",
        popup_hazard_title: "{0} — {1}",
        popup_hazard_desc_title: "Volcanic Hazard",
        popup_hazard_desc_level: "Threat level",
        popup_hazard_desc_pdf: "📄 Official map (PDF)",
        popup_hazard_desc_mem: "📘 Explanatory memory",
        popup_hazard_desc_src: "Source: Colombian Geological Service (SGC), 2015.",
        popup_lahar_title: "Lahar Trajectory",
        popup_lahar_desc_detail: "Digitized flow line in the direction of travel (Arenas crater -> downstream).",
        popup_lahar_desc_src: "Heights sampled from DTM (Cesium World Terrain).",
        marker_origin: "Origin",
        marker_downstream: "Downstream",
        front: "Front",
        frente_tag: "Front · {0} km",
        // GIS tools
        btn_clear_measure: "Clear measurements",
        gis_analysis_hint: "Left-click to add points · double-click or right-click to finish.",
        measure_distance_start: "Distance mode · click points on the terrain. Double-click to finish.",
        measure_area_start: "Area mode · click the polygon vertices. Double-click to finish.",
        measure_profile_start: "Profile mode · click the start and end points.",
        measure_total_distance: "Total distance: {0}",
        measure_total_area: "Total area: {0}",
        measure_cleared: "Measurements cleared.",
        measure_load_ok: "Loaded: {0}",
        measure_load_err: "Could not load the file. Check the format.",
        profile_title: "Elevation profile",
        profile_dist: "Distance",
        profile_elev: "Elevation",
        profile_gain: "Gain",
        profile_loss: "Loss",
        profile_min: "Min",
        profile_max: "Max"
    },
    es: {
        splash_badge_masters: "PROYECTO DE MAESTRÍA",
        splash_title: "Reviviendo el Nevado del Ruiz",
        splash_subtitle: "Geovisor 3D/4D · Manizales, Colombia",
        splash_tagline: "Una visualización interactiva de la geografía, el riesgo volcánico y la memoria histórica de la región. Explora el terreno, activa capas geocientíficas y simula escenarios eruptivos en una línea de tiempo 4D.",
        splash_start_btn: "Iniciar geovisor",
        splash_credits: "Fuentes: Cesium Ion · OSM Buildings · SGC (Servicio Geológico Colombiano)",
        loading_text: "Cargando terreno y edificios…",
        topbar_title: "Geovisor Manizales",
        topbar_breadcrumb: "Nevado del Ruiz · Caldas, Colombia",
        tooltip_toggle_panel: "Mostrar / ocultar panel",
        tooltip_home: "Vista inicial",
        tooltip_fullscreen: "Pantalla completa",
        tooltip_help: "Ayuda",
        tab_layers: "Capas",
        tab_eruption: "Erupción",
        tab_tools: "Herramientas",
        tab_about: "Acerca",
        sec_terrain: "Terreno",
        layer_contours: "Curvas de nivel",
        contour_interval: "Espaciado",
        contour_thickness: "Grosor de línea",
        btn_change_contour_color: "Cambiar color de curvas",
        sec_basemaps: "Mapas base & overlays",
        layer_buildings: "Edificios 3D (OSM)",
        layer_hazard: "Amenaza volcánica (SGC)",
        hazard_attribution: "Mapa oficial SGC 2015 · Volcán Nevado del Ruiz",
        sec_eruptive_scenario: "Escenario eruptivo",
        eruptive_scenario_desc: "Visualización educativa de un <strong>lahar hipotético</strong>, inspirado en el evento del 13 de noviembre de 1985 (Nevado del Ruiz · VEI 3 · Tragedia de Armero). No es una reconstrucción exacta de aquel lahar.",
        layer_smoke: "Columna eruptiva (humo)",
        layer_cdp: "Flujos piroclásticos, lava y escombros (CDP)",
        layer_ash: "Caída de ceniza",
        layer_lahars: "Lahares (flujo de lodo)",
        layer_lahar_path: "Trayectoria del lahar",
        sec_trigger_event: "Disparar evento",
        btn_start_eruption: "Iniciar erupción",
        btn_reset: "Reiniciar",
        sec_lahar_status: "Estado del lahar",
        hud_elapsed_time: "Tiempo transcurrido",
        hud_distance: "Distancia recorrida",
        hud_velocity: "Velocidad local",
        hud_model_desc: "Modelo: v = clamp(5 + 40·tan(α), 5, 18) m/s, donde α es la pendiente local descendente. Calibrado con datos del lahar de Armero (1985).",
        sec_quick_views: "Vistas rápidas",
        view_manizales: "Manizales",
        view_ruiz: "Nevado del Ruiz",
        view_armero: "Armero",
        view_overview: "Vista general",
        sec_gis_analysis: "Análisis GIS",
        btn_measure_distance: "Medir distancia",
        btn_measure_area: "Medir área",
        btn_elevation_profile: "Perfil de elevación",
        btn_load_geojson: "Cargar GeoJSON / KML",
        gis_analysis_note: "Próximas versiones · próximos pasos del proyecto",
        sec_about_project: "Sobre el proyecto",
        about_project_desc: "Este geovisor demuestra el uso de CesiumJS como herramienta open-source para que profesionales SIG/GIS publiquen sus resultados de forma 3D, interactiva y geodésicamente correcta (globo WGS84) en la web — sin software propietario costoso.",
        sec_ruiz_info: "Volcán Nevado del Ruiz",
        stat_altitude: "Altitud",
        stat_type: "Tipo",
        stat_type_val: "Estratovolcán",
        stat_last_eruption: "Última erupción mayor",
        stat_casualties: "Víctimas Armero",
        sec_sources: "Fuentes",
        sources_desc: "· Cesium Ion · Terreno DTM<br>· OpenStreetMap · Edificios 3D<br>· SGC · Mapa de amenaza volcánica<br>· IDEAM · Red hídrica<br>· USGS · Datos históricos",
        sec_disclaimer: "Aviso",
        disclaimer_desc: "Visualización con fines educativos. No constituye un pronóstico operacional ni un mapa oficial de evacuación. Para información oficial consulte al Servicio Geológico Colombiano (SGC).",
        tooltip_play: "Reproducir/pausar tiempo",
        tooltip_speed: "Velocidad",
        // Dynamically generated:
        toast_ready: "Geovisor listo. Explora las pestañas del panel lateral.",
        toast_flying: "Volando a: {0}",
        toast_hazard_on: "Capa SGC activada · clic en un polígono para detalles.",
        toast_hazard_group: "Mostrando: {0}",
        toast_lahar_path: "Trayectoria del lahar: ~{0} km · cráter → aguas abajo.",
        toast_eruption_on: "⚠ Erupción 13-nov-1985 21:08 · Lahar {0} km · {1} min · vel. media {2} km/h",
        toast_reset: "Simulación reiniciada.",
        toast_err_loading: "Error cargando datos. Revisa la consola.",
        loading_hazard: "Cargando mapa de amenaza SGC…",
        loading_lahar_heights: "Muestreando alturas del DTM para la trayectoria del lahar…",
        loading_terrain: "Cargando terreno…",
        loading_buildings: "Cargando edificios 3D…",
        popup_hazard_title: "{0} — {1}",
        popup_hazard_desc_title: "Amenaza Volcánica",
        popup_hazard_desc_level: "Nivel de amenaza",
        popup_hazard_desc_pdf: "📄 Mapa oficial (PDF)",
        popup_hazard_desc_mem: "📘 Memoria explicativa",
        popup_hazard_desc_src: "Fuente: Servicio Geológico Colombiano (SGC), 2015.",
        popup_lahar_title: "Trayectoria de Lahar",
        popup_lahar_desc_detail: "Línea de flujo digitalizada en dirección de avance (cráter Arenas → aguas abajo).",
        popup_lahar_desc_src: "Alturas muestreadas del DTM (Cesium World Terrain).",
        marker_origin: "Origen",
        marker_downstream: "Aguas abajo",
        front: "Frente",
        frente_tag: "Frente · {0} km",
        // GIS tools
        btn_clear_measure: "Borrar mediciones",
        gis_analysis_hint: "Clic izquierdo para añadir puntos · doble clic o clic derecho para terminar.",
        measure_distance_start: "Modo distancia · haz clic en puntos del terreno. Doble clic para terminar.",
        measure_area_start: "Modo área · haz clic en los vértices del polígono. Doble clic para terminar.",
        measure_profile_start: "Modo perfil · haz clic en el punto inicial y final.",
        measure_total_distance: "Distancia total: {0}",
        measure_total_area: "Área total: {0}",
        measure_cleared: "Mediciones borradas.",
        measure_load_ok: "Cargado: {0}",
        measure_load_err: "No se pudo cargar el archivo. Revisa el formato.",
        profile_title: "Perfil de elevación",
        profile_dist: "Distancia",
        profile_elev: "Elevación",
        profile_gain: "Desnivel positivo",
        profile_loss: "Desnivel negativo",
        profile_min: "Mín",
        profile_max: "Máx"
    }
};

// --- Language state -----------------------------------------------------------
let currentLang = "en"; // English by default

function translateText(key, ...args) {
    const dict = I18N_DICTS[currentLang] || I18N_DICTS["en"];
    let txt = dict[key] || key;
    args.forEach((val, i) => {
        txt = txt.replace(`{${i}}`, val);
    });
    return txt;
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("geovisor_lang", lang);

    // Toggle button text
    const langBtn = document.getElementById("btn-lang");
    if (langBtn) {
        langBtn.textContent = lang.toUpperCase();
    }

    // Static translations
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const txt = translateText(key);
        if (txt) el.innerHTML = txt;
    });

    // Tooltip translations
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        const key = el.dataset.i18nTitle;
        const txt = translateText(key);
        if (txt) el.title = txt;
    });

    // Dynamic entities (on the map)
    updateEntityTranslations();

    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- Toast helper -------------------------------------------------------------
function showToast(message, duration = 3500) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
        el.style.opacity = "0";
        el.style.transition = "opacity 0.3s";
        setTimeout(() => el.remove(), 300);
    }, duration);
}

function setLoading(visible, textKey) {
    const el = document.getElementById("loading");
    if (!el) return;
    if (textKey) {
        const tStr = translateText(textKey);
        document.getElementById("loading-text").textContent = tStr !== textKey ? tStr : textKey;
    }
    el.classList.toggle("visible", visible);
}

// --- Style map of hazard layer ------------------------------------------------
function hazardStyle(fenomeno, amenaza) {
    const f = (fenomeno || "").toLowerCase();
    // Lahares — brown/mud tones
    if (f.includes("lahar")) {
        return {
            fill: Cesium.Color.fromCssColorString("#8B4513").withAlpha(0.55),
            outline: Cesium.Color.fromCssColorString("#5a2d0c")
        };
    }
    // CDP, lava, balisticos — red/lava
    if (f.includes("cdp") || f.includes("flujo") || f.includes("lava") || f.includes("balist") || f.includes("avalancha")) {
        return {
            fill: Cesium.Color.fromCssColorString("#d62828").withAlpha(0.55),
            outline: Cesium.Color.fromCssColorString("#7a1414")
        };
    }
    // Caida de piroclastos / ceniza / lapilli — grey, opacity by level
    if (f.includes("piroclastos") || f.includes("ceniza") || f.includes("lapilli")) {
        const alphaByLevel = { 1: 0.55, 2: 0.40, 3: 0.25 };
        return {
            fill: Cesium.Color.fromCssColorString("#6c757d").withAlpha(alphaByLevel[amenaza] || 0.35),
            outline: Cesium.Color.fromCssColorString("#343a40")
        };
    }
    return {
        fill: Cesium.Color.fromCssColorString("#ff6b35").withAlpha(0.40),
        outline: Cesium.Color.fromCssColorString("#7a2f10")
    };
}

function hazardGroup(fenomeno) {
    const f = (fenomeno || "").toLowerCase();
    if (f.includes("lahar")) return "lahar";
    if (f.includes("piroclastos") || f.includes("ceniza") || f.includes("lapilli")) return "ash";
    return "cdp"; // CDPs, lava, etc.
}

// =============================================================
//  Main bootstrap
// =============================================================
async function loadCesiumData() {
    setLoading(true, "loading_terrain");

    try {
        const terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(2675737);

        const viewer = new Cesium.Viewer("cesiumContainer", {
            terrainProvider: terrainProvider,
            requestVertexNormals: true,
            timeline: false,
            animation: false,
            baseLayerPicker: true,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            fullscreenButton: false,
            infoBox: true,
            selectionIndicator: true
        });

        window.viewer = viewer;

        // Scene tuning
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.dynamicAtmosphereLighting = true;
        viewer.scene.fog.enabled = true;
        viewer.scene.fog.density = 0.0002;
        viewer.scene.skyAtmosphere.show = true;

        // ---------------------------------------------------------------
        // "walls" / data-void artefacts at the tile boundary.
        // Bounding box: lon [-75.85, -74.85], lat [4.45, 5.45]
        // ---------------------------------------------------------------
        const demWest  = -75.74;
        const demEast  = -75.01;
        const demSouth =   4.57;
        const demNorth =   5.21;

        // A ClippingPlane normal points INWARD (toward the kept region).
        // We build one plane per side: the normal faces inward, distance = 0.
        function demClippingPlanes() {
            const west  = Cesium.Cartesian3.fromDegrees(demWest,  (demSouth + demNorth) / 2);
            const east  = Cesium.Cartesian3.fromDegrees(demEast,  (demSouth + demNorth) / 2);
            const south = Cesium.Cartesian3.fromDegrees((demWest + demEast) / 2, demSouth);
            const north = Cesium.Cartesian3.fromDegrees((demWest + demEast) / 2, demNorth);

            // Inward-facing normals for each boundary
            const nWest  = Cesium.Cartesian3.subtract(east,  west,  new Cesium.Cartesian3()); Cesium.Cartesian3.normalize(nWest,  nWest);
            const nEast  = Cesium.Cartesian3.subtract(west,  east,  new Cesium.Cartesian3()); Cesium.Cartesian3.normalize(nEast,  nEast);
            const nSouth = Cesium.Cartesian3.subtract(north, south, new Cesium.Cartesian3()); Cesium.Cartesian3.normalize(nSouth, nSouth);
            const nNorth = Cesium.Cartesian3.subtract(south, north, new Cesium.Cartesian3()); Cesium.Cartesian3.normalize(nNorth, nNorth);

            return new Cesium.ClippingPlaneCollection({
                planes: [
                    new Cesium.ClippingPlane(nWest,  -Cesium.Cartesian3.dot(nWest,  west)),
                    new Cesium.ClippingPlane(nEast,  -Cesium.Cartesian3.dot(nEast,  east)),
                    new Cesium.ClippingPlane(nSouth, -Cesium.Cartesian3.dot(nSouth, south)),
                    new Cesium.ClippingPlane(nNorth, -Cesium.Cartesian3.dot(nNorth, north))
                ],
                unionClippingRegions: true,   // hide outside ALL planes (logical OR → clip everything not inside)
                edgeWidth: 0,
                enabled: true
            });
        }

        viewer.scene.globe.clippingPlanes = demClippingPlanes();
        // Make the area outside the clipping planes render as a deep-black void
        viewer.scene.backgroundColor = Cesium.Color.BLACK;
        viewer.scene.globe.baseColor  = Cesium.Color.BLACK;

        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-75.428846, 5.015236, 15500),
            duration: 0
        });

        setLoading(true, "loading_buildings");

        // OSM Buildings
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
        viewer.scene.primitives.add(tileset);
        window.osmBuildings = tileset;

        const extras = tileset.asset.extras;
        if (
            Cesium.defined(extras) &&
            Cesium.defined(extras.ion) &&
            Cesium.defined(extras.ion.defaultStyle)
        ) {
            tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
        }

        // Contour lines (kept from original)
        function getContourMaterial() {
            return new Cesium.Material({
                fabric: { type: "ElevationContour" },
                translucent: false
            });
        }

        const contourColor = Cesium.Color.RED.clone();
        let contourUniforms = {};

        const viewModel = {
            enableContour: false,
            contourSpacing: 150.0,
            contourWidth: 2.0,
            changeColor: function () {
                contourUniforms.color = Cesium.Color.fromRandom({ alpha: 1.0 }, contourColor);
            }
        };

        Cesium.knockout.track(viewModel);
        Cesium.knockout.applyBindings(viewModel, document.getElementById("sidepanel"));

        function updateMaterial() {
            const hasContour = viewModel.enableContour;
            const globe = viewer.scene.globe;
            if (hasContour) {
                const material = getContourMaterial();
                contourUniforms = material.uniforms;
                contourUniforms.width = viewModel.contourWidth;
                contourUniforms.spacing = viewModel.contourSpacing;
                contourUniforms.color = contourColor;
                globe.material = material;
            } else {
                globe.material = undefined;
            }
        }
        updateMaterial();

        Cesium.knockout.getObservable(viewModel, "enableContour").subscribe(updateMaterial);
        Cesium.knockout.getObservable(viewModel, "contourWidth").subscribe(v => {
            if (contourUniforms.width !== undefined) contourUniforms.width = parseFloat(v);
        });
        Cesium.knockout.getObservable(viewModel, "contourSpacing").subscribe(v => {
            if (contourUniforms.spacing !== undefined) contourUniforms.spacing = parseFloat(v);
        });

        // ---------------------------------------------------------------
        // Dynamic Crater Smoke Particle System (optimised for greater heights)
        // ---------------------------------------------------------------
        const smokeParticleSystem = new Cesium.ParticleSystem({
            modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(RUIZ_CRATER.lon, RUIZ_CRATER.lat, RUIZ_CRATER.alt)
            ),
            speed: 5.0,                         // Gentle ascent
            lifetime: 1000.0,
            particleLife: 25.0,                 // Rises a few hundred metres
            emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(15.0)), // Pointed upwards Cone
            imageSize: new Cesium.Cartesian2(22.0, 22.0),
            startScale: 1.0,
            endScale: 22.0,                     // Expands as it rises
            particleSize: 12,
            emissionRate: 8.0,
            image: "Img/smoke.png",
            color: Cesium.Color.LIGHTGRAY.withAlpha(0.5),
            mass: 0.1,
            sizeInMeters: true
        });
        viewer.scene.primitives.add(smokeParticleSystem);
        window.smokeSystem = smokeParticleSystem;

        // ---------------------------------------------------------------
        // SGC Hazard map (GeoJSON)
        // ---------------------------------------------------------------
        const hazardLayer = await loadHazardLayer(viewer);
        window.hazardLayer = hazardLayer;

        // ---------------------------------------------------------------
        // Lahar path (digitized polyline + DTM heights)
        // ---------------------------------------------------------------
        setLoading(true, "loading_lahar_heights");
        const laharPath = await loadLaharPath(viewer);
        window.laharPath = laharPath;

        // ---------------------------------------------------------------
        // Build dynamic lahar simulation
        // ---------------------------------------------------------------
        const laharSim = buildLaharSimulation(viewer, laharPath);
        window.laharSim = laharSim;

        // ---------------------------------------------------------------
        // UI wiring + Initial Lang load
        // ---------------------------------------------------------------
        wireUI(viewer, tileset, smokeParticleSystem, hazardLayer, laharPath, laharSim);

        // Load saved language or browser default, defaults to English
        const savedLang = localStorage.getItem("geovisor_lang") || "en";
        updateLanguage(savedLang);

        setLoading(false);
        showToast(translateText("toast_ready"));

    } catch (error) {
        console.error(error);
        setLoading(false);
        showToast(translateText("toast_err_loading"));
    }
}

// =============================================================
//  SGC Hazard layer loader
// =============================================================
async function loadHazardLayer(viewer) {
    setLoading(true, "loading_hazard");

    try {
        const dataSource = await Cesium.GeoJsonDataSource.load(HAZARD_GEOJSON_URL, {
            clampToGround: true
        });

        const groups = { lahar: [], cdp: [], ash: [], other: [] };

        dataSource.entities.values.forEach(entity => {
            const props = entity.properties;
            const fenomeno = props?.Fenomenos?.getValue();
            const amenaza  = props?.Amenaza?.getValue();
            const ame      = props?.AME?.getValue();
            const urlMapa  = props?.URL_Mapa?.getValue();
            const urlMem   = props?.URL_Memori?.getValue();
            const leyenda  = [
                props?.Leyenda_1?.getValue(),
                props?.Leyenda_2?.getValue(),
                props?.Leyenda_3?.getValue(),
                props?.Leyenda_4?.getValue(),
                props?.Leyenda_5?.getValue()
            ].filter(Boolean).join(" ");

            const { fill, outline } = hazardStyle(fenomeno, amenaza);

            if (entity.polygon) {
                entity.polygon.material = fill;
                // Drape the polygon onto the terrain surface (do NOT set a fixed
                // height, which would pin it to the ellipsoid at sea level).
                entity.polygon.height = undefined;
                entity.polygon.perPositionHeight = false;
                entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
                // Terrain-clamped polygons cannot render an entity outline; use a
                // separate clamped polyline for the border instead.
                entity.polygon.outline = false;
                if (entity.polygon.hierarchy) {
                    const hierarchy = entity.polygon.hierarchy.getValue
                        ? entity.polygon.hierarchy.getValue(Cesium.JulianDate.now())
                        : entity.polygon.hierarchy;
                    if (hierarchy && hierarchy.positions) {
                        entity.polyline = {
                            positions: hierarchy.positions.concat([hierarchy.positions[0]]),
                            width: 2,
                            material: outline,
                            clampToGround: true
                        };
                    }
                }
            }

            // Cache for dynamic translations
            entity.customI18n = {
                fenomeno: fenomeno,
                ame: ame,
                leyenda: leyenda,
                urlMapa: urlMapa,
                urlMem: urlMem
            };

            // Each entity starts hidden so every hazard group is controlled
            // independently by its own toggle (prevents the CDP/red layer from
            // appearing without a control).
            entity.show = false;

            groups[hazardGroup(fenomeno)].push(entity);
        });

        viewer.dataSources.add(dataSource);
        dataSource.show = true;

        return { dataSource, groups };

    } catch (err) {
        console.error("Failed to load hazard GeoJSON:", err);
        return null;
    }
}

function setHazardGroupVisible(hazardLayer, groupName, visible) {
    if (!hazardLayer) return;
    hazardLayer.groups[groupName]?.forEach(e => { e.show = visible; });
    const anyVisible = Object.keys(hazardLayer.groups)
        .some(g => hazardLayer.groups[g].some(e => e.show));
    hazardLayer.dataSource.show = anyVisible;
}

// =============================================================
//  Lahar path loader (digitized polyline + terrain height sampling)
// =============================================================
async function loadLaharPath(viewer) {
    try {
        const response = await fetch(LAHAR_PATH_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const geojson = await response.json();

        const lines2D = [];
        for (const feature of geojson.features) {
            const g = feature.geometry;
            if (!g) continue;
            if (g.type === "LineString") {
                lines2D.push(g.coordinates);
            } else if (g.type === "MultiLineString") {
                g.coordinates.forEach(line => lines2D.push(line));
            }
        }
        if (lines2D.length === 0) return null;

        const sampledLines = [];
        for (const coords of lines2D) {
            const cartos = coords.map(c => Cesium.Cartographic.fromDegrees(c[0], c[1]));
            const sampled = await Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, cartos);
            sampledLines.push(sampled);
        }

        const entities = [];
        let totalVertices = 0;
        let totalLengthM = 0;
        let elevationProfile = [];

        sampledLines.forEach((sampled, lineIdx) => {
            const positions = sampled.map(c =>
                Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, c.height)
            );

            if (lineIdx === 0) {
                let cum = 0;
                elevationProfile.push({ d: 0, h: sampled[0].height });
                for (let i = 1; i < positions.length; i++) {
                    cum += Cesium.Cartesian3.distance(positions[i - 1], positions[i]);
                    elevationProfile.push({ d: cum, h: sampled[i].height });
                }
                totalLengthM += cum;
            }
            totalVertices += positions.length;

            const entity = viewer.entities.add({
                name: "Lahar Trajectory",
                polyline: {
                    positions: positions,
                    width: 25,                       // Much wider trail as requested (25px)
                    clampToGround: true,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.40,             // Thicker glow
                        taperPower: 0.5,
                        color: Cesium.Color.fromCssColorString("#7a3b16")
                    }),
                    show: false
                }
            });
            entities.push(entity);
        });

        // Crater + downstream end markers (using endpoints of first line)
        const firstLine = sampledLines[0];
        const startC = firstLine[0];
        const endC = firstLine[firstLine.length - 1];

        const startEntity = viewer.entities.add({
            name: "Origin marker",
            position: Cesium.Cartesian3.fromRadians(startC.longitude, startC.latitude, startC.height),
            point: {
                pixelSize: 12,
                color: Cesium.Color.fromCssColorString("#ff3300"),
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            },
            label: {
                text: "Origin",
                font: "600 12px Inter, sans-serif",
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -18),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            show: false
        });
        const endEntity = viewer.entities.add({
            name: "Downstream marker",
            position: Cesium.Cartesian3.fromRadians(endC.longitude, endC.latitude, endC.height),
            point: {
                pixelSize: 10,
                color: Cesium.Color.fromCssColorString("#4cc9f0"),
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            },
            label: {
                text: "Downstream",
                font: "600 12px Inter, sans-serif",
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -18),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            show: false
        });
        entities.push(startEntity, endEntity);

        return {
            entities,
            sampledLines,
            elevationProfile,
            totalLengthM
        };
    } catch (err) {
        console.error("Failed to load lahar path:", err);
        return null;
    }
}

function setLaharPathVisible(laharPath, visible) {
    if (!laharPath) return;
    laharPath.entities.forEach(e => { e.show = visible; });
}

// =============================================================
//  Lahar dynamic simulation (slope-aware velocity)
// =============================================================
const LAHAR_V_MIN = 5.0;
const LAHAR_V_MAX = 18.0;
const LAHAR_K     = 40.0;
const LAHAR_START_ISO = "1985-11-13T21:08:00Z";

function buildLaharSimulation(viewer, laharPath) {
    if (!laharPath || !laharPath.sampledLines || laharPath.sampledLines.length === 0) {
        return null;
    }

    const cartos = [];
    laharPath.sampledLines.forEach(line => line.forEach(c => cartos.push(c)));
    if (cartos.length < 2) return null;

    const positions = cartos.map(c =>
        Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, c.height)
    );

    const cumTime = new Array(positions.length);
    const cumDist = new Array(positions.length);
    const segVel  = new Array(positions.length - 1);
    cumTime[0] = 0;
    cumDist[0] = 0;
    for (let i = 1; i < positions.length; i++) {
        const segLen = Cesium.Cartesian3.distance(positions[i - 1], positions[i]);
        const dh = cartos[i - 1].height - cartos[i].height;
        const slopeRad = Math.atan(dh / Math.max(segLen, 1));
        const downhill = Math.max(0, slopeRad);
        const v = Math.min(LAHAR_V_MAX,
                  Math.max(LAHAR_V_MIN, LAHAR_V_MIN + LAHAR_K * Math.tan(downhill)));
        const dt = segLen / v;
        cumTime[i] = cumTime[i - 1] + dt;
        cumDist[i] = cumDist[i - 1] + segLen;
        segVel[i - 1] = v;
    }
    const totalDuration = cumTime[cumTime.length - 1];
    const totalDist     = cumDist[cumDist.length - 1];
    const avgV          = totalDist / totalDuration;

    // --- Clock setup -----------------------------------------------------------
    const startTime = Cesium.JulianDate.fromIso8601(LAHAR_START_ISO);
    const stopTime  = Cesium.JulianDate.addSeconds(startTime, totalDuration, new Cesium.JulianDate());
    viewer.clock.startTime   = startTime.clone();
    viewer.clock.stopTime    = stopTime.clone();
    viewer.clock.currentTime = startTime.clone();
    viewer.clock.clockRange  = Cesium.ClockRange.CLAMPED;
    viewer.clock.shouldAnimate = false;

    // --- Head ------------------------------------------------------------------
    const headPos = new Cesium.SampledPositionProperty();
    headPos.setInterpolationOptions({
        interpolationDegree: 1,
        interpolationAlgorithm: Cesium.LinearApproximation
    });
    for (let i = 0; i < positions.length; i++) {
        const t = Cesium.JulianDate.addSeconds(startTime, cumTime[i], new Cesium.JulianDate());
        headPos.addSample(t, positions[i]);
    }

    const head = viewer.entities.add({
        name: "Lahar Head",
        position: headPos,
        point: {
            pixelSize: 22,                       // Slightly larger head point
            color: Cesium.Color.fromCssColorString("#ff5722"),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 3,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
        label: {
            text: new Cesium.CallbackProperty(() => {
                const elapsed = Cesium.JulianDate.secondsDifference(
                    viewer.clock.currentTime, startTime);
                if (elapsed < 0) return translateText("front");
                const km = (sampleDistance(elapsed, cumTime, cumDist) / 1000).toFixed(1);
                return translateText("frente_tag", km);
            }, false),
            font: "600 12px Inter, sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 3,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -22),
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
        show: false
    });

    // --- Growing trail -------------------------------------------------------
    const trailPositions = new Cesium.CallbackProperty(() => {
        const elapsed = Cesium.JulianDate.secondsDifference(
            viewer.clock.currentTime, startTime);
        if (elapsed <= 0) return [];
        let idx = 0;
        while (idx < cumTime.length - 1 && cumTime[idx + 1] <= elapsed) idx++;
        const out = positions.slice(0, idx + 1);
        if (idx < positions.length - 1) {
            const t0 = cumTime[idx], t1 = cumTime[idx + 1];
            const r  = Math.min(1, Math.max(0, (elapsed - t0) / Math.max(1e-6, t1 - t0)));
            out.push(Cesium.Cartesian3.lerp(positions[idx], positions[idx + 1], r, new Cesium.Cartesian3()));
        }
        return out;
    }, false);

    const trail = viewer.entities.add({
        name: "Lahar Trail",
        polyline: {
            positions: trailPositions,
            width: 25,                       // Much wider trail (25px) as requested
            clampToGround: true,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.40,
                taperPower: 0.5,
                color: Cesium.Color.fromCssColorString("#7a3b16")
            }),
            show: false
        }
    });

    // --- Mud / debris particle system (balanced for visibility + performance) -
    const mudSystem = new Cesium.ParticleSystem({
        modelMatrix: Cesium.Matrix4.IDENTITY,
        speed: 6.0,
        lifetime: 8.0,
        particleLife: 3.0,
        emitter: new Cesium.SphereEmitter(30.0), // 60 m wide rolling front
        imageSize: new Cesium.Cartesian2(28.0, 28.0),
        startScale: 1.5,
        endScale: 6.0,                       // Up to ~170 m clouds (lighter overdraw)
        emissionRate: 70.0,                  // Dense but performant (~210 particles)
        image: "Img/smoke.png",
        startColor: Cesium.Color.fromCssColorString("#6b3410").withAlpha(0.95),
        endColor:   Cesium.Color.fromCssColorString("#3a1c08").withAlpha(0.0),
        mass: 0.1,
        sizeInMeters: true,
        show: false
    });
    viewer.scene.primitives.add(mudSystem);

    const tickListener = () => {
        if (!mudSystem.show) return;
        const pos = headPos.getValue(viewer.clock.currentTime);
        if (pos) {
            mudSystem.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(pos);
        }
    };
    viewer.clock.onTick.addEventListener(tickListener);

    return {
        head, trail, mudSystem,
        startTime, stopTime, totalDuration, totalDist, avgV,
        cumTime, cumDist, segVel, positions,
        setVisible(visible) {
            head.show = visible;
            trail.show = visible;
            mudSystem.show = visible;
        },
        reset() {
            viewer.clock.currentTime = startTime.clone();
            viewer.clock.shouldAnimate = false;
            this.setVisible(false);
        },
        play() {
            this.setVisible(true);
            viewer.clock.currentTime = startTime.clone();
            viewer.clock.shouldAnimate = true;
        }
    };
}

function sampleDistance(elapsed, cumTime, cumDist) {
    if (elapsed <= 0) return 0;
    if (elapsed >= cumTime[cumTime.length - 1]) return cumDist[cumDist.length - 1];
    let idx = 0;
    while (idx < cumTime.length - 1 && cumTime[idx + 1] <= elapsed) idx++;
    const t0 = cumTime[idx], t1 = cumTime[idx + 1];
    const r = (elapsed - t0) / Math.max(1e-6, t1 - t0);
    return cumDist[idx] + r * (cumDist[idx + 1] - cumDist[idx]);
}

// =============================================================
//  Dynamic translations for entities loaded on map
// =============================================================
function updateEntityTranslations() {
    // SGC Hazard entities popup translate
    if (window.hazardLayer && window.hazardLayer.dataSource) {
        window.hazardLayer.dataSource.entities.values.forEach(entity => {
            if (entity.customI18n) {
                const { fenomeno, ame, leyenda, urlMapa, urlMem } = entity.customI18n;
                const labelLevel = translateText("popup_hazard_desc_level");
                const labelPdf   = translateText("popup_hazard_desc_pdf");
                const labelMem   = translateText("popup_hazard_desc_mem");
                const labelSrc   = translateText("popup_hazard_desc_src");

                let translatedFen = fenomeno;
                if (currentLang === "en") {
                    if (fenomeno.toLowerCase().includes("lahar")) {
                        translatedFen = "Lahars (Mudflows)";
                    } else if (fenomeno.toLowerCase().includes("caida de piroclastos")) {
                        translatedFen = "Ash and Lapilli Fall";
                    } else if (fenomeno.toLowerCase().includes("cdp")) {
                        translatedFen = "Pyroclastic Density Currents, Lava & Balistics";
                    }
                }

                entity.name = `${translatedFen} — ${ame}`;
                entity.description = `
                    <div style="font-family: Inter, sans-serif; line-height: 1.55;">
                        <h3 style="margin: 0 0 8px; color: #ff6b35;">${translatedFen}</h3>
                        <p><strong>${labelLevel}:</strong> ${ame}</p>
                        <p>${leyenda}</p>
                        <p style="margin-top: 12px; font-size: 0.85em;">
                            <a href="${urlMapa}" target="_blank" rel="noopener">${labelPdf}</a><br>
                            <a href="${urlMem}" target="_blank" rel="noopener">${labelMem}</a>
                        </p>
                        <p style="font-size: 0.75em; color: #666; margin-top: 10px;">
                            ${labelSrc}
                        </p>
                    </div>`;
            }
        });
    }

    // Lahar polyline popup + markers translate
    if (window.laharPath && window.laharPath.entities) {
        window.laharPath.entities.forEach(entity => {
            if (entity.polyline) {
                entity.name = translateText("popup_lahar_title");
                entity.description = `
                    <div style="font-family: Inter, sans-serif; line-height: 1.5;">
                        <h3 style="color: #a05a2c; margin: 0 0 6px;">${translateText("popup_lahar_title")}</h3>
                        <p>${translateText("popup_lahar_desc_detail")}</p>
                        <p style="font-size: 0.85em; color: #888;">
                            ${translateText("popup_lahar_desc_src")}
                        </p>
                    </div>`;
            }
            if (entity.label) {
                if (entity.name === "Origin marker" || entity.name === "Origen" || entity.name === "Origin") {
                    entity.name = "Origin";
                    entity.label.text = translateText("marker_origin");
                } else if (entity.name === "Downstream marker" || entity.name === "Aguas abajo" || entity.name === "Downstream") {
                    entity.name = "Downstream";
                    entity.label.text = translateText("marker_downstream");
                }
            }
        });
    }
}

// =============================================================
//  UI wiring
// =============================================================
function wireUI(viewer, buildingsTileset, smokeSystem, hazardLayer, laharPath, laharSim) {

    // --- Splash ---------------------------------------------------------------
    const splash = document.getElementById("splash");
    const splashBtn = document.getElementById("splash-start");
    splashBtn?.addEventListener("click", () => {
        splash.classList.add("hidden");
        setTimeout(() => splash.remove(), 900);
        viewer.camera.flyTo({
            destination: VIEWPOINTS.overview.destination,
            orientation: VIEWPOINTS.overview.orientation,
            duration: 3.5
        });
    });

    // --- Language toggle ------------------------------------------------------
    document.getElementById("btn-lang")?.addEventListener("click", () => {
        const nextLang = currentLang === "en" ? "es" : "en";
        updateLanguage(nextLang);
        showToast(nextLang === "en" ? "Language: English" : "Idioma: Español", 2000);
    });

    // --- Tabs -----------------------------------------------------------------
    document.querySelectorAll(".tab").forEach(tabBtn => {
        tabBtn.addEventListener("click", () => {
            const target = tabBtn.dataset.tab;
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
            tabBtn.classList.add("active");
            document.querySelector(`.tab-pane[data-pane="${target}"]`)?.classList.add("active");
        });
    });

    // --- Top bar buttons ------------------------------------------------------
    document.getElementById("btn-toggle-panel")?.addEventListener("click", (e) => {
        const panel = document.getElementById("sidepanel");
        panel.classList.toggle("collapsed");
        e.currentTarget.classList.toggle("active", !panel.classList.contains("collapsed"));
    });

    document.getElementById("btn-home")?.addEventListener("click", () => {
        viewer.camera.flyTo({
            destination: VIEWPOINTS.overview.destination,
            orientation: VIEWPOINTS.overview.orientation,
            duration: 2.0
        });
    });

    document.getElementById("btn-fullscreen")?.addEventListener("click", () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
    });

    document.getElementById("btn-help")?.addEventListener("click", () => {
        showToast(translateText("disclaimer_desc"), 6000);
    });

    // --- Fly-to shortcuts -----------------------------------------------------
    document.querySelectorAll("[data-flyto]").forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.flyto;
            const vp = VIEWPOINTS[key];
            if (!vp) return;
            viewer.camera.flyTo({
                destination: vp.destination,
                orientation: vp.orientation,
                duration: 2.5
            });
            showToast(translateText("toast_flying", btn.textContent.trim()));
        });
    });

    // --- Layer toggles --------------------------------------------------------
    const toggleBuildings = document.getElementById("toggle-buildings");
    toggleBuildings?.addEventListener("change", e => {
        buildingsTileset.show = e.target.checked;
    });

    const toggleSmoke = document.getElementById("toggle-smoke");
    toggleSmoke?.addEventListener("change", e => {
        smokeSystem.show = e.target.checked;
    });

    // Hazard layer toggles (SGC)
    if (hazardLayer) {
        const hazardMaster = document.getElementById("toggle-hazard");
        if (hazardMaster) {
            hazardMaster.disabled = false;
            hazardMaster.addEventListener("change", e => {
                const on = e.target.checked;
                ["lahar", "cdp", "ash"].forEach(g =>
                    setHazardGroupVisible(hazardLayer, g, on)
                );
                const tLahar = document.getElementById("toggle-lahar");
                const tCdp = document.getElementById("toggle-cdp");
                const tAsh = document.getElementById("toggle-ash");
                if (tLahar) tLahar.checked = on;
                if (tCdp) tCdp.checked = on;
                if (tAsh) tAsh.checked = on;
                if (on) showToast(translateText("toast_hazard_on"));
            });
        }

        const wireSub = (id, group, labelKey) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.disabled = false;
            el.addEventListener("change", e => {
                setHazardGroupVisible(hazardLayer, group, e.target.checked);
                const any = ["lahar", "cdp", "ash"].some(g =>
                    hazardLayer.groups[g].some(en => en.show)
                );
                if (hazardMaster) hazardMaster.checked = any;
                if (e.target.checked) showToast(translateText("toast_hazard_group", translateText(labelKey)));
            });
        };
        wireSub("toggle-lahar", "lahar", "layer_lahars");
        wireSub("toggle-cdp",   "cdp",   "layer_cdp");
        wireSub("toggle-ash",   "ash",   "layer_ash");
    }

    // Lahar trajectory toggle
    const toggleLaharPath = document.getElementById("toggle-lahar-path");
    if (toggleLaharPath && laharPath) {
        toggleLaharPath.disabled = false;
        toggleLaharPath.addEventListener("change", e => {
            setLaharPathVisible(laharPath, e.target.checked);
            if (e.target.checked) {
                const km = (laharPath.totalLengthM / 1000).toFixed(1);
                showToast(translateText("toast_lahar_path", km));
            }
        });
    }

    // --- Eruption trigger ----------------------------------------------------
    document.getElementById("btn-trigger-eruption")?.addEventListener("click", () => {
        // Volcanic Plinian column: rises high but kept performant.
        // (A huge endScale produced enormous translucent sprites -> massive
        //  fill-rate/overdraw, which is what slowed the scene down.)
        smokeSystem.show = true;
        smokeSystem.emissionRate = 45.0;      // ~990 live particles total
        smokeSystem.particleLife = 22.0;      // Plume rises ~700 m above crater
        smokeSystem.speed = 32.0;             // Fast vertical jet
        smokeSystem.endScale = 45.0;          // Big but not screen-filling
        smokeSystem.color = Cesium.Color.fromCssColorString("#3a3a3a").withAlpha(0.65);
        if (toggleSmoke) toggleSmoke.checked = true;

        // Auto-enable hazard zones (lahar polygon) for context
        if (hazardLayer) {
            setHazardGroupVisible(hazardLayer, "lahar", true);
            const tl = document.getElementById("toggle-lahar");
            const th = document.getElementById("toggle-hazard");
            if (tl) tl.checked = true;
            if (th) th.checked = true;
        }

        // Dynamic lahar simulation (Clock set to Realistic x20 speed!)
        if (laharSim) {
            laharSim.play();

            // Calibrated playback multiplier: x20 as requested by the user
            viewer.clock.multiplier = 20;
            const speedBtn = document.getElementById("tl-speed");
            if (speedBtn) speedBtn.textContent = "20×";

            // Fly to crater first, then track the lahar head
            viewer.camera.flyTo({
                destination: VIEWPOINTS.ruiz.destination,
                orientation: VIEWPOINTS.ruiz.orientation,
                duration: 2.5,
                complete: () => {
                    viewer.trackedEntity = laharSim.head;
                }
            });

            const minutes = (laharSim.totalDuration / 60).toFixed(1);
            const km = (laharSim.totalDist / 1000).toFixed(1);
            const kmh = (laharSim.avgV * 3.6).toFixed(0);
            showToast(
                translateText("toast_eruption_on", km, minutes, kmh),
                6000
            );
        } else {
            viewer.camera.flyTo({
                destination: VIEWPOINTS.ruiz.destination,
                orientation: VIEWPOINTS.ruiz.orientation,
                duration: 3.0
            });
        }
    });

    document.getElementById("btn-reset-eruption")?.addEventListener("click", () => {
        // Reset Plinian smoke to standard caldera smoke
        smokeSystem.emissionRate = 8.0;
        smokeSystem.particleLife = 25.0;
        smokeSystem.speed = 5.0;
        smokeSystem.endScale = 22.0;
        smokeSystem.color = Cesium.Color.LIGHTGRAY.withAlpha(0.5);

        viewer.trackedEntity = undefined;
        if (laharSim) laharSim.reset();
        showToast(translateText("toast_reset"));
    });

    // --- Live HUD (elapsed time, distance, velocity) -------------------------
    const hudTime = document.getElementById("hud-time");
    const hudDist = document.getElementById("hud-dist");
    const hudVel  = document.getElementById("hud-vel");
    if (laharSim && hudTime && hudDist && hudVel) {
        viewer.clock.onTick.addEventListener(() => {
            const elapsed = Math.max(0, Math.min(laharSim.totalDuration,
                Cesium.JulianDate.secondsDifference(
                    viewer.clock.currentTime, laharSim.startTime)));
            const mm = Math.floor(elapsed / 60).toString().padStart(2, "0");
            const ss = Math.floor(elapsed % 60).toString().padStart(2, "0");
            hudTime.textContent = `${mm}:${ss}`;

            const dist = sampleDistance(elapsed, laharSim.cumTime, laharSim.cumDist);
            hudDist.textContent = (dist / 1000).toFixed(2) + " km";

            let idx = 0;
            while (idx < laharSim.cumTime.length - 1
                   && laharSim.cumTime[idx + 1] <= elapsed) idx++;
            const v = laharSim.segVel[Math.min(idx, laharSim.segVel.length - 1)] || 0;
            hudVel.textContent = (v * 3.6).toFixed(0) + " km/h";
        });
    }

    // --- Clock display --------------------------------------------------------
    const tlDate = document.getElementById("tl-date");
    const tlTime = document.getElementById("tl-time");
    const tlPlayBtn = document.getElementById("tl-play");
    const tlSpeedBtn = document.getElementById("tl-speed");

    viewer.clock.shouldAnimate = false;
    const tickListener = () => {
        const jd = viewer.clock.currentTime;
        const date = Cesium.JulianDate.toDate(jd);
        tlDate.textContent = date.toISOString().slice(0, 10);
        tlTime.textContent = date.toISOString().slice(11, 19) + " UTC";
    };
    viewer.clock.onTick.addEventListener(tickListener);

    tlPlayBtn?.addEventListener("click", () => {
        viewer.clock.shouldAnimate = !viewer.clock.shouldAnimate;
        tlPlayBtn.innerHTML = viewer.clock.shouldAnimate
            ? '<i data-lucide="pause"></i>'
            : '<i data-lucide="play"></i>';
        if (window.lucide) lucide.createIcons();
    });

    const speeds = [1, 10, 20, 60, 300, 1800];
    let speedIdx = 2; // Default 20x as default
    tlSpeedBtn?.addEventListener("click", () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        viewer.clock.multiplier = speeds[speedIdx];
        tlSpeedBtn.textContent = speeds[speedIdx] + "×";
    });

    // --- GIS measurement tools ------------------------------------------------
    const measure = setupMeasureTools(viewer);

    document.getElementById("btn-measure-distance")?.addEventListener("click", () => {
        measure.start("distance");
        showToast(translateText("measure_distance_start"), 4000);
    });
    document.getElementById("btn-measure-area")?.addEventListener("click", () => {
        measure.start("area");
        showToast(translateText("measure_area_start"), 4000);
    });
    document.getElementById("btn-elevation-profile")?.addEventListener("click", () => {
        measure.start("profile");
        showToast(translateText("measure_profile_start"), 4000);
    });
    document.getElementById("btn-clear-measure")?.addEventListener("click", () => {
        measure.clear();
        showToast(translateText("measure_cleared"), 2000);
    });

    // --- Load GeoJSON / KML ---------------------------------------------------
    const fileInput = document.getElementById("file-geojson");
    document.getElementById("btn-load-geojson")?.addEventListener("click", () => {
        fileInput?.click();
    });
    fileInput?.addEventListener("change", async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = URL.createObjectURL(file);
            const isKml = /\.km[lz]$/i.test(file.name);
            const ds = isKml
                ? await Cesium.KmlDataSource.load(url, {
                    camera: viewer.scene.camera,
                    canvas: viewer.scene.canvas,
                    clampToGround: true
                })
                : await Cesium.GeoJsonDataSource.load(url, { clampToGround: true });
            await viewer.dataSources.add(ds);
            await viewer.flyTo(ds);
            URL.revokeObjectURL(url);
            showToast(translateText("measure_load_ok", file.name), 3500);
        } catch (err) {
            console.error("Failed to load user file:", err);
            showToast(translateText("measure_load_err"), 4000);
        } finally {
            e.target.value = "";
        }
    });
}

// =============================================================
//  GIS Measurement Tools (distance, area, elevation profile)
// =============================================================
function setupMeasureTools(viewer) {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    const geodesic = new Cesium.EllipsoidGeodesic();

    let mode = null;                 // 'distance' | 'area' | 'profile'
    let activePositions = [];        // confirmed Cartesian3 points
    let floating = null;             // Cartesian3 following the mouse
    let drawingEntities = [];        // entities for the in-progress drawing
    const persistentEntities = [];   // all finished measurement entities
    const panels = [];               // DOM panels (profiles)

    // --- helpers -------------------------------------------------------------
    function pickTerrain(windowPos) {
        const ray = viewer.camera.getPickRay(windowPos);
        if (!ray) return null;
        return viewer.scene.globe.pick(ray, viewer.scene) || null;
    }

    function slopeDistance(p1, p2) {
        const c1 = Cesium.Cartographic.fromCartesian(p1);
        const c2 = Cesium.Cartographic.fromCartesian(p2);
        geodesic.setEndPoints(c1, c2);
        const s = geodesic.surfaceDistance;
        const dh = (c2.height || 0) - (c1.height || 0);
        return Math.sqrt(s * s + dh * dh);
    }

    function totalDistance(positions) {
        let total = 0;
        for (let i = 1; i < positions.length; i++) {
            total += slopeDistance(positions[i - 1], positions[i]);
        }
        return total;
    }

    function polygonArea(positions) {
        if (positions.length < 3) return 0;
        const center = Cesium.BoundingSphere.fromPoints(positions).center;
        const enu = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        const inv = Cesium.Matrix4.inverseTransformation(enu, new Cesium.Matrix4());
        const local = positions.map(p =>
            Cesium.Matrix4.multiplyByPoint(inv, p, new Cesium.Cartesian3()));
        let area = 0;
        for (let i = 0; i < local.length; i++) {
            const j = (i + 1) % local.length;
            area += local[i].x * local[j].y - local[j].x * local[i].y;
        }
        return Math.abs(area) / 2;
    }

    function fmtLength(m) {
        return m >= 1000 ? (m / 1000).toFixed(2) + " km" : m.toFixed(1) + " m";
    }
    function fmtArea(m2) {
        if (m2 >= 1e6) return (m2 / 1e6).toFixed(2) + " km²";
        if (m2 >= 1e4) return (m2 / 1e4).toFixed(2) + " ha";
        return m2.toFixed(1) + " m²";
    }

    function makeLabel(position, getText) {
        return viewer.entities.add({
            position: position,
            label: {
                text: getText,
                font: "600 13px Inter, sans-serif",
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                showBackground: true,
                backgroundColor: Cesium.Color.fromCssColorString("#1a1a2e").withAlpha(0.85),
                backgroundPadding: new Cesium.Cartesian2(8, 5),
                pixelOffset: new Cesium.Cartesian2(0, -16),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        });
    }

    function addVertexPoint(position) {
        return viewer.entities.add({
            position: position,
            point: {
                pixelSize: 9,
                color: Cesium.Color.fromCssColorString("#4cc9f0"),
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        });
    }

    // --- drawing lifecycle ---------------------------------------------------
    function resetDrawing() {
        drawingEntities.forEach(e => viewer.entities.remove(e));
        drawingEntities = [];
        activePositions = [];
        floating = null;
    }

    function start(newMode) {
        resetDrawing();
        mode = newMode;
        viewer.scene.canvas.style.cursor = "crosshair";

        if (mode === "distance" || mode === "profile") {
            const lineEntity = viewer.entities.add({
                polyline: {
                    positions: new Cesium.CallbackProperty(() => {
                        const pts = activePositions.slice();
                        if (floating) pts.push(floating);
                        return pts.length >= 2 ? pts : [];
                    }, false),
                    width: 3,
                    clampToGround: true,
                    material: Cesium.Color.fromCssColorString("#4cc9f0")
                }
            });
            drawingEntities.push(lineEntity);
        } else if (mode === "area") {
            const polyEntity = viewer.entities.add({
                polygon: {
                    hierarchy: new Cesium.CallbackProperty(() => {
                        const pts = activePositions.slice();
                        if (floating) pts.push(floating);
                        return pts.length >= 3
                            ? new Cesium.PolygonHierarchy(pts) : undefined;
                    }, false),
                    material: Cesium.Color.fromCssColorString("#4cc9f0").withAlpha(0.35),
                    classificationType: Cesium.ClassificationType.TERRAIN
                }
            });
            const outlineEntity = viewer.entities.add({
                polyline: {
                    positions: new Cesium.CallbackProperty(() => {
                        const pts = activePositions.slice();
                        if (floating) pts.push(floating);
                        if (pts.length >= 2) pts.push(pts[0]);
                        return pts.length >= 2 ? pts : [];
                    }, false),
                    width: 2,
                    clampToGround: true,
                    material: Cesium.Color.fromCssColorString("#4cc9f0")
                }
            });
            drawingEntities.push(polyEntity, outlineEntity);
        }
    }

    function finish() {
        if (!mode) return;
        viewer.scene.canvas.style.cursor = "default";
        floating = null;

        if (mode === "distance" && activePositions.length >= 2) {
            const total = totalDistance(activePositions);
            const lbl = makeLabel(
                activePositions[activePositions.length - 1],
                translateText("measure_total_distance", fmtLength(total))
            );
            persistentEntities.push(...drawingEntities, lbl);
            drawingEntities = [];
        } else if (mode === "area" && activePositions.length >= 3) {
            const area = polygonArea(activePositions);
            const perimeter = totalDistance(
                activePositions.concat([activePositions[0]]));
            const center = Cesium.BoundingSphere.fromPoints(activePositions).center;
            const lbl = makeLabel(center,
                translateText("measure_total_area", fmtArea(area)) +
                "  ·  " + fmtLength(perimeter));
            persistentEntities.push(...drawingEntities, lbl);
            drawingEntities = [];
        } else if (mode === "profile" && activePositions.length >= 2) {
            persistentEntities.push(...drawingEntities);
            drawingEntities = [];
            buildElevationProfile(activePositions[0],
                activePositions[activePositions.length - 1]);
        } else {
            resetDrawing();
        }
        activePositions = [];
        mode = null;
    }

    // --- elevation profile ---------------------------------------------------
    async function buildElevationProfile(start, end) {
        const samples = 80;
        const c0 = Cesium.Cartographic.fromCartesian(start);
        const c1 = Cesium.Cartographic.fromCartesian(end);
        const carts = [];
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            carts.push(new Cesium.Cartographic(
                Cesium.Math.lerp(c0.longitude, c1.longitude, t),
                Cesium.Math.lerp(c0.latitude, c1.latitude, t)
            ));
        }
        const sampled = await Cesium.sampleTerrainMostDetailed(
            viewer.terrainProvider, carts);

        geodesic.setEndPoints(c0, c1);
        const totalLen = geodesic.surfaceDistance;
        const pts = sampled.map((c, i) => ({
            d: (i / samples) * totalLen,
            h: c.height || 0
        }));
        renderProfilePanel(pts, totalLen);
    }

    function renderProfilePanel(pts, totalLen) {
        const W = 360, H = 180, padL = 44, padB = 26, padT = 14, padR = 12;
        const hs = pts.map(p => p.h);
        const minH = Math.min(...hs), maxH = Math.max(...hs);
        const range = Math.max(1, maxH - minH);
        const x = d => padL + (d / totalLen) * (W - padL - padR);
        const y = h => padT + (1 - (h - minH) / range) * (H - padT - padB);

        let gain = 0, loss = 0;
        for (let i = 1; i < pts.length; i++) {
            const dh = pts[i].h - pts[i - 1].h;
            if (dh > 0) gain += dh; else loss -= dh;
        }

        let path = pts.map((p, i) =>
            (i ? "L" : "M") + x(p.d).toFixed(1) + "," + y(p.h).toFixed(1)).join(" ");
        const areaPath = path + ` L${x(totalLen).toFixed(1)},${(H - padB).toFixed(1)}` +
            ` L${padL},${(H - padB).toFixed(1)} Z`;

        const panel = document.createElement("div");
        panel.className = "measure-panel";
        panel.innerHTML = `
            <div class="measure-panel-head">
                <span>${translateText("profile_title")}</span>
                <button class="measure-panel-close">&times;</button>
            </div>
            <svg width="${W}" height="${H}">
                <path d="${areaPath}" fill="rgba(76,201,240,0.18)" stroke="none"/>
                <path d="${path}" fill="none" stroke="#4cc9f0" stroke-width="2"/>
                <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="#555"/>
                <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="#555"/>
                <text x="${padL - 6}" y="${y(maxH) + 4}" fill="#aaa" font-size="10" text-anchor="end">${maxH.toFixed(0)}</text>
                <text x="${padL - 6}" y="${y(minH) + 4}" fill="#aaa" font-size="10" text-anchor="end">${minH.toFixed(0)}</text>
                <text x="${(padL + W - padR) / 2}" y="${H - 6}" fill="#aaa" font-size="10" text-anchor="middle">${fmtLength(totalLen)}</text>
            </svg>
            <div class="measure-panel-stats">
                <span>${translateText("profile_min")}: <b>${minH.toFixed(0)} m</b></span>
                <span>${translateText("profile_max")}: <b>${maxH.toFixed(0)} m</b></span>
                <span>${translateText("profile_gain")}: <b>+${gain.toFixed(0)} m</b></span>
                <span>${translateText("profile_loss")}: <b>-${loss.toFixed(0)} m</b></span>
            </div>`;
        document.body.appendChild(panel);
        panel.querySelector(".measure-panel-close")
            .addEventListener("click", () => panel.remove());
        panels.push(panel);
    }

    function clear() {
        resetDrawing();
        persistentEntities.forEach(e => viewer.entities.remove(e));
        persistentEntities.length = 0;
        panels.forEach(p => p.remove());
        panels.length = 0;
        viewer.scene.canvas.style.cursor = "default";
        mode = null;
    }

    // --- input events --------------------------------------------------------
    handler.setInputAction(click => {
        if (!mode) return;
        const pos = pickTerrain(click.position);
        if (!pos) return;
        activePositions.push(pos);
        drawingEntities.push(addVertexPoint(pos));
        if (mode === "profile" && activePositions.length === 2) {
            finish();
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(move => {
        if (!mode) return;
        const pos = pickTerrain(move.endPosition);
        if (pos) floating = pos;
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(() => { if (mode) finish(); },
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    handler.setInputAction(() => { if (mode) finish(); },
        Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    return { start, clear };
}

// =============================================================
//  Boot
// =============================================================
loadCesiumData();
