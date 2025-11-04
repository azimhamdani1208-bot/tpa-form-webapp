// -------------------- GOOGLE SHEETS ENDPOINT --------------------
// TODO: paste your Apps Script Web App URL below
const DEFAULT_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzVPk-VoeiajejD4sRZ9FWRD_VB9lrXM3fqUkMGdsCTisdTYJ-dBYSVM9BkszfTu7eMsw/exec"; // e.g. https://script.google.com/macros/s/AKfycb.../exec
const DEFAULT_API_KEY = "change-me"; // must match Apps Script

const SHEETS_ENDPOINT = (typeof window !== "undefined" && window.SHEETS_ENDPOINT) || DEFAULT_SHEETS_ENDPOINT;
const API_KEY = (typeof window !== "undefined" && window.API_KEY) || DEFAULT_API_KEY;

// -------------------- SCHOOL LIST (dropdown) --------------------
const SCHOOLS = [
  "Maktab Anthony Abell","Maktab Duli Pg Muda Al-Muhtadee Billah","Maktab Sains Paduka Seri Begawan Sultan","Maktab Sultan Omar Ali Saifuddin",
  "Pusat Tingkatan Enam Belait","Pusat Tingkatan Enam Meragang","Pusat Tingkatan Enam Sengkurong","Pusat Tingkatan Enam Tutong",
  "Sekolah Menengah Awang Semaun","Sekolah Menengah Berakas","Sekolah Menengah Katok","Sekolah Menengah Lambak Kiri","Sekolah Menengah Masin",
  "Sekolah Menengah Menglait","Sekolah Menengah Muda Hashim","Sekolah Menengah Pehin Datu Seri Maharaja",
  "Sekolah Menengah Pengiran Isteri Hajah Mariam","Sekolah Menengah Perdana Wazir","Sekolah Menengah Pg Anak Puteri Hajah Masna",
  "Sekolah Menengah Pg Anak Puteri Hajah Rashidah Sa'adatul Bolkiah","Sekolah Menengah Pg Jaya Negara Pg Haji Abu Bakar",
  "Sekolah Menengah Raja Isteri Pg Anak Saleha","Sekolah Menengah Rimba","Sekolah Menengah Rimba II","Sekolah Menengah Sayyidina ‘Umar Al-Khattab",
  "Sekolah Menengah Sayyidina Abu Bakar","Sekolah Menengah Sayyidina Ali","Sekolah Menengah Sayyidina Hasan","Sekolah Menengah Sayyidina Husain",
  "Sekolah Menengah Sayyidina Othman Tutong","Sekolah Menengah Sufri Bolkiah","Sekolah Menengah Sultan Hassan Bangar",
  "Sekolah Menengah Sultan Muhammad Jamalul Alam","Sekolah Menengah Sultan Sharif Ali","Sekolah Menengah Tanjong Maya",
  "Sekolah Rendah Abdul Rashid Tanjong Maya","Sekolah Rendah Ahmad Tajuddin","Sekolah Rendah Amar Pahlawan","Sekolah Rendah Amo",
  "Sekolah Rendah Anggerek Desa","Sekolah Rendah Awang Haji Mohd Yusof Katimahar","Sekolah Rendah Bakiau","Sekolah Rendah Batang Mitus",
  "Sekolah Rendah Batu Marang","Sekolah Rendah Bebuloh","Sekolah Rendah Bendahara Lama","Sekolah Rendah Bendahara Sakam Bunut",
  "Sekolah Rendah Bengkurong","Sekolah Rendah Benutan","Sekolah Rendah Berakas Garrison","Sekolah Rendah Beribi Telanai",
  "Sekolah Rendah Binturan","Sekolah Rendah Birau","Sekolah Rendah Bukit Panggal","Sekolah Rendah Bukit Udal","Sekolah Rendah Danau",
  "Sekolah Rendah Dato Basir","Sekolah Rendah Dato Maharaja Setia Dian Sukang","Sekolah Rendah Dato Marsal","Sekolah Rendah Dato Mohd Yassin",
  "Sekolah Rendah Dato Othman","Sekolah Rendah Dato Pemanca Saging Ukong","Sekolah Rendah Datu Mahawangsa Lambak",
  "Sekolah Rendah Datu Ratna Hj Muhd Jaafar Kiarong","Sekolah Rendah Delima Satu","Sekolah Rendah Haji Mohd Jaafar Maun Kiulap",
  "Sekolah Rendah Haji Mohd Salleh Sungai Hanching","Sekolah Rendah Haji Tarif","Sekolah Rendah Jerudong","Sekolah Rendah Junjongan",
  "Sekolah Rendah Kampong Bukit","Sekolah Rendah Kampong Mata-Mata","Sekolah Rendah Kampong Menengah","Sekolah Rendah Kapok, Muara",
  "Sekolah Rendah Kasat","Sekolah Rendah Katok A","Sekolah Rendah Katok B","Sekolah Rendah Keriam","Sekolah Rendah Kiudang",
  "Sekolah Rendah Kuala Belait","Sekolah Rendah Labi","Sekolah Rendah Labu Estate","Sekolah Rendah Lambak Kanan Jalan 49",
  "Sekolah Rendah Lamunin","Sekolah Rendah Lubok Pulau","Sekolah Rendah Lumapas","Sekolah Rendah Lumut","Sekolah Rendah Mabohai",
  "Sekolah Rendah Masin","Sekolah Rendah Melilas","Sekolah Rendah Mentiri","Sekolah Rendah Merangking","Sekolah Rendah Muda Hashim",
  "Sekolah Rendah Muhammad Alam","Sekolah Rendah Mulaut","Sekolah Rendah Nakhoda Abdul Rashid Menunggol","Sekolah Rendah Negalang",
  "Sekolah Rendah Orang Kaya Ali Wanika Setia Diraja, Kupang","Sekolah Rendah Orang Kaya Besar Imas Subok",
  "Sekolah Rendah Orang Kaya Panglima Barandai Bukit Sawat","Sekolah Rendah Orang Kaya Setia Bakti Kilanas",
  "Sekolah Rendah Paduka Seri Begawan Sultan Omar Ali Saifuddien","Sekolah Rendah Panaga","Sekolah Rendah Panchong",
  "Sekolah Rendah Panchor Murai","Sekolah Rendah Panglima Barudin Limau Manis","Sekolah Rendah Pantai Berakas",
  "Sekolah Rendah Pehin Dato Jamil","Sekolah Rendah Penanjong","Sekolah Rendah Penapar",
  "Sekolah Rendah Pengiran Anak Puteri Besar Sungai Kebun","Sekolah Rendah Pengiran Dipa Negara Pengiran Jaya, Sengkarai",
  "Sekolah Rendah Pengiran Kesuma Negara Bukit Beruang","Sekolah Rendah Pengiran Muda Mahkota",
  "Sekolah Rendah Pengiran Pekerma Setia Diraja Sahibul Bandar","Sekolah Rendah Pengiran Setia Jaya Pengiran Abdul Momin, Kg Pandan",
  "Sekolah Rendah Pengiran Setia Negara Pengiran Mohd Yusof","Sekolah Rendah Pengkalan Batu",
  "Sekolah Rendah Perpindahan Kampong Bukit Beruang II","Sekolah Rendah Perpindahan Kg Lambak Kanan Jalan 10",
  "Sekolah Rendah Pintu Malim","Sekolah Rendah Pulaie","Sekolah Rendah Puni","Sekolah Rendah Pusar Ulak","Sekolah Rendah Putat",
  "Sekolah Rendah Raja Isteri Fatimah","Sekolah Rendah Rambai","Sekolah Rendah Rataie","Sekolah Rendah Rimba I",
  "Sekolah Rendah Rimba II","Sekolah Rendah Rimba III","Sekolah Rendah Saba Darat","Sekolah Rendah Selangan",
  "Sekolah Rendah Selapon","Sekolah Rendah Semabat","Sekolah Rendah Sengkurong","Sekolah Rendah Serasa","Sekolah Rendah Sinaut",
  "Sekolah Rendah Sultan Abdul Bubin Sungai Besar","Sekolah Rendah Sultan Hashim Batu Apoi","Sekolah Rendah Sultan Hassan Bangar",
  "Sekolah Rendah Sultan Umar Ali Saifuddien Muara","Sekolah Rendah Sungai Liang","Sekolah Rendah Sungai Siamas",
  "Sekolah Rendah Sungai Tali Lumut II, Belait","Sekolah Rendah Sungai Teraban","Sekolah Rendah Tanah Jambu",
  "Sekolah Rendah Tanjong Kindana","Sekolah Rendah Tentera Laut Diraja Brunei","Sekolah Rendah Tumpuan Telisai",
  "Sekolah Rendah Tungku","Sekolah Rendah Tutong Kem","Sekolah Sukan","Sekolah Tinggi Perempuan Raja isteri"
];
const _set = new Set(SCHOOLS.map(s => s.trim()));
const SCHOOLS_SORTED = Array.from(_set).sort((a,b) => a.localeCompare(b, "ms"));
function populateSchoolDropdown() {
  const sel = document.getElementById("metaSchool");
  if (!sel) return;
  sel.querySelectorAll("option:not([disabled])").forEach(o => o.remove());
  SCHOOLS_SORTED.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}
document.addEventListener("DOMContentLoaded", populateSchoolDropdown);

// -------------------- CLASS / CLUSTER / METHODS --------------------
const CLASS_YEARS = ["Pra","Y1","Y2","Y3","Y4","Y5","Y6","Y7","Y8","Y9","Y10","Y11","PU1","PU2","Multiple Level"];
const CLUSTERS = ["C_1","C_2","C_3","C_4","C_5","C_6"];
const METHODS_OF_LEARNING = [
  "Pembelajaran di Sekolah / Study at School (S@S)",
  "S@S (Dengan penjarakan sosial / Social Distancing)",
  "Pembelajaran dan Pengajaran dalam Talian / Online Lessons",
  "Home Learning Packs (HLP)"
];
function populateSimpleSelect(id, values){
  const sel = document.getElementById(id);
  if(!sel) return;
  sel.querySelectorAll("option:not([disabled])").forEach(o=>o.remove());
  values.forEach(v=>{
    const opt=document.createElement("option");
    opt.value=v; opt.textContent=v; sel.appendChild(opt);
  });
}
document.addEventListener("DOMContentLoaded", ()=>{
  populateSimpleSelect("metaClassYear", CLASS_YEARS);
  populateSimpleSelect("metaCluster", CLUSTERS);
  populateSimpleSelect("metaMethod", METHODS_OF_LEARNING);
});

// -------------------- LEVEL → SUBJECTS (DEPENDENT) --------------------
const LEVEL_SUBJECTS = {
  "Pra-Sekolah": [
    "PRA - LITERACY (ENGLISH)","PRA - LITERASI (BAHASA MELAYU)","PRA - NUMERACY / MATHS","PRA - AWAL SAINS",
    "PRA - SENI / KREATIF","PRA - ASUHAN BUDI","PRA - UGAMA","PRA - ICT"
  ],
  "Sekolah Rendah (Primary)": [
    "PRI - BAHASA MELAYU","PRI - ENGLISH LANGUAGE","PRI - MATHEMATICS","PRI - SCIENCE",
    "PRI - PENGETAHUAN UGAMA ISLAM","PRI - SOCIAL STUDIES","PRI - ART & CRAFT / DESIGN",
    "PRI - PENDIDIKAN JASMANI","PRI - MIB","PRI - ICT","SENA - MATEMATIK","SENA - BAHASA MELAYU","SENA - LAIN-LAIN/ OTHERS"
  ],
  "Integrated Curriculum (Primary Extension)": [
    "INTEGRATED CURRICULUM - ASAS PENGETAHUAN UGAMA ISLAM",
    "INTEGRATED CURRICULUM - LITERASI BAHASA MELAYU (MIB)",
    "INTEGRATED CURRICULUM - LITERASI BAHASA MELAYU (LRB)",
    "INTEGRATED CURRICULUM - ENGLISH LITERACY (SCIENCE)",
    "INTEGRATED CURRICULUM - ENGLISH LITERACY (ICT)",
    "INTEGRATED CURRICULUM - NUMERACY",
    "INTEGRATED CURRICULUM - PHYSICAL EDUCATION"
  ],
  "Menengah Bawah (Lower Secondary)": [
    "LSEC - BAHASA MELAYU","LSEC - ENGLISH LANGUAGE","LSEC - MATHEMATICS","LSEC - SCIENCE",
    "LSEC - PENGETAHUAN UGAMA ISLAM","LSEC - MIB","LSEC - PENDIDIKAN JASMANI","LSEC - BAT",
    "LSEC - SOCIAL STUDIES","LSEC - MARINE SCIENCE","LSEC - ARABIC (OPTION)","LSEC - DRAMA (OPTION)",
    "LSEC - COMPUTER (OPTION)","LSEC - JAPANESE (OPTION)","LSEC - FRENCH (OPTION)","LSEC - LAIN-LAIN/ OTHERS"
  ],
  "Menengah Atas (Upper Secondary)": [
    "USEC - ENGLISH LANGUAGE","USEC - BAHASA MELAYU","USEC - LITERATURE IN ENGLISH","USEC - MALAY LITERATURE",
    "USEC - ISLAMIC RELIGIOUS KNOWLEDGE","USEC - ULUM AL-QURAN","USEC - HAFAZ AL-QURAN","USEC - TAFSIR AL-QURAN",
    "USEC - HISTORY (MODERN WORLD AFFAIRS)","USEC - HISTORY","USEC - COMPUTER SCIENCE","USEC - GEOGRAPHY",
    "USEC - SOCIOLOGY","USEC - ECONOMICS","USEC - ARABIC","USEC - MATHEMATICS SYALLABUS D",
    "USEC - ADDITIONAL MATHEMATICS","USEC - STATISTICS","USEC - AGRICULTURE","USEC - PHYSICS",
    "USEC - CHEMISTRY","USEC - BIOLOGY","USEC - COMBINED SCIENCE","USEC - DESIGN AND TECHNOLOGY",
    "USEC - FOOD AND NUTRITION","USEC - ART & DESIGN","USEC - TRAVEL AND TOURISM","USEC - COMMERCE",
    "USEC - COMMERCIAL STUDIES","USEC - MARINE SCIENCE","USEC - JAPANESE","USEC - ACCOUNTING",
    "USEC - BUSINESS STUDIES","USEC - PRAVOCATIONAL SUBJECTS","USEC - BTEC SUBJECTS","USEC - TARBIYAH ISLAM",
    "USEC - MIB","USEC - OTHERS"
  ],
  "IGCSE Level": [
    "IGCSE PHYSICAL EDUCATION","IGCSE ICT","IGCSE DESIGN AND TECHNOLOGY","IGCSE BUSINESS STUDIES",
    "IGCSE ACCOUNTING","IGCSE TRAVEL AND TOURISM","IGCSE ENGLISH AS A SECOND LANGUAGE (CORE)",
    "IGCSE ENGLISH AS A SECOND LANGUAGE (EXTENDED)","IGCSE MARINE SCIENCE","IGCSE JAPANESE",
    "IGCSE FRENCH","IGCSE MATHEMATICS (CORE)","IGCSE MATHEMATICS (EXTENDED)"
  ],
  "Pra-U / Sixth Form": [
    "SF - GENERAL PAPER","SF - LANGUAGE AND LITERATURE IN ENGLISH","SF - HAFAZ AL-QURAN","SF - SYARIAH","SF - USULUDDIN","SF - LAW",
    "SF - ENGLISH LANGUAGE","SF - BAHASA MELAYU","SF - FURTHER MATHEMATICS","SF - FOOD STUDIES","SF - HISTORY",
    "SF - TRAVEL AND TOURISM","SF - PHYSICAL EDUCATION","SF - COMPUTER SCIENCE","SF - BUSINESS","SF - THINKING SKILLS",
    "SF - LITERATURE IN ENGLISH","SF - GEOGRAPHY","SF - PSYCHOLOGY","SF - SOCIOLOGY","SF - BIOLOGY","SF - CHEMISTRY","SF - PHYSICS",
    "SF - ART AND DESIGN","SF - DESIGN AND TECHNOLOGY","SF - ACCOUNTING","SF - ECONOMICS","SF - MATHEMATICS","SF - APPLIED ICT","SF - OTHERS"
  ]
};

const levelSel = document.getElementById("metaLevel");
const subjectSel = document.getElementById("metaSubject");

function populateLevelDropdown() {
  Array.from(levelSel.querySelectorAll("option:not([disabled])")).forEach(o => o.remove());
  Object.keys(LEVEL_SUBJECTS)
    .slice()
    .sort((a,b)=>a.localeCompare(b,"ms"))
    .forEach(level => {
      const opt = document.createElement("option");
      opt.value = level; opt.textContent = level; levelSel.appendChild(opt);
    });
}
function populateSubjectDropdown(level) {
  subjectSel.innerHTML = '<option value="" disabled selected>Pilih subjek…</option>';
  const list = LEVEL_SUBJECTS[level] || [];
  list.slice().sort((a,b)=>a.localeCompare(b,"ms")).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name; opt.textContent = name; subjectSel.appendChild(opt);
  });
  subjectSel.disabled = list.length === 0;
}
document.addEventListener("DOMContentLoaded", () => {
  populateLevelDropdown();
  populateSubjectDropdown("");
});
levelSel.addEventListener("change", () => {
  populateSubjectDropdown(levelSel.value);
  subjectSel.value = "";
  document.dispatchEvent(new CustomEvent("meta-level-changed", { detail:{ level: levelSel.value } }));
});
subjectSel.addEventListener("change", () => {
  document.dispatchEvent(new CustomEvent("meta-subject-changed", { detail:{ level: levelSel.value, subject: subjectSel.value } }));
});

// -------------------- SECTIONS --------------------
const SECTIONS = [
  { id: "A", title: "Bahagian A: Pencapaian Pelajar", note: "Umur, peringkat dan kebolehan pelajar adalah diambil kira.", items: [
    { code: "A1", label: "Pengetahuan Mata Pelajaran / Subject Knowledge", allowNA: true },
    { code: "A2", label: "Kefahaman Mata Pelajaran", allowNA: true },
    { code: "A3", label: "Pengaplikasian Mata Pelajaran", allowNA: true },
    { code: "A4", label: "Analisis dan Penilaian" },
    { code: "A5", label: "Kreativiti dalam Pembelajaran" },
  ]},
{ id: "B", title: "Bahagian B: Pembelajaran Pelajar", note: "Umur, peringkat dan kebolehan pelajar adalah diambil kira.", items: [
    { code: "B1", label: "Komunikasi", allowNA: true },
    { code: "B2", label: "Persediaan", allowNA: true },
    { code: "B3", label: "Penglibatan", allowNA: true },
    { code: "B4", label: "Pengaplikasian Kemahiran Mata Pelajaran", allowNA: true },
    { code: "B5", label: "Sikap Mandiri / Inisiatif", allowNA: true },
    { code: "B6", label: "Kemahiran ICT", allowNA: true },
    { code: "B7", label: "Kolaborasi", allowNA: true },
    { code: "B8", label: "Penggunaan Sumber", allowNA: true },
    { code: "B9", label: "Kebolehan dalam Menyelesaikan Tugasan", allowNA: true },
  ]},
  { id: "C", title: "Bahagian C: Pengajaran Guru", note: "6 Standard, 17 Kompetensi Teras.", items: [
    { code: "C1.1", label: "Menentukan Keupayaan Pelajar" },
    { code: "C1.2", label: "Menetapkan Jangkaan yang Tinggi" },
    { code: "C1.3a", label: "Amalan Bertanya — Cara Menyoal" },
    { code: "C1.3b", label: "Amalan Bertanya — Jenis Soalan" },
    { code: "C1.3c", label: "Amalan Bertanya — Respons Jawapan Pelajar" },
    { code: "C1.3d", label: "Amalan Bertanya — Penglibatan Menyeluruh" },
    { code: "C2.1", label: "Pengetahuan Mata Pelajaran Guru" },
    { code: "C2.2", label: "Rancangan Pengajaran" },
    { code: "C2.3a", label: "Pengurusan Tingkah Laku" },
    { code: "C2.3b", label: "Pengurusan Masa/Struktur" },
    { code: "C2.3c", label: "Pengaturan Kumpulan" },
    { code: "C2.4", label: "Sumber-sumber Pembelajaran" },
    { code: "C3.1", label: "Mencabar Pelajar mengikut Keperluan Individu" },
    { code: "C3.2", label: "Memperkembangkan Kefahaman & Kemahiran" },
    { code: "C4.1a", label: "Objektif Pembelajaran Dikongsi/Jelas" },
    { code: "C4.1b", label: "Pelarasan Berdasarkan Penilaian & Maklum Balas" },
    { code: "C4.2", label: "Merancang Penilaian" },
    { code: "C4.3", label: "Menggunakan Penilaian untuk Mendorong Pembelajaran" },
    { code: "C5.1", label: "Mempertingkat Amalan Profesional" },
    { code: "C5.2", label: "Mengamalkan Amalan Profesional" },
    { code: "C6.1", label: "Etika & Moral Tinggi" },
    { code: "C6.2", label: "Kehadiran & Ketepatan Masa" },
    { code: "C6.3", label: "Maklum Polisi/Peraturan Rasmi" },
  ]}
];

// -------------------- RUBRICS (teks tepat) --------------------
const RUBRICS = { 
 
 /* ===== A1–A5 ===== */
      "A1": { title:"Pengetahuan Mata Pelajaran", prompt:"Sejauh manakah pelajar dapat mengingat maklumat, fakta dan angka, konsep serta istilah?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menguasai isi pelajaran dengan menunjukkan keupayaan untuk mengamati dan mengingat maklumat, seperti tarikh, peristiwa, tempat dan idea utama.",
        2:"Sebahagian pelajar menguasai isi pelajaran dengan menunjukkan keupayaan untuk mengamati dan mengingat maklumat, seperti tarikh, peristiwa, tempat dan idea utama.",
        3:"Majoriti pelajar menguasai isi pelajaran dengan menunjukkan keupayaan untuk mengamati dan mengingat maklumat, seperti tarikh, peristiwa, tempat dan idea utama.",
        4:"Majoriti pelajar mempunyai keupayaan yang tinggi dalam mengamati dan mengingati maklumat, seperti tarikh, acara, tempat dan idea utama. Selain itu, pelajar menguasai isi pelajaran dengan menunjukkan, menceritakan, menyenaraikan, melabel/menandakan, mengumpulkan, menggambarkan, menyusun penjadualan mengenal pasti, mendefinisikan, memeriksa dan sebagainya.",
        5:"Majoriti pelajar mempunyai keupayaan yang tinggi dan sebahagiannya mempunyai keupayaan yang melangkaui tahap peringkat mereka dalam mengamati dan mengingati maklumat seperti tarikh, peristiwa, tempat dan idea utama, menguasai isi pelajaran dengan menunjukkan, menceritakan, menyenaraikan, melabel/menandakan, mengumpulkan, menggambarkan, menyusun penjadualan, mengenal pasti, mendefinisikan, memeriksa dan sebagainya."}},
      "A2": { title:"Kefahaman Mata Pelajaran", prompt:"Sejauh manakah pelajar dapat menunjukkan kefahaman isi pelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menguasai isi pelajaran bagi memahami dan memberi makna; sama ada menterjemah pengetahuan dalam konteks baru, mentafsir fakta, membandingkan, menentukan tahap perbezaan, menyusun, mengkategorikan atau meramal sebab akibat dan membuat kesimpulannya.",
        2:"Sebahagian pelajar menguasai isi pelajaran bagi memahami dan memberi makna; sama ada menterjemah pengetahuan dalam konteks baru, mentafsir fakta, membandingkan, menentukan tahap perbezaan, menyusun, mengkategorikan, atau meramal sebab akibat dan membuat kesimpulannya.",
        3:"Majoriti pelajar menguasai isi pelajaran bagi memahami dan memberi makna; sama ada menterjemah pengetahuan dalam konteks baru, mentafsir fakta, membandingkan, menentukan tahap perbezaan, menyusun, mengkategorikan, atau meramal sebab akibat dan membuat kesimpulannya.",
        4:"Majoriti pelajar mempunyai keupayaan yang tinggi dalam menguasai isi pelajaran bagi memahami dan memberi makna; menterjemah pengetahuan dalam konteks baru, mentafsir fakta, membandingkan, menentukan tahap perbezaan, menyusun, mengkategorikan, meramal sebab akibat dan membuat kesimpulannya.",
        5:"Majoriti pelajar mempunyai keupayaan yang tinggi dan sebahagiannya melebihi jangkaan bagi memahami dan memberi makna; menterjemah pengetahuan dalam konteks baru, mentafsir fakta, membandingkan, menentukan tahap perbezaan, menyusun, mengkategorikan, meramal sebab akibat dan membuat kesimpulannya."}},
      "A3": { title:"Pengaplikasian Mata Pelajaran", prompt:"Sejauh manakah pelajar menunjukkan keupayaan dalam mengaplikasikan isi pelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menunjukkan keupayaan dalam mengaplikasi maklumat isi pelajaran, idea, kaedah, kemahiran, konsep/teori dalam konteks yang berlainan atau penyelesaian masalah.",
        2:"Sebahagian pelajar menunjukkan keupayaan dalam mengaplikasi maklumat isi pelajaran, idea, kaedah, kemahiran, konsep/teori dalam konteks yang berlainan atau penyelesaian masalah.",
        3:"Majoriti pelajar menunjukkan keupayaan dalam mengaplikasi maklumat isi pelajaran, idea, kaedah, kemahiran, konsep/teori dalam konteks yang berlainan atau penyelesaian masalah.",
        4:"Majoriti pelajar mengaplikasi maklumat isi pelajaran dengan pelbagai cara yang kompleks. Mereka berupaya mengaplikasikan, idea, kaedah, kemahiran, konsep/teori dalam konteks yang berlainan atau penyelesaian masalah.",
        5:"Majoriti pelajar mengaplikasi maklumat isi pelajaran dengan pelbagai cara yang kompleks. Sebahagian daripada mereka berupaya mengaplikasi pada tahap di luar jangkaan. Mereka berkeupayaan tinggi, cekap dalam menerapkan idea, kaedah, kemahiran, konsep/teori dalam konteks yang berlainan atau penyelesaian masalah."}},
      "A4": { title:"Analisis dan Penilaian", prompt:"Sejauh manakah pelajar kompeten dalam menganalisis dan membuat penilaian?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar kompeten dalam menganalisis (membanding, menentukan tahap perbezaan, membezakan, mengenal pasti keunikan dll) dan menilai (mengukur, menjustifikasikan/ menghujah, meneliti semula dll).",
        2:"Sebahagian pelajar kompeten dalam menganalisis (membanding, menentukan tahap perbezaan, membezakan, mengenal pasti keunikan dll) dan menilai (mengukur, menjustifikasikan/ menghujah, meneliti semula dll).",
        3:"Majoriti pelajar kompeten dalam menganalisis (membanding, menentukan tahap perbezaan, membezakan, mengenal pasti keunikan dll) dan menilai (mengukur, menjustifikasikan/ menghujah, meneliti semula dll).",
        4:"Majoriti pelajar mempunyai kompetensi yang tinggi dalam menganalisis (membanding, menentukan tahap perbezaan, membezakan, mengenal pasti keunikan dll) dan menilai (mengukur, menjustifikasikan/ menghujah, meneliti semula dll).",
        5:"Majoriti pelajar mempunyai kompetensi yang sangat tinggi dalam menganalisis (membanding, menentukan tahap perbezaan, membezakan, mengenal pasti keunikan dll) dan menilai (mengukur, menjustifikasikan/ menghujah, meneliti semula dll). Sebahagian daripada mereka menunjukkan kompetensi di luar jangkaan."}},
      "A5": { title:"Kreativiti dalam Pembelajaran", prompt:"Sejauh manakah kreativiti dan inovasi pelajar dalam pembelajaran melalui aspek (A1-A4)?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar yang kompeten dalam menyusun idea atau elemen untuk membina pendapat dan hasil pembelajaran yang baru.",
        2:"Sebahagian pelajar yang kompeten dalam menyusun idea atau elemen untuk membina pendapat dan hasil pembelajaran yang baru.",
        3:"Majoriti pelajar kompeten dalam menyusun idea atau elemen untuk membina pendapat dan hasil pembelajaran yang baru.",
        4:"Majoriti pelajar menunjukkan tahap kompetensi yang tinggi dalam menyusun idea atau elemen untuk membina pendapat dan hasil pembelajaran yang baru.",
        5:"Majoriti pelajar menunjukkan kompetensi yang sangat tinggi dengan menyusun idea atau elemen untuk membina pendapat dan hasil pembelajaran yang baru. Sebahagian daripada mereka mempunyai kreativiti di luar jangkaan."}},

      /* ===== B1–B9 ===== */
      "B1": { title:"Komunikasi", prompt:"Sejauh manakah pelajar menunjukkan kemahiran berkomunikasi bagi memenuhi jangkaan dalam pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menunjukkan kemahiran komunikasi yang baik dalam melahirkan idea-idea yang jelas serta berkesan sama ada melalui lisan dan/atau tulisan bagi memenuhi jangkaan pembelajaran.",
        2:"Sebahagian pelajar menunjukkan kemahiran komunikasi yang baik dalam melahirkan idea-idea yang jelas serta berkesan sama ada melalui lisan dan/atau tulisan bagi memenuhi jangkaan pembelajaran.",
        3:"Majoriti pelajar menunjukkan kemahiran komunikasi yang baik dalam melahirkan idea-idea yang jelas serta berkesan sama ada melalui lisan dan/atau tulisan bagi memenuhi jangkaan pembelajaran.",
        4:"Majoriti pelajar dapat menunjukkan kemahiran komunikasi yang tinggi dalam melahirkan idea-idea yang jelas serta berkesan sama ada melalui lisan dan/atau tulisan bagi memenuhi jangkaan pembelajaran.",
        5:"Majoriti pelajar dapat menunjukkan kemahiran komunikasi yang tinggi dalam melahirkan idea-idea yang jelas serta berkesan sama ada melalui lisan dan/atau tulisan bagi memenuhi jangkaan pembelajaran. Sebahagian daripada mereka mempunyai kemahiran komunikasi di luar jangkaan."}},
      "B2": { title:"Persediaan", prompt:"Sejauh manakah pelajar menunjukkan tahap kesediaan untuk pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menunjukkan kesediaan belajar dengan penyediaan minda yang sewajarnya dan bahan-bahan pembelajaran yang mencukupi (nota, kerja tulis, pen dan buku teks dll).",
        2:"Sebahagian pelajar menunjukkan kesediaan belajar dengan penyediaan minda yang sewajarnya dan bahan-bahan pembelajaran yang mencukupi (nota, kerja tulis, pen dan buku teks dll).",
        3:"Majoriti pelajar menunjukkan kesediaan dengan penyediaan minda yang baik serta bahan-bahan pembelajaran yang mencukupi (nota, kerja tulis, pen dan buku teks dll).",
        4:"Majoriti pelajar menunjukkan kesediaan dan dapat mengikuti pembelajaran dengan lancar dengan penyediaan minda yang sangat baik serta bahan-bahan pembelajaran yang mencukupi (nota, kerja tulis, pen dan buku teks dll).",
        5:"Majoriti pelajar menunjukkan kesediaan dan dapat mengikuti pembelajaran dengan lancar dengan penyediaan minda yang sangat baik serta bahan-bahan pembelajaran yang lengkap dan terkini (nota, kerja tulis, pen dan buku teks dll). Sebahagian daripada mereka mempunyai kesediaan untuk belajar yang di luar jangkaan."}},
      "B3": { title:"Penglibatan", prompt:"Bagaimanakah sikap, penglibatan dan tumpuan pelajar dalam pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menunjukkan sikap yang positif, penglibatan aktif dan memberikan tumpuan dalam pembelajaran.",
        2:"Sebahagian pelajar menunjukkan sikap yang positif, penglibatan aktif dan memberikan tumpuan dalam pembelajaran.",
        3:"Majoriti pelajar menunjukkan sikap yang positif, penglibatan aktif dan memberikan tumpuan dalam pembelajaran.",
        4:"Majoriti pelajar menunjukkan sikap yang sangat baik, bermotivasi, penglibatan aktif dan memberikan tumpuan dalam pembelajaran.",
        5:"Majoriti pelajar menunjukkan sikap yang sangat baik, bermotivasi tinggi, penglibatan aktif dan memberikan tumpuan dalam pembelajaran. Sebahagian daripada mereka memberi inspirasi dan motivasi kepada pelajar lain."}},
      "B4": { title:"Pengaplikasian Kemahiran Mata Pelajaran", prompt:"Sejauh manakah pelajar mengaplikasi kemahiran mata pelajaran seperti numerasi, praktikal, analitis, kemahiran hidup bagi memenuhi jangkaan pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar mengaplikasi kemahiran mata pelajaran yang baik bagi memenuhi jangkaan pembelajaran.",
        2:"Sebahagian pelajar mengaplikasi kemahiran mata pelajaran yang baik bagi memenuhi jangkaan pembelajaran.",
        3:"Majoriti pelajar mengaplikasi kemahiran mata pelajaran yang baik bagi memenuhi jangkaan pembelajaran.",
        4:"Majoriti pelajar mengaplikasi kemahiran mata pelajaran yang sangat baik bagi memenuhi jangkaan pembelajaran.",
        5:"Majoriti pelajar mengaplikasi kemahiran mata pelajaran yang sangat baik. Sebahagian daripada mereka menunjukkan kemahiran yang tinggi seperti menganalisis, menilai dan mencipta."}},
      "B5": { title:"Sikap Mandiri / Inisiatif", prompt:"Sejauh manakah pelajar belajar secara mandiri?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar menyelesaikan tugasan secara mandiri dan masih meminta bantuan jika perlu.",
        2:"Sebahagian pelajar menyelesaikan tugasan secara mandiri dan masih meminta bantuan jika perlu.",
        3:"Majoriti pelajar menyelesaikan tugasan secara mandiri dan masih meminta bantuan jika perlu.",
        4:"Majoriti pelajar menyelesaikan tugasan tepat pada waktunya atau lebih awal secara mandiri dan meminta penjelasan jika perlu.",
        5:"Majoriti pelajar menyelesaikan tugasan tepat pada waktunya atau lebih awal secara mandiri dan meminta penjelasan jika perlu. Sebahagian daripada mereka menunjukkan inisiatif yang cemerlang serta meminta maklum balas untuk pembaikan"}},
      "B6": { title:"Kemahiran ICT", prompt:"Sejauh manakah pelajar dapat mengaplikasikan pengetahuan dan kemahiran ICT mereka untuk memenuhi jangkaan pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar dapat mengaplikasikan teknologi digital, alat atau rangkaian komunikasi dengan sewajarnya untuk mengakses, mengurus, mengintegrasi dan membina maklumat baru.",
        2:"Sebahagian pelajar dapat mengaplikasikan teknologi digital, alat atau rangkaian komunikasi dengan sewajarnya untuk mengakses, mengurus, mengintegrasi dan membina maklumat baru.",
        3:"Majoriti pelajar dapat mengaplikasikan teknologi digital, alat komunikasi atau rangkaian komunikasi sewajarnya untuk mengakses, mengurus, mengintegrasi dan membina maklumat baru.",
        4:"Majoriti pelajar dapat mengaplikasikan kemahiran tinggi dalam teknologi digital, alat atau rangkaian komunikasi dengan sewajarnya untuk mengakses, mengurus, mengintegrasi  dan membina maklumat baru.",
        5:"Majoriti pelajar dapat mengaplikasikan kemahiran tinggi dalam teknologi digital, alat atau rangkaian komunikasi untuk mengakses, mengurus, mengintegrasi dan membina maklumat baru. Sebahagian daripada mereka menunjukkan kemahiran yang melebihi jangkaan pembelajaran."}},
      "B7": { title:"Kolaborasi", prompt:"Sejauh manakah pelajar belajar secara berkolaborasi dalam aktiviti berkumpulan?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar berkolaborasi dalam memikul tanggungjawab dan membuat keputusan yang rasional secara berkumpulan.",
        2:"Sebahagian pelajar berkolaborasi dalam memikul tanggungjawab dan membuat keputusan yang rasional secara berkumpulan.",
        3:"Majoriti pelajar berkolaborasi dalam memikul tanggungjawab dan membuat keputusan yang rasional secara berkumpulan.",
        4:"Majoriti pelajar berkolaborasi dalam memikul tanggungjawab dan membuat keputusan yang rasional dengan berkesan serta menghasilkan tugasan yang berkualiti.",
        5:"Majoriti pelajar berkolaborasi dalam memikul tanggungjawab dan membuat keputusan yang rasional dengan berkesan serta menghasilkan tugasan yang berkualiti. Sebahagian daripada mereka menunjukkan kebolehan yang melebihi jangkaan pembelajaran. Mereka berbincang dalam menghasilkan tugasan yang berkualiti."}},
      "B8": { title:"Penggunaan Sumber", prompt:"Bagaimanakah pelajar memanfaatkan sumber dalam pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar memanfaatkan sumber yang disediakan oleh guru mereka dengan baik.",
        2:"Sebahagian pelajar memanfaatkan sumber yang disediakan oleh guru mereka dengan baik.",
        3:"Majoriti pelajar memanfaatkan sumber yang disediakan oleh guru mereka dengan baik.",
        4:"Majoriti pelajar memanfaatkan sumber yang disediakan oleh guru mereka dengan berkesan.",
        5:"Majoriti pelajar memanfaatkan sumber yang disediakan oleh guru mereka dengan berkesan. Sebahagian daripada mereka memanfaatkan sumber secara kreatif dan inovatif."}},
      "B9": { title:"Kebolehan dalam Menyelesaikan Tugasan", prompt:"Sejauh manakah kemajuan pelajar berdasarkan jumlah, jenis dan kualiti kerja yang diberikan dalam pembelajaran?", levels:{
        1:"Tiada atau hanya sebahagian kecil pelajar dapat menghasilkan kerja dengan baik mengikut jumlah dan jangka masa yang ditetapkan.",
        2:"Sebahagian pelajar dapat menghasilkan kerja dengan baik mengikut jumlah dan jangka masa yang ditetapkan.",
        3:"Majoriti pelajar dapat menghasilkan kerja dengan baik mengikut jumlah dan jangka masa yang ditetapkan.",
        4:"Majoriti pelajar dapat menghasilkan kerja dengan sangat baik mengikut jumlah dan jangka masa yang ditetapkan.",
        5:"Majoriti pelajar dapat menghasilkan kerja dengan cemerlang mengikut jumlah dan jangka masa yang ditetapkan. Sebahagian daripada mereka menggunakan pelbagai kaedah dengan idea kreatif dan inovatif untuk menghasilkan kerja yang berkualiti tinggi melebihi jangkaan pembelajaran."}},

      /* ===== C1.* & C2.* ===== */
      "C1.1": { title:"Menentukan Keupayaan Pelajar", prompt:"Sejauh manakah pengetahuan sedia ada, kemahiran, kecekapan bahasa, minat dan keperluan pelajar digabungkan dalam proses pembelajaran untuk meningkatkan pencapaian, kemajuan dan perkembangan diri pelajar?", levels:{
        1:"Guru mengenal pasti pengetahuan sedia ada, kemahiran, kecekapan bahasa, minat dan keperluan pelajar dalam proses pembelajaran.",
        2:"Guru mengenal pasti dan memanfaatkan pengetahuan sedia ada, kemahiran, kecekapan bahasa, minat dan keperluan pelajar dalam proses pembelajaran.",
        3:"Guru mengenal pasti dan memanfaatkan pengetahuan sedia ada, kemahiran, kecekapan bahasa, minat dan keperluan pelajar menggunakan beberapa strategi untuk menggabung informasi baru dalam proses pembelajaran.",
        4:"Guru mengenal pasti dan memanfaatkan pengetahuan sedia ada, kemahiran, kecekapan bahasa, minat dan keperluan pelajar menggunakan beberapa strategi yang berpelbagai untuk menggabung informasi baru dan mengembangkan pengetahuan baru dalam proses pembelajaran.",
        5:"Guru memperkaya pengetahuan sedia ada, kemahiran, kecekapan bahasa, minat dan keperluan pelajar untuk menjana percambahan serta penyelidik dan konsep yang dipelajari sepanjang proses pembelajaran."}},
      "C1.2": { title:"Menetapkan Jangkaan yang Tinggi", prompt:"Adakah guru mempunyai jangkaan tinggi terhadap hasil pembelajaran pelajar?", levels:{
        1:"Guru tidak menyediakan jangkaan yang mencabar dan memberi sokongan minima kepada pelajar untuk menghasilkan tugasan yang produktif serta bertanggungjawab terhadap pembelajaran mereka sendiri.",
        2:"Guru menyediakan sebahagian jangkaan yang mencabar dan menyokong pelajar supaya peka terhadap matlamat pembelajaran sebagai platform ke arah kebertanggungjawaban pelajar terhadap pembelajaran mereka sendiri.",
        3:"Guru menyediakan jangkaan yang mencabar bagi memenuhi keperluan pelajar yang berbeza supaya mereka bermotivasi untuk mencapai matlamat pembelajaran.",
        4:"Guru menyediakan jangkaan yang mencabar bagi memenuhi keperluan pelajar yang berbeza supaya mereka bermotivasi tinggi untuk mencapai matlamat pembelajaran serta bertanggungjawab terhadap pembelajaran mereka sendiri.",
        5:"Guru menyediakan jangkaan yang mencabar bagi individu pelajar supaya mereka dapat selia diri dan mandiri dalam mencapai kejayaan."}},
      "C1.3a": { title:"Amalan Bertanya — Cara Menyoal", prompt:"Pengajaran isi kandungan secara dialogik: Bagaimanakah guru menyoal pelajar?", levels:{
        1:"Guru menyoal soalan tanpa sasaran menggalakkan pelajar menjawab secara ramai.",
        2:"Guru kadang-kadang menggalakkan menjawab secara ramai namun guru berusaha meningkatkan penggunaan soalan yang terarah dengan satu strategi, seperti menggalakkan individu pelajar untuk menjawab secara sukarela.",
        3:"Guru tidak menggalakkan menjawab secara ramai. Guru menggunakan pelbagai strategi, seperti meminta pelajar untuk menjawab secara sukarela atau mengajukan soalan khusus kepada pelajar tertentu.",
        4:"Guru mengajukan soalan yang terarah dengan berkesan menggunakan pelbagai strategi yang luas, contohnya meminta pelajar untuk menjawab secara sukarela atau mengajukan soalan khusus kepada pelajar tertentu, menggunakan mini whiteboard dll.",
        5:"Guru mengajukan soalan yang terarah dengan berkesan menggunakan pelbagai strategi yang luas. Pemilihan strategi berpandukan keperluan soalan yang diajukan dan pencapaian pelajar terdahulu."}},
      "C1.3b": { title:"Amalan Bertanya — Jenis Soalan", prompt:"Mengajar secara dialogik: Apakah jenis soalan yang diajukan oleh guru?", levels:{
        1:"Guru kerap mengajukan soalan jenis tertutup. Soalan yang diajukan tidak berkesan seperti soalan mudah, retorik atau soalan yang sudah ditetapkan jawapannya. Kebanyakan jawapan adalah pendek.",
        2:"Guru mengajukan soalan jenis tertutup, terbuka dan soalan berfokus. Kadangkala mengajukan soalan-soalan yang tidak berkesan. Kadangkala jawapan pelajar pendek dan menggunakan ayat.",
        3:"Guru mengajukan pelbagai jenis soalan; menilai, berfokus dan berasaskan inkuiri. Soalan menggalakkan pelajar menghuraikan jawapan.",
        4:"Guru mengajukan pelbagai jenis soalan; menilai, berfokus tetapi kerap berasaskan inkuiri. Soalan menggalakkan perbincangan sesama pelajar.",
        5:"Guru menggunakan pernyataan dan kerap mengajukan pelbagai soalan berasaskan inkuiri yang menggalakkan pelajar untuk memberi contoh, meramal, membanding dan merumus."}},
      "C1.3c": { title:"Amalan Bertanya — Respons Jawapan Pelajar", prompt:"Mengajar secara dialogik: Bagaimanakah guru merespons terhadap jawapan pelajar?", levels:{
        1:"Guru sekadar menerima jawapan yang betul atau salah tanpa ulasan. Kadangkala jawapan yang salah diabaikan. Tiada susulan dan pengukuhan terhadap jawapan pelajar.",
        2:"Guru menerima jawapan pelajar. Kadangkala membuat susulan terhadap jawapan pelajar.",
        3:"Guru kerap membuat susulan terhadap jawapan pelajar bagi menggalakkan mereka menerangkan idea atau membandingkannya.",
        4:"Guru menggunakan pelbagai strategi untuk merespons jawapan pelajar: membandingkan; menghujah secara logik; menambah; menyuarakan dan mengolah semula ayat. Respons guru memudahkan perbincangan sesama pelajar.",
        5:"Guru membuat refleksi berpandukan jawapan pelajar untuk mengenal pasti kekeliruan dan menanganinya, mencabar minda serta lebih meningkatkan kefahaman."}},
      "C1.3d": { title:"Amalan Bertanya — Penglibatan Menyeluruh", prompt:"Mengajar secara dialogik: Bagaimanakah guru melibatkan pelajar secara menyeluruh?", levels:{
        1:"Guru kurang menggalakkan penglibatan aktif semua pelajar dalam melaksanakan tugasan. Sebahagian pelajar menguasai sementara selebihnya mendiamkan atau melibatkan diri menjawab secara ramai dengan mengulang jawapan pelajar lain.",
        2:"Guru menyedari penglibatan pelajar yang kurang aktif dalam aktiviti pembelajaran. Soalan yang terarah dan sokongan diberi untuk menggalakkan pelajar yang pasif untuk melibatkan diri.",
        3:"Guru menggalakkan semua pelajar untuk terlibat dalam aktiviti pembelajaran dan menjangkakan kemungkinan ada pelajar yang pasif. ‘Masa berfikir’ digunakan secara berkesan bagi memberi ruang untuk pelajar menjawab.",
        4:"Guru menggunakan pelbagai strategi untuk memastikan semua pelajar terlibat secara aktif. Pelajar diberi peluang untuk membincangkan idea secara berpasangan atau kumpulan kecil semasa aktiviti pembelajaran.",
        5:"Guru menyediakan aktiviti perbincangan pelajar secara berpasangan, berkumpulan kecil dan keseluruhan kelas dengan lancar. Hasil perbincangan pelajar dimanfaatkan untuk memudahkan perbincangan seluruh kelas secara produktif."}},
      "C2.1": { title:"Pengetahuan Mata Pelajaran Guru", prompt:"Sejauh manakah guru menunjukkan kemahiran dalam pengetahuan mata pelajaran?", levels:{
        1:"Penerangan guru adalah kurang jelas dan/atau terdapat kesalahan fakta yang menunjukkan kekurangan dalam pengetahuan mata pelajaran guru.",
        2:"Pengetahuan mata pelajaran guru adalah mencukupi. contoh, mengenal pasti dan memperbetulkan kesalahfahaman pelajar.",
        3:"Pengetahuan mata pelajaran guru adalah baik dan mampu menarik minat pelajar. Guru mengemas kini pengetahuan mengenai trend dan isu dalam bidang mata pelajaran.",
        4:"Pengetahuan mata pelajaran guru adalah mendalam dan dimanfaatkan untuk memperkembangkan minat pelajar. Guru juga mempunyai pengetahuan terkini yang kukuh mengenai trend dan isu di dalam dan merentas bidang mata pelajaran.",
        5:"Guru berjaya mengintegrasi isi pengetahuan merentas mata pelajaran untuk memantapkan pengetahuan, kefahaman dan kemahiran pelajar."}},
      "C2.2": { title:"Rancangan Pengajaran", prompt:"Sejauh manakah guru merancang ke arah kemajuan dalam pembelajaran? *NOTA: Berdasarkan pembuktian dalam rancangan pengajaran", levels:{
        1:"Pengajaran kurang dirancang dengan teliti dan tanpa konteks yang berkaitan. Guru banyak bergantung kepada buku teks. Objektif pembelajaran kurang jelas. Pengetahuan guru dalam mata pelajaran adalah kurang menguasai*.",
        2:"Pengajaran dirancang secara berasingan dan tugasan untuk  pelajar  jelas dikenal pasti. Objektif pembelajaran dikenal pasti namun adakalanya kurang jelas. Pengetahuan guru dalam mata pelajaran adalah mencukupi*.",
        3:"Pengajaran dirancang sebagai sebahagian daripada urutan. Objektif pembelajaran adalah jelas dan memberikan cabaran yang sesuai untuk pelajar. Sesi yang berlainan dalam pengajaran menyokong kemajuan pembelajaran yang jelas. Pengetahuan guru dalam mata pelajaran adalah baik*.",
        4:"Pengajaran dirancang secara berurutan. Guru menggunakan pengajaran pertama daripada sesi urutan pengajaran  untuk mengetahui pengetahuan sedia ada pelajar. Objektif pembelajaran dinyatakan dengan jelas. Guru mengenal pasti jangkaan hasil pembelajaran yang menfokuskan pada perkembangan kemahiran, pengetahuan* dan pemahaman konsep.",
        5:"Pengajaran dirancang adalah sebahagian daripada urutan yang sejajar untuk mengembangkan pembelajaran secara progresif. Objektif pembelajaran dan jangkaan  hasil pembelajaran dinyatakan dengan jelas. Guru menangani perbendaharaan kata, mengenal pasti kesilapan dan memperbetulkan kesalahfahaman pelajar yang lazim. Guru menunjukkan pengetahuan*  yang cemerlang dalam pedagogi mata pelajaran."}},
      "C2.3a": { title:"Pengurusan Bilik Darjah — Tingkah Laku", prompt:"Sejauh manakah guru mengurus pelajar dalam aktiviti pembelajaran?", levels:{
        1:"Arahan guru kurang jelas, tingkah laku pelajar tidak diuruskan dengan baik menyebabkan pembaziran masa. Ramai pelajar tidak terlibat aktiviti pembelajaran.",
        2:"Arahan guru difahami oleh sebahagian pelajar. Autoriti guru dilaksanakan sewajarnya. Sebahagian pelajar melaksanakan tugasan serta terlibat dalam aktiviti pembelajaran.",
        3:"Arahan guru difahami dengan jelas oleh sebahagian besar pelajar. Autoriti guru yang sewajarnya dilaksanakan secara bersistematik, pujian dan ganjaran setimpal diberikan untuk mengukuhkan hasil yang dikehendaki. Majoriti pelajar melaksanakan tugasan dan terlibat dalam aktiviti pembelajaran.",
        4:"Arahan guru difahami oleh hampir semua pelajar. Pelajar sedia maklum dengan tingkah laku yang dikehendaki guru. Hampir semua pelajar melaksanakan tugasan dan terlibat dalam aktiviti pembelajaran.",
        5:"Guru berjaya menerapkan budaya tingkah laku yang dikehendaki. Hampir semua pelajar proaktif dalam aktiviti pembelajaran secara mandiri."}},
      "C2.3b": { title:"Pengurusan Bilik Darjah — Masa/Struktur", prompt:"Sejauh manakah guru menstruktur dan memanfaatkan masa dalam pengajaran?", levels:{
        1:"Pengajaran tidak berstruktur dan lewat dimulakan menyebabkan gerak masa pembelajaran perlahan. Pembaziran masa disebabkan oleh penjelasan yang berulang atau guru menghabiskan masa melaksanakan tugas pentadbiran. Ramai pelajar tidak terlibat dalam pembelajaran.",
        2:"Pengajaran dimulakan dengan aktiviti ringkas yang melibatkan kebanyakan pelajar. Pengajaran distruktur kepada beberapa sesi termasuk pengajaran keseluruhan kelas serta tugasan individu atau berkumpulan. Guru merumus pengajaran dengan jelas.",
        3:"Pengajaran segera dimulakan dengan aktiviti ringkas. Pengajaran distruktur kepada beberapa sesi mengikut tempoh masa dengan pelbagai aktiviti. Guru menggunakan sesi perumusan supaya pelajar dapat meringkaskan idea utama dan menilai kembali hasil pembelajaran mereka.",
        4:"Pengajaran segera dimulakan dengan aktiviti ringkas yang melibatkan semua pelajar. Beberapa sesi pengajaran keseluruhan kelas bersifat saling interaktif, seimbang dengan tugasan individu dan/atau berkumpulan yang menarik. Sesi perumusan yang interaktif digunakan untuk merangkum hasil pembelajaran.",
        5:"Guru menggunakan pelbagai aktiviti permulaan yang ringkas dan  interaktif serta melibatkan pelajar dengan segera. Sesi pengajaran bersalinghubungan dan memanfaatkan masa. Guru menggunakan sesi perumusan untuk tujuan penilaian dan pelanjutan pembelajaran, membincang dan mengenal pasti kesalahfahaman lazim."}},
      "C2.3c": { title:"Pengurusan Bilik Darjah — Pengaturan Kumpulan", prompt:"Reka bentuk tugasan pembelajaran: Sejauh manakah guru mengatur dan membahagikan pelajar mengikut kumpulan?", levels:{
        1:"Guru kebiasaannya mengajar secara keseluruhan kelas, adakalanya dalam tempoh masa yang panjang. Pelajar menyiapkan tugasan secara individu untuk mengamal dan menggabungkan apa yang dipelajari.Peluang untuk pelajar bekerjasama secara berpasangan atau berkumpulan adalah terhad.",
        2:"Guru adakalanya mengkehendaki pelajar untuk melaksanakan tugasan secara berpasangan dan berkumpulan, keseluruhan kelas serta secara individu.",
        3:"Guru memberikan tugasan secara keseluruhan kelas; kumpulan kecil, berpasangan dan individu yang seimbang.",
        4:"Guru adakalanya mengatur pelajar bagi memberi sokongan sasaran kepada kumpulan khusus pelajar contohnya pelajar berkebolehan rendah. Guru memberi peluang kepada pelajar untuk berbincang secara berpasangan atau kumpulan kecil semasa pengajaran keseluruhan kelas. Mereka mengatur dan membahagikan pelajar berdasarkan objektif pembelajaran, tugasan pembelajaran dan keperluan pelajar. Mereka juga adakalanya menggunakan tugasan berkolaboratif.",
        5:"Guru menggunakan pendekatan yang fleksibel dalam mengatur dan membahagikan pelajar berdasarkan objektif pembelajaran, tugasan dan keperluan mereka. Mereka kerap menggunakan tugasan pembelajaran berkolaboratif dan berpelbagai strategi yang memerlukan penglibatan semua pelajar (contohnya, snowball, jigsaw, envoy, fishbowl)."}},

      /* ===== C3.*–C6.* ===== */
      "C3.1": { title:"Mencabar Pelajar mengikut Keperluan Individu", prompt:"Reka bentuk tugasan pembelajaran yang efektif/berkesan: Sejauh manakah guru memastikan tugasan-tugasan berkenaan adalah sesuai dan berupaya mencabar semua pelajar?", levels:{
        1:"Guru mempunyai jangkaan / ekspektasi yang rendah terhadap kebanyakan pelajar. Semua pelajar diberikan tugasan pembelajaran yang sama tanpa disesuaikan dengan kebolehan dan keperluan mereka. Cabaran dan sokongan kurang memenuhi keperluan pelajar atau kelompok pelajar seperti mereka yang mencapai markah rendah atau tinggi",
        2:"Guru mempunyai jangkaan / ekspektasi yang tinggi terhadap majoriti / sebahagian besar pelajar.  Mereka adakalanya menyediakan tugasan alternatif khusus bagi pelajar yang mencapai markah rendah atau mengadaptasi tugasan pembelajaran dengan cara menyediakan sokongan tambahan atau “scaffolding\".",
        3:"Guru mempunyai jangkaan / ekspektasi yang tinggi terhadap kesemua pelajar.  Mereka secara rutin menyediakan tugasan bagi memenuhi keperluan pelajar yang mencapai markah tinggi dan juga rendah. Mereka menyediakan peluang kepada semua pelajar untuk mengaplikasikan hasil pembelajaran mereka kepada konteks biasa atau sebaliknya.",
        4:"Guru mempunyai jangkaan / ekspektasi yang tinggi terhadap kesemua pelajar.  Mereka menyediakan tugasan yang mencabar keupayaan biasa pelajar secara mandiri.  Mereka menyediakan tugasan dengan penuh pertimbangan, dan jarang dimulakan dengan tugasan yang agak mudah.",
        5:"Guru mengongsikan jangkaan / ekspektasi tinggi dengan kesemua pelajar.  Mereka mengadaptasi / menyesuaikan tugasan pembelajaran untuk mencabar semua pelajar, mengubah level / tahap kesukaran teknikal, termasuk level / tahap pemikiran aras tinggi, tahap “scaffolding” dan jumlah kemandirian pelajar."}},
      "C3.2": { title:"Memperkembangkan Konsep Kefahaman dan Kemahiran Pelajar Diselaraskan dengan Keperluan Individu", prompt:"Reka bentuk tugasan pembelajaran yang efektif / berkesan: Sejauh manakah guru menggunakan tugasan untuk melibat dan memperkembangkan kefahaman dan kemahiran pelajar?", levels:{
        1:"Tugasan pembelajaran pelajar yang disediakan oleh guru adalah sedikit. Tugasan berupa latihan dari buku teks yang mengkehendaki pelajar melatih kemahiran rutin dan penghafalan fakta-fakta. Tugasan pembelajaran bersifat berulang, tidak menarik serta kurang memotivasikan pelajar.",
        2:"Tugasan pembelajaran pelajar yang disediakan oleh guru bersesuaian dengan objektif pembelajaran. Setiap tugasan memberikan pendedahan kepada pelajar mengenai sesuatu yang baharu dan/atau memperkembangkan pembelajaran mereka. Terdapat variasi dalam tugasan pembelajaran. Ramai pelajar yang terlibat, namun sebahagian mereka tidak melaksanakan tugas dan bersikap pasif.",
        3:"Guru menyediakan tugasan pembelajaran berbeza (yang bersifat terbuka dan tertutup) yang bukan sahaja memperkembangkan kemahiran dan pengetahuan bahkan kemahiran berfikir aras tinggi dan konsep kefahaman pelajar.  Siri-siri dan variasi tugasan pembelajaran berupaya untuk menarik penglibatan semua pelajar.",
        4:"Guru menyediakan tugasan pembelajaran berbeza (yang bersifat terbuka dan tertutup) yang seimbang, serta melibatkan kemahiran berfikir aras tinggi. Mereka menyediakan tugasan-tugasan yang menfokus kepada kefahaman konsep dan idea yang mendalam.  Mereka memastikan kesemua pelajar menguasai kemahiran asas sebelum beralih ke tajuk seterusnya.",
        5:"Guru banyak menyediakan tugasan pembelajaran berbeza, yang mendorong memperkembangkan konsep kefahaman, kemahiran dan pengetahuan.  Mereka menyediakan tugasan yang menggalakkan pelajar menghubungkaitkan antara konsep-konsep dan idea yang berbeza."}},
      "C4.1a": { title:"Membina dan Mengongsi sama Objektif Pembelajaran", prompt:"Menilai pembelajaran secara berterusan: Sejauh manakah guru memastikan objektif pembelajaran disampaikan dengan jelas untuk pelajar?", levels:{
        1:"Objektif pembelajaran tidak jelas. Guru adakalanya menerangkan tugasan pembelajaran yang akan dilaksanakan. Mereka tidak menjelaskan jangkaan hasil pembelajaran menggunakan kosa kata yang difahami.",
        2:"Guru mengongsikan objektif pembelajaran kepada pelajarnya pada permulaan pengajaran supaya mereka sedia maklum tujuan pengajarannya berkenaan. Mereka menggunakan kosa kata / bahasa yang difahami oleh pelajar.",
        3:"Guru secara rutin membincangkan objektif pembelajaran bersama pelajar pada permulaan pengajarannya. Mereka menggunakan hasil rumusan untuk merujuk semula kepada objektif pembelajaran dan menggalakkan pelajar untuk mereflek perkembangan mereka demi mencapai ke arah objektif berkenaan.",
        4:"Guru membincangkan objektif pembelajaran bersama pelajar. Mereka juga mula mengongsikan mengenai jangkaan hasil pembelajaran berkenaan. Mereka menggunakan hasil rumusan sebagai rujukan dan galakan supaya pelajar dapat mereflek perkembangan mereka. Guru menggunakan penilaian kendiri dalam membantu pelajar menilai hasil pencapaian mereka.",
        5:"Guru secara rutin membincangkan objektif pembelajaran dan jangkaan hasil pembelajaran bersama pelajar, baik semasa sesi permulaan; kemuncak dan perumusan akhir pengajaran. Mereka menggunakan penilaian rakan sebaya dan kendiri untuk menggalakkan pelajar berfikir dan bertanggungjawab terhadap pembelajaran mereka."}},
      "C4.1b": { title:"Membina dan Mengongsi sama Objektif Pembelajaran (Pelarasan berdasarkan penilaian & maklum balas)", prompt:"Menilai pembelajaran secara berterusan: sejauh manakah guru menyelaraskan pengajaran mereka dengan hasil/info penilaian dan maklum balas pelajar?", levels:{
        1:"Guru kurang memanfaatkan respon pelajar baik berupa lisan atau tugasan bertulis. Akibatnya, semua pelajar diberikan tugasan yang sama. Perbezaan dilaksanakan pada jangka masa kepantasan perlaksanaan tugasan sahaja.",
        2:"Guru adakalanya menggunakan penilaian mereka untuk menyediakan tugasan penilaian yang bersifat alternatif. Mereka adakalanya menggunakannya (penilaian mereka) untuk mengadaptasi tugasan pembelajaran dengan cara menyediakan tugasan sokongan atau “scaffolding” (pengukuhan / pengayaan).",
        3:"Guru secara rutin menggunakan penilaian mereka untuk mengadaptasi tugasan pembelajaran yang sesuai untuk mencabar kebolehan pelajar yang bijak (pencapai markah tinggi). Mereka juga menggunakannya (penilaian mereka) untuk memastikan pelajar yang mengalami kesukaran akan dapat dibantu dengan tugasan sokongan dan “scaffolding” yang lebih jitu.",
        4:"Guru menggunakan penilaian mereka untuk menyediakan tugasan pembelajaran yang mencabar keupayaan biasa semua pelajar secara mandiri. Mereka memastikan kesemua pelajar menguasai kemahiran asas sebelum beralih ke tajuk seterusnya.",
        5:"—"}},
      "C4.2": { title:"Merancang Penilaian", prompt:"Menilai pembelajaran secara berterusan: sejauh manakah guru menilai pembelajaran pelajar dalam pengajaran?", levels:{
        1:"Guru tidak menilai apa yang telah dipelajari oleh individu pelajar. Guru hanya menilai ketepatan jawapan pelajar secara lisan dan bertulis iaitu sama ada betul atau salah. Mereka tidak menilai adakah pelajar memahami apa yang mereka pelajari.",
        2:"Guru menggunakan soalan ujian yang bersifat terbuka dan tertutup untuk menilai apa yang telah dipelajari oleh pelajar. Mereka memberikan soalan terarah untuk menilai pembelajaran individu pelajar. Ada waktunya, guru memeriksa jawapan pelajar yang salah untuk menilai kefahaman mereka.",
        3:"Guru menilai pelajar menggunakan ujian dan soalan-soalan inkuiri. Mereka memeriksa jawapan pelajar dengan berhati-hati. Mereka menilai kefahaman pelajar melalui jawapan lisan dan bertulis. Mereka juga menyelidiki sebarang jawapan yang betul atau salah.",
        4:"Guru menilai pelajar melalui penyoalan yang berkesan / efektif, mendengar dan mengamati pelajar melaksanakan tugasan. Mereka menilai kefahaman pelajar dan mengenal pasti sebarang kemungkinan berlakunya kesilapan. Guru segera mengenal pasti pelajar yang gagal menguasai kemahiran atau prosedur asas.",
        5:"Guru menilai pelajar menggunakan soalan-soalan terarah yang dipilih rapi selain mendengar dan mengamati mereka. Mereka mendedahkan kesilapan biasa dan silap faham. Mereka segera mengenal pasti pelajar yang gagal memahami sesuatu konsep."}},
      "C4.3": { title:"Menilai untuk Mendorong Pembelajaran", prompt:"Menilai pembelajaran secara berterusan: Sejauh manakah guru memanfaatkan maklum balas untuk menyokong pembelajaran pelajar?", levels:{
        1:"Guru mengambil maklum jawapan lisan dan bertulis pelajar sama ada betul atau salah sahaja. Jawapan yang salah adakalanya dikritik sehingga pelajar terasa kurang berkeyakinan. Guru tidak memberikan maklum balas pembaikan kepada pelajar.",
        2:"Guru mengambil maklum secara positif apa yang telah dipelajari oleh pelajar serta usaha mereka. Mereka mengambil berat terhadap jawapan yang salah pelajar dengan menyokong dan membimbing mereka ke peringkat seterusnya.",
        3:"Guru mengenal pasti sebarang kekuatan pada hasil tugasan pelajar. Mereka menjelaskan kekuatan berkenaan dan membincangkan cara pembaikannya. Secara rutin, mereka menggalakkan usaha pembetulan atau pembaikan pada hasil tugasan. Mereka mengelakkan dari membandingkan antara pelajar.",
        4:"Guru membantu pelajar untuk mengecam tindakan pembelajaran selanjutnya. Mereka sering membantu pelajar untuk memahami apa yang perlu dilaksanakan. Maklum balas mereka membolehkan pelajar berfikir, mereflek, memperbetulkan kesilapan dan membuat pembaikan.",
        5:"Guru secara rutin memberikan maklum balas yang konstruktif, secara lisan atau bertulis kepada pelajar sama ada dalam kumpulan yang kecil, diri sendiri atau keseluruhan kelas. Mereka mengenal pasti kekuatan pelajar,  menfokuskan yang mereka perlu pelajari dan bagaimana untuk mereka maju seterusnya."}},
      "C5.1": { title:"Mengembangkan Amalan Profesional", prompt:"Mengembangkan Amalan Profesional: Sejauh manakah guru melaksanakan refleksi kendiri terhadap amalan profesional, mengemas kini pengetahuan melalui pembangunan profesional dan menyumbang ke arah pembangunan kurikulum?", levels:{
        1:"Guru tidak melaksanakan refleksi kendiri bagi amalan profesional. Mereka membuat Inisiatif yang minimum bagi mengemas kini pengetahuan sedia ada melalui pembangunan profesional serta memberi sumbangan yang sedikit dalam pembangunan kurikulum.",
        2:"Guru melaksanakan refleksi kendiri secara berkala terhadap amalan profesional dan membuat inisiatif yang minimum bagi mengemas kini pengetahuan sedia ada melalui pembangunan profesional. Guru menyediakan aktiviti pembelajaran untuk kegunaan mereka.",
        3:"Guru sering melaksanakan refleksi kendiri terhadap amalan profesional, mengemas kini dan memperolehi pengetahuan baru melalui pembangunan profesional. Guru mengongsi amalan terbaik ke arah pembangunan profesional dan perkembangan kurikulum untuk menyokong inisiatif pendidikan.",
        4:"Guru melaksanakan refleksi kendiri secara konsisten terhadap amalan profesional, mengemas kini dan memperolehi pengetahuan baru melalui pembangunan profesional. Guru berinisiatif dan bekolaborasi ke arah pembangunan profesional dan perkembangan kurikulum untuk menyokong inisiatif pendidikan yang baru.",
        5:"Guru membudayakan refleksi kendiri sebagai amalan profesional, menjadi pemimpin dalam mereka bentuk dan mempromosikan amalan pengongsian profesional dengan guru lain di dalam dan di luar sekolah."}},
      "C5.2": { title:"Mengamalkan Amalan Profesional", prompt:"Mengamalkan amalan profesional: Sejauh manakah guru menyumbang ke arah matlamat dan etos sekolah, mempertahankan profesionalisme yang tinggi, menghargai pandangan yang berbeza, sentiasa peka dalam menjaga kesejahteraan pelajar?", levels:{
        1:"Guru berusaha secara minimum untuk menyokong visi dan misi sekolah dalam tugasan harian. Guru kurang berinisiatif untuk mewujudkan hubungan dengan pelajar, menerapkan nilai MIB dan peka dalam menjaga kesejahteraan pelajar",
        2:"Guru berusaha untuk menyokong visi dan misi sekolah dalam tugasan harian. Guru mempunyai beberapa inisiatif untuk mewujudkan hubungan dan saling menghormati dengan pelajar, menerapkan nilai MIB dan peka dalam menjaga kesejahteraan pelajar.",
        3:"Guru jelas menyokong visi dan misi sekolah dalam tugasan harian. Guru mempunyai hubungan baik dan saling menghormati dengan pelajar, menerapkan nilai MIB dan peka dalam menjaga kesejahteraan pelajar.",
        4:"Guru mengutamakan matlamat dan menunjukkan akauntabiliti untuk mencapai visi dan misi sekolah dalam tugasan harian. Guru memupuk hubungan baik dan saling menghormati dengan pelajar, menanamkan nilai MIB dan berhati-hati dalam menjaga kesejahteraan pelajar.",
        5:"Guru mengambil peranan kepimpinan dan memberi pengaruh positif dalam merealisasikan visi dan misi sekolah. Guru mengukuhkan persekitaran saling mempercayai dan menghormati. Nilai MIB diterapkan sebagai budaya dalam pelajar."}},
      "C6.1": { title:"Standard etika dan Moral yang Tinggi", prompt:"Sejauh manakah guru menunjukkan etika, moral dan sensitiviti yang tinggi (contoh, latar belakang sosial, etnik, budaya dan perbezaan lain) dalam profesion pengajaran mereka untuk mewujudkan persekitaran pembelajaran yang inklusif?", levels:{
        1:"Guru menunjukkan kefahaman dan amalan yang terhad dalam kod etika, dasar dan peraturan (MIB) yang bersesuaian dengan hubungan profesional bersama rakan sekerja, keluarga pelajar atau komuniti luar. Guru kurang peka mengenai latar belakang pelajar",
        2:"Guru memahami dan mengamalkan beberapa kod etika, dasar dan peraturan (MIB) yang bersesuaian dengan hubungan profesional bersama rakan sekerja, keluarga pelajar atau komuniti luar. Guru menunjukkan kepekaan mengenai latar belakang pelajar",
        3:"Guru mengamalkan kod etika, dasar dan peraturan (MIB) yang bersesuaian dengan hubungan profesional bersama rakan sekerja, keluarga pelajar atau komuniti luar. Guru mengambil berat dan menunjukkan keprihatinan mengenai latar belakang pelajar.",
        4:"Guru mengekalkan kod etika, dasar dan peraturan (MIB) yang tinggi serta bersesuaian dengan hubungan profesional bersama rakan sekerja, keluarga pelajar atau komuniti luar. Guru menunjukkan rasa hormat kepada pelajar dan menerima perbezaan pelbagai latar belakang mereka.",
        5:"—"}},
      "C6.2": { title:"Standard Kehadiran dan Ketepatan Masa yang Tinggi", prompt:"Sejauh manakah guru menunjukkan kehadiran dan ketepatan masa dalam komitmen yang berkaitan dengan sekolah seperti waktu kurikulum, perkumpulan sekolah, pendaftaran kelas, mesyuarat dll)?", levels:{
        1:"Guru mematuhi secara minimum sahaja dasar sekolah mengenai kehadiran dan ketepatan masa dalam komitmen yang berkaitan dengan sekolah.",
        2:"Guru sentiasa mematuhi dasar sekolah mengenai kehadiran dan ketepatan masa dalam beberapa komitmen yang berkaitan dengan sekolah.",
        3:"Guru sentiasa mematuhi dasar sekolah mengenai kehadiran dan ketepatan masa dalam kebanyakan komitmen yang berkaitan dengan sekolah.",
        4:"Guru mengekalkan rekod cemerlang dalam kehadiran dan ketepatan masa bagi mematuhi dasar sekolah. Guru mengutamakan pengurusan masa yang sangat baik dalam melaksanakan hampir semua komitmen yang berkaitan dengan sekolah.",
        5:"Guru mengekalkan rekod cemerlang dalam kehadiran dan ketepatan masa dalam mematuhi dasar sekolah. Guru menunjukkan standard teladan dalam profesionalisme dan pengurusan masa dalam melaksanakan hampir semua komitmen yang berkaitan dengan sekolah."}},
      "C6.3": { title:"Sentiasa Maklum tentang Polisi, Peraturan dan Lain-Lain Keperluan Rasmi", prompt:"Sejauh manakah guru menunjukkan pengetahuan mereka tentang dasar pendidikan semasa, peraturan dan keperluan lain?", levels:{
        1:"Guru menunjukkan kefahaman yang terhad terhadap dasar pendidikan semasa, peraturan dan keperluan lain.",
        2:"Guru memahami dan mengamalkan beberapa dasar pendidikan semasa, peraturan dan keperluan lain.",
        3:"Guru mematuhi dan mengamalkan dasar pendidikan semasa, peraturan dan keperluan lain.",
        4:"Guru mematuhi dan mengamalkan dasar pendidikan semasa, peraturan dan keperluan lain. Guru berperanan sebagai pakar rujuk kepada guru lain.",
        5:"Guru mematuhi dan sentiasa mengemaskini pengetahuan dasar pendidikan semasa, peraturan dan keperluan lain."}}
    };

// -------------------- RENDER --------------------
const container = document.getElementById("formContainer");
function infoButton(code){
  return `<button type="button" data-rubric="${code}" class="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 border hover:bg-slate-200" title="Lihat rubrik ${code}">i</button>`;
}
function getDescriptorSnippet(code, level){
  const t = RUBRICS[code]?.levels?.[level];
  if(!t) return "";
  return t.length > 160 ? t.slice(0,157)+"…" : t;
}
function renderSection(sec){
  const showNA = sec.items.some(it => it.allowNA);
  const card = document.createElement("section");
  card.className = "bg-white rounded-2xl shadow p-4";
  card.innerHTML = `
    <div class="flex items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold">${sec.title}</h2>
        <p class="text-sm text-slate-500">${sec.note || ""}</p>
      </div>
      <div class="text-sm">
        <span class="inline-block px-2 py-1 rounded-lg bg-slate-100">Item: ${sec.items.length}</span>
      </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-600 border-b">
            <th class="py-2 pr-2">Kod</th>
            <th class="py-2 pr-2">Bidang Fokus</th>
            <th class="py-2 pr-2 text-center">1</th>
            <th class="py-2 pr-2 text-center">2</th>
            <th class="py-2 pr-2 text-center">3</th>
            <th class="py-2 pr-2 text-center">4</th>
            <th class="py-2 pr-2 text-center">5</th>
            ${showNA ? '<th class="py-2 pr-2 text-center">N/A</th>' : ''}
            <th class="py-2 pr-2">Ulasan (Optional)</th>
          </tr>
        </thead>
        <tbody id="tbody-${sec.id}"></tbody>
      </table>
    </div>
    <div class="mt-3 text-sm">
      <span class="text-slate-500">Purata ${sec.id}:</span>
      <span id="avg-${sec.id}" class="font-semibold">–</span>
    </div>
  `;
  container.appendChild(card);

  const tbody = card.querySelector(`#tbody-${sec.id}`);
  sec.items.forEach((it) => {
    const tr = document.createElement("tr");
    tr.className = "border-b last:border-0 align-top";
    const hasRubric = !!RUBRICS[it.code];
    const ratingCells = [1, 2, 3, 4, 5]
      .map(
        (v) => `
      <td class="py-2 pr-2 text-center rating-cell">
        <input type="radio" name="${it.code}" value="${v}" aria-label="${it.code}=${v}" title="${getDescriptorSnippet(it.code, v)}" />
      </td>`
      )
      .join("");
    const naCell = showNA
      ? `
      <td class="py-2 pr-2 text-center rating-cell">
        ${it.allowNA ? `<input type="radio" name="${it.code}" value="NA" aria-label="${it.code}=NA" title="Tidak berkenaan" />` : ""}
      </td>
    `
      : "";
    tr.innerHTML = `
      <td class="py-2 pr-2 font-medium whitespace-nowrap">${it.code} ${hasRubric ? infoButton(it.code) : ""}</td>
      <td class="py-2 pr-2">${it.label}</td>
   ${ratingCells}
      ${naCell}
 
      <td class="py-2 pr-2 min-w-[220px]">
        <textarea name="${it.code}_comment" class="w-full rounded-lg border-slate-300" rows="1" placeholder="Catatan ringkas..."></textarea>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
SECTIONS.forEach(renderSection);

// -------------------- CALCULATIONS --------------------
const avgAEl = document.getElementById("avgA");
const avgBEl = document.getElementById("avgB");
const avgCEl = document.getElementById("avgC");
const avgAllEl = document.getElementById("avgAll");
const gradeAllEl = document.getElementById("gradeAll");

function getValue(name){
  const c = document.querySelector(`input[name="${name}"]:checked`);
  if(!c) return null;
  return c.value === "NA" ? "NA" : Number(c.value);
}
function getNumericValue(name){
  const v = getValue(name);
  return typeof v === "number" ? v : null;
}
function sectionAverage(sec){ const vals = sec.items.map(it => getNumericValue(it.code)).filter(v => v!==null); return vals.length? vals.reduce((a,b)=>a+b,0)/vals.length : null; }
function overallAverage(){ const codes = SECTIONS.flatMap(s=>s.items.map(it=>it.code)); const vals = codes.map(getNumericValue).filter(v=>v!==null); return vals.length? vals.reduce((a,b)=>a+b,0)/vals.length : null; }
function mapGrade(avg){ if(avg===null) return {grade:"–",text:"Lengkapkan penilaian."}; const g = Math.max(1, Math.min(5, Math.round(avg))); const desc={1:"Tidak Memuaskan",2:"Memuaskan",3:"Baik",4:"Sangat Baik",5:"Cemerlang"}[g]; return {grade:g,text:desc}; }
const fmt = n => n===null? "–" : (Math.round(n*100)/100).toFixed(2);
function refresh(){
  const a = sectionAverage(SECTIONS[0]);
  const b = sectionAverage(SECTIONS[1]);
  const c = sectionAverage(SECTIONS[2]);
  avgAEl.textContent = fmt(a); avgBEl.textContent = fmt(b); avgCEl.textContent = fmt(c);
  const all = overallAverage();
  avgAllEl.textContent = fmt(all);
  const {grade,text} = mapGrade(all);
  gradeAllEl.textContent = grade==="–"? "" : `Gred Keseluruhan: ${grade} (${text})`;
}
document.body.addEventListener("change", e => { if(e.target.type === "radio" || e.target.tagName === "TEXTAREA") refresh(); });

// -------------------- SAVE/LOAD/EXPORT --------------------
const metaFields = [
  "metaTeacher","metaLevel","metaSubject","metaEvaluator","metaDate","metaSchool",
  "metaCluster","metaMethod","metaClassYear","metaClassName","metaStudentCount"
];

function collectData(){
  const data = { meta:Object.fromEntries(metaFields.map(id=>[id, document.getElementById(id)?.value||""])), ratings:{}, comments:{}, averages:{} };
  SECTIONS.forEach(sec=>sec.items.forEach(it=>{
    data.ratings[it.code] = getValue(it.code);
    const t = document.querySelector(`textarea[name="${it.code}_comment"]`);
    data.comments[it.code] = t ? t.value : "";
  }));
  data.averages.A = sectionAverage(SECTIONS[0]);
  data.averages.B = sectionAverage(SECTIONS[1]);
  data.averages.C = sectionAverage(SECTIONS[2]);
  data.averages.overall = overallAverage();
  data.averages.mapped = mapGrade(data.averages.overall);
  return data;
}

function fillData(data){
  if(!data) return;
  ["metaTeacher","metaEvaluator","metaDate","metaSchool","metaCluster","metaMethod","metaClassYear","metaClassName","metaStudentCount"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value=data.meta?.[id]||"";
  });
  const savedLevel = data.meta?.metaLevel || "";
  const savedSubject = data.meta?.metaSubject || "";
  if (savedLevel) {
    if (!LEVEL_SUBJECTS[savedLevel]) {
      LEVEL_SUBJECTS[savedLevel] = [];
      const opt=document.createElement("option"); opt.value=savedLevel; opt.textContent=savedLevel; levelSel.appendChild(opt);
    }
    levelSel.value = savedLevel;
    populateSubjectDropdown(savedLevel);
    subjectSel.disabled = false;
  }
  if (savedSubject) {
    if (![...subjectSel.options].some(o=>o.value===savedSubject)) {
      const opt=document.createElement("option"); opt.value=savedSubject; opt.textContent=savedSubject; subjectSel.appendChild(opt);
    }
    subjectSel.value = savedSubject;
  }
  SECTIONS.forEach(sec=>sec.items.forEach(it=>{
    const v = data.ratings?.[it.code];
    if(v!=null){
      const radio=document.querySelector(`input[name="${it.code}"][value="${v}"]`);
      if(radio) radio.checked = true;
    }
    const t=document.querySelector(`textarea[name="${it.code}_comment"]`);
    if(t) t.value = data.comments?.[it.code]||"";
  }));
  refresh();
}
document.getElementById("btnSave").addEventListener("click", ()=>{ localStorage.setItem("btstpa_form", JSON.stringify(collectData())); alert("Draf disimpan pada pelayar (localStorage)."); });
document.getElementById("btnLoad").addEventListener("click", ()=>{ const raw=localStorage.getItem("btstpa_form"); if(!raw){ alert("Tiada draf ditemui."); return; } fillData(JSON.parse(raw)); alert("Draf dimuat."); });
document.getElementById("btnSubmit")
  .addEventListener("click", submitToSheets);

async function submitToSheets(){
  if(!SHEETS_ENDPOINT){ alert("Set SHEETS_ENDPOINT first."); return; }
  const payload = collectData();
  payload.apiKey = API_KEY; // <— add this

  const submitBtn = document.getElementById("btnSubmit");
  const originalLabel = submitBtn?.textContent;
  if(submitBtn){
    submitBtn.disabled = true;
    submitBtn.textContent = "Menghantar…";
  }

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Form");
    sheet.appendRow([new Date(), data.metaTeacher, data.metaSchool, JSON.stringify(data.ratings)]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST");
  } catch (err) {
    return ContentService
      .createTextOutput("Error: " + err)
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// -------------------- MODALS: Rubric --------------------
const rubricModal = document.getElementById("rubricModal"); 
const rubricBody = document.getElementById("rubricBody");
const rubricTitle = document.getElementById("rubricTitle");
const rubricSubtitle = document.getElementById("rubricSubtitle");
document.body.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-rubric]");
  if(!btn) return;
  const code = btn.getAttribute("data-rubric");
  const r = RUBRICS[code];
  rubricTitle.textContent = `${code} — ${r?.title || "Rubrik Item"}`;
  rubricSubtitle.textContent = r?.prompt || "Deskriptor 1–5";
  rubricBody.innerHTML = "";
  if(!r){
    rubricBody.innerHTML = `<tr><td class="py-3 pr-2 align-top font-medium">—</td><td class="py-3 pr-2">Rubrik belum ditambah untuk item ini.</td></tr>`;
  }else{
    [1,2,3,4,5].forEach(g=>{
      const tr = document.createElement("tr");
      tr.className = "border-b last:border-0";
      tr.innerHTML = `<td class="py-3 pr-2 align-top font-medium w-28">${g}</td><td class="py-3 pr-2">${r.levels[g] || "-"}</td>`;
      rubricBody.appendChild(tr);
    });
  }
  rubricModal.showModal();
});
}