<?php

$todos_str = file_get_contents("todo.json");
$todos = json_decode($todos_str, true);

if (isset($_POST["newTodo"])) {
    // Il caso di inserimento del new todo
    $todos[] = [
        "text" => $_POST["newTodo"],
        "done" => false
    ];
    file_put_contents("todo.json", json_encode($todos));
} elseif (isset($_POST["toggleIndex"])) {
    // Il caso di modifica di un todo al done
    $todoIndex = $_POST["toggleIndex"];
    $todos[$todoIndex]["done"] = !$todos[$todoIndex]["done"];
    file_put_contents("todo.json", json_encode($todos));
} elseif (isset($_POST["deleteIndex"])) {
    // Il caso del cancellazione di un todo
    $todoIndex = $_POST["deleteIndex"];
    array_splice($todos, $todoIndex, 1);
    file_put_contents("todo.json", json_encode($todos));
}


header("Content-Type: application/json");
echo json_encode($todos);
