import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Product } from '../lib/api';
import './MarketplacePage.css';

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.getProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Failed to load products');
                setLoading(false);
            });
    }, []);

    const handleCheckout = async (productId: number) => {
        try {
            const { checkout_url } = await api.checkoutProduct(productId);
            if (checkout_url) {
                window.location.href = checkout_url;
            }
        } catch (err: any) {
            alert(err.message || 'Checkout failed. Please ensure you are logged in.');
        }
    };

    return (
        <section className="marketplace-wrapper">
            <div className="marketplace-header">
                <div className="header-title">
                    <a href="/" className="back">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4a5565">
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                    </a>
                    <h2 className='title'>Marketplace</h2>
                </div>
                <p className="subtitle">Discover amazing smoothie tools and ingredients from creators around the world.</p>
            </div>
            
            {loading && <div className="loading-spinner">Loading products...</div>}
            {error && <div className="form-error">{error}</div>}

            {!loading && !error && (
                <section className="products-grid">
                    {products.length === 0 ? (
                        <div className="empty-state">No products found.</div>
                    ) : (
                        products.map(product => (
                            <div key={product.id} className="grid" style={{ flexDirection: 'column', gap: '1rem', padding: '1.5rem', height: 'auto', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--gray-900)' }}>{product.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', flex: 1 }}>{product.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '1rem' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--amber-700)' }}>
                                        €{(product.price_cents / 100).toFixed(2)}
                                    </span>
                                    <button 
                                        className="btn" 
                                        style={{ padding: '0.5rem 1.5rem', borderRadius: '10px' }}
                                        onClick={() => handleCheckout(product.id)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            )}
        </section>
    );
}

