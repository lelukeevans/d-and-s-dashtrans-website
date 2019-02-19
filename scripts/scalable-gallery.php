<?php
$slideimages = scandir("../assets/images/galleryelement");
unset($slideimages[0]);
unset($slideimages[1]);

$sortedImageArray = (array_values($slideimages));

echo json_encode($sortedImageArray);