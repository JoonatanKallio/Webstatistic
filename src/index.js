import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
import L from "../node_modules/leaflet/dist/leaflet.js";
import easyPrint from "leaflet-easyprint"
import "../node_modules/leaflet/dist/leaflet.css";

import employmentDataJSON from "../employmentDataJSON.json"
import populationJSON from "../populationJSON.json"


const fetchData = async () => {
    const url1 = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const res1 = await fetch(url1);
    const dataJson1 = await res1.json();

    const url2 = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const res2 = await fetch(url2, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(populationJSON) 
    });
    const dataJson2 = await res2.json();

    const url3 = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115b.px";
    const res3 = await fetch(url3, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(employmentDataJSON) 
    })
    const dataJson3 = await res3.json();


    return [dataJson1, dataJson2, dataJson3];
}

const calculateRate = (laborForce, unemployed, year) => { /*Calculates unemploymenrate*/
    const index = year-2015;
    const unemploymentRate = unemployed[index] / laborForce[index];
    return unemploymentRate;
}

const buildPopulationChart = (population, name) => {
    const check = population[0]-population[5]
    let color = "#a1e048"
    if(check > 0) {
        color = "#dd645e"
    }
    const dataset = [ 
        {
            name: "Population",
            values: population
        }
    ]

    const chartData = {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
        datasets: dataset
    };
    
    const chart = new Chart("#chart", {
        title: `Population in ${name} by different years`,
        data: chartData,
        type: "line",
        height: 450,
        colors:  [color]
    })
}

const buildUnemploymentChart = (unemployed, employed, name) => {  
    const dataset = [ 
        {

            name: "Unemployed",
            values: unemployed
        },
        {
            name: "Employed",
            values: employed
        }
    ]

    const chartData = {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
        datasets: dataset
    };
    const chart = new Chart("#chart", {
        title: `Unemployment in ${name} by different years`,
        data: chartData,
        type: "bar",
        height: 450,
        colors:  ['#dd645e', "#a1e048"]
    })

}

const overlayBtn = document.getElementById("close-chart"); /*hides the popup when button clicked*/
overlayBtn.addEventListener("click", () => {
    const overlay = document.getElementById("right-container")
    overlay.style.display = "none"
    document.getElementById("chart").remove()
})

const overlay = document.getElementById("right-container"); /* hides the popup when user clicks out of the chart*/
overlay.addEventListener("click", (event) => {
    if(event.target.classList[0] === "overlay") {
        const overlay = document.getElementById("right-container")
        overlay.style.display = "none"
        document.getElementById("chart").remove()
    }
})

const makePopulationDiv = (populationlist, name, pop) => { /*Creates popupDiv for population layer*/ 
    const newDiv = document.createElement("div")
    const nameh2 = document.createElement("h2")
    nameh2.innerText = (name)
    newDiv.append(nameh2)
    const poph2 = document.createElement("h2")
    poph2.innerText = ("Population: " +pop)
    newDiv.append(poph2)
    const button = document.createElement("button")
    button.innerText = "Show datachart"

    button.addEventListener("click", () => {
        const overlay = document.getElementById("right-container")
        overlay.style.display = "flex"
        const chartDiv = document.createElement("div");
        chartDiv.id = "chart"
        chartDiv.classList.add("chart");
        chartDiv.style.width= "300px"
        document.getElementById("overlay-wrapper").append(chartDiv) 
        buildPopulationChart(populationlist.years, name, pop);
    })
    newDiv.append(button)
    return newDiv;
}

const makeEmploymentDiv = (laborForce, employed, unemployed, year, name) => { /*Creates popupDiv for employment layer*/ 
    const index = year-2015;
    const newDiv = document.createElement("div")

    const nameh2 = document.createElement("h2")
    nameh2.innerText = (name)
    newDiv.append(nameh2)
    const totEmp = document.createElement("h3")
    totEmp.innerText = (`Total employment: ${employed[index]}`)
    newDiv.append(totEmp)

    const totUnEmp = document.createElement("h3")
    totUnEmp.innerText = (`Total unemployment: ${unemployed[index]}`)
    newDiv.append(totUnEmp)

    const unempRate = document.createElement("h3")
    const unemploymentRate = calculateRate(laborForce, unemployed, year);
    unempRate.innerText = (`Unemployment rate: ${Math.round(unemploymentRate*1000) /10}%`)
    newDiv.append(unempRate)
    
    const button = document.createElement("button")
    button.innerText = "Show datachart"
    button.addEventListener("click", () => {
        const overlay = document.getElementById("right-container")
        overlay.style.display = "flex"
        const chartDiv = document.createElement("div");
        chartDiv.id = "chart"
        chartDiv.classList.add("chart");
        chartDiv.style.width= "300px"
        document.getElementById("overlay-wrapper").append(chartDiv)
        buildUnemploymentChart(unemployed, employed, name);
    })
    newDiv.append(button)
    return newDiv;
}


const initMap = async (year, showColor, layerChoice, firstInit) => { 
    const dataList = await fetchData()
    const geoJsonResponse = dataList[0]
    const populationJsonResponse = dataList[1]
    const empDataRes = dataList[2]
    const index = year-2015 /* This is used to get the right data from the api results */

    let map = L.map('map');

    if(firstInit === true) { /* This is for the show country population and employment buttons and only done on the first initialization of the map*/
        const showCountryPop = document.getElementById("whole-country-pop")
        showCountryPop.addEventListener("click", () => {
            const allYearsPopulation = [populationJsonResponse.value[310*0], populationJsonResponse.value[310*1], populationJsonResponse.value[310*2], populationJsonResponse.value[310*3] ,populationJsonResponse.value[310*4], populationJsonResponse.value[310*5]]
            const overlay = document.getElementById("right-container")
            overlay.style.display = "flex"
            const chartDiv = document.createElement("div");
            chartDiv.id = "chart"
            chartDiv.classList.add("chart");
            chartDiv.style.width= "300px"
            document.getElementById("overlay-wrapper").append(chartDiv)
            buildPopulationChart(allYearsPopulation, "whole country")
        })
        const showCountryEmp = document.getElementById("whole-country-emp")
        showCountryEmp.addEventListener("click", () => {
            const employmentData = empDataRes.value.slice(0, 18)
            const unemployed = employmentData.slice(12,18)
            const employed = employmentData.slice(6,12)
            const overlay = document.getElementById("right-container")
            overlay.style.display = "flex"
            const chartDiv = document.createElement("div");
            chartDiv.id = "chart"
            chartDiv.classList.add("chart");
            chartDiv.style.width= "300px"
            document.getElementById("overlay-wrapper").append(chartDiv)
            buildUnemploymentChart(unemployed, employed, "whole country");
        })
    }
    
    if(layerChoice === "population"){ /*Population data layer*/
        let populationgeoJson = L.geoJSON(geoJsonResponse, {
            onEachFeature: (feature, layer) => {
                const munCode = "KU"+feature.properties.kunta
                const name = feature.properties.nimi
                const municipalityIndex = Object.keys(populationJsonResponse.dimension.Alue.category.label).indexOf(munCode)
                const population = populationJsonResponse.value[municipalityIndex+310*index]
                const allYearsPopulation = {  /*Gets the whole country population data*/
                    index: municipalityIndex,
                    years: [populationJsonResponse.value[municipalityIndex+310*0], populationJsonResponse.value[municipalityIndex+310*1], populationJsonResponse.value[municipalityIndex+310*2], populationJsonResponse.value[municipalityIndex+310*3] ,populationJsonResponse.value[municipalityIndex+310*4], populationJsonResponse.value[municipalityIndex+310*5]]
                }
                
                const totalPopulation = populationJsonResponse.value[0+310*index];
                const populationRate = population / totalPopulation;
                const populationPercent = populationRate * 100 * 80; 
                if(showColor===true) {
                    if(populationPercent < 120) {
                        layer.setStyle({color: `hsl(${populationPercent}, 55%, 50%`})
                    } else {
                        layer.setStyle({color: `hsl(120, 55%, 50%`})
                    } 
                }
                const newPopulationDiv = makePopulationDiv(allYearsPopulation, name, population)
                layer.bindPopup(newPopulationDiv)
                layer.bindTooltip(`${name}<br>Population: ${population}`)
            }

        }).addTo(map)
        map.fitBounds(populationgeoJson.getBounds());
    } else { /*Employment layer, which is the default also if no layer is chosen and in the start*/
        let employmentgeoJSON = L.geoJSON(geoJsonResponse, {
            onEachFeature: (feature, layer) => {
                const munCode = "KU"+feature.properties.kunta
                
                const name = feature.properties.nimi
                const municipalityIndex = Object.keys(populationJsonResponse.dimension.Alue.category.label).indexOf(munCode)
                
                const employmentData = empDataRes.value.slice(municipalityIndex*18, municipalityIndex*18+18)
                const laborForce = employmentData.slice(0,6) /*list is 0-5 indexed and 0 is 2015 and 6 is 2020*/
                const employed = employmentData.slice(6, 12)
                const unemployed = employmentData.slice(12,18)
                const unemploymentRate = calculateRate(laborForce, unemployed, year);
                const newDiv = makeEmploymentDiv(laborForce, employed, unemployed, year, name);

                layer.bindPopup(newDiv);
                layer.bindTooltip(`${name}`)

                if(showColor===true) {
                    layer.setStyle({color: `hsl(${110-unemploymentRate*400}, 90%, 40%`})
                }
            }
        }).addTo(map)
        map.fitBounds(employmentgeoJSON.getBounds());
    }

    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    if(showColor === true) { /*Map legend creation but only if the color is shown*/
        if(layerChoice ==="employment") {
            let legend = L.control({ position: "bottomleft" });
            legend.onAdd = (map) => {
            let div = L.DomUtil.create("div", "legend")
            div.id = "legend"
            div.innerHTML = "<h2>Unemployment-%</h2>"
            div.innerHTML += "<h4>Green: Low unemployment</h4>"
            div.innerHTML += "<h4>Orange: Medium unemployment</h4>"
            div.innerHTML += "<h4>Red: High unemployment</h4>"
            return div;
        }
        legend.addTo(map)
        } else if(layerChoice === "population") {
            let legend = L.control({ position: "bottomleft" });
            legend.onAdd = (map) => {
            let div = L.DomUtil.create("div", "legend")
            div.id = "legend"
            div.innerHTML = "<h2>Population density</h2>"
            div.innerHTML += "<h4>Red: Not dense</h4>"
            div.innerHTML += "<h4>Orange: Dense</h4>"
            div.innerHTML += "<h4>Green: Very dense</h4>"
            return div;
        }
        legend.addTo(map)
        }
        
    } 
    L.easyPrint({ /* Downloading the png file is done with easyprint */
        title: "Save as a PNG",
        position: "topleft",
        sizeModes: ["A4Portrait","A4Landscape"],
        exportOnly: true,
        hideControlContainer: true,
    }).addTo(map) 
}

const submit = document.getElementById("submit"); 
submit.addEventListener("click", (event) => { /* Gets the data from user input and calls the initmap after it with the user values */
    event.preventDefault();
    const yearList = document.getElementById("years");
    const year = yearList.value;
    const dataList = document.getElementById("data-option");
    const layer = dataList.value;
    const checkbox = document.getElementById("show-color");
    const check = checkbox.checked
    document.getElementById("map").remove()
    const newMap = document.createElement("div")
    newMap.id = "map";
    document.getElementById("map-holder").append(newMap)
    
    initMap(year, check, layer, false);
})

initMap("2020", true, "employment", true);