<?php
global $songs;
$currentSong = $songs[0];
?>
<section class="progulus--sub-header">
    <div class="row g-3">
        <div class="d-none d-md-block col-8 col-md-7 col-lg-8 col-xl-9">
            <div><span class="me-1">Now playing:</span> Regular Schedule</div>
        </div>
        <div class="col-12 col-md-5 col-lg-4 col-xl-3">
            <div class="progulus--current-listeners">
                <div>Listeners</div>
                <div id="progulus--listeners"><?php echo $currentSong->listeners ?? '-'; ?></div>
            </div>
        </div>
    </div>
</section>
