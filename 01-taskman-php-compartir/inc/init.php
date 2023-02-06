<?php
// Modo de depuración
const DEBUG = 1;

// Definición de las constantes
const SESION_AUTENTICADO = 'autenticado2';
const SESION_ADMIN       = 'esadmin';
const SESION_DEBUG       = '__debug';

const ROL_ADMIN = 'admin';

// Cargo la sesión PHP
session_start();

// Configura el autoload
function cargarClasesPojos($nombreClase){
    if(file_exists("pojo/".$nombreClase.'.php')){
        require_once "pojo/".$nombreClase.'.php';
    }
}

function cargarClasesPersistencia($nombreClase){
    if(file_exists("persistencia/".$nombreClase.'.php')){
        require_once "persistencia/".$nombreClase.'.php';
    }
}

function cargarClasesLn($nombreClase){
    if(file_exists("ln/".$nombreClase.'.php')){
        require_once "ln/".$nombreClase.'.php';
    }
}

spl_autoload_register("cargarClasesPojos");
spl_autoload_register("cargarClasesPersistencia");
spl_autoload_register("cargarClasesLn");
?>