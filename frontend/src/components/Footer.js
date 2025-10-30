import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            marginTop: '50px'
        }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h5 style={{fontWeight: 'bold', marginBottom: '20px', fontStyle: 'italic'}}>🍽️ GoFood</h5>
                        <p style={{opacity: 0.9}}>Delicious food delivered to your doorstep. Fast, fresh, and always satisfying.</p>
                        <div className="d-flex gap-3 mt-3">
                            <div style={{background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', cursor: 'pointer'}}>📱</div>
                            <div style={{background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', cursor: 'pointer'}}>📷</div>
                            <div style={{background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', cursor: 'pointer'}}>🐦</div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-4">
                        <h6 style={{fontWeight: 'bold', marginBottom: '15px'}}>Quick Links</h6>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            <li style={{marginBottom: '8px'}}><Link to="/" style={{color: 'white', textDecoration: 'none', opacity: 0.9}} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.9}>Home</Link></li>
                            <li style={{marginBottom: '8px'}}><Link to="/menu" style={{color: 'white', textDecoration: 'none', opacity: 0.9}} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.9}>Menu</Link></li>
                            <li style={{marginBottom: '8px'}}><Link to="/about" style={{color: 'white', textDecoration: 'none', opacity: 0.9}} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.9}>About</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h6 style={{fontWeight: 'bold', marginBottom: '15px'}}>Contact Info</h6>
                        <div style={{opacity: 0.9}}>
                            <p style={{marginBottom: '8px'}}>📍 123 Food Street, City</p>
                            <p style={{marginBottom: '8px'}}>📞 +1 234 567 8900</p>
                            <p style={{marginBottom: '8px'}}>📧 info@gofood.com</p>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h6 style={{fontWeight: 'bold', marginBottom: '15px'}}>Download App</h6>
                        <div className="d-flex flex-column gap-2">
                            <div style={{background: 'rgba(255,255,255,0.2)', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease'}} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}>
                                App Store
                            </div>
                            <div style={{background: 'rgba(255,255,255,0.2)', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease'}} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}>
                                Google Play
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{border: '1px solid rgba(255,255,255,0.2)', margin: '30px 0'}} />
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p style={{margin: 0, opacity: 0.8}}>© 2025 GoFood, Inc. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <span style={{opacity: 0.8}}>Made with ❤️ for food lovers</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
