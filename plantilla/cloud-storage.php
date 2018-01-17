$storageClient = new StorageClient();
$bucket = $storageClient->bucket('bucket-name');
$object = $bucket->object('object-name');

require_once("vendor/autoload.php");

use Google\Cloud\Storage\StorageClient;

$storage = new StorageClient();

$bucket = $storage->bucket($bucketName); // Put your bucket name here.

$object = $bucket->upload(file_get_contents($filePath), [
    'name' => $objectName
]);