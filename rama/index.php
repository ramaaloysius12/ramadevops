<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabungan Rama E-Commerce</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
        body { background: #f4f6f9; color: #333; }
        
        /* Navbar & Hamburger */
        .navbar { display: flex; justify-content: space-between; align-items: center; background: #111; padding: 15px 20px; color: #fff; position: sticky; top: 0; z-index: 1000; }
        .nav-links { display: flex; list-style: none; gap: 20px; }
        .nav-links a { color: white; text-decoration: none; font-weight: 500; }
        
        .hamburger { display: none; flex-direction: column; cursor: pointer; gap: 5px; }
        .hamburger span { width: 25px; height: 3px; background: white; transition: 0.3s; }
        
        /* Animasi Hamburger */
        .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(6px, -7px); }

        /* Grid Promo & Produk */
        .container { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
        .promo-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card-promo { background: linear-gradient(135deg, #00b4db, #0083b0); color: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; }
        .product-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: 0.3s; display: flex; flex-direction: column; justify-content: space-between; }
        .product-card:hover { transform: translateY(-5px); }
        .product-card img { width: 100%; height: 200px; object-fit: cover; background: #e0e0e0; }
        .product-info { padding: 15px; }
        .product-price { color: #ff4b2b; font-weight: bold; font-size: 1.2rem; margin: 10px 0; }
        .btn-cart { display: inline-block; background: #008069; color: white; padding: 10px; width: 100%; text-align: center; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; font-weight: bold; }

        @media (max-width: 768px) {
            .nav-links { display: none; flex-direction: column; width: 100%; background: #111; position: absolute; top: 100%; left: 0; padding: 20px; gap: 15px; }
            .nav-links.active { display: flex; }
            .hamburger { display: flex; }
        }
    </style>
</head>
<body>

    <nav class="navbar">
        <h2>TabunganRama</h2>
        <ul class="nav-links" id="navLinks">
            <li><a href="index.php">Home</a></li>
            <li><a href="#produk">Katalog</a></li>
            <li><a href="dashboard.php">Dashboard Admin</a></li>
        </ul>
        <div class="hamburger" id="hamburgerMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>

    <div class="container">
        <!-- Section Banner Promo -->
        <h2 style="margin-bottom: 15px;">🔥 Promo Spesial Hari Ini</h2>
        <div class="promo-section">
            <?php
            $stmt = $pdo->query("SELECT * FROM promos ORDER BY id DESC LIMIT 2");
            while($promo = $stmt->fetch()) {
                echo "<div class='card-promo'>
                        <h3>".htmlspecialchars($promo['title'])."</h3>
                        <p style='margin-top:10px;'>".htmlspecialchars($promo['content'])."</p>
                      </div>";
            }
            ?>
        </div>

        <!-- Section Katalog Produk -->
        <h2 id="produk" style="margin-bottom: 15px;">🛍️ Produk Terbaru Kami</h2>
        <div class="product-grid">
            <?php
            $query = "SELECT p.*, COALESCE(AVG(r.rating), 0) as avg_rating FROM products p 
                      LEFT JOIN reviews r ON p.id = r.product_id 
                      GROUP BY p.id ORDER BY p.id DESC";
            $stmt = $pdo->query($query);
            while($row = $stmt->fetch()) {
                ?>
                <div class="product-card">
                    <img src="<?php echo htmlspecialchars($row['image_url']); ?>" alt="Produk" loading="lazy">
                    <div class="product-info">
                        <h4><?php echo htmlspecialchars($row['name']); ?></h4>
                        <p style="font-size:0.85rem; color:#666; margin-top:5px;"><?php echo htmlspecialchars($row['description']); ?></p>
                        <div class="product-price">Rp <?php echo number_format($row['price'], 0, ',', '.'); ?></div>
                        <div style="margin-bottom: 10px; color: #ff9800;">⭐ <?php echo ($row['avg_rating'] > 0) ? round($row['avg_rating'], 1) : '5.0'; ?> / 5</div>
                        <p style="font-size:0.8rem; margin-bottom:10px;">Sisa Stok: <strong><?php echo $row['stock']; ?></strong></p>
                        <a href="checkout.php?id=<?php echo $row['id']; ?>" class="btn-cart">Beli Sekarang</a>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>

    <script>
        const hamburger = document.getElementById('hamburgerMenu');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    </script>
</body>
</html>