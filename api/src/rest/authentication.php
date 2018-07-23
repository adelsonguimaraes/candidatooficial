<?php

// chamando o metodo requisitado
$_POST['metodo']();

function logar () {
    $data = $_POST['data'];
    $usuarioControl = new UsuarioControl();
    echo json_encode($usuarioControl->logar($data['usuario'], $data['senha']));
}

?>