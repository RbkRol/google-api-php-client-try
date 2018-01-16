$(document).ready(function(){
    $("#datos").DataTable({
        scrollY: '330pt',
        scrollCollapse: true,
        responsive: true,
        language: {
            url: 'js/Spanish.json'
        }
    });

    // Botón floppy actualizar
    $(document).on("click", ".actualizar", function(evento){
        var id = $(this).attr("id");
        var nombre = $("#nombre" + id).text();
        var prov = $("#prov" + id).text();
        var correo = $("#correo" + id).text();
        var pwd = $("#pwd" + id).text();
        var activo = document.getElementById("activo" + id).checked;
        var atc = document.getElementById("atc" + id).checked;
        var cpm = document.getElementById("cpm" + id).checked;
        var sa = document.getElementById("sa" + id).checked;
        
        expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if( (nombre === "" || prov === "" || correo === "" || pwd ==="") || (!expr.test(correo)) ){
            alert("Favor de llenar todos los campos y de proporcionar un correo válido");
        }else{
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                document.getElementById("toEdit-" + id).innerHTML = "" + this.responseText;
                }
            };
            xhttp.open("POST", "php/update.php?rfc="+id+"&nombre="+nombre+"&empresa="+prov+"&correo="+correo+"&pwd="+pwd+"&status="+activo+"&p_atc="+atc+"&p_cpm="+cpm+"&p_sa="+sa );
            xhttp.send();
            alert("Registro actualizado");
            }
    });

    conta = 0;
    // Botón pluma
    $(document).on("click", ".editar", function(evento){
        if(conta >0){
            if(id!=$(this).attr("id")){
                $("#nombre" + id).attr("contenteditable", "false");
                $("#prov" + id).attr("contenteditable", "false");
                $("#correo" + id).attr("contenteditable", "false");
                $("#pwd" + id).attr("disabled", "false");
                        
                // quitar color...
                $("#nombre" + id).removeClass("border border-info");
                $("#prov" + id).removeClass("border border-info");
                $("#correo" + id).removeClass("border border-info");
                $("#pwd" + id).removeClass("border border-info");
                $("." + id).removeClass("actualizar");
                $("." + id).attr("disabled", "true");
                $("#activo" + id).attr("disabled", "true");
                $("#atc" + id).attr("disabled", "true");
                $("#cpm" + id).attr("disabled", "true");
                $("#sa" + id).attr("disabled", "true");
            }
        }
        conta++;
        id = $(this).attr("id");
        $("." + id).addClass("actualizar");
        $("." + id).removeAttr("disabled");
        $("#nombre" + id).attr("contenteditable", "true");
        $("#prov" + id).attr("contenteditable", "true");
        $("#correo" + id).attr("contenteditable", "true");
        $("#pwd" + id).attr("contenteditable", "true");
        $("#activo" + id).removeAttr("disabled");
        $("#atc" + id).removeAttr("disabled");
        $("#cpm" + id).removeAttr("disabled");
        $("#sa" + id).removeAttr("disabled");
                
        // Añadir color al editar...
        $("#nombre" + id).addClass("border border-info");
        $("#prov" + id).addClass("border border-info");
        $("#correo" + id).addClass("border border-info");
        $("#pwd" + id).addClass("border border-info");
        $("#activo" + id).addClass("border border-info");
    });

    // Botón Agregar usuario
    cont_nvo = 0;   
    $(document).on("click", "#agregar", function(){
        $("#agregar").attr("disabled", "true");
        
        var nva_fila = "<tr>";
            nva_fila += "<td id='nvo_rfc' contenteditable class='border border-info'></td>";
            nva_fila += "<td id='nvo_name' contenteditable class='border border-info'></td>";
            nva_fila += "<td id='nvo_prov' contenteditable class='border border-info'></td>";
            nva_fila += "<td id='nvo_mail' contenteditable class='border border-info'></td>";
            nva_fila += "<td id='nvo_pwd' contenteditable class='border border-info'></td>";
            nva_fila += "<td class='border border-info'><input id='nvo_activo' class='form-check-input' type='checkbox' checked disabled></td>";
            nva_fila += "<td><button class='btn colorcito insertar'><span class='glyphicon glyphicon-floppy-disk' style='color: rgb(0,70,129); font-size: 10pt;' ></span></button></td>";
            nva_fila += "<td><label><input id='nvo_atc' class='form-check-input' type='checkbox' checked disabled >ATC</label>";
            nva_fila += "<label><input id='nvo_cpm' class='form-check-input' type='checkbox' checked disabled >CPM</label>";
            nva_fila += "<label><input id='nvo_sa' class='form-check-input' type='checkbox' checked disabled >SA</label></td>";
            nva_fila += "</tr>";

        if(cont_nvo >0){
            $("#editar").append(nva_fila);
            $(this).focus().select();
        }else{
            $("#editar").append(nva_fila);
            $(this).focus().select();
        }
        cont_nvo++;
    });

    // Botón floppy Agregar usuario
    $(document).on("click", ".insertar", function(){
        $("#agregar").removeAttr("disabled");

        nvo_rfc = $("#nvo_rfc").text();
        nvo_name = $("#nvo_name").text();
        nvo_prov = $("#nvo_prov").text();
        nvo_mail = $("#nvo_mail").text();
        nvo_pass = $("#nvo_pwd").text();
        nvo_stte = document.getElementById("nvo_activo").checked;
        nvo_atc = document.getElementById("nvo_atc").checked;
        nvo_cpm = document.getElementById("nvo_cpm").checked;
        nvo_sa = document.getElementById("nvo_sa").checked;

        nvo_rfc = nvo_rfc.toUpperCase();
        
        expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                
        if(!expr.test(nvo_mail) ){
            alert("La dirección de correo no es válida");
             nvo_mail = "";
        }else if( nvo_rfc ==="" || nvo_name ==="" || nvo_prov === "" || nvo_mail === "" || nvo_pass === "" ){
            alert("Favor de llenar todos los campos");
        }else{
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status ==200){
                    $("#editar").html(this.responseText);
                }
            };
            xhttp.open("POST", "php/insertar.php?rfc="+nvo_rfc+"&nombre="+nvo_name+"&prov="+nvo_prov+"&mail="+nvo_mail+"&pwd="+nvo_pass+"&estatus="+nvo_stte+"&nvoATC="+nvo_atc+"&nvoCPM="+nvo_cpm+"&nvoSA="+nvo_sa );
            xhttp.send();
            alert("Registro agregado");
        }
    });
});
