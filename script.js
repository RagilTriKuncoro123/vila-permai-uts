const villaCatalog = {
  panorama: { name: 'Vila Panorama', price: 1150000, capacity: 5, rooms: 2 },
  hutan: { name: 'Vila Hutan', price: 950000, capacity: 4, rooms: 1 },
  tepi: { name: 'Vila Tepi Danau', price: 1300000, capacity: 6, rooms: 3 }
};

const form = document.getElementById('bookingForm');
const guestName = document.getElementById('guestName');
const phone = document.getElementById('phone');
const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
const guestCount = document.getElementById('guestCount');
const roomCount = document.getElementById('roomCount');
const villaSelect = document.getElementById('villaSelect');
const summaryVillaName = document.getElementById('summaryVillaName');
const summaryPrice = document.getElementById('summaryPrice');
const summaryNights = document.getElementById('summaryNights');
const summaryRooms = document.getElementById('summaryRooms');
const summaryTotal = document.getElementById('summaryTotal');
const villaCards = document.querySelectorAll('.villa-card');

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function calculateNights(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end.getTime() - start.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.round(difference / (1000 * 60 * 60 * 24));
}

function updateSummary() {
  const selectedVillaKey = villaSelect.value;
  const selectedVilla = villaCatalog[selectedVillaKey];
  const nights = calculateNights(checkIn.value, checkOut.value);
  const roomTotal = Number(roomCount.value || 1);
  const total = selectedVilla.price * nights * roomTotal;

  summaryVillaName.textContent = selectedVilla.name;
  summaryPrice.textContent = formatRupiah(selectedVilla.price);
  summaryNights.textContent = nights > 0 ? `${nights} malam` : 'Belum ditentukan';
  summaryRooms.textContent = `${roomTotal} kamar`;
  summaryTotal.textContent = nights > 0 ? formatRupiah(total) : formatRupiah(selectedVilla.price * roomTotal);
}

function validateForm() {
  const errors = [];

  if (!guestName.value.trim()) {
    errors.push('Nama tamu wajib diisi.');
  }

  if (!phone.value.trim()) {
    errors.push('Nomor WhatsApp wajib diisi.');
  }

  if (!checkIn.value) {
    errors.push('Tanggal check-in harus dipilih.');
  }

  if (!checkOut.value) {
    errors.push('Tanggal check-out harus dipilih.');
  }

  if (checkIn.value && checkOut.value && calculateNights(checkIn.value, checkOut.value) <= 0) {
    errors.push('Tanggal check-out harus setelah tanggal check-in.');
  }

  const guestTotal = Number(guestCount.value || 0);
  if (guestTotal < 1 || guestTotal > 10) {
    errors.push('Jumlah tamu harus antara 1 sampai 10 orang.');
  }

  const selectedVilla = villaCatalog[villaSelect.value];
  if (guestTotal > selectedVilla.capacity) {
    errors.push(`Jumlah tamu melebihi kapasitas ${selectedVilla.name}.`);
  }

  const roomTotal = Number(roomCount.value || 0);
  if (roomTotal < 1 || roomTotal > 5) {
    errors.push('Jumlah kamar harus antara 1 sampai 5.');
  }

  return errors;
}

villaCards.forEach((card) => {
  card.addEventListener('click', () => {
    villaCards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
    const key = card.dataset.villa;
    villaSelect.value = key;
    updateSummary();
  });
});

[villaSelect, roomCount, guestCount, checkIn, checkOut].forEach((element) => {
  element.addEventListener('input', updateSummary);
  element.addEventListener('change', updateSummary);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const errors = validateForm();

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  const selectedVilla = villaCatalog[villaSelect.value];
  const nights = calculateNights(checkIn.value, checkOut.value);
  const roomTotal = Number(roomCount.value || 1);
  const total = selectedVilla.price * nights * roomTotal;

  alert(
    `Pesanan berhasil dibuat untuk ${guestName.value.trim()}\n` +
      `Vila: ${selectedVilla.name}\n` +
      `Durasi: ${nights} malam\n` +
      `Total: ${formatRupiah(total)}`
  );
});

checkIn.value = new Date(Date.now() + 86400000).toISOString().split('T')[0];
checkOut.value = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];
updateSummary();
// Hapus pesan kesalahan saat pengguna memperbaiki input
bookingForm.addEventListener("input", () => {
    if (resultBox.querySelector(".result_box_error")) {
        resultBox.replaceChildren();
    }
});
