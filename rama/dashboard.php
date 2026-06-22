<?php
include 'db.php';

// Fitur Tambah Produk Baru
if (isset($_POST['add_product'])) {
    $name = strip_tags($_POST['prod_name']);
    $desc = strip_tags($_POST['prod_desc']);
    $price = $_POST['prod_price'];
    $stock = $_POST['prod_stock'];
    $img = $_POST['prod_img'];

    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $desc, $price, $stock, $img]);
    header("Location: dashboard.php"); exit;
}

// Fitur Tambah Berita Promo
if (isset($_POST['add_promo'])) {
    $title = strip_tags($_POST['promo_title']);
    $content = strip_tags($_POST['promo_content']);

    $stmt = $pdo->prepare("INSERT INTO promos (title, content) VALUES (?, ?)");
    $stmt->execute([$title, $content]);
    header("Location: dashboard.php"); exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Admin - TabunganRama</title>
    <style>
        body { font-family: sans-serif; background: #eaedf1; display: flex; margin: 0; }
        .sidebar { width: 260px; background: #2c3e50; color: white; min-height: 100vh; padding: 20px; }
        .content { flex-grow: 1; padding: 30px; }
        .grid-panel { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card-panel { background: white; padding: 20px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden; margin-top: 15px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #34495e; color: white; }
        .form-input { width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; }
        .btn-panel { background: #2980b9; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 4px; font-weight: bold; }
    </style>
</head>
<body>

<div class="sidebar">
    <h2>Admin CRM Rama</h2>
    <p style="font-size:0.8rem; color:#bdc3c7; margin-bottom:20px;">Role: Super Admin</p>
    <hr style="border-color:#34495e;">
    <p style="margin-top:20px;"><a href="index.php" style="color:white; text-decoration:none; font-weight:bold;">💻 Lihat Toko Utama</a></p>
</div>

<div class="content">
    <h1>Dashboard Manajemen Konten & Penjualan</h1>
    <p style="color:#666;">Kelola stok barang, upload produk, dan lihat invoice pelanggan masuk.</p>
    <br>

    <div class="grid-panel">
        <div class="card-panel">
            <h3>📦 Upload Produk Baru</h3>
            <form method="POST">
                <input type="text" name="prod_name" placeholder="Nama Produk" class="form-input" required>
                <textarea name="prod_desc" placeholder="Deskripsi Singkat" class="form-input" required></textarea>
                <input type="number" name="prod_price" placeholder="Harga Jual (Angka)" class="form-input" required>
                <input type="number" name="prod_stock" placeholder="Jumlah Stok Awal" class="form-input" required>
                <input type="text" name="prod_img" placeholder="URL Link Gambar Light" class="form-input" required>
                <button type="submit" name="add_product" class="btn-panel">Simpan & Publikasikan</button>
            </form>
        </div>

        <div class="card-panel">
            <h3>🔥 Buat Pengumuman Promo Baru</h3>
            <form method="POST">
                <input type="text" name="promo_title" placeholder="Judul Promosi" class="form-input" required>
                <textarea name="promo_content" placeholder="Isi detail isi promo atau diskon..." class="form-input" style="height:110px;" required></textarea>
                <button type="submit" name="add_promo" class="btn-panel" style="background:#e67e22;">Sebarkan Konten Promo</button>
            </form>
        </div>
    </div>

    <div class="card-panel">
        <h3>📄 Log Invoice & Form Pelanggan Masuk (Real-time Stock Checker Included)</h3>
        <table>
            <thead>
                <tr>
                    <th>Invoice ID</th>
                    <th>Nama Pembeli</th>
                    <th>No. WhatsApp</th>
                    <th>Alamat Pengiriman</th>
                    <th>Total Bayar</th>
                    <th>Waktu Masuk</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $stmt = $pdo->query("SELECT * FROM orders ORDER BY id DESC");
                $has_order = false;
                while ($order = $stmt->fetch()) {
                    $has_order = true;
                    echo "<tr>
                            <td><strong>#INV-".$order['id']."</strong></td>
                            <td>".htmlspecialchars($order['customer_name'])."</td>
                            <td>".htmlspecialchars($order['whatsapp_number'])."</td>
                            <td>".htmlspecialchars($order['shipping_address'])."</td>
                            <td>Rp ".number_format($order['total_price'], 0, ',', '.')."</td>
                            <td>".$order['created_at']."</td>
                          </tr>";
                }
                if (!$has_order) {
                    echo "<tr><td colspan='6' style='text-align:center; color:#999;'>Belum ada data invoice masuk. Silakan lakukan simulasi pembelian di halaman utama.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>