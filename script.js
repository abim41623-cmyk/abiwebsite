// Tunggu hingga seluruh DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIKA AI SCANNER ---
    const imageInput = document.getElementById('imageInput');
    const resultDiv = document.getElementById('result');
    const predictionText = document.getElementById('prediction');

    // Listener saat pengguna memilih file
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Tampilkan pratinjau (opsional, bisa ditambah ke UI)
            console.log("File dipilih: " + file.name);

            // Munculkan kotak hasil dengan status loading
            resultDiv.classList.remove('hidden');
            resultDiv.style.display = 'block'; // Pastikan terlihat jika tidak pakai Tailwind
            predictionText.innerHTML = `<i class="fas fa-spinner fa-spin"></i> AI sedang menganalisis objek...`;
            predictionText.style.color = "#2d6a4f";

            // Simulasi Proses AI (Biasanya di sini Anda memanggil API dari Python/TensorFlow)
            setTimeout(() => {
                const hasilAnalisis = simulasiAI(file.name);
                tampilkanHasil(hasilAnalisis);
            }, 2500);
        }
    });

    // Fungsi simulasi klasifikasi berdasarkan nama file/random
    function simulasiAI(fileName) {
        const databaseHasil = [
            {
                label: "Sampah Plastik (Anorganik)",
                info: "Ini adalah sampah PET. Disarankan untuk dicuci dan diserahkan ke Bank Sampah terdekat.",
                warna: "#155724"
            },
            {
                label: "Daun/Sisa Makanan (Organik)",
                info: "Sampah ini bisa diolah menjadi kompos cair atau pupuk padat di rumah.",
                warna: "#2d6a4f"
            },
            {
                label: "Limbah B3 (Berbahaya)",
                info: "Peringatan! Ini termasuk limbah berbahaya (baterai/elektronik). Jangan dibuang sembarangan!",
                warna: "#721c24"
            }
        ];

        // Ambil hasil secara acak untuk keperluan demo
        return databaseHasil[Math.floor(Math.random() * databaseHasil.length)];
    }

    function tampilkanHasil(data) {
        predictionText.innerHTML = `
            <strong style="display:block; font-size: 1.2rem;">${data.label}</strong>
            <p style="margin-top: 5px;">${data.info}</p>
            <button onclick="lokasiAction()" style="margin-top:10px; padding:5px 10px; background:#fff; border-radius:5px; border:1px solid #ccc; cursor:pointer;">
                <i class="fas fa-map-marker-alt"></i> Cari Bank Sampah Terdekat
            </button>
        `;
        resultDiv.style.backgroundColor = "#d8f3dc";
        predictionText.style.color = data.warna;
    }

    // --- 2. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 3. EDUKASI INTERAKTIF (GAMIFIKASI) ---
    window.lokasiAction = function() {
        alert("Fitur GPS sedang mengakses lokasi Anda untuk mencari Bank Sampah terdekat...");
    };

});
