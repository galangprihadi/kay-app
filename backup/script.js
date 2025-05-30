// Ensure you have included the Html5Qrcode library in your HTML file
// <script src="https://unpkg.com/html5-qrcode/minified/html5-qrcode.min.js"></script>

const html5QrCode = new Html5Qrcode("reader");
let isScanning = false;

function startScanner() {
    const containerWidth = document.getElementById("reader").clientWidth;
    html5QrCode.start(
        { facingMode: "user" }, 
        {
            fps: 10,
            qrbox: { width: containerWidth, height: containerWidth }
        },
        (decodedText, decodedResult) => {
            // Handle the scanned QR code result
            document.getElementById("result").textContent = decodedText;
        },
        (errorMessage) => {
            // Handle errors
            console.warn(`QR Code scan error: ${errorMessage}`);
        }
    ).catch(err => {
        console.error(`Unable to start scanning: ${err}`);
    });
}

function stopScanner() {
    html5QrCode.stop().then(ignore => {
        // QR Code scanning is stopped.
    }).catch(err => {
        console.error(`Error stopping the scanner: ${err}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    //const startButton = document.getElementById('start-button');
    //const stopButton = document.getElementById('stop-button');
    const scannedCode = document.getElementById('scanned-code');
    const toggleButton = document.getElementById('toggle-button');

    /*startButton.addEventListener('click', () => {
        startScanner();
    });

    stopButton.addEventListener('click', () => {
        stopScanner();
    });*/

    toggleButton.addEventListener('click', () => {
        if (isScanning) {
            stopScanner();
            toggleButton.textContent = 'Start Scan';
        } else {
            startScanner();
            toggleButton.textContent = 'Stop Scan';
        }
        isScanning = !isScanning;
    });
});