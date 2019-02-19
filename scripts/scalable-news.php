<?php
$unsortednewsfiles = scandir("../assets/news");
unset($unsortednewsfiles[0]);
unset($unsortednewsfiles[1]);

rsort($unsortednewsfiles);

$sortednewsfiles = (array_values($unsortednewsfiles));

json_encode($sortednewsfiles);

$newsfiles = array();

for ($fileindex = 0; $fileindex < count($sortednewsfiles); $fileindex++){
    $newsfiles[$fileindex] = file_get_contents("../assets/news/" . $sortednewsfiles[$fileindex]);
}
echo json_encode($newsfiles);