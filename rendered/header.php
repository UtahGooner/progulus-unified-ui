<?php
global $userName;

?>

<header>
    <div class="navbar navbar-nav navbar-expand-sm navbar-light bg-light fixed-top">
        <div class="container-fluid"><a aria-current="page" class="navbar-brand active" href="/ui/"><img
                        src="/rprweb/images/progulus-logo-1.png" alt="Progulus" style="max-height: 40px; width: auto;"></a>
            <button class="navbar-toggler" type="button"><span class="navbar-toggler-icon"></span></button>
            <div class="navbar-collapse collapse">
                <ul class="navbar-nav me-auto mb-2">
                    <li class="nav-item"><a aria-current="page" class="nav-link active" href="/ui/now-playing">Now
                            Playing</a></li>
                    <li class="nav-item"><a class="nav-link" href="/ui/request">Request</a></li>
                    <li class="nav-item"><a class="nav-link" href="/ui/history">History</a></li>
                    <li class="nav-item"><a class="nav-link" href="/ui/search">Search</a></li>
                    <li class="nav-item"><a href="/phpBB3" target="_blank" class="nav-link">Forums</a></li>
                </ul>
            </div>
            <div class="d-flex">
                <div class="bi-person-bounding-box me-1"></div>
                <div class="d-none d-md-block"><?php echo $userName; ?></div>
            </div>
        </div>
    </div>
    <div class="d-none d-lg-block" id="progulus--header-logo-container">
        <div id="progulus--header-logo"></div>
    </div>
</header>
