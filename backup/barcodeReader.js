const resultEl = document.getElementById('result');

function onScanSuccess(decodedText, decodedResult) {
    resultEl.textContent = `✅ Detected: ${decodedText}`;
    // Stop scanning after first detection (optional)
    html5QrCode.stop().then(() => {
        console.log("Scan stopped.");
    }).catch(err => {
        console.error("Stop failed: ", err);
    });
}

function onScanFailure(error) {
    // Optional: log scan errors (noisy, so keep minimal)
}

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        
        // Kamera Depan
        const cameraId = devices[0].id; // default: first camera

        // Kamera Belakang
        //const backCam = devices.find(device => /back|rear|environment/i.test(device.label));
        //const cameraId = backCam ? backCam.id : devices[0].id; // fallback ke kamera pertama

        html5QrCode.start(
            cameraId,
            {
                fps: 10,              // frame per second
                qrbox: { width: 300, height: 300 },
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.CODE_128]
            },
            onScanSuccess,
            onScanFailure
        );
    } 
    else {
        resultEl.textContent = "Tidak ada kamera ditemukan.";
    }
}).
catch(err => {
    resultEl.textContent = `Kamera error: ${err}`;
});