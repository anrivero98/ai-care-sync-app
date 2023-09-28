<?php

  //Taken from Merriam-Webster API
  // This function grabs the definition of a word in JSON format.
  function grab_json_definition ($word, $ref, $key) {
    $uri = "https://dictionaryapi.com/api/v3/references/" . urlencode($ref) . "/json/" . urlencode($word) . "?key=" . urlencode($key);

    return file_get_contents($uri);
  };
  $word = $argv[1];
  $jdef = grab_json_definition($word, "medical", "da3aa59c-3edc-431a-926f-a3ef8e7805ef");
  $path = './server/fastapi_service/data.json';
  $fp = fopen($path, 'w');
  fwrite($fp, $jdef);
  fclose($fp);
//  $decodedJson = json_decode($jdef, true);
//  print_r($decodedJson[0]->meta);
?>