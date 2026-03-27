(function () {
  const root = document.querySelector('[data-vid-demo]');
  if (!root) return;

  const video = root.querySelector('[data-vid-element]');
  const status = root.querySelector('[data-vid-status]');

  if (!video) return;

  function setStatus(message) {
    if (!status) return;
    status.textContent = message;
  }

  // ── Enforce no-autoplay ──
  // Even if an autoplay attribute is accidentally added, pause immediately.
  if (!video.paused) {
    video.pause();
    video.currentTime = 0;
  }

  // Guard against programmatic autoplay attempts
  video.removeAttribute('autoplay');

  // ── Status announcements for assistive technology ──
  video.addEventListener('play', function () {
    setStatus('Video is now playing.');
  });

  video.addEventListener('pause', function () {
    setStatus('Video is now paused.');
  });

  video.addEventListener('ended', function () {
    setStatus('Video playback has ended.');
  });

  video.addEventListener('volumechange', function () {
    if (video.muted) {
      setStatus('Video is muted.');
    } else {
      var pct = Math.round(video.volume * 100);
      setStatus('Volume set to ' + pct + '%.');
    }
  });

  // ── Mute toggle with aria-pressed ──
  var muteBtn = root.querySelector('[data-vid-mute]');
  if (muteBtn) {
    muteBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      muteBtn.setAttribute('aria-pressed', String(video.muted));
      muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
      muteBtn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
    });
  }

  // ── Audio descriptions toggle ──
  var adBtn = root.querySelector('[data-vid-ad-toggle]');
  if (adBtn) {
    var descTrack = video.querySelector('track[kind="descriptions"]');
    var textTrack = descTrack ? video.textTracks[video.textTracks.length - 1] : null;

    adBtn.addEventListener('click', function () {
      if (!textTrack) return;
      var isOn = textTrack.mode === 'showing';
      textTrack.mode = isOn ? 'disabled' : 'showing';
      adBtn.setAttribute('aria-pressed', String(!isOn));
      setStatus(isOn ? 'Audio descriptions off.' : 'Audio descriptions on.');
    });
  }

  // ── Keyboard controls for volume and seek ──
  video.addEventListener('keydown', function (e) {
    var step = 5;
    var volStep = 0.1;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        video.currentTime = Math.min(video.duration || 0, video.currentTime + step);
        setStatus('Seeked to ' + Math.round(video.currentTime) + ' seconds.');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - step);
        setStatus('Seeked to ' + Math.round(video.currentTime) + ' seconds.');
        break;
      case 'ArrowUp':
        e.preventDefault();
        video.volume = Math.min(1, video.volume + volStep);
        setStatus('Volume set to ' + Math.round(video.volume * 100) + '%.');
        break;
      case 'ArrowDown':
        e.preventDefault();
        video.volume = Math.max(0, video.volume - volStep);
        setStatus('Volume set to ' + Math.round(video.volume * 100) + '%.');
        break;
    }
  });
})();
