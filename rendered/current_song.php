<?php

use progulusAPI\CurrentSong;

require_once 'autoload.inc.php';
require_once 'CurrentSong.php';

global $songs;
global $queue;


$currentSong = $songs[0] ?? null;

?>


<div class="row g-3">
    <div class="col-12 col-md-7 col-lg-8 col-xl-9">
        <?php
        if ($currentSong) {
            ?>
            <div>
                <div class="row g-3 g-lg-5">
                    <div class="col-12 col-md-6 np--album-cover-container">
                        <img class="img-fluid"
                             src="/pictures/<?php echo urlencode($currentSong->picture); ?>"
                             alt="<?php echo "{$currentSong->album} ({$currentSong->albumYear})"; ?>" loading="eager">
                        <div class="row g-1">
                            <div class="col">
                                <div class="progress mt-1">
                                    <div class="progress-bar"></div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <span class="si--duration">
                                    <?php echo CurrentSong::DurationToMMSS($currentSong->duration); ?>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 np--song-info">
                        <div class="song-info">
                            <h3 class="si--title"><?php echo $currentSong->title; ?></h3>
                            <div class="si--row si--artist">
                                <div class="si--icon bi-person-circle"></div>
                                <div class="si--content">
                                    <a href="/ui/artist/<?php echo urlencode($currentSong->artist); ?>">
                                        <?php echo $currentSong->artist; ?>
                                    </a>
                                    <small class="ms-3">
                                        <a target="_blank" class="bi-link-45deg"></a>
                                        <span class="ms-3 flag-icon flag-icon-<?php echo strtolower($currentSong->country); ?>" title="<?php echo strtoupper($currentSong->country); ?>"></span>
                                    </small>
                                </div>
                            </div>
                            <div class="si--row si--album">
                                <div class="si--icon bi-disc-fill"></div>
                                <div class="si--content">
                                    <a href="/ui/artist/<?php echo urlencode($currentSong->artist); ?>/<?php echo urlencode($currentSong->album); ?>">
                                        <?php echo $currentSong->album; ?>
                                    </a><span class="ms-3">(<?php echo $currentSong->albumYear; ?>)</span></div>
                            </div>
                            <div class="si--row si--rating">
                                <div class="si--icon bi-star-fill"></div>
                                <div class="si--content">
                                    <div>Not Rated</div>
                                </div>
                            </div>
                            <div class="si--row si--rating-tool">
                                <div class="si--icon bi-star d-inline-block"></div>
                                <div class="si--content">
                                    <div class="si--rating-bar">
                                        <div class="si--user-rating me-3">
                                            <span><?php echo $currentSong->userRating; ?></span>
                                        </div>
                                        <div class="si--user-rating-tool">
                                            <input type="range" min="0" max="5" step="0.5"
                                                   value="<?php echo $currentSong->userRating; ?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="si--row si--requester">
                                <div class="si--icon bi-person-workspace"></div>
                                <div class="si--content">
                                    <div><?php echo $currentSong->requester; ?></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?
        }
        ?>

        <div class="progulus--queue d-block d-flex-md">
            <div class="progulus--queue-title"><h3 class="me-3">Coming up:</h3>
                <h3 class="me-3">00:00</h3></div>
            <div class="progulus--queue-list"></div>
        </div>

    </div>
</div>
