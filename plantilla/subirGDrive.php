<?php
# Incluir lo que construyó composer
include_once 'vendor/autoload.php';

$client = new Google_Client();
$service = new Google_Service_Drive($client);

$archivoFormulario = $_FILES['bigCsvFile']['tmp_name'];
//$target_file = dirname($_FILES["bigCsvFile"],[tmp_name]);
echo "<script>console.log('".$archivoFormulario."');</script>";

$file = new Google_Service_Drive_DriveFile();
$file->title = "Big File";
$chunkSizeBytes = 1 * 1024 * 1024;

// Call the API with the media upload, defer so it doesn't immediately return.
$client->setDefer(true);
// En la documentación está como insert, en realidad es create
$request = $service->files->create($file);

// Create a media file upload to represent our upload process.
$media = new Google_Http_MediaFileUpload(
  $client,
  $request,
  'text/plain',
  null,
  true,
  $chunkSizeBytes
);
$media->setFileSize(filesize($archivoFormulario));

// Upload the various chunks. $status will be false until the process is
// complete.
$status = false;
$handle = fopen($archivoFormulario, "rb");
while (!$status && !feof($handle)) {
  $chunk = fread($handle, $chunkSizeBytes);
  $status = $media->nextChunk($chunk);
 }

// The final value of $status will be the data from the API for the object
// that has been uploaded.
$result = false;
if($status != false) {
  $result = $status;
}

fclose($handle);
// Reset to the client to execute requests immediately in the future.
$client->setDefer(false);
?>