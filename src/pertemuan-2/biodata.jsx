import React from "react";
import zora from '../assets/zora.png';

// Child Component 1
function Header() {
  return (
    <header className="header">
      <h1>PORTOFOLIO BIODATA DIRI</h1>
      <p>Mahasiswa Sistem Informasi | Web Developer Pemula</p>
    </header>
  );
}

// Child Component 2
function FotoProfil() {
  return (
    <section className="card">
      <h2>Foto Profil</h2>
      <img 
        src={zora} 
        alt="Foto Profil Ozora" 
        className="profile-img" 
      />
    </section>
  );
}

// Child Component 3
function DataPribadi() {
  return (
    <section className="card">
      <h2>Data Pribadi</h2>
      <ul>
        <li><strong>Nama:</strong> Ozora Feona Surya</li>
        <li><strong>NIM:</strong> 2457301118</li>
        <li><strong>Tempat, Tanggal Lahir:</strong> Pekanbaru, 10 Februari 2006</li>
        <li><strong>Jenis Kelamin:</strong> Perempuan</li>
      </ul>
    </section>
  );
}

// Child Component 4
function Kontak() {
  return (
    <section className="card">
      <h2>Kontak</h2>
      <ul>
        <li><strong>Email:</strong> ozora24si@mahasiswa.pcr.ac.id</li>
        <li><strong>No HP:</strong> 0822-8630-4303</li>
        <li><strong>Alamat:</strong> Pekanbaru, Riau</li>
      </ul>
    </section>
  );
}

// Child Component 5
function Pendidikan() {
  return (
    <section className="card">
      <h2>Pendidikan</h2>
      <ul>
        <li>SD Negeri 001</li>
        <li>SMP Negeri 8 Pekanbaru</li>
        <li>SMA Negeri 4 Pekanbaru</li>
        <li>Politeknik Caltex Riau - Sistem Informasi</li>
      </ul>
    </section>
  );
}

// Child Component 6
function Keahlian() {
  return (
    <section className="card">
      <h2>Keahlian</h2>
      <ul>
        <li>HTML, CSS, JavaScript</li>
        <li>React JS Dasar</li>
        <li>Java Dasar</li>
        <li>Desain UI Sederhana</li>
      </ul>
    </section>
  );
}

// Child Component 7
function Hobi() {
  return (
    <section className="card">
      <h2>Hobi</h2>
      <ul>
        <li>Memasak</li>
        <li>Mendesain Web</li>
        <li>Mendengarkan Musik</li>
        <li>Menonton Film</li>
      </ul>
    </section>
  );
}

// Parent Component
function BiodataDiri() {
  return (
    <main className="container">
      <Header />
      <div className="grid-layout">
        <FotoProfil />
        <DataPribadi />
        <Kontak />
        <Pendidikan />
        <Keahlian />
        <Hobi />
      </div>
    </main>
  );
}

export default BiodataDiri;
