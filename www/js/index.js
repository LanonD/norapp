try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        navigator.camera;
    }
};

app.initialize();
var map;
var horanueva;
var latAtomar;
var lngAtomar;

var geolocationSuccess = function(position) {

  var Http = new XMLHttpRequest();
  var lc = "";
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E&amp;libraries=places';
Http.open('POST', url);
Http.send();
Http.onreadystatechange = (e) => {
  if (Http.responseText == "") {
        
  }
  if(lc == "") {
  a = JSON.parse(Http.responseText);
  b = a.results[0].formatted_address;
  lc = "nope";
  var ubi = document.getElementById('ubi'); 
  ubi.innerHTML = b;
  }
}

}

var geolocationSuccessAfter = function(position) {

  var Http = new XMLHttpRequest();
  var lc = "";
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latAtomar + ',' + lngAtomar + '&key=AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E&amp;libraries=places';
Http.open('POST', url);
Http.send();
Http.onreadystatechange = (e) => {
  if (Http.responseText == "") {
        
  }
  if(lc == "") {
  a = JSON.parse(Http.responseText);
  b = a.results[0].formatted_address;
  lc = "nope";
  var ubi = document.getElementById('ubi'); 
  ubi.innerHTML = b;
  }
}
  
}

function getlocationAfter() {
  navigator.geolocation.getCurrentPosition(geolocationSuccessAfter, geolocationError, options2);
}


function getlocation2() {
  navigator.geolocation.getCurrentPosition(geolocationSuccessIni, geolocationError, options2);
}

function getlocation() {
  navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options2);
}


function getlocationLiv() {
  navigator.geolocation.getCurrentPosition(geolocationSuccessLiv, geolocationError, options2);
}
var markers = [];

var geolocationSuccessLiv = function(position) {
  deleteMarkers();
  var pos = {
  lat: position.coords.latitude,
  lng: position.coords.longitude,
};
  map.setCenter(pos);
  var marker = new google.maps.Marker({
    position: {lat: position.coords.latitude, lng: position.coords.longitude},
    map: map,
    title: 'Tu ubicación',
    icon: 'https://img.icons8.com/emoji/16/000000/blue-circle-emoji.png'
  });
  markers.push(marker);
}

var geolocationSuccessIni = function(position) {
  var Http = new XMLHttpRequest();
  var lc = "";
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude
    + '&key=AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E&amp;libraries=places';
Http.open('POST', url);
Http.send();
Http.onreadystatechange = (e) => {
  if (Http.responseText == "") {
        
  }
  if(lc == "") {
  a = JSON.parse(Http.responseText);
  b = a.results[0].formatted_address;
  lat_atomar = position.coords.latitude;
  lon_atomar = position.coords.longitude;
  localStorage.latini = lat_atomar;
  localStorage.latfin = lon_atomar;
  lc = "nope";
  }
}
}

// onError Callback receives a PositionError object
//
function geolocationError(error) {
  alert('error al obtener ubicación del dispositivo');
}

$(document).ready(function(){

  /*map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 20.589128, lng: -103.418944},
      zoom: 13,
    });*/

  if (localStorage.getItem("name") != "" && localStorage.getItem("name") != null && localStorage.getItem("name") != undefined) {
    var x = localStorage.getItem("name");
  } 

  var hoy = new Date();
  var hora_actual = hoy.getHours();
  var minutos_actual = hoy.getMinutes();

  var hora_cierra = 23;
  var minutos_cierra = 59;

  var total_horas_cierre = hora_cierra - hora_actual;

  if (total_horas_cierre == 0) {
    var total_minutos_cierre = minutos_cierra - minutos_actual;
    var tiempo_cierre = total_minutos_cierre + 60000;
    setTimeout(function(){ x = "0"; }, tiempo_cierre);
  }else{
    var tiempo_cierre = total_horas_cierre + 3600000;
    setTimeout(function(){ x = "0"; }, tiempo_cierre);
  }

if (localStorage.nameope != "" && localStorage.nameope != null && localStorage.nameope != undefined) {
  var y = localStorage.nameope;
}
if (localStorage.proyecto != "" && localStorage.proyecto != null && localStorage.proyecto != undefined) {
  var z = localStorage.proyecto;
}
if (localStorage.easis != "" && localStorage.easis != null && localStorage.easis != undefined) {
  var equiposasistencia = localStorage.easis;
}

  if(x == "200"){
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/getdata.php",
      data: {
        'name' : y,
        'fecha' : fecha
    },
      success: function(data) {
        if (data == "400") {
            alert("Ocurrió un error al obtener tus datos, intentarlo más tarde.");
          }
          else {
              document.getElementById("login").style.display = "none";
              document.getElementById("foto_evidencia").style.display = "none";
              document.getElementById("pantalla_alta").style.display = "none";
              document.getElementById("asistencia").style.display = "none";
              document.getElementById("operacion").style.display = "none";
              var obj = JSON.parse(data);
              if (obj.photo2 == '404' && localStorage.yaasis == "si") {
                let text = "Parece que no se subió tu asistencia correctamente, deseas intentar volver a subirla?";
                  if (confirm(text) == true) {
                    subirFotoCache();
                  } else {
                    alert("Estará en caché para cuando gustes subirla");
                  }
              }
              $("#profile_photo").attr("src",obj.photo);
              $("#nameop").html(obj.name);
              $("#fotoLocal").attr("src",obj.photo2);
              $("#fotoLocal2").attr("src",obj.photo3);
              $("#proyecto").html(z);
              //$("#tpedidos").html(obj.tpedidos);
              //$("#pedidosa").html(obj.epedidos);
              $("#tiendas option[value='"+localStorage.tcache+"']").attr("selected", true);
              $("#equipos option[value='"+localStorage.tcachee+"']").attr("selected", true);
              $("#tiendasw option[value='"+localStorage.tcachew+"']").attr("selected", true);
              localStorage.name = "200";
              var image = document.getElementById('fotoLocalN');
              var imageSever = document.getElementById('fotoLocalServerN');
              image.src = localStorage.flocal3;
              imageSever.src = localStorage.flocal3;
              imageSever.style.display = "none";
              var image2 = document.getElementById('fotoLocal');
              var imageSever2 = document.getElementById('fotoLocalServer');
              image2.src = localStorage.flocal;
              imageSever2.src = localStorage.flocal;
              imageSever2.style.display = "none";
              var image3 = document.getElementById('fotoLocal2');
              var imageSever3 = document.getElementById('fotoLocalServer2');
              image3.src = localStorage.flocal2;
              imageSever3.src = localStorage.flocal2;
              imageSever3.style.display = "none";
              document.getElementById("profile").style.display = "block";
              document.getElementById("cabecera").style.display = "block";
                $("#equipos").attr("disabled", false);
                $("#tiendas").attr("disabled", false);
                $("#tiendasw").attr("disabled", false);
              if (z == 'Walmart') {
                document.getElementById("tiendas").style.display = "none";
                document.getElementById("btn_picker").style.display = "none";
                document.getElementById("tiendasw").style.display = "inline-block";
                document.getElementById("btn_ijornada").style.display = "none";
                document.getElementById("btn_fjornada").style.display = "none";
              }
              if (z == 'Chedrahui') {
                document.getElementById("tiendasw").style.display = "none";
                document.getElementById("tiendas").style.display = "inline-block";
                document.getElementById("btn_ijornada").style.display = "none";
                document.getElementById("btn_fjornada").style.display = "none";
              }
              if (z == 'Liverpool') {
                document.getElementById("tiendas").style.display = "none";
                document.getElementById("btn_picker").style.display = "none";
                document.getElementById("btn_repartidor").style.display = "none";
                document.getElementById("tiendasw").style.display = "none";
                document.getElementById("btn_ijornada").style.display = "inline-block";
                document.getElementById("btn_fjornada").style.display = "inline-block";
              }
          }    
    },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
  }
  else {
    $("#profile").hide();
    $("#login").show();
    document.getElementById("asistencia").style.display = "none";
    document.getElementById("operacion").style.display = "none";
    document.getElementById("pantalla_alta").style.display = "none";
    localStorage.name = "0";
  }

$("#Btn_login").click(function() {
    if ($('#user_pwd').val() == "" || $('#user_login').val() == "") {
      alert("Por favor rellena todos los campos.");
      return;
    }
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/check_login_aopackV2.php",
      data: {
        'user' : $('#user_login').val(),
        'password' : $('#user_pwd').val(),
        'date' : fecha,
        'hour' : hora
    },
      success: function(data) {
        if (data == "300") {
          alert("Estás dado de baja temporalmente, contacta a tu coordinador.");
        }
        else {
        var obj = JSON.parse(data);
        if (obj.name == null) {
            alert("No existe el número de empleado ingresado o no estás dado de alta.");
          }
          else {
            var obj = JSON.parse(data);
            localStorage.name = "200";
            localStorage.nameope = obj.name;
            localStorage.proyecto = obj.proyecto;
            document.getElementById("login").style.display = "none";
            document.getElementById("profile").style.display = "block";
            document.getElementById("cabecera").style.display = "block";
            document.getElementById("foto_evidencia").style.display = "none";
            document.getElementById("pantalla_alta").style.display = "none";
            $("#profile_photo").attr("src",obj.photo);
            $("#nameop").html(obj.name);
            $("#fotoLocal").attr("src",obj.photo2);
            $("#fotoLocal2").attr("src",obj.photo3);
            $("#tpedidos").html(obj.tpedidos);
            $("#pedidosa").html(obj.epedidos);
            $("#proyecto").html(obj.proyecto);
            if (obj.proyecto == 'Walmart') {
              document.getElementById("tiendas").style.display = "none";
              document.getElementById("btn_picker").style.display = "none";
              document.getElementById("tiendasw").style.display = "inline-block";
              document.getElementById("btn_ijornada").style.display = "none";
              document.getElementById("btn_fjornada").style.display = "none";
            }
            if (obj.proyecto == 'Chedrahui') {
              document.getElementById("tiendasw").style.display = "none";
              document.getElementById("tiendas").style.display = "inline-block";
              document.getElementById("btn_ijornada").style.display = "none";
              document.getElementById("btn_fjornada").style.display = "none";
            }
            if (obj.proyecto == 'Liverpool') {
              document.getElementById("tiendas").style.display = "none";
              document.getElementById("btn_picker").style.display = "none";
              document.getElementById("btn_repartidor").style.display = "none";
              document.getElementById("tiendasw").style.display = "none";
              document.getElementById("btn_ijornada").style.display = "inline-block";
              document.getElementById("btn_fjornada").style.display = "inline-block";
            }
          

          }   
        } 
    },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
  });

  $("#verificar").click(function() {
      
    var sel = document.getElementById("Select");
    var folio = sel.options[sel.selectedIndex].text;

      if (folio != "") {

        $.ajax({
            type: 'post',
            url: "https://aopack.mx/check-folio.php",
            data: {
              'folio' : folio,
          },
            success: function(data) {
              if (data == "400") {
                  alert("No existe el folio ingresado.");
                }
                else {
                  var obj = JSON.parse(data);
                  $("#nameregistro").html(obj.name);
                  $("#fregistro").html(obj.fecha);
                  $("#hregistro").html(obj.hora);
                  $("#tregistro").html(obj.tienda);
                  $("#foregistro").html(obj.folio);
                }    
          },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                }
            });
          
      }
      else{
          alert("Escribe un número de folio.");
      }
  });
var $statusp = "En envío";
var $status;
var $consigna;
var $statusc;
var $borrartr;
  $("#subir_foto").click(function() {
    
    
  var proyecto = document.getElementById('proyecto').innerHTML;
  if (proyecto == "Walmart") {
    var sel = document.getElementById("tiendasw");
    var tienda = sel.options[sel.selectedIndex].text; 
  }
  else {
    var sel = document.getElementById("tiendas");
    var tienda = sel.options[sel.selectedIndex].text; 
  }
  var sel2 = document.getElementById("equipos");
  var equipo = sel2.options[sel2.selectedIndex].text;
  
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();

    $.ajax({
        type: 'post',
        url: "https://aopack.mx/pedido_completo3.php",
        data: {
          'tienda' : tienda,
          'fecha' : fecha,
          'equipo' : equipo
      },
        success: function(data) {
          if (data == "400") {
              alert("No hay pedidos registrados el día de hoy!");
            }
            else {
                var obj = JSON.parse(data);
            //$("#tablache tr").remove();
            $("#tbodyid").empty();
            for (i in obj) {
              var nuevoTr = "<tr style='height:60px;'><td class='numeroc' scope='row' data-toggle='modal' data-target='#myModal'>" + obj[i].id + "</td>"+"<td class='statuspara'><label class='statuspedido'>" + obj[i].status + "</label></td><td class='boton5'><img src='https://img.icons8.com/office/16/000000/old-time-camera.png'/></td><td class='cbf'><input type='checkbox' class='cbf2' name='validation' id='validation'></td></tr>";
              $("#tablache tbody").append(nuevoTr);
              $statusc = obj[i].status;
               }
               $("#tablache").show();

               $(".boton5").click(function() {
                var validarstatus = $(this).parents("tr").find(".statuspedido").text();

                var valores = "";

                if (validarstatus == "Entregado") {
                $(this).parents("tr").find(".numeroc").each(function() {
                  valores += $(this).html();
                  $consigna2 = valores;
                });
                
                $checkboxfinal = $(this).closest("tr").find(".cbf").find(".cbf2");
                $stenv = $(this).closest("tr").find(".statuspedido");                
                }
                else {
                  alert("Aún no concilias éste pedido.");
                }
                
                cameraTakePicture();    
              });
          
          function cameraTakePicture() { 
             navigator.camera.getPicture(onSuccess, onFail, {  
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL 
             });
             
             function onSuccess(imageData) {
                var image = document.getElementById('myImage'); 
                image.src = "data:image/jpeg;base64," + imageData; 
                var hoy = new Date();
                var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                var proyecto = document.getElementById('proyecto').innerHTML;
                if (proyecto == "Walmart") {
                  var sel = document.getElementById("tiendasw");
                  var tienda = sel.options[sel.selectedIndex].text; 
                }
                else {
                  var sel = document.getElementById("tiendas");
                  var tienda = sel.options[sel.selectedIndex].text; 
                }
                var nombre_operador = document.getElementById('nameop').innerHTML;
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/ticket_2.php",
                  data: {
                  'fecha' : fecha,
                  'hora' : hora,
                  'tienda' : tienda,
                  'nameop' : nombre_operador,
                  'base64image' : imageData,
                  'consigna' : $consigna2,
                  'proyecto': proyecto
              },
                  success: function(data) {
                  if (data == "200 Ok") {
                      alert("Se registró el ticket exitosamente.");
                      $checkboxfinal.attr("checked", true);
                      $borrartr.remove();
                  }
                  if (data == "400") {
                      alert("Error al registrar el ticket.");
                      $checkboxfinal[0].checked = false;
                  }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
             }  
             
             function onFail(message) { 
                alert('Failed because: ' + message); 
             } 
          }

               $(".numeroc").click(function() {
                var valores = "";

                $borrartr = $(this).parents("tr");
  
                $status = $(this).parents("tr").find(".statuspedido");
                
                  $(this).parents("tr").find(".numeroc").each(function() {
                    valores += $(this).html();
                    $consigna = valores;
                  });
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/get_direccion.php",
                  data: {
                  'consigna' : valores
              },
                  success: function(data) {
                    
                  if (data == "400") {
                      alert("No hay artículos.");
                  }
                  else{
                    $("#tbodyid2").empty();
                    $("#tbodyid3").empty();
                        var obj = JSON.parse(data);
                        //$("#tabladesc tr").remove();
                        if ($status.text() == "En envío") {
                          for (i in obj) {
                            var nuevoTr = "<tr style='height:60px;' class='data'><td>" + obj[i].id + "</td><td>" + obj[i].name + "</td>"+"<td>"+  obj[i].direccion +"</td><td>" +  obj[i].tel  +"</td><td>" + "$" + obj[i].monto  +"</td><td class='cbf'><select class='cbf2' id='cbf22'><option value='En envío'>En envío</option><option value='En ruta'>En ruta</option><option value='Entregado'>Entregado</option><option value='Cancelado'>Cancelado</option></select></td>";
                            $("#tabladesc tbody").append(nuevoTr);
                             }                          
                        }
                        if ($status.text() == "En ruta") {
                          for (i in obj) {
                            var nuevoTr = "<tr style='height:60px;' class='data'><td>" + obj[i].id + "</td><td>" + obj[i].name + "</td>"+"<td>"+  obj[i].direccion +"</td><td>" +  obj[i].tel  +"</td><td>" + "$" + obj[i].monto  +"</td><td class='cbf'><select class='cbf2' id='cbf22'><option value='En ruta'>En ruta</option><option value='Entregado'>Entregado</option><option value='Cancelado'>Cancelado</option></select></td>";
                            $("#tabladesc tbody").append(nuevoTr);
                             }                          
                        }
                        if ($status.text() == "Entregado") {
                          for (i in obj) {
                            var nuevoTr = "<tr style='height:60px;' class='data'><td>" + obj[i].id + "</td><td>" + obj[i].name + "</td>"+"<td>"+  obj[i].direccion +"</td><td>" +  obj[i].tel  +"</td><td>" + "$" + obj[i].monto  +"</td><td class='cbf'><select class='cbf2' id='cbf22'><option value='Entregado'>Entregado</option></select></td>";
                            $("#tabladesc tbody").append(nuevoTr);
                             }                          
                        }
                           $("#tabladesc").show();
                  }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
              });
            }    
      },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });

  });

  $("#fpedido").click(function() {
    
    var sel = document.getElementById("cbf22");
    $statusp = sel.options[sel.selectedIndex].text;
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    if ($statusp == "Cancelado") {
      $.ajax({
        type: 'post',
        url: "https://aopack.mx/set_status.php",
        data: {
        'consigna' : $consigna,
        'fecha' : fecha,
        'hora' : hora,
        'status' : $statusp
      },
        success: function(data) {
        if (data == "200 Ok") {
            alert("Se canceló el pedido.");
            $status.html($statusp);
            $borrartr.remove();
        }
        if (data == "400") {
            alert("Error al guardar status.");
        }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
        return;
    }

    if ($statusp == "En ruta") {
      getlocation2();
      
	for (var i = 0; i < sel.length; i++) 
	{
		var opt = sel[i];
		if (opt.value == $status.text()) {
      var opt2 = sel[i + 1];
    }
	}

  if ($statusp == opt2.value) {
  
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/set_status.php",
      data: {
      'consigna' : $consigna,
      'fecha' : fecha,
      'hora' : hora,
      'status' : $statusp
    },
      success: function(data) {
      if (data == "200 Ok") {
          alert("Se guardó el status.");
          $status.html($statusp);
      }
      if (data == "400") {
          alert("Error al guardar status.");
      }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
    
  }
  else{
    alert("No puedes saltarte pasos");
  }
    }
    
    if ($statusp == "Entregado") {
      $.ajax({
        type: 'post',
        url: "https://aopack.mx/set_status.php",
        data: {
        'consigna' : $consigna,
        'fecha' : fecha,
        'hora' : hora,
        'kilometraje' : "0",
        'status' : $statusp
      },
        success: function(data) {
        if (data == "200 Ok") {
            alert("Se guardó el status.");
            $status.html($statusp);
            return;
        }
        if (data == "400") {
            alert("Error al guardar status.");
            return;
        }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
    }

    function getlocation3() {
      navigator.geolocation.getCurrentPosition(geolocationSuccessFin, geolocationError, options2);
    }

    function geolocationSuccessFin(position) {
      var Http = new XMLHttpRequest();
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude
        + '&key=AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E&amp;libraries=places';
    Http.open('POST', url);
    Http.send();
    Http.onreadystatechange = (e) => {
      if (Http.readyState == 4) {
        if(Http.status == 200){
                   
        lat_atomar = position.coords.latitude;
        lon_atomar = position.coords.longitude;
        var directionsServiceTmp = new google.maps.DirectionsService;
        var directionsDisplayTmp = new google.maps.DirectionsRenderer;
        localStorage.latini2 = lat_atomar;
        localStorage.latfin2 = lon_atomar;
    
        location_ini = localStorage.latini + ',' + localStorage.latfin;
        location_fin = lat_atomar + ',' + lon_atomar;
    
        directionsServiceTmp.route({
            origin: location_ini,
            destination: location_fin,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                // Aqui con el response podemos acceder a la distancia como texto 
                var kilometraje = response.routes[0].legs[0].distance.text;
                if (kilometraje == "1 m") {
                  var km = prompt("Se detectó mal el kilometraje, por favor ingrésalo", "");
                  km = parseFloat(km).toFixed(1);
                  kilometraje = km.toString();
                  kilometraje = kilometraje + " km";
                }
                  for (var i = 0; i < sel.length; i++) 
                  {
                    var opt = sel[i];
                    if (opt.value == $status.text()) {
                      var opt2 = sel[i + 1];
                    }
                  }

                if ($statusp == opt2.value) {
  
                  $.ajax({
                    type: 'post',
                    url: "https://aopack.mx/set_status.php",
                    data: {
                    'consigna' : $consigna,
                    'fecha' : fecha,
                    'hora' : hora,
                    'kilometraje' : kilometraje,
                    'status' : $statusp
                  },
                    success: function(data) {
                    if (data == "200 Ok") {
                        alert("Se guardó el status.");
                        $status.html($statusp);
                        return;
                    }
                    if (data == "400") {
                        alert("Error al guardar status.");
                        return;
                    }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                        }
                    });
                  
                }
                else{
                  alert("No puedes saltarte pasos");
                }
    
                directionsDisplayTmp.setDirections(response);
                return;
            }
        });
      }
        else{
         dump("Error durante la carga de la página.");
        }
     }
    }
    }
	 
    });


  $("#regresar").click(function() {

    $("#login").hide();
    $("#profile").show();
    $("#foto_evidencia").hide();
    $("#pedidos").hide();

  });


  $("#regresar2").click(function() {

    $("#login").hide();
    $("#profile").show();
    $("#foto_evidencia").hide();
    $("#pedidos").hide();

  });

  $("#closeSession").click(function() {

    $("#login").show();
    $("#profile").hide();
    $("#profile2").hide();
    $("#foto_evidencia").hide();
    $("#pedidos").hide();
    $("#cabecera").hide();
    $("#alta").hide();
    localStorage.name = "";
    localStorage.tiendacache = "";
    var proyecto = document.getElementById('proyecto').innerHTML;
    if (proyecto == 'Walmart') {
      var sel = document.getElementById("tiendasw");
      var tienda = sel.options[sel.selectedIndex].text;
    } else {
      var sel = document.getElementById("tiendas");
      var tienda = sel.options[sel.selectedIndex].text;
    }
    var sel2 = document.getElementById("equipos");
    var equipo = sel2.options[sel2.selectedIndex].text;
    
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/liberar_equipo.php",
      data: {
      'tienda' : tienda,
      'equipo' : equipo,
  },
      success: function(data) {
      if (data == "200") {
          alert("Se liberó el equipo en el que estabas.");
          localStorage.easis = "no";
          $(sel2).prop("disabled", false);
          $(sel).prop("disabled", false);
      }
      if (data == "400") {
          alert("No se liberó el equipo en el que estabas.");
      }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
      
  });

  $("#closeSession2").click(function() {

    $("#login").show();
    $("#profile").hide();
    $("#profile2").hide();
    $("#foto_evidencia").hide();
    $("#pedidos").hide();
    localStorage.tiendacache = "";
    localStorage.name = "";
      
  });

  $("#lock_team").click(function() {
    var proyecto = document.getElementById('proyecto').innerHTML;
    if (proyecto == 'Walmart') {
      var sel = document.getElementById("tiendasw");
      var tienda = sel.options[sel.selectedIndex].text;
    } else {
      var sel = document.getElementById("tiendas");
      var tienda = sel.options[sel.selectedIndex].text;
    }
    var sel2 = document.getElementById("equipos");
    var equipo = sel2.options[sel2.selectedIndex].text;
    var nombre_operador = document.getElementById('nameop').innerHTML;
    
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/lock_team.php",
      data: {
      'nameop' : nombre_operador,
      'tienda' : tienda,
      'equipo' : equipo
  },
      success: function(data) {
      if (data == "200") {
          alert("Se bloqueó el equipo.");
          $(sel2).prop("disabled", true);
          $(sel).prop("disabled", true);
          localStorage.easis = "si";
      }
      if (data == "400") {
          alert("No se bloqueó el equipo en el que estabas.");
      }
      if (data == "300") {
          alert("Éste equipo ya está registrado, por favor selecciona uno diferente.");
      }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
  });

});

function onSuccess1(imageURI) {
  var direccion_registro = document.getElementById('ubi').innerHTML;
    var image = document.getElementById('fotoLocal');
    var imageSever = document.getElementById('fotoLocalServer');
    image.src = "data:image/jpeg;base64," + imageURI;
    imageSever.src = "data:image/jpeg;base64," + imageURI;
    imageSever.style.display = "none";
    localStorage.flocal = "data:image/jpeg;base64," +  imageURI;
    var sel2 = document.getElementById("equipos");
    var equipo = sel2.options[sel2.selectedIndex].text;
    var hoy = new Date();
    var nombre_operador = document.getElementById('nameop').innerHTML;
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var proyecto = document.getElementById('proyecto').innerHTML;
    if (proyecto == 'Walmart') {
      var sel = document.getElementById("tiendasw");
      var tienda = sel.options[sel.selectedIndex].text;
    } else {
      var sel = document.getElementById("tiendas");
      var tienda = sel.options[sel.selectedIndex].text;
    }
    //var base64image = $('#fotoLocal').attr('src');
    //var dataURL = imgToBase64(base64image);
    
    var marca = device.manufacturer;
    var version = device.version;
    var plataforma = device.platform;
    var modelo = device.model;
    var telefono = "Plataforma: " + plataforma + " Marca: " + marca + " Modelo: " + modelo + " Version: " + version;
    localStorage.nameop = nombre_operador;
    localStorage.fecha = fecha;
    localStorage.hora = hora;
    localStorage.base64image = imageURI;
    localStorage.type = "entrada";
    localStorage.tienda = tienda;
    localStorage.proyecto = proyecto;
    localStorage.equipo = equipo;
    localStorage.ubicacion = direccion_registro;
    localStorage.hora2 = horanueva;
    localStorage.telefono = telefono;
    localStorage.yaasis = "si";
    
    $.ajax({
        type: 'post',
        url: "https://aopack.mx/asistencia_junio_2022.php",
        data: {
        'nameop' : nombre_operador,
        'fecha' : fecha,
        'hora' : hora,
        'base64image' : imageURI,
        'type' : "entrada",
        'tienda' : tienda,
        'proyecto' : proyecto,
        'equipo' : equipo,
        'ubicacion' : direccion_registro,
        'hora2' : horanueva,
        'telefono': telefono
    },
        success: function(data) {
        if (data == "200 Ok") {
            alert("Se registró la asistencia exitosamente.");
        }
        if (data == "400") {
            alert("Error al registrar la asistencia.");
        }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
}


function subirFotoCache() {
    
    $.ajax({
        type: 'post',
        url: "https://aopack.mx/asistencia_junio_2022.php",
        data: {
        'nameop' : localStorage.nameop,
        'fecha' : localStorage.fecha,
        'hora' : localStorage.hora,
        'base64image' : localStorage.imageURI,
        'type' : "entrada",
        'tienda' : localStorage.tienda,
        'proyecto' : localStorage.proyecto,
        'equipo' : localStorage.equipo,
        'ubicacion' : localStorage.direccion_registro,
        'hora2' : localStorage.horanueva,
        'telefono': localStorage.telefono
    },
        success: function(data) {
        if (data == "200 Ok") {
            alert("Se registró la asistencia exitosamente.");
        }
        if (data == "400") {
            alert("Error al registrar la asistencia.");
        }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
}


function onSuccessNosotros(imageURI) {
  var direccion_registro = document.getElementById('ubi').innerHTML;
    var image = document.getElementById('fotoLocalN');
    var imageSever = document.getElementById('fotoLocalServerN');
    image.src = "data:image/jpeg;base64," + imageURI;
    imageSever.src = "data:image/jpeg;base64," + imageURI;
    imageSever.style.display = "none";
    localStorage.flocal3 = "data:image/jpeg;base64," +  imageURI;
    var sel2 = document.getElementById("equipos");
    var equipo = sel2.options[sel2.selectedIndex].text;
    var hoy = new Date();
    var nombre_operador = document.getElementById('nameop').innerHTML;
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var proyecto = document.getElementById('proyecto').innerHTML;
    if (proyecto == 'Walmart') {
      var sel = document.getElementById("tiendasw");
      var tienda = sel.options[sel.selectedIndex].text;
    } else {
      var sel = document.getElementById("tiendas");
      var tienda = sel.options[sel.selectedIndex].text;
    }
    //var base64image = $('#fotoLocal').attr('src');
    //var dataURL = imgToBase64(base64image);
    
    var marca = device.manufacturer;
    var version = device.version;
    var plataforma = device.platform;
    var modelo = device.model;
    var telefono = "Plataforma: " + plataforma + " Marca: " + marca + " Modelo: " + modelo + " Version: " + version;
    
    $.ajax({
        type: 'post',
        url: "https://aopack.mx/asistencia_nosotros.php",
        data: {
        'nameop' : nombre_operador,
        'fecha' : fecha,
        'hora' : hora,
        'base64image' : imageURI,
        'type' : "entrada",
        'tienda' : tienda,
        'proyecto' : proyecto,
        'equipo' : equipo,
        'ubicacion' : direccion_registro,
        'hora2' : horanueva,
        'telefono': telefono
    },
        success: function(data) {
        if (data == "200 Ok") {
            alert("Se registró la llegada exitosamente.");
        }
        if (data == "403") {
            alert("Han pasado 10 o más minutos desde el registro de asistencia, ya no puedes registrar esta foto.");
        }
        if (data == "400") {
            alert("Error al registrar la llegada.");
        }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
}


function hacerFoto(){
  var hoy = new Date();
  horanueva = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  navigator.camera.getPicture(onSuccess1, onFail1, {  
    quality: 50, 
    destinationType: Camera.DestinationType.DATA_URL 
 });
}


function hacerFotoNosotros(){
  var hoy = new Date();
  horanueva = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  getlocation();
  navigator.camera.getPicture(onSuccessNosotros, onFail1, {  
    quality: 50, 
    destinationType: Camera.DestinationType.DATA_URL 
 });
}

function onSuccess2(imageURI) {
  var direccion_registro = document.getElementById('ubi').innerHTML;
  var image = document.getElementById('fotoLocal2');
  var imageSever = document.getElementById('fotoLocalServer2');
  image.src = "data:image/jpeg;base64," + imageURI;
  imageSever.src = "data:image/jpeg;base64," + imageURI;
  imageSever.style.display = "none";
  localStorage.flocal2 = "data:image/jpeg;base64," +  imageURI;
  var sel2 = document.getElementById("equipos");
  var equipo = sel2.options[sel2.selectedIndex].text;
  var hoy = new Date();
  var nombre_operador = document.getElementById('nameop').innerHTML;
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var proyecto = document.getElementById('proyecto').innerHTML;
  if (proyecto == 'Walmart') {
    var sel = document.getElementById("tiendasw");
    var tienda = sel.options[sel.selectedIndex].text;
  } else {
    var sel = document.getElementById("tiendas");
    var tienda = sel.options[sel.selectedIndex].text;
  }
  var marca = device.manufacturer;
  var version = device.version;
  var plataforma = device.platform;
  var modelo = device.model;
  var telefono = "Plataforma: " + plataforma + " Marca: " + marca + " Modelo: " + modelo + " Version: " + version;
  
  $.ajax({
      type: 'post',
      url: "https://aopack.mx/asistencia_junio_2022.php",
      data: {
      'nameop' : nombre_operador,
      'fecha' : fecha,
      'hora' : hora,
      'base64image' : imageURI,
      'type' : "salida",
      'tienda' : tienda,
      'proyecto' : proyecto,
      'equipo' : equipo,
      'telefono' : telefono,
      'ubicacion' : direccion_registro
  },
      success: function(data) {
      if (data == "200 Ok") {
          alert("Se registró la bitácora exitosamente.");
      }
      if (data == "400") {
          alert("Error al registrar la bitácora.");
      }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
}


function hacerFoto2(){
  getlocation();
  navigator.camera.getPicture(onSuccess2, onFail2, {  
    quality: 50, 
    destinationType: Camera.DestinationType.DATA_URL 
 });
}

function hacerFoto3(){
    navigator.camera.getPicture(onSuccess3, onFail3, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}

function hacerFoto4(){
  navigator.camera.getPicture(onSuccess4, onFail4, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}


var options2 = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function onSuccess4(imageURI) {
  var imageSever = document.getElementById('fotoLocalServer4');
  imageSever.src = imageURI;
  imageSever.style.display = "none";

  var txt;
    var person = prompt("Por favor, ingresa el monto de la MTR:", "0.00");
    if (person == null || person == "" || person.length < 2) {
        txt = "";
    } else {
        txt = person;
    }
    
    var hoy = new Date();
    var nombre_operador = document.getElementById('nameop').innerHTML;
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var sel = document.getElementById("tiendasw");
    var tienda = sel.options[sel.selectedIndex].text;
    var fas = document.getElementById("fases");
    var fase = fas.options[fas.selectedIndex].text;
    var direccion_registro = document.getElementById('ubi').innerHTML;
    var costo = txt;
    if (tienda == "Coacalco") {
      var sel1 = document.getElementById('tiendas_c');
    }
    if (tienda == "Ecatepec") {
      var sel1 = document.getElementById('tiendas_e');
    }
    if (tienda == "Texcoco") {
      var sel1 = document.getElementById('tiendas_t');
    }
    if (tienda == "Horizonte") {
      var sel1 = document.getElementById('tiendas_h');
    }
    if (tienda == "Oriente") {
      var sel1 = document.getElementById('tiendas_o');
    }
    var tienda2 = sel1.options[sel1.selectedIndex].text;
    var no_evidencia = document.getElementById('consigna').value;

        if(no_evidencia == ""){
            alert("Ingrese un número de MTR válido.");
        }
        else {

            $.ajax({
                type: 'post',
                url: "https://aopack.mx/evidences_w2.php",
                data: {
                'nameop' : nombre_operador,
                'fecha' : fecha,
                'hora' : hora,
                'noevidencia' : no_evidencia,
                'tienda' : tienda2,
                'firma' : "no",
                'proyecto' : "walmart",
                'monto' : costo,
                'fase' : fase,
                'ubicacion' : direccion_registro
            },
                success: function(data) {
                if (data == "200 Ok") {
                    alert("Se registró la MTR exitosamente.");
                }
                if (data == "400") {
                    alert("Error al registrar la evidencia.");
                }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                    }
                });
        }
}

function onSuccess3(imageURI) {
    var image = document.getElementById('fotoLocal3');
    var imageSever = document.getElementById('fotoLocalServer3');
    image.src = imageURI;
    imageSever.src = imageURI;
    imageSever.style.display = "none";
}

function onFail1(message) {
    alert('Failed because: ' + message);
}

function onFail2(message) {
    alert('Failed because: ' + message);
}

function onFail3(message) {
    alert('Failed because: ' + message);
}
function onFail4(message) {
  alert('Failed because: ' + message);
}

function imgToBase64(base64image) {
    const canvas = document.createElement('canvas');
    var img2 = document.getElementById('fotoLocalServer');
    const ctx = canvas.getContext('2d');
    img2.src = base64image;

    var imgWidth = img2.naturalWidth;
  var screenWidth  = 1200;
  var scaleX = 1;
  if (imgWidth > screenWidth)
      scaleX = screenWidth/imgWidth;
  var imgHeight = img2.naturalHeight;
  var screenHeight = 1200;
  var scaleY = 1;
  if (imgHeight > screenHeight)
      scaleY = screenHeight/imgHeight;
  var scale = scaleY;
  if(scaleX < scaleY)
      scale = scaleX;
  if(scale < 1){
      imgHeight = imgHeight*scale;
      imgWidth = imgWidth*scale;          
  }

  canvas.height = imgHeight;
  canvas.width = imgWidth;
  
  
    ctx.drawImage(img2,  0, 0, img2.naturalWidth, img2.naturalHeight, 0,0, imgWidth, imgHeight);
  
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  function imgToBase642(base64image) {
    const canvas = document.createElement('canvas');
    var img2 = document.getElementById('fotoLocalServer2');
    const ctx = canvas.getContext('2d');
    img2.src = base64image;

    var imgWidth = img2.naturalWidth;
  var screenWidth  = 700;
  var scaleX = 1;
  if (imgWidth > screenWidth)
      scaleX = screenWidth/imgWidth;
  var imgHeight = img2.naturalHeight;
  var screenHeight = 700;
  var scaleY = 1;
  if (imgHeight > screenHeight)
      scaleY = screenHeight/imgHeight;
  var scale = scaleY;
  if(scaleX < scaleY)
      scale = scaleX;
  if(scale < 1){
      imgHeight = imgHeight*scale;
      imgWidth = imgWidth*scale;          
  }

  canvas.height = imgHeight;
  canvas.width = imgWidth;
    
    ctx.drawImage(img2,  0, 0, img2.naturalWidth, img2.naturalHeight, 0,0, imgWidth, imgHeight);
  
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  function imgToBase643(base64image) {
    const canvas = document.createElement('canvas');
    var img2 = document.getElementById('fotoLocalServer3');
    const ctx = canvas.getContext('2d');
    img2.src = base64image;

    var imgWidth = img2.naturalWidth;
  var screenWidth  = 700;
  var scaleX = 1;
  if (imgWidth > screenWidth)
      scaleX = screenWidth/imgWidth;
  var imgHeight = img2.naturalHeight;
  var screenHeight = 700;
  var scaleY = 1;
  if (imgHeight > screenHeight)
      scaleY = screenHeight/imgHeight;
  var scale = scaleY;
  if(scaleX < scaleY)
      scale = scaleX;
  if(scale < 1){
      imgHeight = imgHeight*scale;
      imgWidth = imgWidth*scale;          
  }

  canvas.height = imgHeight;
  canvas.width = imgWidth;
  
  
    ctx.drawImage(img2,  0, 0, img2.naturalWidth, img2.naturalHeight, 0,0, imgWidth, imgHeight);
  
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }



function uploadSuccess(r) {
    alert("Se ha registrado tu asistencia exitosamente.");
}

function uploadFail(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}

function uploadSuccess2(r) {
    alert("Se ha registrado tu bitácora exitosamente.");
}

function uploadFail2(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}

function uploadSuccess3(r) {
    alert("Se ha registrado tu evidencia exitosamente.");
}

function uploadFail3(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}

function escanearCodigo() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100, correctOrientation: true });
}

function onSuccess(imageData) {
    textocr.recText(0, imageData, onSuccess, onFail);
    function onSuccess(recognizedText) {
        var element = document.getElementById('pp'); 
        var str = JSON.stringify(recognizedText.blocks.blocktext);//.replace(/[_\s]/g, '').replace(/['"]+/g, '').replace('-', '');
        //var str2 = str.replace(/\d{15,}/g, "");
        var patt1 = /(a|b)\d{8,9}/g;
        var result = str.match(patt1);
        element.value = result;
    }
    function onFail(message) {
          alert('Failed because: ' + message);
    }
}
function onFail(message) {
    alert('Failed because: ' + message);
}

$("#Btn_evidencia").click(function() {
  hacerFoto4();
  }); 

  function cacheTienda() {
    var tiendacache = $("#tiendas").val();
    localStorage.tcache = tiendacache;
  }
  function cacheEquipo() {
    var tiendacachee = $("#equipos").val();
    localStorage.tcachee = tiendacachee;
  }
  function cacheTiendaW() {
    var tiendacachew = $("#tiendasw").val();
    localStorage.tcachew = tiendacachew;
    
    if (tiendacachew == "Coacalco") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "inline-block";
      document.getElementById('tiendas_t').style.display = "none";
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "none";
    }
    if (tiendacachew == "Ecatepec") {
      document.getElementById('tiendas_e').style.display = "inline-block";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "none"; 
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "none";     
    }
    if (tiendacachew == "Texcoco") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "inline-block";   
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "none";   
    }
    if (tiendacachew == "Horizonte") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "none";  
      document.getElementById('tiendas_h').style.display = "inline-block";
      document.getElementById('tiendas_o').style.display = "none";    
    }
    if (tiendacachew == "Oriente") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "none"; 
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "inline-block";     
    }
  }
  function cacheTienda4() {
    var tiendacachef = $("#fases").val();
    localStorage.tcachef = tiendacachef;
  }

  function cacheTienda2() {

    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var sel = document.getElementById("tiendas2");
    var tienda= sel.options[sel.selectedIndex].text;
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/coordinador.php",
      data: {
      'fecha' : fecha,
      'tienda' : tienda
  },
      success: function(data) {
        
      var obj = JSON.parse(data);
      var etiquetas = [];
      var datos = [];
      var caro = 0;
      for (i in obj) {
        etiquetas2 = etiquetas.push(obj[caro].id);
        datos2 = datos.push(obj[caro].no_evidencia);
        caro = caro + 1;
      }
      
        let myCanvas = document.getElementById("myCanvas").getContext("2d");

        var chart = new Chart(myCanvas, {
            type:"bar",
            data: {
                labels:etiquetas,
                datasets:[
                    {
                        label:"Gráfica de operadores por tienda",
                        backgroundColor: "rgb(0,0,0)",
                        borderColor:"rgb(0,255,0)",
                        data:datos
                    }
                ]
            }
        })
          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
  }

  function getPedidos() {

    $("#login").hide();
    $("#profile").hide();
    $("#foto_evidencia").hide();
    $("#pedidos").show();

    var hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
    var nombre_operador = document.getElementById('nameop').innerHTML;

    var day = hoy.getDay(), diff = hoy.getDate() - day + (day == 0 ? -6:1);
    hoy2 = new Date(hoy.setDate(diff));
    var fecha2 = hoy2.getFullYear() + '-' + ( hoy2.getMonth() + 1 ) + '-' + hoy2.getDate();


    $.ajax({
      type: 'post',
      url: "https://aopack.mx/pedidos.php",
      data: {
      'fecha2' : fecha2,
      'fecha' : fecha,
      'name' : nombre_operador
  },
      success: function(data) {
        
      var obj = JSON.parse(data);
      
      var element = document.getElementById('tpedidosdiv'); 
      element.innerHTML = obj[0].a;
      var element2 = document.getElementById('tpedidosediv'); 
      element2.innerHTML = obj[0].b;
      var element3 = document.getElementById('tpedidosdivcosto'); 
      element3.innerHTML = obj[0].c;
      var element4 = document.getElementById('tpedidoesdivcosto'); 
      element4.innerHTML = obj[0].d;
      var element5 = document.getElementById('totaldiv'); 
      element5.innerHTML = obj[0].e;

      var element6 = document.getElementById('tpedidosdivs'); 
      element6.innerHTML = obj[0].aa;
      var element7 = document.getElementById('tpedidosedivs'); 
      element7.innerHTML = obj[0].bb;
      var element8 = document.getElementById('tpedidosdivcostos'); 
      element8.innerHTML = obj[0].cc;
      var element9 = document.getElementById('tpedidoesdivcostos'); 
      element9.innerHTML = obj[0].dd;
      var element11 = document.getElementById('totaldivs'); 
      element11.innerHTML = obj[0].ee;

          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
    
  }



function showAsist() {
    var profile = document.getElementById("profile");
    var operacion = document.getElementById("operacion");
    var asistencia = document.getElementById("asistencia");
    var productividad = document.getElementById("productividad");
    document.getElementById("pantalla_alta").style.display = "none";
    operacion.style.display = "none";
    profile.style.display = "none";
    asistencia.style.display = "block";
    productividad.style.display = "none";
    getlocation();
}

function regresar() {
  var profile = document.getElementById("profile");
  var operacion = document.getElementById("operacion");
  var asistencia = document.getElementById("asistencia");
  var productividad = document.getElementById("productividad");
  document.getElementById("pantalla_alta").style.display = "none";
  operacion.style.display = "none";
  profile.style.display = "block";
  asistencia.style.display = "none";
  productividad.style.display = "none";
}

function showOp() {
  
  var profile = document.getElementById("profile");
  var operacion = document.getElementById("operacion");
  var asistencia = document.getElementById("asistencia");
  var productividad = document.getElementById("productividad");
  document.getElementById("pantalla_alta").style.display = "none";
  var proyecto = document.getElementById('proyecto').innerHTML;
  operacion.style.display = "block";
  profile.style.display = "none";
  asistencia.style.display = "none";
  productividad.style.display = "none";
  if (proyecto == 'Walmart') {    
    var sel = document.getElementById("tiendasw");
    var tienda= sel.options[sel.selectedIndex].text;
    if (tienda == "Coacalco") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "inline-block";
      document.getElementById('tiendas_t').style.display = "none";
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "none";
    }
    if (tienda == "Ecatepec") {
      document.getElementById('tiendas_e').style.display = "inline-block";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "none"; 
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "none";     
    }
    if (tienda == "Texcoco") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "inline-block";   
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "none";   
    }
    if (tienda == "Horizonte") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "none";  
      document.getElementById('tiendas_h').style.display = "inline-block";
      document.getElementById('tiendas_o').style.display = "none";    
    }
    if (tienda == "Oriente") {
      document.getElementById('tiendas_e').style.display = "none";
      document.getElementById('tiendas_c').style.display = "none";
      document.getElementById('tiendas_t').style.display = "none"; 
      document.getElementById('tiendas_h').style.display = "none";
      document.getElementById('tiendas_o').style.display = "inline-block";     
    }
  }
  getLPLiv();
}

function showProd() {
  var profile = document.getElementById("profile");
  var operacion = document.getElementById("operacion");
  var asistencia = document.getElementById("asistencia");
  var productividad = document.getElementById("productividad");
  document.getElementById("pantalla_alta").style.display = "none";
  operacion.style.display = "none";
  profile.style.display = "none";
  asistencia.style.display = "none";
  productividad.style.display = "block";

  
  var nombre_operador = document.getElementById('nameop').innerHTML;
  var proyecto = document.getElementById('proyecto').innerHTML;

  
  var hoy = new Date();
  var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + (hoy.getDate() - 1);
  var nombre_operador = document.getElementById('nameop').innerHTML;

  var day = hoy.getDay(), diff = hoy.getDate() - day + (day == 0 ? -6:1);
  hoy2 = new Date(hoy.setDate(diff));
  var fecha2 = hoy2.getFullYear() + '-' + ( hoy2.getMonth() + 1 ) + '-' + hoy2.getDate();

    $.ajax({
        type: 'post',
        url: "https://aopack.mx/asignation.php",
        data: {
          'nameop' : nombre_operador,
          'proyecto' : proyecto,
          'fecha' : fecha,
          'fecha2' : fecha2
      },
        success: function(data) {
          $("#tbodyhorarios").empty();
          $("#tbodyporcentajes").empty();
          if (data == "400") {
            
            }
            else {
                var obj = JSON.parse(data);
            for (i in obj[0]) {
              var nuevoTr = "<tr style='height:60px;'>" + "<td class='idd' style='display: none'>" + obj[0][i].id + "</td>"+"<td scope='row'>" + obj[0][i].fecha + "</td>"+"<td><label>" + obj[0][i].tienda + "</label></td>" + "<td><label>" + obj[0][i].horario + "</label></td>" + "<td class='botonaceptar'><img src='https://img.icons8.com/cute-clipart/64/000000/checkmark.png'/></td><td class='botonrechazar'><img src='https://img.icons8.com/flat-round/64/000000/cancel--v1.png'/></td></tr>";
              $("#tablahorarios tbody").append(nuevoTr);
               }
               var caro = 0;
               var porcentajediario = 0;
               var largo = obj[1].length;
               var largo = parseInt(largo) - 1;
               for (i in obj[1]) {
                var nuevoTr = "<tr style='height:60px;'><td scope='row'>" + obj[1][i].fecha + "</td>"+"<td><label>" + obj[1][i].porcentajes + "%" + "</label></td></tr>";
                $("#tablaporcentajes tbody").append(nuevoTr);
                porcentajediario = porcentajediario + obj[1][caro].porcentajes;
                if(caro == largo){
                  caro = caro + 1;
                porcentajediario = porcentajediario/caro;
                }
                caro = caro + 1;
                
                 }
                document.getElementById('ptotal').innerHTML = porcentajediario + "%";
               $("#tablahorarios").show();

               $(".botonaceptar").click(function() {
                var id = $(this).parents("tr").find(".idd").text();
                var trhorarios = $(this).parents("tr");
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/actualizar.php",
                  data: {
                  'id' : id,
                  'status' : "aceptado"
              },
                  success: function(data) {
                    if (data == "200") {
                      alert("Has aceptado este horario");
                      trhorarios.remove();

                    } else {
                      alert("Ocurrió un error");
                    }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
              });
              
              $(".botonrechazar").click(function() {
                var id = $(this).parents("tr").find(".idd").text();
                var trhorarios = $(this).parents("tr");
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/actualizar.php",
                  data: {
                  'id' : id,
                  'status' : "rechazado"
              },
                  success: function(data) {
                    if (data == "200") {
                      alert("Has rechazado este horario");
                      trhorarios.remove();
                    } else {
                      alert("Ocurrió un error");
                    }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
              });

      }
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });


}

$("#btn_picker").click(function() {
  document.getElementById("tablache").style.display = "none";
  document.getElementById("subir_foto").style.display = "none";
  document.getElementById("tablache1").style.display = "block";
  document.getElementById("status").style.display = "block";
  document.getElementById("getpedidosb").style.display = "block";
  document.getElementById("lasttable").style.display = "block";
  document.getElementById("rtable").style.display = "block";
  var proyecto = document.getElementById('proyecto').innerHTML;
  if (proyecto == "Walmart") {
    document.getElementById("bdc").style.display = "none";   
    document.getElementById("bdc2").style.display = "block";  
  }
  else {
    document.getElementById("bdc").style.display = "block"; 
    document.getElementById("bdc2").style.display = "none"; 
  }
});

$("#btn_repartidor").click(function() {
  document.getElementById("tablache").style.display = "block";
  document.getElementById("subir_foto").style.display = "block";
  var proyecto = document.getElementById('proyecto').innerHTML;
  if (proyecto == "Walmart") {
    document.getElementById("bdc").style.display = "none";   
    document.getElementById("bdc2").style.display = "block";  
  }
  else {
    document.getElementById("bdc").style.display = "block"; 
    document.getElementById("bdc2").style.display = "none"; 
  }
  document.getElementById("tablache1").style.display = "none";
  document.getElementById("status").style.display = "none";
  document.getElementById("getpedidosb").style.display = "none";
  document.getElementById("lasttable").style.display = "none";
  document.getElementById("rtable").style.display = "none";
});




function cstatus() {

  var estatus = document.getElementById("status").value;

  if (estatus == "No disponible") {
    document.getElementById("status").style.backgroundColor = 'green';
    document.getElementById("status").value = "Disponible";
    alert("Se cambió tu status exitosamente");
  }
  else{
    document.getElementById("status").style.backgroundColor = 'red';
    document.getElementById("status").value = "No disponible";
    alert("Se cambió tu status exitosamente");
  }
  
}

function codeBar() {
  cordova.plugins.barcodeScanner.scan(function(result){
    //success callback
    alert(result);
    alert(JSON.stringify(result));

    },function(error){
    //error callback
    alert(JSON.stringify(error));

    });
}
var $articulosrestantes1;
var $checkbox11;
var $checkbox22;
var $checkbox33;
var $checkboxfinal1;
var $status1;
var $consigna1;
var $consigna22;
var $stenv1;
var $tienda1;
var $validacompletos1;
var $trfinal1;
var $cb333;
var $cb222;
var $borrartr22;
function getPedidos() {

  var tpzs11 = 0;
  var tpzs22 = 0;
  var tmon11 = 0;
  var tmon22 = 0;
  
var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var sel = document.getElementById("tiendas");
$tienda1 = sel.options[sel.selectedIndex].text;

  $.ajax({
    type: 'post',
    url: "https://aopack.mx/get_pedidos.php",
    data: {
      'fecha' : fecha,
      'tienda' : $tienda1
  },
    success: function(data) {
      if (data == "400") {
          alert("No hay pedidos registrados el día de hoy!");
        }
        else {
            var obj = JSON.parse(data);
            $("#tbodyid1").empty();
            for (i in obj) {
              var nuevoTr = "<tr style='height:60px;'><td>"+ obj[i].hslot + "</td><td class='numeroc1' scope='row' data-toggle='modal' data-target='#myModal1'>" + obj[i].id + "</td>"+"<td><label class='statuspedido1'>" + obj[i].status + "</label></td><td class='boton55'><img src='https://img.icons8.com/office/16/000000/old-time-camera.png'/></td><td class='cbf1'><input type='checkbox' class='cbf22' name='validation' id='validation'></td></tr>";
              $("#tablache1 tbody").append(nuevoTr);
               }
               $("#tablache1").show();

               $(".boton55").click(function() {
                var valores = "";
                var validarstatus = $(this).parents("tr").find(".statuspedido1").text();
                if (validarstatus == "Pendiente") {
                  cameraTakePicture();
                  $(this).parents("tr").find(".numeroc1").each(function() {
                    valores += $(this).html();
                    $consigna22 = valores;
                  });
                  
                  $checkboxfinal1 = $(this).closest("tr").find(".cbf1").find(".cbf22");
                  $stenv1 = $(this).closest("tr").find(".statuspedido1");
                  $trfinal1 = $(this).closest("tr");                  
                }
                else {
                  alert("Aún no surtes éste pedido.");
                }
              });
          
          function cameraTakePicture() { 
             navigator.camera.getPicture(onSuccess, onFail, {  
                quality: 50, 
                destinationType: Camera.DestinationType.DATA_URL 
             });
             
             function onSuccess(imageData) {
                $trfinal1.remove();
                var image = document.getElementById('myImage'); 
                image.src = "data:image/jpeg;base64," + imageData; 
                var tp1 = document.getElementById("totalpz1").innerHTML;
                var tm1 = document.getElementById("totalmonto1").innerHTML;
                var hoy = new Date();
                var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/ticket_1.php",
                  data: {
                  'tpiezas' : tp1,
                  'tmonto' : tm1,
                  'base64image' : imageData,
                  'fecha' : fecha,
                  'hora' : hora,
                  'consigna' : $consigna22
              },
                  success: function(data) {
                  if (data == "200 Ok") {
                      alert("Se registró el ticket exitosamente.");
                      $checkboxfinal1.attr("checked", true);
                      $stenv1.html("En envío");
                      return;
                  }
                  if (data == "400") {
                      alert("Error al registrar el ticket.");
                      $checkboxfinal1[0].checked = false;
                  }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
             }  
             
             function onFail(message) { 
                alert('Failed because: ' + message); 
             } 
          }

            $(".numeroc1").click(function() {
              var valores = "";

              $status1 = $(this).parents("tr").find(".statuspedido1");
              $borrartr22 = $(this).parents("tr");
              
                $(this).parents("tr").find(".numeroc1").each(function() {
                  valores += $(this).html();
                  $consigna1 = valores;
                });
              $.ajax({
                type: 'post',
                url: "https://aopack.mx/get_articulos.php",
                data: {
                'consigna' : valores
            },
                success: function(data) {
                  
                if (data == "400") {
                    alert("No hay artículos.");
                }
                else{
                      var obj = JSON.parse(data);
                      var namecli = document.getElementById("namecli");
                      var telcli = document.getElementById("telcli");
                      var consignacli = document.getElementById("no_consigna");
                      telcli.innerHTML = obj[0].telefono;
                      namecli.innerHTML = obj[0].cliente;
                      consignacli.innerHTML = obj[0].consigna;
                      //$("#tabladesc1 tr").remove();
                      $("#tbodyid22").empty();
                      $("#tbodyid33").empty();
                      for (i in obj) {
                        var nuevoTr = "<tr style='height:60px;' class='data'><td class='upc' style='display: none;'>" + obj[i].upc + "</td><td class='numero2' title='test'>" + obj[i].id + "</td>"+"<td class='numero15'>"+  obj[i].producto +"</td><td class='montoa'>" +  obj[i].monto  +"</td>" +"<td class='boton'><img src='https://img.icons8.com/cotton/20/000000/barcode-approve--v2.png'/></td><td class='boton2'><input type='checkbox' class='este' name='validation' id='validation'></td><td class='boton3'><input type='checkbox' class='este2' name='validation2' id='validation2'></td><td class='val'><input type='checkbox' class='val3' name='validation3' id='validation3'></td></tr>";
                        $("#tabladesc1 tbody").append(nuevoTr);
                         }
                         $("#tabladesc1").show();
                        var $primera;
                        $(".val").click(function() {
                          var $item2 = $(this).closest("tr").find(".boton2").find(".este");
                          var $item3 = $(this).closest("tr").find(".boton3").find(".este2");
                          var $actdes = $(this).closest("tr").find(".val").find(".val3");
                          $primera1 = $(this).closest("tr").find(".numero2").text();      
                          if ($primera1 != "0") {
                            $primera = $(this).closest("tr").find(".numero2").text();                            
                          }
                          var $aceros = $(this).closest("tr").find(".numero2");
                          if ($item2.prop("disabled") == true) {
                            $item2.prop("disabled", false);
                            $aceros.html($primera);
                            $actdes[0].checked = false;
                          }
                          else {
                            $item2.prop("disabled", true);
                            $aceros.html("0");
                            $actdes[0].checked = true;
                          }
                          if ($item3.prop("disabled") == true) {
                            $item3.prop("disabled", false);    
                            $aceros.html($primera);
                            $actdes[0].checked = false;                  
                          } else{
                            $item3.prop("disabled", true);
                            $aceros.html("0");
                            $actdes[0].checked = true;
                          }
                        });

                         $(".boton").click(function() {
                           
                          var $item4 = $(this).closest("tr")   // Finds the closest row <tr> 
                          .find(".upc")     // Gets a descendent with class="nr"
                          .text(); 
                          var $item = $(this).closest("tr")   // Finds the closest row <tr> 
                            .find(".numero2")     // Gets a descendent with class="nr"
                            .text(); 

                            var $item5 = $(this).closest("tr").find(".numero2"); 

                            var $item2 = $(this).closest("tr").find(".boton2").find(".este");
                            var $item3 = $(this).closest("tr").find(".montoa").text();
                            var $cb3 = $(this).closest("tr").find(".boton3").find(".este2");
                            var $cb2 = $(this).closest("tr").find(".val").find(".val3");

                            escanearb($item4, $item5, $item3, $cb2, $cb3, $item2, $item, tpzs11, tmon11);
                                                                    
                         });

                         function escanearb($item4, $item5, $item3, $cb2, $cb3, $item2, $item, tpzs11, tmon11) {
                          window.plugins.GMVBarcodeScanner.scan({}, function(err, result) {
                            if(err) alert("error");

                            if($item4 == result){
                              alert("Coincide el UPC");
                              if($item == 0){
                               alert("Artículo completo.");
                               $item2.attr("checked", true);
                               $cb3.prop("disabled", true);
                               $cb2.prop("disabled", true);
                             }
                             else {
                               var caro = parseInt($item) - 1;
                               tpzs11 = tpzs11 + 1;
                               tmon11 = tmon11 + parseFloat($item3);
                               document.getElementById("totalpz1").innerHTML = tpzs11;
                               document.getElementById("totalmonto1").innerHTML = tmon11;
                               $item5.html(caro);
                               $item = $item5.text();
                               if (caro == 0) {
                                 alert("Artículo completo.");
                                 $item2.attr("checked", true);
                                 $cb3.prop("disabled", true);
                                 $cb2.prop("disabled", true);

                               } else {
                                if (confirm('¿Desea escanear de nuevo?')) {
                                  // Save it!
                                  escanearb($item4, $item5, $item3, $cb2, $cb3, $item2, $item, tpzs11, tmon11);
                                } else {
                                  // Do nothing!
                                  alert('Has salido del scanner.');
                                }
                               }
                             } 
                          }
                          else{
                            alert("No coincide el UPC.");
                          }
                        });
                         }

                         $(".numero15").click(function() {
                          
                          var $item = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find(".upc")     // Gets a descendent with class="nr"
                       .text(); 
                       alert($item); 
                            
                          });

                         $(".boton3").click(function() {
                            $('#myModal2').modal('toggle');
                            $('#myModal2').modal('show');
                            document.getElementById("artupc").value = "";
                            document.getElementById("artname").value = "";
                            document.getElementById("cantidad").value = "";
                            document.getElementById("costo").value = "";
                            
                            $cb333 = $(this).closest("tr").find(".boton2").find(".este");
                            $cb222 = $(this).closest("tr").find(".val").find(".val3");

                            
                          $articulosrestantes1 = $(this).closest("tr")   // Finds the closest row <tr> 
                          .find(".numero2");
                          $checkbox11 = $(this).closest("tr").find(".este2");
                            });

                          
                         $("#sendart").click(function() {
                           var upc = document.getElementById("artupc").value;
                           var artname = document.getElementById("artname").value;
                           var cantidad = document.getElementById("cantidad").value;
                           var costo = document.getElementById("costo").value;
                          
                           if (cantidad > parseFloat($articulosrestantes1.text())) {
                            alert("Los artículos ingresados son más que en el pedido.");
                            $checkbox11[0].checked = true;
                            $articulosrestantes1.html("0");
                            $cb333.prop("disabled", true);
                            $cb222.prop("disabled", true);
                         }
                         else if (cantidad < parseFloat($articulosrestantes1.text())) {
                          alert("Los artículos ingresados son menos que en el pedido.");
                          var caro = parseFloat($articulosrestantes1.text()) - parseFloat(cantidad);
                          $articulosrestantes1.html(caro);
                          $checkbox11[0].checked = false;
                       }
                           else if(cantidad == parseFloat($articulosrestantes1.text())) {
                              alert("Has cubierto la cantidad total de artículos.");
                              $articulosrestantes1.html("0");
                              $checkbox11[0].checked = true;
                              $cb333.prop("disabled", true);
                              $cb222.prop("disabled", true);
                           }
                           
                    $("#myModal2").removeClass("in");
                    $("#myModal2").hide();
                           
                          $.ajax({
                            type: 'post',
                            url: "https://aopack.mx/insert_articulos.php",
                            data: {
                            'upc' : upc,
                            'artname' : artname
                        },
                            success: function(data) {
                              
                            if (data == "400") {
                                alert("No se registró correctamente.");
                            }
                            else{
                              alert("Se registró en la base de datos!");
                              var nuevoTr2 = "<tr style='height:60px;'><td class='upc2' style='display:none;'>"+upc+"</td><td class='numero2' title='test'>" + cantidad + "</td>"+"<td>"+  artname +"</td><td class='montoa2'>" +  costo  +"</td>" +"<td class='boton4'><button>F</button></td><td class='borrartodo'><button>Todo</button</td><td class='borraruno'><button>U</button</td></tr>";
                              $("#sustitutos tbody").append(nuevoTr2);
                              

                              $(".borrartodo").click(function() {
                                $(this).closest("tr").remove();              
                              });

                              $(".borraruno").click(function() {
                                var restar = $(this).closest("tr").find(".numero2");
                                var totalresta = parseFloat(restar.text()) - 1;
                                restar.html(totalresta);
                              });

                              $(".boton4").click(function() {
                           
                              var $item4 = $(this).closest("tr")   // Finds the closest row <tr> 
                              .find(".upc2")     // Gets a descendent with class="nr"
                              .text(); 
                              var $item = $(this).closest("tr")   // Finds the closest row <tr> 
                              .find(".numero2")     // Gets a descendent with class="nr"
                              .text(); 

                              var $item3 = $(this).closest("tr").find(".montoa2").text();
                               window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
                     
                                 //Handle Errors
                                 if(err) return;
                                 
                                 if($item4 == result){
                                    alert("Coincide el UPC");
                                    if($item == 0){
                                      alert("Artículo completo.");
                                    }
                                    else {
                                      var caro = parseInt($item) - 1;
                                      tpzs22 = tpzs22 + 1;
                                      tmon22 = tmon22 + parseFloat($item3);
                                      document.getElementById("totalpz2").innerHTML = tpzs22;
                                      document.getElementById("totalmonto2").innerHTML = tmon22;
                                      $(this).closest("tr").find(".numero2").html(caro);
                                      if (caro == 0) {
                                        alert("Artículo completo.");
                                      }
                                  }
                                 }
                                 else {
                                   alert("No coincide el UPC");
                                 }
                                                           
                               });
    
                             });
                             return;
                            }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                                }
                            });
                          }); 
                }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                    }
                });
            });
        }    
  },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
}

$("#fpedido2").click(function() {
  var sel = document.getElementById("tiendas");
  $tienda1 = sel.options[sel.selectedIndex].text;
  var sel2 = document.getElementById("equipos");
  var equipo = sel2.options[sel2.selectedIndex].text;
  var json2 = [];
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var tm1 = document.getElementById("totalmonto1").innerHTML;
  var validaciontotal = 0;
  var validaciontotal2 = 0;

  $("#tabladesc1 tr.data").map(function (index, elem) {
    var x = $(this);
    var cells = x.find('td');
    const datos = cells[1].textContent;
    const datos2 = cells[7].firstElementChild.checked;
    validaciontotal = parseFloat(datos) + validaciontotal;     
    if (datos2 == false) {
      validaciontotal2 = validaciontotal2 + 1;
    }      
}); 
if (validaciontotal2 == 0) {
  alert("Pedido cancelado.");
  $status1.html("Cancelado");
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/pedido_completo.php",
    data: {
    'consigna' : $consigna1,
    'monto' : tm1,
    'status' : "Cancelado",
    'productos' : json2,
    'operador' : "11111",
    'fecha' : fecha,
    'hora' : hora,
    'equipo' : equipo,
    'tienda' : $tienda1
  },
    success: function(data) {
    if (data == "200 Ok") {
        $borrartr22.remove();
    }
    if (data == "400") {
        alert("Error al registrar el pedido.");
    }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
  return;
}

if (validaciontotal == 0) {
  
  $status1.html("Pendiente");
  $("#tabladesc1 tr.data").map(function (index, elem) {
    var x = $(this);
    var cells = x.find('td');
    var json = [];
    for (let i = 0; i < cells.length; i++) {
      var obj = {};
      const datos = cells[i].textContent;
      obj[i] = datos;
      json.push(obj);
    }
    
    json2.push(json);
}); 

$("#sustitutos tr.data").map(function (index, elem) {
  var x = $(this);
  var cells = x.find('td');
  var json = [];
  for (let i = 0; i < cells.length; i++) {
    var obj = {};
    const datos = cells[i].textContent;
    obj[i] = datos;
    json.push(obj);
  }  
  json2.push(json);               
}); 
$.ajax({
  type: 'post',
  url: "https://aopack.mx/pedido_completo.php",
  data: {
  'consigna' : $consigna1,
  'monto' : tm1,
  'status' : "Pendiente",
  'productos' : json2,
  'operador' : "11111",
  'fecha' : fecha,
  'hora' : hora,
  'equipo' : equipo,
  'tienda' : $tienda1
},
  success: function(data) {
  if (data == "200 Ok") {
      alert("Se registró el pedido exitosamente.");
      $("#myModal1").hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  }
  if (data == "400") {
      alert("Error al registrar el pedido.");
  }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
      }
  });
  
}
else{
  alert("No has ingresado la cantidad total de artículos.");
  $status1.html("Por surtir");
}

  });


  $("#volvermodal").click(function() {
    $("#myModal2").removeClass("in");
    $("#myModal2").hide();
  });

  $("#myModal1").on('hidden.bs.modal', function() {
    $("#myModal1").removeClass("in");
    $("#myModal1").modal('hide');
    $('.modal-backdrop').remove();
});


function callNumber() {
  var number = document.getElementById("telcli").innerHTML;
  window.plugins.CallNumber.callNumber(onSuccess, onError, number, true);

  function onSuccess(result){
    alert("Success:"+result);
  }
   
  function onError(result) {
    alert("Error:"+result);
  }
}

function scancodebar() {
  window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
    //Handle Errors
    if(err) return;
    
    //Do something with the data.
    document.getElementById("artupc").value = result;
    
  });
}

$("#bdc").click(function() {
  document.getElementById("pp").value = "";
  document.getElementById("montonuevo").value = "";
  document.getElementById("direccionnieva").value ="";
  
});


function registroNuevo() {
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var sel = document.getElementById("tiendas");
  var tienda = sel.options[sel.selectedIndex].text;
  var nombre_operador = document.getElementById('nameop').innerHTML;
  var no_p = document.getElementById("pp").value;
  var patt1 = /(a|b)\d{8,9}/g;
  var result = no_p.match(patt1);
  if (result == null || no_p.length > 10) {
    alert("Introduce un número de consigna válido.");
    return;
  }
  var monto = document.getElementById("montonuevo").value;
  var direccion = document.getElementById("direccionnieva").value;
  if (monto == "" || direccion == "") {
    alert("Rellena todos los campos por favor.");
    return;
  }
  var sel = document.getElementById("equipos");
  var equipo = sel.options[sel.selectedIndex].text;
  var sel2 = document.getElementById("appttt");
  var hslot = sel2.options[sel2.selectedIndex].text;
  
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/registro_evidencia_nuevo3.php",
    data: {
    'consigna' : no_p,
    'hslot' : hslot,
    'fecha' : fecha,
    'hora' : hora,
    'nameop' : nombre_operador,
    'status' : "En envío",
    'tienda' : tienda,
    'monto' : monto,
    'direccion' : direccion,
    'equipo' : equipo
},
    success: function(data) {
    if (data == "200 Ok") {
        alert("Se registró el pedido exitosamente.");
    }
    if (data == "400") {
        alert("Error al registrar el pedido.");
    }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
}

function registroNuevo2() {
  a = document.getElementById("medicamentofrio");
  aa = $(a).prop("checked");
  b = document.getElementById("medicamentoseco");
  bb = $(b).prop("checked");
  c = document.getElementById("transferencia");
  cc = $(c).prop("checked");
  if (aa == false && bb == false) {
    alert("Selecciona si es medicamento frío o seco por favor.");
    return;
  }
  if (aa == true && bb == true) {
    alert("Sólo se puede seleccionar una opción.");
    return;
  }
  if (cc == true) {
    var transferencia = "si";
  } else {
    var transferencia = "no";
  }
  if (aa == true) {
    var tipomed = "frio";
  } else {
    var tipomed = "seco";
  }
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var sel3 = document.getElementById("tiendasw");
  var tienda = sel3.options[sel3.selectedIndex].text;
  var nombre_operador = document.getElementById('nameop').innerHTML;
  var no_p = document.getElementById("pp2").value;
  var no_piezas = document.getElementById("npiezas").value;
  var origen = document.getElementById("origen").value;
  var sel = document.getElementById("equipos");
  var equipo = sel.options[sel.selectedIndex].text;
  var sel2 = document.getElementById("appt2");
  var hslot = sel2.options[sel2.selectedIndex].text;
  if (tienda == "Coacalco") {
    var sel1 = document.getElementById('tiendas_c');
  }
  if (tienda == "Ecatepec") {
    var sel1 = document.getElementById('tiendas_e');
  }
  if (tienda == "Texcoco") {
    var sel1 = document.getElementById('tiendas_t');
  }
  if (tienda == "Horizonte") {
    var sel1 = document.getElementById('tiendas_h');
  }
  if (tienda == "Oriente") {
    var sel1 = document.getElementById('tiendas_o');
  }
  var tienda2 = sel1.options[sel1.selectedIndex].text;
  
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/registro_evidencia_nuevo3.php",
    data: {
    'consigna' : no_p,
    'npiezas' : no_piezas,
    'hslot' : hslot,
    'fecha' : fecha,
    'hora' : hora,
    'nameop' : nombre_operador,
    'status' : "En envío",
    'tienda' : tienda,
    'monto' : "0",
    'direccion' : tienda2,
    'equipo' : equipo,
    'transferencia' : transferencia,
    'origen' : origen,
    'tipo_med' : tipomed
},
    success: function(data) {
    if (data == "200 Ok") {
        alert("Se registró el pedido exitosamente.");
    }
    if (data == "400") {
        alert("Error al registrar el pedido.");
    }
    if (data == "500") {
        alert("El equipo ya está ocupado, favor de cambiarlo, tu MTR no se registró.");
    }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
}


  
$('#transferencia').click(function() {
  if($(this).prop("checked") == true) {
    document.getElementById("lorigen").style.display = "block";
    document.getElementById("origen").style.display = "block";
  } else {
    document.getElementById("lorigen").style.display = "none";
    document.getElementById("origen").style.display = "none";
  }
});

$("#Btn_alta").click(function() {
      
  var opcion = prompt("Introduzca su No. de usuario:", "");
 
if (opcion == null || opcion == "") {
        alert("Has cancelado o el usuario está vacío");
        } else {
          $.ajax({
            type: 'post',
            url: "https://aopack.mx/check-user-nuevo.php",
            data: {
              'user' : opcion,
          },
            success: function(data) {
              if (data == "400") {
                  alert("No existe el usuario ingresado.");
                }
                else if (data == "300") {
                  alert("Ya está dado de alta este usuario.");
                }  
                else {
                  document.getElementById("pantalla_alta").style.display = "block";
                  document.getElementById("login").style.display = "none";
                  document.getElementById("user_alta_label").innerHTML = opcion;
                }
          },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                }
            });
            }        
});

$("#Btn_guardar_alta").click(function() {
      
  var pwd1 = document.getElementById("password_alta").value;
  var pwd2 = document.getElementById("confirm_password_alta").value;
 
if (pwd1 == "" || pwd2 == "") {
        alert("No puedes poner una contraseña en blanco");
        return;
        } else {
          if (pwd1 == pwd2) {
                var user = document.getElementById("user_alta_label").innerHTML;
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/insert-user-nuevo.php",
                  data: {
                    'user' : user,
                    'password' : pwd2
                },
                  success: function(data) {
                    if (data == "400") {
                        alert("Ocurrió un error, contacta a soporte.");
                      }
                      else {
                        alert("Se registró tu nueva contraseña exitosamente.");
                        document.getElementById("pantalla_alta").style.display = "none";
                        document.getElementById("login").style.display = "block";
                      }
                },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
          }
          else {
            alert("No coinciden las contraseñas");
          }
          
            }        
});



function registroNuevoLiv() {
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var user = document.getElementById('nameop').innerHTML;
  var nouser = "";
  //var nruta = document.getElementById('nrutaliv').value;
  var tiros = document.getElementById('tpedidoslivmod').value;
  var sel = document.getElementById("equipos");
  var equipo = sel.options[sel.selectedIndex].text;
  var sel2 = document.getElementById("tiporutaliv");
  var tipo_ruta = sel2.options[sel2.selectedIndex].text;
  var sel3 = document.getElementById("tiendasl");
  var tienda = sel3.options[sel3.selectedIndex].text;

  
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/check-tiros.php",
    data: {
      'fecha' : fecha,
      'user' : user
  },
    success: function(data) {
      var r = confirm("Has ingresado " + data + " tiros, deseas continuar?");
      if (r == true) {
        if (tiros == null || tiros == "") {
          alert("Faltan datos por ingresar");
                } else {
                  $.ajax({
                    type: 'post',
                    url: "https://aopack.mx/new-tiros-liverpool.php",
                    data: {
                      'tiros' : tiros,
                      'fecha' : fecha,
                      'hora' : hora,
                      'nouser' : nouser,
                      'nruta' : equipo,
                      'equipo' : equipo,
                      'tienda' : tienda,
                      'tipo_ruta' : tipo_ruta,
                      'user' : user
                  },
                    success: function(data) {
                      if (data == "300") {
                          alert("Ésta ruta ya está registrado.");
                        }
                        if (data == "301") {
                            alert("No puedes registrarte 2 veces el mismo día.");
                          }
                          if (data == "302") {
                              alert("Ésta ruta de media ruta ya está completo.");
                            }
                      if (data == "200") {
                          alert("Se han ingresado los datos.");
                        }
                      if (data == "400") {
                          alert("Error al ingresar los datos.");
                        }
                  },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                        }
                    });
                    }  
      } else {
        alert("Se canceló la operación");
      }
  },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
    
}

function registroNuevoLiv2() {
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var user = document.getElementById('nameop').innerHTML;
  var nocliente = document.getElementById('nocliliv').value;
  var namecli = document.getElementById('namecliliv').value;
  var nruta = document.getElementById('nrutacliente').value;
if (nocliente == null || nocliente == "" || nruta == null || nruta == "" || namecli == null || namecli == "") {
  alert("Faltan datos por ingresar");
        } else {
          $.ajax({
            type: 'post',
            url: "https://aopack.mx/new-telefono.php",
            data: {
              'fecha' : fecha,
              'hora' : hora,
              'nruta' : nruta,
              'nocliente' : nocliente,
              'namecli' : namecli,
              'user' : user
          },
            success: function(data) {
              if (data == "200") {
                  alert("Se han ingresado los datos.");
                  getClientesLiverpool();
                }
                else {
                  alert("Error al ingresar los datos.");
                }
          },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                }
            });
            }      
}

function escanearTel() {
  navigator.camera.getPicture(onSuccessLiv, onFailLiv, { quality: 100, correctOrientation: true });
}

function onSuccessLiv(imageData) {
  textocr.recText(4, imageData, onSuccess, onFail);
  function onSuccess(recognizedText) {
      var element = document.getElementById('nocliliv'); 
      var str = JSON.stringify(recognizedText.blocks.blocktext);//.replace(/[_\s]/g, '').replace(/['"]+/g, '').replace('-', '');
      //var str2 = str.replace(/\d{15,}/g, "");
      var patt1 = /\d{10,}/g;
      var result = str.match(patt1);
      alert(result);
      element.value = result;
  }
  function onFail(message) {
        alert('Failed because: ' + message);
  }
}
function onFailLiv(message) {
  alert('Failed because: ' + message);
}



function getClientesLiverpool() {
    
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var user = document.getElementById('nameop').innerHTML;
  $("#tbodyliv").empty();

    $.ajax({
        type: 'post',
        url: "https://aopack.mx/get_clientes_liverpool.php",
        data: {
          'user' : user,
          'fecha' : fecha
      },
        success: function(data) {
          if (data == "400") {
              alert("No hay clientes registrados el día de hoy!");
            }
            else {
                var obj = JSON.parse(data);
            //$("#tablache tr").remove();
            $("#tbodyliv").empty();
            var select = document.getElementById("searchliv2");
            var length = select.options.length;
            for (i = length-1; i >= 0; i--) {
              select.options[i] = null;
            }
            var sel = document.getElementById('searchliv2');
            for (i in obj[0]) {
              var nuevoTr = "<tr style='height:60px;'><td class='numeroc' scope='row' data-toggle='modal' data-target='#myModalLiv'>" + obj[0][i].id + "</td>"+"<td class='statuspara'><label class='statuspedido'>" + obj[0][i].status + "</label></td><td class='boton5'>" + obj[0][i].cliente + "</td></tr>";
              $("#tablaliv tbody").append(nuevoTr);
              $statusc = obj[0][i].status;
               }
               for (j in obj[1]) {
                    var opt = document.createElement('option');
                    opt.innerHTML = obj[1][j].address;
                    opt.value = obj[1][j].address;
                    sel.appendChild(opt);
                 }
               $("#tablaliv").show();

               $(".numeroc").click(function() {
                var valores = "";

                $borrartr = $(this).parents("tr");
  
                $status = $(this).parents("tr").find(".statuspedido");
                
                  $(this).parents("tr").find(".numeroc").each(function() {
                    valores += $(this).html();
                    $consigna = valores;
                  });
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/get_detalle_liverpool.php",
                  data: {
                  'consigna' : valores
              },
                  success: function(data) {
                    
                  if (data == "400") {
                      alert("No hay artículos.");
                  }
                  else{
                    $("#tbodyid2Liv").empty();
                        var obj = JSON.parse(data);
                          for (i in obj) {
                            var nuevoTr = "<tr style='height:60px;' class='data'><td>" + obj[i].id + "</td><td>" + obj[i].name + "</td><td>" +  obj[i].tel  +"</td><td class='cbf'><select class='cbf2' id='cbf22'><option value='Pendiente'>Pendiente</option><option value='Confirmado'>Confirmado</option><option value='Entregado'>Entregado</option></select></td>";
                            $("#tabladescLiv tbody").append(nuevoTr);
                             }
                           $("#tabladescLiv").show();
                  }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
              });
            }    
      },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });

  }
  
  $("#fpedidoliv").click(function() {
    
    var sel = document.getElementById("cbf22");
    $statusp = sel.options[sel.selectedIndex].text;
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    $.ajax({
      type: 'post',
      url: "https://aopack.mx/set_status_liv.php",
      data: {
      'id' : $consigna,
      'fecha' : fecha,
      'hora' : hora,
      'status' : $statusp
    },
      success: function(data) {
      if (data == "200 Ok") {
          alert("Se guardó el status.");
          getClientesLiverpool();
      }
      if (data == "400") {
          alert("Error al guardar status.");
      }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
          }
      });
    });

    
function registroNuevoLiv22() {
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var user = document.getElementById('nameop').innerHTML;
  var tirose = document.getElementById('tirose').value;
  var tirosr = document.getElementById('tirosr').value;
  var r = confirm("Todos los tiros pendientes pasarán a entregados, deseas continuar?");
  if (r == true) {
    if (tirosr == null || tirosr == "" || tirose == null || tirose == "") {
      alert("Faltan datos por ingresar");
            } else {
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/new-tiros-liverpool2.php",
                  data: {
                    'tirosr' : tirosr,
                    'fecha' : fecha,
                    'hora' : hora,
                    'tirose' : tirose,
                    'user' : user
                },
                  success: function(data) {
                    if (data == "200") {
                        alert("Se han ingresado los datos.");
                        getLPLiv();
                      }
                      if (data == "300") {
                        alert("No hay datos registrados con tu nombre hoy.");
                      }
                      if (data == "400") {
                        alert("Error al ingresar los datos.");
                      }
                },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
                }   
  } else {
    alert("Has cancelado la operación");
  }   
}


$("#searchlivbtn2").click(function() {
      
    var selnew = document.getElementById("searchliv2");
    var lp = selnew.options[selnew.selectedIndex].text;
  var user = document.getElementById('nameop').innerHTML;
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  $("#tbodyliv").empty();

    $.ajax({
        type: 'post',
        url: "https://aopack.mx/get_clientes_liverpool_search2.php",
        data: {
          'user' : user,
          'fecha' : fecha,
          'lp' : lp
      },
        success: function(data) {
          if (data == "400") {
              alert("No hay clientes registrados el día de hoy!");
            }
            else {
                var obj = JSON.parse(data);
            //$("#tablache tr").remove();
            $("#tbodyliv").empty();
            for (i in obj) {
              var nuevoTr = "<tr style='height:60px;'><td class='numeroc' scope='row' data-toggle='modal' data-target='#myModalLiv'>" + obj[i].id + "</td>"+"<td class='statuspara'><label class='statuspedido'>" + obj[i].status + "</label></td><td class='boton5'>" + obj[i].cliente + "</td></tr>";
              $("#tablaliv tbody").append(nuevoTr);
              $statusc = obj[i].status;
               }
               $("#tablaliv").show();

               $(".numeroc").click(function() {
                var valores = "";

                $borrartr = $(this).parents("tr");
  
                $status = $(this).parents("tr").find(".statuspedido");
                
                  $(this).parents("tr").find(".numeroc").each(function() {
                    valores += $(this).html();
                    $consigna = valores;
                  });
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/get_detalle_liverpool.php",
                  data: {
                  'consigna' : valores
              },
                  success: function(data) {
                    
                  if (data == "400") {
                      alert("No hay artículos.");
                  }
                  else{
                    $("#tbodyid2Liv").empty();
                        var obj = JSON.parse(data);
                          for (i in obj) {
                            var nuevoTr = "<tr style='height:60px;' class='data'><td>" + obj[i].id + "</td><td>" + obj[i].name + "</td><td>" +  obj[i].tel  +"</td><td class='cbf'><select class='cbf2' id='cbf22'><option value='Pendiente'>Pendiente</option><option value='Confirmado'>Confirmado</option><option value='Entregado'>Entregado</option></select></td>";
                            $("#tabladescLiv tbody").append(nuevoTr);
                             }
                           $("#tabladescLiv").show();
                  }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });
              });
            }    
      },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
           
});

function escanearDir() {
  navigator.camera.getPicture(onSuccessLiv2, onFailLiv2, { quality: 100, correctOrientation: true, 
    destinationType: Camera.DestinationType.DATA_URL  });
}

function onSuccessLiv2(imageData) {
  textocr.recText(4, imageData, onSuccess, onFail);
  function onSuccess(recognizedText) {
      var str = JSON.stringify(recognizedText.blocks.blocktext);
      var patt1 = /(E|P)\d{9}/g;
      var lp = str.match(patt1);
      document.getElementById("lpruta").value = lp;
      var num = str.indexOf("Calle");
      var num1 = str.indexOf('","', num + 6);
      var num2 = str.indexOf(":", num + 6);
      if (num1 < num2) {
        var calle = str.slice(num + 6 , num1 - 1);
        document.getElementById("calleruta").value = calle;
      } else {
        var calle = str.slice(num + 6 , num2 - 4);
        document.getElementById("calleruta").value = calle;
      }
      var revisar_no = str.includes("N° Ext");
      if (revisar_no == true) {
        var num = str.indexOf("N° Ext");
        num1 = str.indexOf('","', num + 6);
        num2 = str.indexOf(":", num + 6);
        if (num1 < num2) {
          var numero = str.slice(num + 7 , num1 - 1);
          document.getElementById("noruta").value = numero;
        } else {
          var numero = str.slice(num + 7 , num2 - 7);
          document.getElementById("noruta").value = numero;
        }
      } else {
      var revisar_no = str.includes("No Ext");
      if (revisar_no == true) {
        var num = str.indexOf("No Ext");
        num1 = str.indexOf('","', num + 6);
        num2 = str.indexOf(":", num + 6);
        if (num1 < num2) {
          var numero = str.slice(num + 7 , num1 - 1);
          document.getElementById("noruta").value = numero;
        } else {
          var numero = str.slice(num + 7 , num2 - 6);
          document.getElementById("noruta").value = numero;
        }
      } else {
        var revisar_no = str.includes("N°");
        if (revisar_no == true) {
          var num = str.indexOf("N°");
          num1 = str.indexOf('","', num + 3);
          num2 = str.indexOf(":", num + 3);
          if (num1 < num2) {
            var numero = str.slice(num + 3 , num1 - 1);
            document.getElementById("noruta").value = numero;
          } else {
            var numero = str.slice(num + 3 , num2 - 6);
            document.getElementById("noruta").value = numero;
          }
        }else {
          var revisar_no = str.includes("No");
          if (revisar_no == true) {
            var num = str.indexOf("No");
            num1 = str.indexOf('","', num + 3);
            num2 = str.indexOf(":", num + 3);
            if (num1 < num2) {
              var numero = str.slice(num + 3 , num1 - 1);
              document.getElementById("noruta").value = numero;
            } else {
              var numero = str.slice(num + 3 , num2 - 4);
              document.getElementById("noruta").value = numero;
            }
          }
        }
      }
    }
      num = str.indexOf("Colonia");
      num1 = str.indexOf('","', num + 8);
      num2 = str.indexOf(":", num + 8);
      if (num1 < num2) {
        var municipio = str.slice(num + 8 , num1 - 1);
      } else {
        var municipio = str.slice(num + 8 , num2 - 8);
      }
      var cpprueba = str.includes("C.P");
      if (cpprueba == true) {
        num = str.indexOf("C.P");
        var cp = str.slice(num + 4 , num + 9);
      } else {
        num = str.indexOf("CP");
        var cp = str.slice(num + 3 , num + 8);
      }

      document.getElementById("colruta").value = municipio;
      document.getElementById("cpruta").value = cp;
  }
  function onFail(message) {
        alert('Failed because: ' + message);
  }
}
function onFailLiv2(message) {
  alert('Failed because: ' + message);
}

function escanearCodigo2() {
  window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    if(err) return;
    document.getElementById("lpruta").value = result;
  });
}

function escanearCodigo22() {
    window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    if(err) return;
    document.getElementById("lpruta2").value = result;
  });
}


function escanearCodigoSearch() {
  window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
  if(err) return;
  document.getElementById("searchliv").value = result;
});
}


function registroNuevoDirecciones() {

    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var user = document.getElementById('nameop').innerHTML;
    var lp = document.getElementById('lpruta').value;
      $.ajax({
                type: 'post',
                url: "https://aopack.mx/new-direccion-liverpool.php",
                data: {
                  'fecha' : fecha,
                  'hora' : hora,
                  'lp' : lp,
                  'user' : user
              },
                success: function(data) {
                  if (data == "300") {
                    alert("No se puede duplicar el lp.");
                  }
                  if (data == "200") {
                      alert("Se han registrado los datos.");
                      document.getElementById("lpruta").value = "";
                      getLPLiv();
                    }
                    if (data == "400") {
                      alert("Error al ingresar los datos.");
                    }
              },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                    }
         });
  
}

$('#sincp').click(function() {
  if($(this).prop("checked") == true) {
    document.getElementById("cpruta").value = "Sin CP";
  } else {

  }
});


$('#sindir').click(function() {
  if($(this).prop("checked") == true) {
    document.getElementById("escanearlp").style.display = "block";
    document.getElementById("escaneardir").style.display = "none";
    document.getElementById("labelcalleruta").style.display = "none";
    document.getElementById("calleruta").style.display = "none";
    document.getElementById("labelnoruta").style.display = "none";
    document.getElementById("noruta").style.display = "none";
    document.getElementById("labelcolruta").style.display = "none";
    document.getElementById("colruta").style.display = "none";
    document.getElementById("labelcpruta").style.display = "none";
    document.getElementById("cpruta").style.display = "none";
    document.getElementById("divsincp").style.display = "none";
  } else {
    document.getElementById("escanearlp").style.display = "none";
    document.getElementById("escaneardir").style.display = "inline-block";
    document.getElementById("labelcalleruta").style.display = "inline-block";
    document.getElementById("calleruta").style.display = "inline-block";
    document.getElementById("labelnoruta").style.display = "inline-block";
    document.getElementById("noruta").style.display = "inline-block";
    document.getElementById("labelcolruta").style.display = "inline-block";
    document.getElementById("colruta").style.display = "inline-block";
    document.getElementById("labelcpruta").style.display = "inline-block";
    document.getElementById("cpruta").style.display = "inline-block";
    document.getElementById("divsincp").style.display = "inline-block";
  }
});

function getMarkers() {
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var user = document.getElementById('nameop').innerHTML;
  
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/get_markers.php",
    data: {
    'user' : user,
    'date' : fecha
},
    success: function(data) {
      
    if (data == "400") {
        alert("No hay marcadores aún.");
    }
    else{
      var obj = JSON.parse(data);
      for (i in obj) {
        var marker = new google.maps.Marker({
          position: {lat: parseFloat(obj[i].lat), lng: parseFloat(obj[i].lon)},
          map: map,
          title: 'Nuevo punto'
        });
         }
    }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
}

function getLPLiv() {

  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var user = document.getElementById('nameop').innerHTML;
  
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/get_lp_liverpool.php",
    data: {
    'user' : user,
    'fecha': fecha
},
    success: function(data) {
      
    if (data == "400") {
      
    }
    else{
      $("#tbodylp").empty();
          var obj = JSON.parse(data);
            for (i in obj) {
              if (obj[i].total == "pendiente") {
                var nuevoTr = "<tr style='height:60px;' class='data'><td class='idlp'>" + obj[i].id + "</td><td class='nolp'>" + obj[i].lp + "</td><td>" +  obj[i].total  +"</td><td><button type='button' class='getlp' data-toggle='modal' data-target='#myModalOptions'>Opciones</button></td><td><img src='https://img.icons8.com/emoji/16/000000/yellow-circle-emoji.png'/></td></tr>";
                $("#tablalp tbody").append(nuevoTr);
              }
              if (obj[i].total == "entregado") {
                var nuevoTr = "<tr style='height:60px;' class='data'><td class='idlp'>" + obj[i].id + "</td><td class='nolp'>" + obj[i].lp + "</td><td>" +  obj[i].total  +"</td><td><button type='button' class='getlp' data-toggle='modal' data-target='#myModalOptions'>Opciones</button></td><td><img src='https://img.icons8.com/emoji/16/000000/green-circle-emoji.png'/></td></tr>";
                $("#tablalp tbody").append(nuevoTr);
              }
              if (obj[i].total == "rechazado") {
                var nuevoTr = "<tr style='height:60px;' class='data'><td class='idlp'>" + obj[i].id + "</td><td class='nolp'>" + obj[i].lp + "</td><td>" +  obj[i].total  +"</td><td><button type='button' class='getlp' data-toggle='modal' data-target='#myModalOptions'>Opciones</button></td><td><img src='https://img.icons8.com/emoji/16/000000/red-circle-emoji.png'/></td></tr>";
                $("#tablalp tbody").append(nuevoTr);
              }
               }
             $("#tablalp").show();
             getTLiv();

             $(".getlp").click(function() {
              var lp = $(this).parents("tr").find(".nolp").text();
              document.getElementById("lpsoli").value = lp;
              document.getElementById("lpsoli2").value = lp;
              document.getElementById("lpsoli3").value = lp;
              document.getElementById("lpsoli4").value = lp;
              document.getElementById("showlp").innerHTML = lp;
              document.getElementById("showlp2").innerHTML = lp;
              getlocationLP();
             });

             
             $(".botonborrar").click(function() {
              var id = $(this).parents("tr").find(".idlp").text();
              var lp = $(this).parents("tr").find(".nolp").text();
              var trlp = $(this).parents("tr");
              var txt;
              var r = confirm("¿Seguro que desea eliminar el LP: " + lp);
              if (r == true) {
                $.ajax({
                  type: 'post',
                  url: "https://aopack.mx/borrarlp.php",
                  data: {
                  'id' : id,
                  'lp': lp
              },
                  success: function(data) {
                    if (data == "200") {
                      alert("Eliminado exitosamente");
                      trlp.remove();
                    } else {
                      alert("Ocurrió un error");
                    }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                      }
                  });                
              } else {
                txt = "Cancelaste la operación";
              }
            });
             
    }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunctionDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function submit_form() {
  var url = $("#form1").attr('action');
  var form = $("#form1")[0];
  var formData = new FormData(form);
  
  $.ajax({
         type: "POST",
         url: url,
         processData: false,
         contentType: false,
         data: formData,
         success: function(data)
         {
             if (data == "200") {
               alert("Se han ingresado los datos exitosamente");
               getLPLiv();
             } else {
               alert("Error al ingresar los datos");
             }
         }
       });
}

function submit_form2() {
  var url = $("#form2").attr('action');
  var form = $("#form2")[0];
  var formData = new FormData(form);
  
  $.ajax({
         type: "POST",
         url: url,
         processData: false,
         contentType: false,
         data: formData,
         success: function(data)
         {
             if (data == "200") {
               alert("Se han ingresado los datos exitosamente");
               getLPLiv();
             } else {
               alert("Error al ingresar los datos");
             }
         }
       });
}

function submit_form3() {
  var url = $("#form3").attr('action');
  var form = $("#form3")[0];
  var formData = new FormData(form);
  
  $.ajax({
         type: "POST",
         url: url,
         processData: false,
         contentType: false,
         data: formData,
         success: function(data)
         {
             if (data == "200") {
               alert("Se han ingresado los datos exitosamente");
               getLPLiv();
             } else {
               alert("Error al ingresar los datos");
             }
         }
       });
}

function submit_form4() {
  var url = $("#form4").attr('action');
  var form = $("#form4")[0];
  var formData = new FormData(form);
  
  $.ajax({
         type: "POST",
         url: url,
         processData: false,
         contentType: false,
         data: formData,
         success: function(data)
         {
             if (data == "200") {
               alert("Se han ingresado los datos exitosamente");
               getLPLiv();
             } else {
               alert("Error al ingresar los datos");
             }
         }
       });
}

var geolocationSuccessLP = function(position) {
  var Http = new XMLHttpRequest();
  var lc = "";
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude
    + '&key=AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E&amp;libraries=places';
Http.open('POST', url);
Http.send();
Http.onreadystatechange = (e) => {
  if (Http.responseText == "") {
        
  } else {
    if(lc == "") {
    a = JSON.parse(Http.responseText);
    b = a.results[0].formatted_address;
    lc = "nope";
    document.getElementById('ubisoli').value = b;
    document.getElementById('ubisoli2').value = b;
    document.getElementById('ubisoli3').value = b;
    document.getElementById('ubisoli4').value = b;
    }
  }
}
}

function getlocationLP() {
  navigator.geolocation.getCurrentPosition(geolocationSuccessLP, geolocationError, options2);
}


$("#searchlivbtn").click(function() {
      
  var lp = document.getElementById("searchliv").value;
  var user = document.getElementById('nameop').innerHTML;
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  $("#tbodyliv").empty();

    $.ajax({
        type: 'post',
        url: "https://aopack.mx/get_clientes_liverpool_search.php",
        data: {
          'user' : user,
          'fecha' : fecha,
          'lp' : lp
      },
        success: function(data) {
          
    if (data == "400") {
      alert("No hay lp.");
  }
  else{
    $("#tbodylp").empty();
        var obj = JSON.parse(data);
        for (i in obj) {
          if (obj[i].status == "pendiente") {
            var nuevoTr = "<tr style='height:60px;' class='data'><td class='idlp'>" + obj[i].id + "</td><td class='nolp'>" + obj[i].cliente + "</td><td>" +  obj[i].status  +"</td><td><button type='button' class='getlp' data-toggle='modal' data-target='#myModalOptions'>Opciones</button></td><td><img src='https://img.icons8.com/emoji/16/000000/yellow-circle-emoji.png'/></td></tr>";
            $("#tablalp tbody").append(nuevoTr);
          }
          if (obj[i].status == "entregado") {
            var nuevoTr = "<tr style='height:60px;' class='data'><td class='idlp'>" + obj[i].id + "</td><td class='nolp'>" + obj[i].cliente + "</td><td>" +  obj[i].status  +"</td><td><button type='button' class='getlp' data-toggle='modal' data-target='#myModalOptions'>Opciones</button></td><td><img src='https://img.icons8.com/emoji/16/000000/green-circle-emoji.png'/></td></tr>";
            $("#tablalp tbody").append(nuevoTr);
          }
          if (obj[i].status == "rechazado") {
            var nuevoTr = "<tr style='height:60px;' class='data'><td class='idlp'>" + obj[i].id + "</td><td class='nolp'>" + obj[i].cliente + "</td><td>" +  obj[i].status  +"</td><td><button type='button' class='getlp' data-toggle='modal' data-target='#myModalOptions'>Opciones</button></td><td><img src='https://img.icons8.com/emoji/16/000000/red-circle-emoji.png'/></td></tr>";
            $("#tablalp tbody").append(nuevoTr);
          }
           }
           $("#tablalp").show();

           $(".getlp").click(function() {
            var lp = $(this).parents("tr").find(".nolp").text();
            document.getElementById("lpsoli").value = lp;
            document.getElementById("lpsoli2").value = lp;
            document.getElementById("lpsoli3").value = lp;
            document.getElementById("lpsoli4").value = lp;
            document.getElementById("showlp").innerHTML = lp;
            document.getElementById("showlp2").innerHTML = lp;
            getlocationLP();
           });

           
           $(".botonborrar").click(function() {
            var id = $(this).parents("tr").find(".idlp").text();
            var lp = $(this).parents("tr").find(".nolp").text();
            var trlp = $(this).parents("tr");
            var txt;
            var r = confirm("¿Seguro que desea eliminar el LP: " + lp);
            if (r == true) {
              $.ajax({
                type: 'post',
                url: "https://aopack.mx/borrarlp.php",
                data: {
                'id' : id,
                'lp': lp
            },
                success: function(data) {
                  if (data == "200") {
                    alert("Eliminado exitosamente");
                    trlp.remove();
                  } else {
                    alert("Ocurrió un error");
                  }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                    }
                });                
            } else {
              txt = "Cancelaste la operación";
            }
          });
           
  }  
      },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
           
});


function getTLiv() {

  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
  var user = document.getElementById('nameop').innerHTML;
  
  $.ajax({
    type: 'post',
    url: "https://aopack.mx/get_total_liv.php",
    data: {
    'user' : user,
    'fecha': fecha
},
    success: function(data) {
          document.getElementById("tpedidosliv").innerHTML = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
        }
    });
}


$("#btn_fjornada").click(function() {
      
  var user = document.getElementById('nameop').innerHTML;
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();

    $.ajax({
        type: 'post',
        url: "https://aopack.mx/relleno_fruta.php",
        data: {
          'user' : user,
          'fecha' : fecha
      },
        success: function(data) {
          var obj = JSON.parse(data);
          for (i in obj) {
            document.getElementById("tirosr").value = obj[i].rechazados;
            document.getElementById("tirose").value = obj[i].exitosos;
             }
          
      },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            }
        });
           
});

$("#checkconn").click(function() {
      
  if (navigator.onLine) {
    var user = document.getElementById('nameop').innerHTML;
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    $.ajax({
      type: 'post',
      url: "https://aopack.mx/testconn.php",
      data: {
        'user' : user,
        'fecha' : fecha
    },
      success: function(data) {
        if (data == "200") {
          alert("Tienes conexión estable, puedes insertar datos.");
        } else {
          alert("Hubo un error, intenta de nuevo");
        }
        
    },
          error: function(jqXHR, textStatus, errorThrown) {
              alert("Hay un error en tu conexión a internet.");
          }
      });
} else {
    alert("No tienes conexión a internet");
}
           
});