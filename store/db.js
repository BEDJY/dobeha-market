
export const initDB = () => {
  if (!window.D1) {
    console.error("D1 no está disponible en este entorno");
    return;
  }
  
  window.D1.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      price REAL,
      oldPrice REAL,
      rating REAL,
      sold INTEGER,
      image TEXT,
      description TEXT,
      freeShipping INTEGER
    );
    CREATE TABLE IF NOT EXISTS cart (
      id TEXT PRIMARY KEY,
      productId TEXT,
      qty INTEGER,
      selected INTEGER
    );
  `);

  const { results } = window.D1.prepare("SELECT COUNT(*) as count FROM products").all();
  if (results[0].count === 0) {
    const defaultProducts = [
      ['1', 'Auriculares Inalámbricos TWS Bluetooth 5.3', 4.99, 19.99, 4.8, 15000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', 'Auriculares con sonido estéreo HIFI, estuche de carga y micrófono para llamadas.', 1],
      ['2', 'Reloj Inteligente Deportivo Hombre/Mujer', 12.50, 45.00, 4.6, 5400, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', 'Monitor de frecuencia cardíaca, resistente al agua IP67, notificaciones completas.', 1],
      ['3', 'Zapatillas de Correr Ligeras y Transpirables', 18.90, 39.99, 4.7, 3200, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', 'Calzado deportivo para exteriores, suela amortiguadora, diseño ergonómico.', 1],
      ['4', 'Gafas de Sol Clásicas Polarizadas UV400', 3.99, 12.00, 4.5, 9000, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', 'Gafas de sol retro con protección UV, varios colores disponibles.', 1],
      ['5', 'Mochila Antirrobo Impermeable con Carga USB', 22.00, 60.00, 4.9, 4500, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', 'Mochila para portátil de 15.6 pulgadas, múltiples compartimentos, diseño seguro.', 1],
      ['6', 'Mini Dron Plegable con Cámara 4K HD', 29.99, 89.99, 4.3, 1200, 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&q=80', 'Cuadricóptero WIFI FPV, retención de altitud, fácil de volar para principiantes.', 0]
    ];
    
    defaultProducts.forEach(p => {
      window.D1.prepare("INSERT INTO products (id, name, price, oldPrice, rating, sold, image, description, freeShipping) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])
        .run();
    });
  }
};

export const getProducts = () => {
  if (!window.D1) return [];
  const { results } = window.D1.prepare("SELECT * FROM products").all();
  return results || [];
};

export const getCart = () => {
  if (!window.D1) return [];
  const { results } = window.D1.prepare(`
    SELECT c.id as cartId, c.qty, c.selected, p.* 
    FROM cart c 
    JOIN products p ON c.productId = p.id
  `).all();
  return results || [];
};

export const addToCart = (productId) => {
  if (!window.D1) return;
  const { results } = window.D1.prepare("SELECT * FROM cart WHERE productId = ?").bind(productId).all();
  if (results && results.length > 0) {
    window.D1.prepare("UPDATE cart SET qty = qty + 1 WHERE productId = ?").bind(productId).run();
  } else {
    window.D1.prepare("INSERT INTO cart (id, productId, qty, selected) VALUES (?, ?, ?, ?)")
      .bind(Date.now().toString(), productId, 1, 1)
      .run();
  }
};

export const updateCartQty = (cartId, qty) => {
  if (!window.D1) return;
  if (qty <= 0) {
    window.D1.prepare("DELETE FROM cart WHERE id = ?").bind(cartId).run();
  } else {
    window.D1.prepare("UPDATE cart SET qty = ? WHERE id = ?").bind(qty, cartId).run();
  }
};

export const toggleCartSelect = (cartId, selected) => {
  if (!window.D1) return;
  window.D1.prepare("UPDATE cart SET selected = ? WHERE id = ?").bind(selected ? 1 : 0, cartId).run();
};

export const toggleSelectAll = (selected) => {
  if (!window.D1) return;
  window.D1.prepare("UPDATE cart SET selected = ?").bind(selected ? 1 : 0).run();
};

export const removeFromCart = (cartId) => {
  if (!window.D1) return;
  window.D1.prepare("DELETE FROM cart WHERE id = ?").bind(cartId).run();
};

export const clearSelectedCart = () => {
  if (!window.D1) return;
  window.D1.prepare("DELETE FROM cart WHERE selected = 1").run();
};
  