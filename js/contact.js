(function () {
  var form = document.getElementById("desk-form");
  var statusEl = document.getElementById("form-status");
  var copyBtn = document.getElementById("copy-btn");
  var deskSelect = document.getElementById("desk-select");
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
  var preset = (params.get("desk") || "").toLowerCase();
  if (preset && deskSelect) {
    var allowed = { person: 1, political: 1, corporate: 1, general: 1 };
    if (allowed[preset]) deskSelect.value = preset;
  }

  function packet() {
    var data = new FormData(form);
    var desk = (data.get("desk") || "general").toString();
    var name = (data.get("name") || "").toString().trim();
    var email = (data.get("email") || "").toString().trim();
    var org = (data.get("org") || "").toString().trim();
    var message = (data.get("message") || "").toString().trim();
    var lines = [
      "Twenty Block Media — desk note",
      "Desk: " + desk,
      "Name: " + name,
      "Email: " + email,
      org ? "Organization: " + org : "",
      "",
      message
    ].filter(function (line, i, arr) {
      return line !== "" || arr[i - 1] === "";
    });
    return {
      desk: desk,
      name: name,
      email: email,
      message: message,
      text: lines.join("\n"),
      valid: !!(name && email && message && desk)
    };
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var note = packet();
    if (!note.valid) {
      setStatus("Please add a name, email, desk, and message.");
      return;
    }
    var subject = "Twenty Block Media — " + note.desk + " desk";
    var href =
      "mailto:contact@twentyblockmedia.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(note.text);
    setStatus("Opening a draft to contact@twentyblockmedia.com.");
    window.location.href = href;
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var note = packet();
      if (!note.valid) {
        setStatus("Please add a name, email, desk, and message before copying.");
        return;
      }
      var done = function () {
        setStatus("Copied. Send it to contact@twentyblockmedia.com or info@twentyblockmedia.com.");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(note.text).then(done).catch(function () {
          setStatus("Could not copy automatically. Select the composed draft instead.");
        });
      } else {
        setStatus("Clipboard is not available here. Use Compose email draft.");
      }
    });
  }
})();
