(function () {
  "use strict";

  var ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/png",
    "image/jpeg",
  ];

  var ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt", ".png", ".jpg", ".jpeg"];
  var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  var container = document.querySelector("[data-file-upload-demo]");
  if (!container) return;

  var dropzone = container.querySelector("#file-upload-dropzone");
  var fileInput = container.querySelector("#file-upload-input");
  var fileList = container.querySelector("#file-upload-list");
  var fileCount = container.querySelector("#file-upload-count");
  var statusRegion = container.querySelector("#file-upload-status");
  var errorRegion = container.querySelector("#file-upload-error");

  var files = [];
  var fileIdCounter = 0;

  // -------------------------------------------------------
  // Utilities
  // -------------------------------------------------------

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    var units = ["B", "KB", "MB", "GB"];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + " " + units[i];
  }

  function getExtension(name) {
    var dot = name.lastIndexOf(".");
    return dot !== -1 ? name.substring(dot).toLowerCase() : "";
  }

  function announceStatus(message) {
    statusRegion.textContent = message;
  }

  function showError(message) {
    errorRegion.textContent = message;
  }

  function clearError() {
    errorRegion.textContent = "";
  }

  // -------------------------------------------------------
  // Validation
  // -------------------------------------------------------

  function validateFile(file) {
    var ext = getExtension(file.name);
    var typeValid = ALLOWED_TYPES.indexOf(file.type) !== -1 || ALLOWED_EXTENSIONS.indexOf(ext) !== -1;

    if (!typeValid) {
      return "\"" + file.name + "\" is not an accepted file type. Use PDF, DOC, DOCX, TXT, PNG, or JPG.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "\"" + file.name + "\" exceeds the 5 MB size limit (" + formatFileSize(file.size) + ").";
    }
    return null;
  }

  // -------------------------------------------------------
  // File list rendering
  // -------------------------------------------------------

  function updateCount() {
    fileCount.textContent = files.length;
  }

  function createFileItem(entry) {
    var li = document.createElement("li");
    li.className = "rl-file-upload-list__item";
    li.setAttribute("data-file-id", entry.id);

    // File icon
    var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "rl-file-upload-list__icon");
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "24");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z");
    path1.setAttribute("stroke", "currentColor");
    path1.setAttribute("stroke-width", "2");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M14 2v6h6");
    path2.setAttribute("stroke", "currentColor");
    path2.setAttribute("stroke-width", "2");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    icon.appendChild(path1);
    icon.appendChild(path2);

    // Info block
    var info = document.createElement("div");
    info.className = "rl-file-upload-list__info";

    var nameSpan = document.createElement("span");
    nameSpan.className = "rl-file-upload-list__name";
    nameSpan.textContent = entry.name;

    var meta = document.createElement("span");
    meta.className = "rl-file-upload-list__meta";

    var sizeSpan = document.createElement("span");
    sizeSpan.className = "rl-file-upload-list__size";
    sizeSpan.textContent = formatFileSize(entry.size);

    var statusSpan = document.createElement("span");
    statusSpan.className = "file-upload-list__status file-upload-list__status--uploading";
    statusSpan.textContent = "Uploading\u2026";
    statusSpan.setAttribute("data-status", "");

    meta.appendChild(sizeSpan);
    meta.appendChild(document.createTextNode(" \u00B7 "));
    meta.appendChild(statusSpan);

    info.appendChild(nameSpan);
    info.appendChild(meta);

    // Progress bar
    var progressWrap = document.createElement("div");
    progressWrap.className = "rl-file-upload-list__progress";
    progressWrap.setAttribute("role", "progressbar");
    progressWrap.setAttribute("aria-label", "Upload progress for " + entry.name);
    progressWrap.setAttribute("aria-valuenow", "0");
    progressWrap.setAttribute("aria-valuemin", "0");
    progressWrap.setAttribute("aria-valuemax", "100");

    var progressBar = document.createElement("div");
    progressBar.className = "rl-file-upload-list__progress-bar";
    progressBar.style.width = "0%";
    progressWrap.appendChild(progressBar);

    // Remove button
    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "rl-file-upload-list__remove";
    removeBtn.setAttribute("aria-label", "Remove " + entry.name);
    removeBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
      '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>";

    removeBtn.addEventListener("click", function () {
      removeFile(entry.id);
    });

    li.appendChild(icon);
    li.appendChild(info);
    li.appendChild(progressWrap);
    li.appendChild(removeBtn);

    return li;
  }

  // -------------------------------------------------------
  // Simulated upload progress
  // -------------------------------------------------------

  function simulateUpload(entry) {
    var li = fileList.querySelector('[data-file-id="' + entry.id + '"]');
    if (!li) return;

    var progressWrap = li.querySelector(".rl-file-upload-list__progress");
    var progressBar = li.querySelector(".rl-file-upload-list__progress-bar");
    var statusSpan = li.querySelector("[data-status]");
    var progress = 0;

    var interval = setInterval(function () {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        progressBar.style.width = "100%";
        progressBar.classList.add("rl-file-upload-list__progress-bar--complete");
        progressWrap.setAttribute("aria-valuenow", "100");

        statusSpan.textContent = "Complete";
        statusSpan.className = "file-upload-list__status file-upload-list__status--complete";
        entry.status = "complete";

        announceStatus(entry.name + " upload complete.");
      } else {
        progressBar.style.width = progress + "%";
        progressWrap.setAttribute("aria-valuenow", String(progress));
      }
    }, 200 + Math.floor(Math.random() * 150));
  }

  // -------------------------------------------------------
  // Add / Remove files
  // -------------------------------------------------------

  function addFiles(newFiles) {
    clearError();
    var errors = [];
    var added = 0;

    for (var i = 0; i < newFiles.length; i++) {
      var file = newFiles[i];
      var validationError = validateFile(file);

      if (validationError) {
        errors.push(validationError);
        continue;
      }

      var entry = {
        id: ++fileIdCounter,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
      };

      files.push(entry);
      var li = createFileItem(entry);
      fileList.appendChild(li);
      simulateUpload(entry);
      added++;
    }

    updateCount();

    if (errors.length > 0) {
      showError(errors.join(" "));
    }

    if (added > 0) {
      announceStatus(
        added + " file" + (added !== 1 ? "s" : "") + " added. " +
        files.length + " file" + (files.length !== 1 ? "s" : "") + " total."
      );
    }
  }

  function removeFile(id) {
    var li = fileList.querySelector('[data-file-id="' + id + '"]');
    if (!li) return;

    // Determine focus target before removal
    var nextSibling = li.nextElementSibling;
    var prevSibling = li.previousElementSibling;
    var focusTarget = null;

    if (nextSibling) {
      focusTarget = nextSibling.querySelector(".rl-file-upload-list__remove");
    } else if (prevSibling) {
      focusTarget = prevSibling.querySelector(".rl-file-upload-list__remove");
    } else {
      focusTarget = fileInput;
    }

    // Find entry name for announcement
    var entryName = "";
    for (var i = 0; i < files.length; i++) {
      if (files[i].id === id) {
        entryName = files[i].name;
        files.splice(i, 1);
        break;
      }
    }

    li.remove();
    updateCount();

    announceStatus(
      entryName + " removed. " +
      files.length + " file" + (files.length !== 1 ? "s" : "") + " remaining."
    );

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  // -------------------------------------------------------
  // Event handlers
  // -------------------------------------------------------

  // File input change
  fileInput.addEventListener("change", function () {
    if (fileInput.files && fileInput.files.length > 0) {
      addFiles(fileInput.files);
      // Reset input so the same file can be selected again
      fileInput.value = "";
    }
  });

  // Drag-and-drop
  dropzone.addEventListener("dragenter", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add("rl-file-upload-dropzone--drag-over");
  });

  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add("rl-file-upload-dropzone--drag-over");
  });

  dropzone.addEventListener("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    // Only remove class if we actually left the dropzone
    if (!dropzone.contains(e.relatedTarget)) {
      dropzone.classList.remove("rl-file-upload-dropzone--drag-over");
    }
  });

  dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove("rl-file-upload-dropzone--drag-over");

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  });

  // Clicking anywhere on the dropzone opens the file picker
  dropzone.addEventListener("click", function (e) {
    // Don't re-trigger if clicking the input or a remove button
    if (e.target === fileInput || e.target.closest(".rl-file-upload-list__remove")) {
      return;
    }
    fileInput.click();
  });
})();
