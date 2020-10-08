function init() {
  var map = L.map('map', {
    zoomControl: false
  }).setView([37, 135], 5);
  mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; ' + mapLink,
    maxZoom: 18
  }).addTo(map);
  L.control.scale({
    maxWidth: 200,
    position: 'bottomleft',
    imperial: false
  }).addTo(map);
  L.control.zoom({
    position: 'topright'
  }).addTo(map);

  function onLocationFound(e) {
    L.circle(e.latlng, {
      radius: 2800,
      color: "#1e90ff",
      fill: true,
      fillOpacity: 0.5,
      weight: 1
    }).bindPopup("<span class=font_size>現在地</span>").addTo(map);
  }

  function onLocationError(e) {
    alert("現在地を取得できませんでした。" + e.message);
  }
  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);
  map.locate({
    setView: true,
    maxZoom: 16,
    timeout: 20000
  });
  amedas();

  function amedas() {
    var Line_W = 2;
    var num = 0;
    var len = 0;
    var lat = 0;
    var lng = 0;
    var precip_1h = Number(0);
    var stn_name_ja = "";
    var stn_name_ja_kana = "";
    const url = 'https://api.renitapps.com/jjwd_get.php';
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      len = Object.keys(json['stations']).length;
      for (var i = 0; i <= len; i++) {
        lat = json.stations[i].lat;
        lng = json.stations[i].lng;
        num = json.stations[i].stn_num;
        stn_name_ja = json.stations[i].stn_name_ja;
        stn_name_ja_kana = json.stations[i].stn_name_ja_kana;
        var time = json.stations[i].updatedAt;
        if (Number(json.stations[i].preall) != null) {
          precip_1h = Number(json.stations[i].preall.precip_1h);
          var up = document.getElementById("up");
          up.innerHTML += "";
          if (precip_1h >= 80.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#9800af",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h >= 50.0 && precip_1h < 80.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#f20000",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h >= 30.0 && precip_1h < 50.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#ff9000",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h >= 20.0 && precip_1h < 30.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#d3cd00",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h >= 10.0 && precip_1h < 20.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#00bf0d",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h >= 5.0 && precip_1h < 10.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#009fa1",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h >= 1.0 && precip_1h < 5.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#00a9ff",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h <= 1.0 && precip_1h >= 0.1) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "#7e7e7e",
              fill: true,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else if (precip_1h == 0.0) {
            var circle = L.circle([lat, lng], {
              radius: 2400,
              color: "white",
              fill: false,
              fillOpacity: 1.0,
              weight: 0
            }).bindPopup("<span class=font_size>" + stn_name_ja + "(" + stn_name_ja_kana + ")\n" + precip_1h + "mm</span>").addTo(map);
          } else {}
        } else {
          var circle = L.circle([lat, lng], {
            radius: 1800,
            color: "black",
            fill: false,
            fillOpacity: 0.0,
            weight: 0
          }).bindPopup("なにもねぇ").addTo(map);
          console.log("何もないnull");
        }
      }
    });
    var legend = L.control({
      position: "bottomright"
    });
    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend");
      grades = ["80mm～", "50mm～", "30mm～", "20mm～", "10mm～", "5mm～", "1mm～", "～1mm"],
        labels = ["80mm.png", "50mm.png", "30mm.png", "20mm.png", "10mm.png", "5mm.png", "5mm-.png", "1mm.png"];
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += grades[i] + (" <img src=/amedas/" + /image/ + labels[i] + " height=20 width=20" + ">") + "<br>";
      }
      return div;
    };
    legend.addTo(map);
  }
}