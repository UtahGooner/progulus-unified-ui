<?php
require_once 'autoload.inc.php';
global $user;
$userID = $user->data['user_id'];
$userName = $user->data['username'];

$requestURI = filter_input(INPUT_SERVER, 'REQUEST_URI');
$parsedURL = parse_url($requestURI);

$searchParams = preg_split('/\//', str_replace('/ui/', '', $parsedURL['path']));
$validPaths = ['', 'now-playing', 'request', 'history', 'top-songs', 'cd-list', 'search', 'artist'];
if (count($searchParams) > 0 && in_array($searchParams['0'], $validPaths)) {
    http_response_code(200);
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Progulus UI</title>
    <meta name="description" content="Progulus User Interface" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Armata&display=swap" rel="stylesheet">
    <link href="/ui/public/styles/main.css" rel="stylesheet">
</head>
<body>
    <!-- <?php echo json_encode($searchParams)?> -->
    <div id="progulus--app-container"></div>
    <template id="progulus--tagboard">
        <?php
        $userdata = $user->data;

        $current_error_reporting = error_reporting(E_ALL | E_STRICT);
        $ini_display_errors = ini_get("display_errors");
        ini_set("display_errors", "1");

        // send the userid, etc to the chat for people that are logged in to Progulus
        $args = ((isset($userID) && $userID > 1)
            ? "auth/progulus/{$userID}/{$userName}"
            : ''
        );
        ?>
        <iframe src="<?php echo '//gutenprog.com/gt6/' . $args; ?>"
                name="tagframe4"
                style="width:100%;border-width:0; height: 570px;" height="570"
                id="tagframe4"></iframe>
    </template>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <?php
    $path = pathinfo('./public/js/manifest.json');
    $json = file_get_contents(__DIR__ . '/public/js/manifest.json');
    $files = json_decode($json);
    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) !== 'js') {
            continue;
        }
        $jsFile = '/ui/public/js' . str_replace('//', '/', '/' . $file);
        echo "<script src=\"{$jsFile}\"></script>";
    }
    ?>
</body>
</html>
