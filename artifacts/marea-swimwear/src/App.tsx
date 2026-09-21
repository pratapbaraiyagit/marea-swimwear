import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Route, Switch, Link, useLocation, useParams } from 'wouter';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { collections, getCollection, getProduct, getWhatsAppUrl, MAREA_CONFIG, products, type Product } from '@/lib/marea';

const queryClient = new QueryClient();

function Meta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = `${title} — ${MAREA_CONFIG.brand}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [wishlist] = useWishlist();
  const searchResults = useMemo(
    () => products.filter((product) => `${product.name} ${product.color}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4),
    [query],
  );
  const nav = [
    { label: 'Shop all', href: '/shop' },
    { label: 'The core edit', href: '/collections/core' },
    { label: 'After sun', href: '/collections/after-sun' },
    { label: 'Our story', href: '/about' },
  ];
  return (
    <>
      <div className="bg-[#36302d] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[.19em] text-[#f5eee3]">
        Complimentary shipping on orders over {MAREA_CONFIG.currency}{MAREA_CONFIG.shippingThreshold}
      </div>
      <header className="relative z-30 border-b border-[#ded4c7] bg-[#f8f3ea]">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button className="p-2 lg:hidden" aria-label="Open menu" data-testid="button-open-menu" onClick={() => setMenuOpen(true)}>
            <Menu size={21} strokeWidth={1.5} />
          </button>
          <div className="hidden w-1/3 items-center gap-7 lg:flex">
            {nav.slice(0, 3).map((item) => (
              <Link href={item.href} key={item.href} className={`marea-link text-[11px] uppercase tracking-[.15em] ${location === item.href ? 'text-[#a75d4d]' : ''}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-[29px] tracking-[.23em] text-[#36302d]" data-testid="link-logo">MAREA</Link>
          <div className="flex w-1/3 items-center justify-end gap-1 sm:gap-3">
            <button onClick={() => setSearchOpen((open) => !open)} className="p-2" aria-label="Search" data-testid="button-search">
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link href="/shop?wishlist=true" className="relative p-2" aria-label={`Wishlist, ${wishlist.length} items`} data-testid="link-wishlist">
              <Heart size={19} strokeWidth={1.5} />
              {wishlist.length > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a75d4d] px-1 text-[9px] text-[#fff8ef]">{wishlist.length}</span>}
            </Link>
            <Link href="/contact" className="hidden border-l border-[#ded4c7] pl-4 text-[11px] uppercase tracking-[.15em] sm:block" data-testid="link-contact-header">Contact</Link>
          </div>
        </div>
        <div className="hidden border-t border-[#ded4c7] lg:block">
          <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-center gap-10 px-8">
            <Link href="/size-guide" className="marea-link text-[10px] uppercase tracking-[.18em] text-[#746a62]" data-testid="link-size-guide-header">Find your fit</Link>
            <span className="h-1 w-1 rounded-full bg-[#b87968]" />
            <Link href="/shipping" className="marea-link text-[10px] uppercase tracking-[.18em] text-[#746a62]" data-testid="link-shipping-header">Shipping & returns</Link>
          </div>
        </div>
        {searchOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-[#ded4c7] bg-[#f8f3ea] px-5 py-5 shadow-[0_14px_28px_rgba(54,48,45,.08)] sm:px-12">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center border-b border-[#9e9287]">
                <Search size={19} strokeWidth={1.5} className="mr-3 text-[#746a62]" />
                <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-[#9e9287]" placeholder="Search the collection" data-testid="input-search" />
                <button onClick={() => { setQuery(''); setSearchOpen(false); }} aria-label="Close search" data-testid="button-close-search"><X size={18} strokeWidth={1.5} /></button>
              </div>
              {query && <div className="grid gap-3 py-4 sm:grid-cols-2">
                {searchResults.length ? searchResults.map((product) => <Link href={`/products/${product.slug}`} onClick={() => setSearchOpen(false)} key={product.slug} className="flex items-center gap-3" data-testid={`link-search-result-${product.slug}`}>
                  <img src={product.image} alt={product.name} className="h-14 w-12 object-cover" />
                  <span><span className="block font-serif text-lg">{product.name}</span><span className="text-xs text-[#746a62]">{MAREA_CONFIG.currency}{product.price}</span></span>
                </Link>) : <p className="py-2 text-sm text-[#746a62]">No pieces found. Try another word.</p>}
              </div>}
            </div>
          </div>
        )}
      </header>
      {menuOpen && <div className="fixed inset-0 z-50 bg-[#f8f3ea] px-6 py-6 animate-fade-in lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setMenuOpen(false)} className="font-serif text-[27px] tracking-[.22em]" data-testid="link-mobile-logo">MAREA</Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" data-testid="button-close-menu"><X size={24} strokeWidth={1.5} /></button>
        </div>
        <nav className="mt-20 grid gap-7">
          {nav.map((item, index) => <Link href={item.href} onClick={() => setMenuOpen(false)} key={item.href} className="flex items-baseline justify-between border-b border-[#ded4c7] pb-5 font-serif text-[31px]" data-testid={`link-mobile-nav-${index}`}><span>{item.label}</span><ArrowRight size={20} strokeWidth={1.3} /></Link>)}
        </nav>
        <div className="mt-14 grid gap-4 text-[11px] uppercase tracking-[.16em] text-[#746a62]">
          <Link href="/faq" onClick={() => setMenuOpen(false)} data-testid="link-mobile-faq">FAQs</Link>
          <Link href="/size-guide" onClick={() => setMenuOpen(false)} data-testid="link-mobile-size">Size guide</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} data-testid="link-mobile-contact">Contact</Link>
        </div>
      </div>}
    </>
  );
}

function Footer() {
  return <footer className="bg-[#36302d] px-5 pb-8 pt-16 text-[#f5eee3] sm:px-10 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-12 border-b border-[#6c625d] pb-14 md:grid-cols-[1.2fr_.8fr_.8fr_1.4fr]">
        <div><p className="font-serif text-4xl tracking-[.15em]">MAREA</p><p className="mt-5 max-w-[230px] text-sm leading-6 text-[#c8bbb0]">Swimwear, made to move. Small-run pieces for salt, sun and everything after.</p></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[.2em] text-[#bdaea2]">Explore</p><div className="grid gap-3 text-sm"><Link href="/shop" data-testid="link-footer-shop">Shop all</Link><Link href="/collections/core" data-testid="link-footer-core">The core edit</Link><Link href="/collections/after-sun" data-testid="link-footer-after-sun">After sun</Link><Link href="/about" data-testid="link-footer-about">Our story</Link></div></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[.2em] text-[#bdaea2]">Help</p><div className="grid gap-3 text-sm"><Link href="/size-guide" data-testid="link-footer-size">Size guide</Link><Link href="/shipping" data-testid="link-footer-shipping">Shipping</Link><Link href="/returns" data-testid="link-footer-returns">Returns</Link><Link href="/faq" data-testid="link-footer-faq">FAQs</Link></div></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[.2em] text-[#bdaea2]">Come say hello</p><p className="max-w-[250px] text-sm leading-6 text-[#c8bbb0]">For fit, styling or simply choosing your next place in the sun, message us directly.</p><a href={getWhatsAppUrl('Hello MAREA, I have a question about the collection.')} className="mt-5 inline-flex items-center gap-2 border-b border-[#c8bbb0] pb-1 text-sm" data-testid="link-footer-whatsapp">Message on WhatsApp <ArrowRight size={14} /></a></div>
      </div>
      <div className="flex flex-col justify-between gap-5 pt-7 text-[10px] uppercase tracking-[.15em] text-[#bdaea2] sm:flex-row"><p>© {new Date().getFullYear()} MAREA STUDIO</p><div className="flex gap-5"><Link href="/privacy" data-testid="link-footer-privacy">Privacy</Link><Link href="/terms" data-testid="link-footer-terms">Terms</Link><a href={MAREA_CONFIG.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a></div></div>
    </div>
  </footer>;
}

function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('marea-wishlist') || '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('marea-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  const toggleWishlist = (slug: string) => setWishlist((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  return [wishlist, toggleWishlist] as const;
}

function ProductCard({ product, wishlist, toggleWishlist }: { product: Product; wishlist: string[]; toggleWishlist: (slug: string) => void }) {
  const [hover, setHover] = useState(false);
  const saved = wishlist.includes(product.slug);
  return <article className="group">
    <div className="relative overflow-hidden bg-[#ece2d5]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link href={`/products/${product.slug}`} className="block aspect-[.82] overflow-hidden" data-testid={`link-product-${product.slug}`}>
        <img src={hover && product.secondaryImage ? product.secondaryImage : product.image} alt={`${product.name}, ${product.color}`} className="marea-image h-full w-full object-cover" />
      </Link>
      {product.badge && <span className="absolute left-3 top-3 bg-[#f8f3ea]/90 px-2.5 py-1 text-[9px] uppercase tracking-[.16em]">{product.badge}</span>}
      <button onClick={() => toggleWishlist(product.slug)} className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-[#f8f3ea]/90 ${saved ? 'text-[#a75d4d]' : ''}`} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} data-testid={`button-wishlist-${product.slug}`}><Heart size={16} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} /></button>
      <Link href={`/products/${product.slug}`} className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#f8f3ea]/95 py-3 text-center text-[10px] uppercase tracking-[.18em] transition-transform duration-300 group-hover:translate-y-0" data-testid={`link-quick-view-${product.slug}`}>View piece</Link>
    </div>
    <Link href={`/products/${product.slug}`} className="mt-4 flex items-start justify-between gap-3" data-testid={`link-product-info-${product.slug}`}><span><span className="block font-serif text-[20px]">{product.name}</span><span className="mt-1 block text-[11px] text-[#746a62]">{product.color}</span></span><span className="text-sm">{MAREA_CONFIG.currency}{product.price}</span></Link>
  </article>;
}

function FloatingWhatsApp() {
  return <a href={getWhatsAppUrl('Hello MAREA, I would love some help choosing a piece.')} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#a75d4d] px-4 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-[#fff8ef] shadow-[0_8px_25px_rgba(167,93,77,.25)] transition-transform hover:-translate-y-1 sm:bottom-7 sm:right-7" data-testid="link-floating-whatsapp"><span className="h-2 w-2 rounded-full bg-[#f5d9ba]" /> Chat with us</a>;
}

function Shell({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /><FloatingWhatsApp /></>;
}

function Home() {
  const [wishlist, toggleWishlist] = useWishlist();
  return <><Meta title="Swimwear, made to move." description="MAREA is an independent swimwear studio for confident, editorial pieces." />
    <section className="relative min-h-[calc(100svh-108px)] overflow-hidden bg-[#c9a18f]">
      <img src="/images/marea-hero.jpg" alt="Woman wearing the Sol one-piece beside a sunlit Mediterranean cove" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#4e3830]/55 via-transparent to-transparent" />
      <div className="relative mx-auto flex min-h-[calc(100svh-108px)] max-w-[1440px] items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
        <div className="max-w-[500px] text-[#fff8ef] animate-rise-in">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.25em] text-[#f6ded0]">The high summer 2025 edit</p>
          <h1 className="font-serif text-[clamp(4rem,10vw,8.6rem)] leading-[.86] tracking-[-.045em]">Made for<br /><i>the water.</i></h1>
          <p className="mt-7 max-w-[310px] text-[15px] leading-6 text-[#f6e9de]">Small-run swimwear for long days, bare feet and the confidence to stay a little longer.</p>
          <Link href="/shop" className="mt-8 inline-flex items-center gap-3 border-b border-[#fff8ef] pb-2 text-[11px] font-semibold uppercase tracking-[.18em]" data-testid="link-hero-shop">Shop the edit <ArrowRight size={15} /></Link>
        </div>
        <span className="absolute bottom-8 right-6 hidden text-[10px] uppercase tracking-[.2em] text-[#f6ded0] [writing-mode:vertical-rl] sm:block">01 — 04 / MAREA SUMMER</span>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="grid items-end gap-8 md:grid-cols-[1fr_1fr]">
        <div><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">A point of view</p><h2 className="mt-5 max-w-[530px] font-serif text-[clamp(2.8rem,5.5vw,5.3rem)] leading-[.96] tracking-[-.035em]">Good swimwear changes how you <i>carry yourself.</i></h2></div>
        <p className="max-w-[370px] justify-self-end text-[15px] leading-7 text-[#746a62]">MAREA began with a simple idea: a swimsuit should feel as considered as the clothes you choose to wear out. Our silhouettes are drawn in Barcelona, made in small runs in Portugal, and designed for the whole day.</p>
      </div>
    </section>
    <section className="bg-[#e7d7c6] px-5 py-5 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1440px] gap-5 md:grid-cols-[1.2fr_.8fr]">
        <Link href="/collections/core" className="group relative overflow-hidden bg-[#ba827b]" data-testid="link-home-core-collection"><div className="aspect-[1.15] overflow-hidden md:aspect-[1.25]"><img src="/images/marea-editorial.jpg" alt="The Core Edit charcoal bikini in sculptural coastal light" className="marea-image h-full w-full object-cover" /></div><div className="absolute bottom-7 left-7 text-[#fff8ef] sm:bottom-10 sm:left-10"><p className="text-[10px] uppercase tracking-[.2em]">01 / Collection</p><h3 className="mt-2 font-serif text-4xl sm:text-5xl">The core edit</h3><span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em]">Explore <ArrowRight size={14} /></span></div></Link>
        <Link href="/collections/after-sun" className="group relative overflow-hidden bg-[#cfaa8d]" data-testid="link-home-after-sun-collection"><div className="aspect-[1.15] overflow-hidden md:aspect-[1.25]"><img src="/images/marea-rose.jpg" alt="The After Sun collection in soft faded rose" className="marea-image h-full w-full object-cover" /></div><div className="absolute bottom-7 left-7 text-[#fff8ef] sm:bottom-10 sm:left-10"><p className="text-[10px] uppercase tracking-[.2em]">02 / Collection</p><h3 className="mt-2 font-serif text-4xl sm:text-5xl">After sun</h3><span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em]">Explore <ArrowRight size={14} /></span></div></Link>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mb-9 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">The pieces</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">A little less, a lot better.</h2></div><Link href="/shop" className="hidden items-center gap-2 text-[10px] uppercase tracking-[.18em] sm:flex" data-testid="link-home-all-products">View all <ArrowRight size={14} /></Link></div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div>
      <Link href="/shop" className="mt-10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[.18em] sm:hidden" data-testid="link-home-all-products-mobile">View all pieces <ArrowRight size={14} /></Link>
    </section>
    <section className="relative overflow-hidden bg-[#bc8276] px-5 py-24 text-center text-[#fff8ef] sm:py-36"><div className="absolute inset-0 opacity-25"><img src="/images/marea-detail.jpg" alt="" className="h-full w-full object-cover mix-blend-multiply" /></div><div className="relative mx-auto max-w-2xl"><p className="text-[10px] uppercase tracking-[.23em] text-[#f6ded0]">A note from MAREA</p><blockquote className="mt-6 font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[.98]">“The best place to be is exactly where you are.”</blockquote><p className="mt-8 text-[10px] uppercase tracking-[.2em] text-[#f6ded0]">— Elena, founder</p></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16"><div className="grid items-center gap-12 md:grid-cols-[.85fr_1.15fr]"><img src="/images/marea-sand.jpg" alt="Texture and details from the MAREA studio" className="aspect-[1.2] w-full object-cover md:aspect-[1.1]" /><div className="max-w-[500px]"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">The MAREA journal</p><h2 className="mt-5 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[.95]">Salt on skin,<br /><i>sun in your eyes.</i></h2><p className="mt-7 text-[15px] leading-7 text-[#746a62]">Notes on getting dressed for the coast, from the women and places that keep us moving.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-[#36302d] pb-2 text-[10px] uppercase tracking-[.18em]" data-testid="link-home-story">Read our story <ArrowRight size={14} /></Link></div></div></section>
  </>;
}

function Shop() {
  const [location] = useLocation();
  const [wishlist, toggleWishlist] = useWishlist();
  const [category, setCategory] = useState('All pieces');
  const [sort, setSort] = useState('Featured');
  const showWishlist = location.includes('wishlist=true');
  const filtered = useMemo(() => {
    const source = showWishlist ? products.filter((product) => wishlist.includes(product.slug)) : products;
    const next = category === 'All pieces' ? [...source] : source.filter((product) => product.category === category);
    if (sort === 'Price: low to high') next.sort((a, b) => a.price - b.price);
    if (sort === 'Price: high to low') next.sort((a, b) => b.price - a.price);
    if (sort === 'Newest') next.sort((a, b) => b.createdAt - a.createdAt);
    return next;
  }, [category, sort, showWishlist, wishlist]);
  return <><Meta title={showWishlist ? 'Saved pieces' : 'Shop all'} description="Discover the MAREA swimwear collection." /><section className="mx-auto max-w-[1440px] px-5 pb-24 pt-14 sm:px-10 sm:pt-20 lg:px-16"><div className="max-w-[620px]"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">{showWishlist ? 'Your saved pieces' : 'The collection / 2025'}</p><h1 className="mt-4 font-serif text-[clamp(3.8rem,8vw,7rem)] leading-[.88] tracking-[-.045em]">{showWishlist ? <>Keep your<br /><i>eye on it.</i></> : <>Take your<br /><i>pick.</i></>}</h1><p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#746a62]">{showWishlist ? 'Pieces you have saved for later will stay here on this device.' : 'Sculpted one-pieces, uncomplicated bikinis and the layers that make the day last longer.'}</p></div><div className="mt-16 flex flex-col justify-between gap-5 border-y border-[#ded4c7] py-4 sm:flex-row sm:items-center"><div className="flex flex-wrap gap-x-5 gap-y-3">{['All pieces', 'One-piece', 'Bikini', 'Cover-up'].map((filter) => <button key={filter} onClick={() => setCategory(filter)} className={`text-[10px] uppercase tracking-[.16em] ${category === filter ? 'border-b border-[#a75d4d] pb-1 text-[#a75d4d]' : 'text-[#746a62]'}`} data-testid={`button-filter-${filter.toLowerCase().replace('-', '')}`}>{filter}</button>)}</div><label className="flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-[#746a62]">Sort<select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent py-1 text-[#36302d] outline-none" data-testid="select-sort"><option>Featured</option><option>Newest</option><option>Price: low to high</option><option>Price: high to low</option></select></label></div><div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 md:grid-cols-3">{filtered.map((product) => <ProductCard key={product.slug} product={product} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div>{filtered.length === 0 && <div className="py-24 text-center"><p className="font-serif text-3xl">{showWishlist ? 'Your saved list is empty.' : 'Nothing here yet.'}</p><button onClick={() => setCategory('All pieces')} className="mt-5 border-b border-[#36302d] pb-1 text-[10px] uppercase tracking-[.18em]" data-testid="button-reset-filter">{showWishlist ? 'Browse the collection' : 'View all pieces'}</button></div>}</section></>;
}

function CollectionPage() {
  const { slug } = useParams();
  const collection = getCollection(slug) || collections[0];
  const [wishlist, toggleWishlist] = useWishlist();
  const items = products.filter((product) => product.collection === collection.slug);
  return <><Meta title={collection.name} description={collection.description} /><section className="relative bg-[#c49b87]"><div className="grid min-h-[560px] md:grid-cols-2"><div className="flex items-end px-6 pb-14 pt-20 sm:px-12 lg:px-20 lg:pb-20"><div className="max-w-[440px] text-[#fff8ef] animate-rise-in"><p className="text-[10px] uppercase tracking-[.22em] text-[#f6ded0]">{collection.eyebrow}</p><h1 className="mt-5 font-serif text-[clamp(3.8rem,7vw,7rem)] leading-[.88] tracking-[-.045em]">{collection.name.split(' ').map((word, index) => <span key={word} className="block">{index === collection.name.split(' ').length - 1 ? <i>{word}</i> : word}</span>)}</h1><p className="mt-7 max-w-[320px] text-[15px] leading-6 text-[#f6e9de]">{collection.description}</p></div></div><div className="min-h-[440px] overflow-hidden"><img src={collection.image} alt={`${collection.name} swimwear editorial`} className="h-full w-full object-cover" /></div></div></section><section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16"><div className="mb-10 flex items-end justify-between"><p className="text-[10px] uppercase tracking-[.2em] text-[#746a62]">{items.length} pieces / {collection.name}</p><Link href="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-[.18em]" data-testid="link-collection-all">View all <ArrowRight size={14} /></Link></div><div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 md:grid-cols-3">{items.map((product) => <ProductCard key={product.slug} product={product} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div></section></>;
}

function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug) || products[0];
  const [wishlist, toggleWishlist] = useWishlist();
  const [image, setImage] = useState(product.image);
  const [size, setSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState<string | null>('Details');
  const related = products.filter((item) => item.slug !== product.slug && (item.collection === product.collection || item.category === product.category)).slice(0, 3);
  const saved = wishlist.includes(product.slug);
  const message = `Hello MAREA, I would like to order the ${product.name} in ${product.color}, size ${size}, quantity ${quantity}.`;
  return <><Meta title={product.name} description={product.description} /><section className="mx-auto max-w-[1440px] px-5 py-7 sm:px-10 sm:py-12 lg:px-16"><Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.17em] text-[#746a62]" data-testid="link-back-shop"><ArrowLeft size={14} /> Back to shop</Link><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20"><div className="grid gap-3 sm:grid-cols-[.18fr_.82fr]"><div className="order-2 flex gap-3 sm:order-1 sm:grid sm:content-start"><button onClick={() => setImage(product.image)} className={`aspect-[.82] overflow-hidden ${image === product.image ? 'ring-1 ring-[#36302d]' : ''}`} aria-label="Show first product image" data-testid="button-product-image-1"><img src={product.image} alt={`${product.name} front view`} className="h-full w-full object-cover" /></button>{product.secondaryImage && <button onClick={() => setImage(product.secondaryImage!)} className={`aspect-[.82] overflow-hidden ${image === product.secondaryImage ? 'ring-1 ring-[#36302d]' : ''}`} aria-label="Show second product image" data-testid="button-product-image-2"><img src={product.secondaryImage} alt={`${product.name} detail view`} className="h-full w-full object-cover" /></button>}</div><div className="order-1 aspect-[.82] overflow-hidden bg-[#ece2d5] sm:order-2"><img src={image} alt={`${product.name}, ${product.color}`} className="h-full w-full object-cover" /></div></div><div className="lg:pt-8"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.2em] text-[#a75d4d]">{product.category} / {product.color}</p><h1 className="mt-3 font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[.92] tracking-[-.035em]">{product.name}</h1></div><button onClick={() => toggleWishlist(product.slug)} className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-[#ded4c7] ${saved ? 'text-[#a75d4d]' : ''}`} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} data-testid="button-product-wishlist"><Heart size={19} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} /></button></div><p className="mt-5 text-lg">{MAREA_CONFIG.currency}{product.price}</p><p className="mt-7 max-w-[450px] text-[15px] leading-7 text-[#746a62]">{product.description}</p><div className="mt-9 border-t border-[#ded4c7]"><div className="flex items-center justify-between border-b border-[#ded4c7] py-5"><span className="text-[10px] uppercase tracking-[.18em]">Colour</span><span className="flex items-center gap-2 text-sm text-[#746a62]"><span className="h-4 w-4 rounded-full border border-[#f8f3ea] shadow-[0_0_0_1px_#b9aaa0]" style={{ backgroundColor: product.colorHex }} />{product.color}</span></div><div className="py-5"><div className="mb-4 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.18em]">Size</span><Link href="/size-guide" className="marea-link text-[10px] uppercase tracking-[.14em] text-[#746a62]" data-testid="link-product-size-guide">Size guide</Link></div><div className="grid grid-cols-5 gap-2">{product.sizes.map((option) => <button key={option} onClick={() => setSize(option)} className={`border py-3 text-xs ${size === option ? 'border-[#36302d] bg-[#36302d] text-[#fff8ef]' : 'border-[#ded4c7]'}`} data-testid={`button-size-${option}`}>{option}</button>)}</div></div><div className="flex items-center justify-between border-t border-[#ded4c7] py-5"><span className="text-[10px] uppercase tracking-[.18em]">Quantity</span><div className="flex items-center border border-[#ded4c7]"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="p-3" aria-label="Decrease quantity" data-testid="button-decrease-quantity"><Minus size={14} /></button><span className="w-8 text-center text-sm" data-testid="text-quantity">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="p-3" aria-label="Increase quantity" data-testid="button-increase-quantity"><Plus size={14} /></button></div></div></div><a href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-center gap-3 bg-[#a75d4d] py-4 text-[11px] font-semibold uppercase tracking-[.17em] text-[#fff8ef] transition-colors hover:bg-[#8f4b3d]" data-testid="link-order-whatsapp">Order via WhatsApp <ArrowRight size={16} /></a><p className="mt-3 text-center text-[11px] text-[#746a62]">We will confirm availability, delivery and payment by message.</p><div className="mt-10 border-t border-[#ded4c7]">{[['Details', product.details.join(' · ')], ['Care', 'Rinse in cool water after swimming. Dry flat away from direct heat.'], ['Shipping', `Complimentary shipping over ${MAREA_CONFIG.currency}${MAREA_CONFIG.shippingThreshold}. See delivery times and returns.`]].map(([label, content]) => <div key={label} className="border-b border-[#ded4c7]"><button onClick={() => setOpen(open === label ? null : label)} className="flex w-full items-center justify-between py-5 text-left text-[10px] uppercase tracking-[.17em]" data-testid={`button-accordion-${label.toLowerCase()}`}>{label}<ChevronDown size={16} className={`transition-transform ${open === label ? 'rotate-180' : ''}`} /></button>{open === label && <p className="max-w-[480px] pb-5 text-sm leading-6 text-[#746a62]">{content}</p>}</div>)}</div></div></div></section><section className="bg-[#e7d7c6] px-5 py-20 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1440px]"><p className="text-[10px] uppercase tracking-[.2em] text-[#a75d4d]">Keep looking</p><h2 className="mt-3 font-serif text-4xl">You may also like</h2><div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3">{related.map((item) => <ProductCard key={item.slug} product={item} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div></div></section></>;
}

function About() {
  return <><Meta title="Our story" description="The MAREA story: small-run swimwear made in Portugal." /><section className="grid min-h-[650px] md:grid-cols-2"><div className="flex items-end bg-[#bc8276] px-6 pb-16 pt-24 text-[#fff8ef] sm:px-12 lg:px-20"><div className="max-w-[500px]"><p className="text-[10px] uppercase tracking-[.22em] text-[#f6ded0]">About MAREA</p><h1 className="mt-6 font-serif text-[clamp(4rem,8vw,8rem)] leading-[.85] tracking-[-.05em]">Made for<br /><i>moving.</i></h1><p className="mt-8 max-w-[350px] text-[15px] leading-7 text-[#f6e9de]">MAREA is a swimwear studio for the space between plans. The long lunch, the first swim, the walk home with salt still on your skin.</p></div></div><div className="min-h-[450px] bg-[#d7bd9f]"><img src="/images/marea-clay.jpg" alt="Woman in a MAREA clay swimsuit on sunlit limestone steps" className="h-full w-full object-cover" /></div></section><section className="mx-auto max-w-[1040px] px-5 py-24 sm:px-10 sm:py-32"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">A small studio, with a wide horizon</p><div className="mt-8 grid gap-10 md:grid-cols-[.9fr_1.1fr]"><h2 className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[.93]">The pieces are<br /><i>the point of view.</i></h2><div className="space-y-5 text-[15px] leading-7 text-[#746a62]"><p>We started MAREA because the swimwear we wanted did not exist yet: beautifully made, quietly sensual, and good enough to wear beyond the beach.</p><p>Every silhouette is sketched in our Barcelona studio, tested on real bodies and made in small runs by a family workshop in northern Portugal. We choose recycled Italian fabrics, thoughtful construction and the kind of details you only notice when a garment is made well.</p><p>There is no rush to make more. We would rather make the right thing, then let it live a long life.</p></div></div></section><section className="bg-[#e7d7c6] px-5 py-20 sm:px-10 sm:py-28 lg:px-16"><div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-2"><img src="/images/marea-detail.jpg" alt="Close-up of MAREA's hand-finished fabric details" className="aspect-[1.3] w-full object-cover" /><div className="md:pl-10"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">Our measure</p><h2 className="mt-5 font-serif text-5xl leading-[.94]">Less, but<br /><i>better.</i></h2><p className="mt-6 max-w-[390px] text-[15px] leading-7 text-[#746a62]">Small runs mean we can pay attention to every seam, avoid unnecessary stock and keep the relationship between our clothes and the people making them close.</p><Link href="/shop" className="mt-8 inline-flex items-center gap-2 border-b border-[#36302d] pb-2 text-[10px] uppercase tracking-[.18em]" data-testid="link-about-shop">Discover the pieces <ArrowRight size={14} /></Link></div></div></section></>;
}

const informationPages: Record<string, { title: string; eyebrow: string; intro: string; sections: { heading: string; body: string }[] }> = {
  Shipping: { eyebrow: 'Good to know', title: 'Shipping', intro: 'A clear path from our studio to your door.', sections: [{ heading: 'Delivery times', body: 'Orders are prepared within 1–2 working days. Spain: 1–3 working days. Europe: 3–6 working days. Rest of world: 5–9 working days. We will send tracking details as soon as your parcel leaves us.' }, { heading: 'Shipping costs', body: 'Complimentary shipping on orders over €180. A flat rate is calculated at the time of order based on your delivery country. Message us on WhatsApp and we will confirm the exact cost before you decide.' }, { heading: 'A note on duties', body: 'International orders may be subject to local duties or taxes on arrival. These are the responsibility of the recipient.' }] },
  Returns: { eyebrow: 'Good to know', title: 'Returns', intro: 'Take your time. The right piece should feel right.', sections: [{ heading: 'Our policy', body: 'You have 14 days from delivery to request a return. Items must be unworn, unwashed and returned with their hygiene liner and original tags attached.' }, { heading: 'How to start', body: 'Message us on WhatsApp with your order details and the piece you would like to return. We will send the simple next steps and return address.' }, { heading: 'Refunds', body: 'Once received and checked, your refund will be issued to the original payment method within 5 working days. Original shipping costs are non-refundable.' }] },
  Privacy: { eyebrow: 'The small print', title: 'Privacy', intro: 'We keep things simple and treat your information with care.', sections: [{ heading: 'What we collect', body: 'When you contact us, we may receive your name, email address, phone number and the details you choose to share. We use this only to respond and support your order.' }, { heading: 'What we do not do', body: 'We do not sell your information or use it for unrelated advertising. We keep communications relevant and human.' }, { heading: 'Questions', body: `For any privacy question, email ${MAREA_CONFIG.email}.` }] },
  Terms: { eyebrow: 'The small print', title: 'Terms', intro: 'The straightforward version of our terms of service.', sections: [{ heading: 'Shopping with MAREA', body: 'All pieces are subject to availability. Product photography is intended as a close representation; small variations in colour may occur between screens.' }, { heading: 'Orders via WhatsApp', body: 'Your order is confirmed only when we have agreed the item, size, price, delivery details and payment method together in writing.' }, { heading: 'Contact', body: `For questions about these terms, contact ${MAREA_CONFIG.email}.` }] },
};

function InfoPage({ type }: { type: keyof typeof informationPages }) {
  const page = informationPages[type];
  return <><Meta title={page.title} description={page.intro} /><section className="mx-auto max-w-[1000px] px-5 py-20 sm:px-10 sm:py-28"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">{page.eyebrow}</p><h1 className="mt-5 font-serif text-[clamp(4rem,9vw,8rem)] leading-[.86] tracking-[-.05em]">{page.title}</h1><p className="mt-8 max-w-[490px] text-lg leading-7 text-[#746a62]">{page.intro}</p><div className="mt-20 max-w-[700px] border-t border-[#ded4c7]">{page.sections.map((section, index) => <div key={section.heading} className="grid gap-5 border-b border-[#ded4c7] py-8 sm:grid-cols-[.35fr_.65fr]"><p className="text-[10px] uppercase tracking-[.18em] text-[#a75d4d]">0{index + 1} / {section.heading}</p><p className="text-[15px] leading-7 text-[#746a62]">{section.body}</p></div>)}</div></section></>;
}

function SizeGuide() {
  const rows = [['XS', '80–84', '60–64', '86–90'], ['S', '84–88', '64–68', '90–94'], ['M', '88–92', '68–72', '94–98'], ['L', '92–98', '72–78', '98–104'], ['XL', '98–104', '78–84', '104–110']];
  return <><Meta title="Size guide" description="Find your MAREA fit." /><section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-10 sm:py-28"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">Find your fit</p><h1 className="mt-5 font-serif text-[clamp(3.8rem,8vw,7rem)] leading-[.86]">Size, in<br /><i>your language.</i></h1><div className="mt-14 grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div className="max-w-[340px] text-[15px] leading-7 text-[#746a62]"><p>Our pieces are designed to feel close to the body, never restrictive. If you are between sizes, choose the larger size for a softer fit.</p><p className="mt-5">Measurements are in centimetres. Measure around the fullest part of the bust and hips, and the narrowest part of your waist.</p><a href={getWhatsAppUrl('Hello MAREA, I would love help finding my size.')} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-[#36302d] pb-2 text-[10px] uppercase tracking-[.17em]" data-testid="link-size-help">Ask us for help <ArrowRight size={14} /></a></div><div className="overflow-x-auto"><table className="w-full min-w-[550px] border-collapse text-left"><thead><tr className="border-y border-[#ded4c7] text-[10px] uppercase tracking-[.15em]"><th className="py-4">Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-[#ded4c7] text-sm text-[#746a62]"><th className="py-5 font-serif text-xl font-normal text-[#36302d]">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table><p className="mt-3 text-[10px] uppercase tracking-[.12em] text-[#9e9287]">All measurements in cm</p></div></div></section></>;
}

function FAQ() {
  const faqs = [['How do I order?', 'Choose your piece and size, then tap Order via WhatsApp. We will confirm availability, delivery and payment with you directly. No account is needed.'], ['Can I get help choosing a size?', 'Absolutely. Message us with your usual size, height and any fit preferences. We are happy to recommend a size and silhouette.'], ['Where are pieces made?', 'Every MAREA piece is made in small runs in a family workshop in northern Portugal using recycled Italian fabrics.'], ['Can I wear MAREA beyond the beach?', 'That is the idea. Our one-pieces work beautifully as bodysuits and our cover-ups are made for wherever the afternoon goes.'], ['What is your returns policy?', 'You have 14 days from delivery to request a return. The piece must be unworn, unwashed, with its hygiene liner and original tags attached.']]; 
  const [open, setOpen] = useState(0);
  return <><Meta title="FAQs" description="Answers to common MAREA questions." /><section className="mx-auto max-w-[1000px] px-5 py-20 sm:px-10 sm:py-28"><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">Questions, answered</p><h1 className="mt-5 max-w-[690px] font-serif text-[clamp(3.7rem,8vw,7rem)] leading-[.86] tracking-[-.045em]">Before you<br /><i>dive in.</i></h1><div className="mt-16 border-t border-[#ded4c7]">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-[#ded4c7]"><button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left font-serif text-xl sm:text-2xl" data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={19} strokeWidth={1.3} className={`shrink-0 transition-transform ${open === index ? 'rotate-180 text-[#a75d4d]' : ''}`} /></button>{open === index && <p className="max-w-[620px] pb-7 text-[15px] leading-7 text-[#746a62]">{answer}</p>}</div>)}</div><div className="mt-16 bg-[#e7d7c6] px-7 py-9 sm:px-10"><p className="font-serif text-2xl">Still wondering?</p><a href={getWhatsAppUrl('Hello MAREA, I have a question.')} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.17em]" data-testid="link-faq-whatsapp">Message us on WhatsApp <ArrowRight size={14} /></a></div></section></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <><Meta title="Contact" description="Contact the MAREA studio." /><section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 sm:py-28"><div className="grid gap-16 md:grid-cols-[.8fr_1.2fr]"><div><p className="text-[10px] uppercase tracking-[.22em] text-[#a75d4d]">Come say hello</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7rem)] leading-[.84] tracking-[-.05em]">We are<br /><i>here.</i></h1><p className="mt-8 max-w-[300px] text-[15px] leading-7 text-[#746a62]">Fit questions, order help, a note about your summer plans. We read every message.</p><div className="mt-12 grid gap-4 text-sm"><a href={getWhatsAppUrl('Hello MAREA, I have a question.')} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-[#ded4c7] pb-3" data-testid="link-contact-whatsapp"><span>WhatsApp</span><span className="text-[#746a62]">{MAREA_CONFIG.whatsappDisplay}</span></a><a href={`mailto:${MAREA_CONFIG.email}`} className="flex items-center justify-between border-b border-[#ded4c7] pb-3" data-testid="link-contact-email"><span>Email</span><span className="text-[#746a62]">{MAREA_CONFIG.email}</span></a><a href={MAREA_CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-[#ded4c7] pb-3" data-testid="link-contact-instagram"><span>Instagram</span><span className="text-[#746a62]">{MAREA_CONFIG.instagram}</span></a></div></div><div className="bg-[#e7d7c6] p-6 sm:p-10">{sent ? <div className="flex min-h-[430px] flex-col items-start justify-center"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a75d4d] text-[#fff8ef]"><Check size={18} /></span><h2 className="mt-6 font-serif text-4xl">Message received.</h2><p className="mt-4 max-w-[340px] text-[15px] leading-7 text-[#746a62]">Thank you for writing. We will be in touch soon, usually within one working day.</p><button onClick={() => setSent(false)} className="mt-8 border-b border-[#36302d] pb-1 text-[10px] uppercase tracking-[.17em]" data-testid="button-send-another">Send another message</button></div> : <form onSubmit={submit} className="grid gap-7"><h2 className="font-serif text-4xl">Write to us.</h2><label className="grid gap-2 text-[10px] uppercase tracking-[.16em]">Name<input required name="name" className="border-b border-[#9e9287] bg-transparent py-3 text-[15px] normal-case tracking-normal outline-none" data-testid="input-contact-name" /></label><label className="grid gap-2 text-[10px] uppercase tracking-[.16em]">Email<input required type="email" name="email" className="border-b border-[#9e9287] bg-transparent py-3 text-[15px] normal-case tracking-normal outline-none" data-testid="input-contact-email" /></label><label className="grid gap-2 text-[10px] uppercase tracking-[.16em]">What can we help with?<select name="topic" className="border-b border-[#9e9287] bg-transparent py-3 text-[15px] normal-case tracking-normal outline-none" data-testid="select-contact-topic"><option>Choosing a size</option><option>An existing order</option><option>Returns</option><option>Something else</option></select></label><label className="grid gap-2 text-[10px] uppercase tracking-[.16em]">Message<textarea required name="message" rows={4} className="resize-none border-b border-[#9e9287] bg-transparent py-3 text-[15px] normal-case tracking-normal outline-none" data-testid="textarea-contact-message" /></label><button type="submit" className="flex items-center justify-center gap-2 bg-[#36302d] py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-[#fff8ef]" data-testid="button-submit-contact">Send message <ArrowRight size={14} /></button></form>}</div></div></section></>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Shell><Switch><Route path="/" component={Home} /><Route path="/shop" component={Shop} /><Route path="/collections/:slug" component={CollectionPage} /><Route path="/products/:slug" component={ProductPage} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route path="/faq" component={FAQ} /><Route path="/size-guide" component={SizeGuide} /><Route path="/shipping"><InfoPage type="Shipping" /></Route><Route path="/returns"><InfoPage type="Returns" /></Route><Route path="/privacy"><InfoPage type="Privacy" /></Route><Route path="/terms"><InfoPage type="Terms" /></Route><Route><NotFound /></Route></Switch></Shell></ErrorBoundary>;
}

function NotFound() {
  return <section className="mx-auto flex min-h-[70vh] max-w-[700px] flex-col items-center justify-center px-5 text-center"><p className="text-[10px] uppercase tracking-[.2em] text-[#a75d4d]">404 / Out of water</p><h1 className="mt-5 font-serif text-6xl">This page drifted away.</h1><Link href="/shop" className="mt-8 inline-flex items-center gap-2 border-b border-[#36302d] pb-2 text-[10px] uppercase tracking-[.18em]" data-testid="link-not-found-shop">Back to the collection <ArrowRight size={14} /></Link></section>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Router /><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;