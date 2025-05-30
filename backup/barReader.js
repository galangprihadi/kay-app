const result = document.getElementById("result");
const html5QrCode = new Html5Qrcode("reader");

startScanner();

function startScanner() {
    const containerWidth = document.getElementById("reader").clientWidth;
    html5QrCode.start(
        { facingMode: "environment" }, 
        {
            fps: 10,
            qrbox: { width: containerWidth, height: containerWidth },
            //formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.CODE_128]
            formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128]
        },
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.error(`Unable to start scanning: ${err}`);
    });

    result.textContent = "Scanning...";
}

function onScanSuccess(decodedText, decodedResult) {
    result.textContent = decodedText;
    stopScanner();
}

function onScanFailure(error) {
    // Optional
}

function stopScanner() {
    html5QrCode.stop().then(ignore => {
        console.log("Scan stopped.");
    }).catch(err => {
        console.error("Stop failed: ", err);
    });
}

