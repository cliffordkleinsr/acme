<script lang="ts">
    import 'leaflet/dist/leaflet.css'
    import type { LatLngBoundsExpression } from 'leaflet';
	import { onMount } from 'svelte';
    import { AddDataToGeoJson, getColor, type Counties } from './kenya';
    import type { GeoJSON } from 'geojson'

    
    let mapEl:HTMLDivElement
    export let title:string='Total Agents Completed'
    export let options: Counties = {
        MOMBASA : 0,
        KWALE : 0,
        KILIFI : 0,
        TANA_RIVER : 0,
        LAMU : 0,
        TAITA_TAVETA : 0,
        GARISSA : 0,
        WAJIR : 0,
        MANDERA : 0,
        MARSABIT : 0,
        ISIOLO : 0,
        MERU : 0,
        THARAKA_NITHI : 0,
        EMBU : 0,
        KITUI : 0,
        MACHAKOS : 0,
        MAKUENI : 0,
        NYANDARUA : 0,
        NYERI : 0,
        KIRINYAGA : 0,
        MURANGA : 0,
        KIAMBU : 0,
        TURKANA : 0,
        WEST_POKOT : 0,
        SAMBURU : 0,
        TRANS_NZOIA : 0,
        UASIN_GISHU : 0,
        ELGEYO_MARAKWET : 0,
        NANDI : 0,
        BARINGO : 0,
        LAIKIPIA : 0,
        NAKURU : 0,
        NAROK : 0,
        KAJIADO : 0,
        KERICHO: 0,
        BOMET: 0,
        KAKAMEGA: 0,
        VIHIGA: 0,
        BUNGOMA: 0,
        BUSIA: 0,
        SIAYA: 0,
        KISUMU: 0,
        HOMA_BAY: 0,
        MIGORI: 0,
        KISII: 0,
        NYAMIRA: 0,
        NAIROBI: 0,
    }

  
    onMount(async () => {
        // init leaflet
        const L = await import('leaflet')
        // init map
        const map = L.map(mapEl).setView([-0.47, 37.39402185424785], 6)
        // init tile
        L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        }).addTo(map)
        map.scrollWheelZoom.disable()
        const counties = AddDataToGeoJson(options)
        
        function style(feature: any) {
            return {
                fillColor: getColor(feature.properties.DENS),
                weight: 1,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        var geojson: { resetStyle: (arg0: any) => void; }
        // ... our listeners
        function highlightFeature(e: { target: any; }) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie &&  !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
        }
        function resetHighlight(e: { target: any; }) {
            geojson.resetStyle(e.target);
        }
        function zoomToFeature(e: { target: { getBounds: () => LatLngBoundsExpression; }; }) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature: any, layer: { on: (arg0: { mouseover: (e: { target: any; }) => void; mouseout: (e: { target: any; }) => void; click: (e: { target: { getBounds: () => LatLngBoundsExpression; }; }) => void; }) => void; }) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        // GEOJSON
        geojson = L.geoJson(counties, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map)

        // legend controls
  
        var info = new L.Control();

        info.onAdd = function (map: any) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props: any) {
            this._div.innerHTML = '<h4 class="text-xl font-semibold">'+title+'</h4>'+ '<p>By county</p>'  +  (props ?
                '<b>' + props.COUNTY_NAM + '</b><br />' + props.DENS + ' people / mi<sup>2</sup>'
                : 'Hover over a county');
        };

        info.addTo(map)
    })
</script>

<div class="hidden h-full sm:block z-10" bind:this={mapEl}></div>

