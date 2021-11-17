var UrlGetPedidos = 'http://localhost:80/G7_20/controller/pedidos.php?op=GetPedidos';
var UrlPostPedido ='http://localhost:80/G7_20/controller/pedidos.php?op=InsertPedido';
var UrlGetPedido = 'http://localhost:80/G7_20/controller/pedidos.php?op=Getpedido';
var UrlPutPedido = 'http://localhost:80/G7_20/controller/pedidos.php?op=UpdatePedido';
var UrlDeletePedido= 'http://localhost:80/G7_20/controller/pedidos.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'POST',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID + '</td>'+
                '<td>'+ MiItems[i].ID_SOCIO + '</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO + '</td>'+
                '<td>'+ MiItems[i].DETALLE + '</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL + '</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV + '</td>'+
                '<td>'+ MiItems[i].TOTAL + '</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA + '</td>'+
                '<td>'+ MiItems[i].ESTADO + '</td>'+
                '<td>'+
                '<button class = "btn btn-outline-warning" onclick="CargarPedido('+MiItems[i].ID +')">Editar</button'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarPedido('+MiItems[i].ID +')">Eliminar</button>'+
                '<td>'+
                '</tr>';
                $('.pedidos').html(Valores);

            }
        }
    });
}
function AgregarPedido(){
  var datospedido ={
         ID_SOCIO:$('#idsocio').val(),
         FECHA_PEDIDO:$('#FechaPedido').val(),
         DETALLE:$('#detalle').val(),
         SUB_TOTAL:$('#subtotal').val(),
         TOTAL_ISV:$('#totalisv').val(),
         TOTAL:$('#total').val(),
         FECHA_ENTREGA:$('#fechaentrega').val()
        };
  var datospedidosjson= JSON.stringify(datospedido);
  $.ajax({
      url:UrlPostPedido,
      type:'POST',
      data:datospedidosjson,
      datatype:'JSON',
      contentType:'application/json',
      success: function(response){
          console.log(response);
      }
  });   
  alert("Pedido Agregado");
}

  function CargarPedido(IDpedido){
      var datospedido= {
          ID: IDpedido
      };
      var datospedidosjson= JSON.stringify(datospedido);

      $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data:datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#idsocio').val(MiItems[0].ID_SOCIO);
            $('#FechaPedido').val(MiItems[0].FECHA_PEDIDO);
            $('#detalle').val(MiItems[0].DETALLE);
            $('#subtotal').val(MiItems[0].SUB_TOTAL);
            $('#totalisv').val(MiItems[0].TOTAL_ISV);
            $('#total').val(MiItems[0].TOTAL);
            $('#fechaentrega').val(MiItems[0].FECHA_ENTREGA);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+ MiItems[0].ID+')"'+
            'value= "Actualizar Pedido" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}
    function ActualizarPedido(IDpedido){
        var datospedido = {
         ID:IDpedido,
         ID_SOCIO:$('#idsocio').val(),
         FECHA_PEDIDO:$('#FechaPedido').val(),
         DETALLE:$('#detalle').val(),
         SUB_TOTAL:$('#subtotal').val(),
         TOTAL_ISV:$('#totalisv').val(),
         TOTAL:$('#total').val(),
         FECHA_ENTREGA:$('#fechaentrega').val(),
         ESTADO: 'P'
        
        };
        var datospedidosjson= JSON.stringify(datospedido);
        
        $.ajax({
            url:UrlPutPedido,
            type:'PUT',
            data:datospedidosjson,
            datatype:'JSON',
            contentType:'application/json',
            success: function(response){
             console.log(response);
            }
        });    
        alert("Pedido Actualizado");      
    }

function EliminarPedido(IDpedido){
    var datospedido ={
        ID: IDpedido
    };
    var datospedidosjson= JSON.stringify(datospedido);

    $.ajax({
        url:UrlDeletePedido,
        type:'DELETE',
        data:datospedidosjson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
         console.log(response);
        }
    });    
    alert("Pedido Eliminado");
}