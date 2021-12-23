<?php

global $songs;
global $queue;
global $userID;
global $userName;
global $userAvatar;

$current = $songs[0];
$history = array_slice($songs, 1);
?>

<script>
    window.progulus_state = {
        alerts: {
            list: [],
        },
        playing: {
            current: <?php echo json_encode($current); ?>,
            queue: <?php echo json_encode($queue); ?>,
            history: <?php echo json_encode($history); ?>
        },
        rating: {
            list: {},
        }
        user: {
            id: <?php echo json_encode($userID); ?>,
            name: <?php echo json_encode($userName); ?>,
            avatar: <?php echo json_encode($userAvatar); ?>,
        }
    }
</script>
