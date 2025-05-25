(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/Mapview.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MapView)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$sdk$2f$dist$2f$maptiler$2d$sdk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@maptiler/sdk/dist/maptiler-sdk.mjs [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$sdk$2f$dist$2f$maptiler$2d$sdk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@maptiler/sdk/dist/maptiler-sdk.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$client$2f$dist$2f$maptiler$2d$client$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@maptiler/client/dist/maptiler-client.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MapView() {
    _s();
    const mapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const center = {
        lng: -118.95258684698637,
        lat: 34.18334035884417
    };
    const zoom = 16;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$sdk$2f$dist$2f$maptiler$2d$sdk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["config"].apiKey = "QdJSZvrw6MpZWuGeDuMe";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapView.useEffect": ()=>{
            if (map.current) return;
            map.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$sdk$2f$dist$2f$maptiler$2d$sdk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Map"]({
                container: mapContainer.current,
                style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$client$2f$dist$2f$maptiler$2d$client$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapStyle"].STREETS,
                center: [
                    center.lng,
                    center.lat
                ],
                zoom: zoom
            });
            const markers = [
                [
                    34.18518367221783,
                    -118.95283325589428
                ],
                [
                    34.18324442509275,
                    -118.9525757638468
                ],
                [
                    34.18329323964055,
                    -118.95214661043437
                ]
            ];
            markers.forEach({
                "MapView.useEffect": ([lat, lon])=>{
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$maptiler$2f$sdk$2f$dist$2f$maptiler$2d$sdk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Marker"]({
                        color: "#FF0000"
                    }).setLngLat([
                        lon,
                        lat
                    ]).addTo(map.current);
                }
            }["MapView.useEffect"]);
        }
    }["MapView.useEffect"], [
        center.lng,
        center.lat,
        zoom
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "map-wrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: mapContainer,
            className: "map"
        }, void 0, false, {
            fileName: "[project]/src/components/Mapview.jsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Mapview.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(MapView, "Lk3Flgv7n4ByEejhurS8fIb2FSQ=");
_c = MapView;
var _c;
__turbopack_context__.k.register(_c, "MapView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_Mapview_jsx_2a1f2537._.js.map