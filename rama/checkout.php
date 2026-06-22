<?php
include 'db.php';

$product_id = $_GET['id'] ?? null;
if (!$product_id) { header("Location: index.php"); exit; }

$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$product_id]);
$product = $stmt->fetch();

if (!$product) { echo "Produk tidak ditemukan."; exit; }

$success_invoice = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cust_name = strip_tags(trim($_POST['name']));
    $cust_wa = strip_tags(trim($_POST['whatsapp']));
    $address = strip_tags(trim($_POST['address']));

    if ($product['stock'] > 0) {
        $pdo->beginTransaction();
        try {
            $updateStock = $pdo->prepare("UPDATE products SET stock = stock - 1 WHERE id = ?");
            $updateStock->execute([$product_id]);

            $insertOrder = $pdo->prepare("INSERT INTO orders (user_id, customer_name, whatsapp_number, shipping_address, total_price, status) VALUES (?, ?, ?, ?, ?, 'success')");
            $insertOrder->execute([null, $cust_name, $cust_wa, $address, $product['price']]);
            $orderId = $pdo->lastInsertId();

            $pdo->commit();
            $success_invoice = $orderId;
        } catch (Exception $e) {
            $pdo->rollBack();
            die("Transaksi Gagal: " . $e->getMessage());
        }
    } else {
        echo "<script>alert('Maaf, stock barang sudah habis!'); window.location.href='index.php';</script>";
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Checkout - <?php echo htmlspecialchars($product['name']); ?></title>
    <style>
        body { font-family: sans-serif; background: #f4f6f9; padding: 40px; }
        .box-form { max-width: 500px; background: white; padding: 30px; margin: auto; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        .btn-submit { background: #008069; color: white; border: none; padding: 12px; width: 100%; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: bold; }
        .invoice { background: #e8f5e9; border: 2px dashed #2e7d32; padding: 20px; margin-top: 20px; border-radius: 5px; }
    </style>
</head>
<body>

<div class="box-form">
    <?php if ($success_invoice): ?>
        <div class="invoice">
            <h3>📄 INVOICE SUKSES (#INV-<?php echo $success_invoice; ?>)</h3>
            <p style="margin-top: 10px;">Terima kasih <strong><?php echo htmlspecialchars($cust_name); ?></strong></p>
            <p>Produk: <?php echo htmlspecialchars($product['name']); ?></p>
            <p>Total Bayar: <strong>Rp <?php echo number_format($product['price'], 0, ',', '.'); ?></strong></p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #555;">Pesanan Anda telah dicatat, Admin kami akan menghubungi No WhatsApp: <?php echo htmlspecialchars($cust_wa); ?>.</p>
            <br>
            <a href="index.php" style="color: #008069; font-weight: bold; text-decoration:none;">← Kembali Belanja</a>
        </div>
    <?php else: ?>
        <h2>Formulir Pembelian</h2>
        <p style="margin-bottom: 20px; color:#666;">Anda akan membeli: <strong><?php echo htmlspecialchars($product['name']); ?></strong></p>
        <form method="POST">
            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="name" required placeholder="Contoh: Rama Dev">
            </div>
            <div class="form-group">
                <label>No. WhatsApp</label>
                <input type="text" name="whatsapp" required placeholder="Contoh: 083144036835">
            </div>
            <div class="form-group">
                <label>Alamat Lengkap Pengiriman</label>
                <textarea name="address" rows="4" required placeholder="Alamat lengkap..."></textarea>
            </div>
            <button type="submit" class="btn-submit">Selesaikan Pemesanan</button>
        </form>
    <?php endif; ?>
</div>

</body>
</html>