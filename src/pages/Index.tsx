import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IMG_BONE = "https://cdn.poehali.dev/projects/1386808b-a5d7-4de2-b8cf-746aab457378/files/9091039e-f2d0-46e5-9701-3ca18d9c59cd.jpg";
const IMG_HEARTS = "https://cdn.poehali.dev/projects/1386808b-a5d7-4de2-b8cf-746aab457378/files/95cd9609-de25-4e37-b6fe-a7f0a983aaa1.jpg";
const IMG_3D_DOG = "https://cdn.poehali.dev/projects/1386808b-a5d7-4de2-b8cf-746aab457378/files/97c2ab09-5b94-40e9-9540-6f0ce9a10bb0.jpg";
const IMG_3D_CAT = "https://cdn.poehali.dev/projects/1386808b-a5d7-4de2-b8cf-746aab457378/files/ad6c6878-08ae-4d3b-ac14-3d8f9e65acf9.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: "addresses" | "3d";
  subcategory: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviews: number;
  hit?: boolean;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Адресник «Кость»", price: 490, oldPrice: 690, category: "addresses", subcategory: "Собаки", image: IMG_BONE, badge: "Хит", badgeColor: "orange", rating: 4.9, reviews: 128, hit: true },
  { id: 2, name: "Адресник «Сердечко»", price: 390, category: "addresses", subcategory: "Кошки", image: IMG_HEARTS, badge: "Новинка", badgeColor: "green", rating: 4.8, reviews: 95 },
  { id: 3, name: "Адресник «Звезда»", price: 420, category: "addresses", subcategory: "Собаки", image: IMG_BONE, rating: 4.7, reviews: 67 },
  { id: 4, name: "Адресник «Круг»", price: 350, category: "addresses", subcategory: "Кошки", image: IMG_HEARTS, rating: 4.6, reviews: 43 },
  { id: 5, name: "3D-портрет питомца", price: 1900, oldPrice: 2500, category: "3d", subcategory: "Портреты", image: IMG_3D_DOG, badge: "–24%", badgeColor: "purple", rating: 5.0, reviews: 34, hit: true },
  { id: 6, name: "3D-брелок «Кошечка»", price: 890, category: "3d", subcategory: "Брелоки", image: IMG_3D_CAT, badge: "Новинка", badgeColor: "green", rating: 4.8, reviews: 22 },
  { id: 7, name: "3D-статуэтка собаки", price: 2400, category: "3d", subcategory: "Статуэтки", image: IMG_3D_DOG, rating: 4.9, reviews: 18, hit: true },
  { id: 8, name: "3D-магнит на холодильник", price: 650, category: "3d", subcategory: "Магниты", image: IMG_3D_CAT, rating: 4.7, reviews: 56 },
];

const BADGE_STYLE: Record<string, string> = {
  orange: "bg-orange-500 text-white",
  green: "bg-emerald-500 text-black",
  purple: "bg-violet-600 text-white",
};

const PRODUCT_DETAILS: Record<number, { description: string; features: string[]; material: string; size: string; delivery: string }> = {
  1: {
    description: "Адресник в форме косточки — идеально для активных собак. Лазерная гравировка держится годами и не стирается. Укажем имя питомца, ваш номер телефона или адрес — всё что важно.",
    features: ["Лазерная гравировка", "Двусторонняя надпись", "Кольцо в комплекте", "Не ржавеет"],
    material: "Нержавеющая сталь 304",
    size: "4 × 2.5 см",
    delivery: "1–2 дня",
  },
  2: {
    description: "Нежный адресник в форме сердечка для кошек и маленьких собак. Анодированный алюминий в розовом или голубом цвете — красиво смотрится на любом ошейнике.",
    features: ["Цветное анодирование", "Лёгкий алюминий", "Гравировка с двух сторон", "Кольцо в комплекте"],
    material: "Анодированный алюминий",
    size: "3 × 3 см",
    delivery: "1–2 дня",
  },
  3: {
    description: "Классический адресник в форме звезды — заметный и стильный. Подходит для средних и крупных пород. Гравируем имя и телефон по вашему тексту.",
    features: ["Нержавеющая сталь", "Лазерная гравировка", "Прочное кольцо", "Полировка зеркальная"],
    material: "Нержавеющая сталь 316",
    size: "4 × 4 см",
    delivery: "1–2 дня",
  },
  4: {
    description: "Минималистичный круглый адресник — универсальная классика. Подходит кошкам и собакам любого размера. Гравировка не выцветает и не стирается.",
    features: ["Круглая форма", "Два цвета на выбор", "Двусторонняя гравировка", "Лёгкий вес"],
    material: "Анодированный алюминий",
    size: "3 × 3 см",
    delivery: "1 день",
  },
  5: {
    description: "Точная 3D-копия вашего питомца по фотографии. Идеальный подарок для любителей животных. Прорабатываем каждую деталь: шерсть, мордочку, позу. Высота фигурки — 10 см.",
    features: ["По фото питомца", "Высота 10 см", "Расписная вручную", "Подарочная упаковка"],
    material: "Фотополимерная смола",
    size: "10 × 8 × 7 см",
    delivery: "5–7 дней",
  },
  6: {
    description: "Милый 3D-брелок в форме кошки из белой смолы. Лёгкий и прочный. Можно заказать с именем питомца на подвеске. Идеально как подарок или для себя.",
    features: ["Лёгкий вес 8 г", "Металлическое кольцо", "Белая смола", "Имя на заказ"],
    material: "Белая фотополимерная смола",
    size: "5 × 3 × 2 см",
    delivery: "3–5 дней",
  },
  7: {
    description: "Большая настольная статуэтка вашей собаки. Делаем по 2–3 фотографиям питомца. Отличный памятный подарок или украшение для дома. Поставляется на деревянной подставке.",
    features: ["Деревянная подставка", "По фото питомца", "Высота 15 см", "Матовая отделка"],
    material: "Фотополимерная смола + дерево",
    size: "15 × 10 × 10 см",
    delivery: "7–10 дней",
  },
  8: {
    description: "Яркий магнит на холодильник с 3D-портретом вашего кота или собаки. Плоский, лёгкий, держится крепко. Отличный сувенир или повседневный предмет декора.",
    features: ["Сильный магнит", "Плоский профиль", "Полноцветная печать", "По фото питомца"],
    material: "ПЛА-пластик + магнит",
    size: "8 × 8 × 0.5 см",
    delivery: "3–5 дней",
  },
};

interface CartItem extends Product { qty: number; }
type Section = "home" | "catalog" | "product";

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [section, setSection] = useState<Section>("home");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "addresses" | "3d">("all");
  const [subcatFilter, setSubcatFilter] = useState("Все");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const openProduct = (p: Product) => { setActiveProduct(p); setSection("product"); window.scrollTo(0, 0); };
  const goBack = () => { setSection(activeProduct?.category === "addresses" || activeProduct?.category === "3d" ? "catalog" : "home"); setActiveProduct(null); };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id: number, delta: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const subcategories = ["Все", ...Array.from(new Set(
    PRODUCTS.filter(p => categoryFilter === "all" || p.category === categoryFilter).map(p => p.subcategory)
  ))];

  const filtered = PRODUCTS.filter(p => {
    const catOk = categoryFilter === "all" || p.category === categoryFilter;
    const subcatOk = subcatFilter === "Все" || p.subcategory === subcatFilter;
    const searchOk = p.name.toLowerCase().includes(search.toLowerCase());
    return catOk && subcatOk && searchOk;
  });

  const hits = PRODUCTS.filter(p => p.hit);

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-golos">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button onClick={() => setSection("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">🐾</div>
            <span className="font-oswald font-bold text-xl text-white tracking-wide">ПетТег</span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/10">
            <button onClick={() => { setSection("home"); setActiveProduct(null); }} className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${section === "home" ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30" : "text-white/50 hover:text-white"}`}>Главная</button>
            <button onClick={() => { setSection("catalog"); setActiveProduct(null); }} className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${section === "catalog" || section === "product" ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30" : "text-white/50 hover:text-white"}`}>Каталог</button>
          </div>

          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button className="relative flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-violet-500/20">
                <Icon name="ShoppingBag" size={16} />
                <span className="hidden sm:inline">Корзина</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#0f0f18] border-white/10 w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-white font-oswald text-2xl">Корзина</SheetTitle>
              </SheetHeader>

              {orderDone ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Icon name="CheckCircle" size={48} className="text-emerald-400" />
                  </div>
                  <h3 className="font-oswald text-2xl text-white">Заказ оформлен!</h3>
                  <p className="text-white/50 text-sm">Мы свяжемся с вами для подтверждения</p>
                  <Button onClick={() => { setOrderDone(false); setCart([]); setCartOpen(false); }} className="bg-violet-600 hover:bg-violet-500 text-white">
                    Продолжить покупки
                  </Button>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Icon name="ShoppingBag" size={28} className="text-white/30" />
                  </div>
                  <p className="text-white/40">Корзина пуста</p>
                  <Button onClick={() => { setSection("catalog"); setCartOpen(false); }} variant="outline" className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10">
                    Перейти в каталог
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-3 py-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-violet-400 font-bold mt-0.5">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-violet-500/30 flex items-center justify-center text-white transition-colors">
                              <Icon name="Minus" size={12} />
                            </button>
                            <span className="text-white text-sm font-medium w-5 text-center">{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-violet-500/30 flex items-center justify-center text-white transition-colors">
                              <Icon name="Plus" size={12} />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-400 transition-colors self-start mt-1">
                          <Icon name="X" size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/50">Итого:</span>
                      <span className="text-2xl font-oswald font-bold text-white">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <Button onClick={() => setOrderDone(true)} className="w-full bg-gradient-to-r from-violet-600 to-orange-500 hover:opacity-90 text-white font-semibold h-12 text-base rounded-xl">
                      Оформить заказ
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HOME */}
      {section === "home" && (
        <div>
          {/* HERO */}
          <section className="relative overflow-hidden min-h-[88vh] flex items-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
              <div className="space-y-7">
                <Badge className="bg-violet-500/15 text-violet-400 border-violet-500/30 px-4 py-1.5 text-sm font-medium">
                  🐾 Магазин для питомцев
                </Badge>
                <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-[1.05]">
                  Адресники<br />
                  <span className="bg-gradient-to-r from-violet-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                    и 3D-модели
                  </span><br />
                  для питомцев
                </h1>
                <p className="text-white/50 text-lg max-w-md leading-relaxed">
                  Гравировка за 1 день. Уникальные 3D-фигурки и адресники с характером — только для вашего любимца.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSection("catalog")} className="bg-violet-600 hover:bg-violet-500 text-white h-12 px-8 text-base font-semibold rounded-full shadow-xl shadow-violet-500/25 transition-all flex items-center gap-2">
                    Смотреть каталог
                    <Icon name="ArrowRight" size={18} />
                  </button>
                  <button onClick={() => { setSection("catalog"); setCategoryFilter("3d"); }} className="border border-white/15 text-white hover:bg-white/5 h-12 px-8 text-base rounded-full transition-all flex items-center gap-2">
                    3D-модели
                    <Icon name="Box" size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-8 pt-2">
                  {[{ num: "2000+", label: "Заказов" }, { num: "4.9★", label: "Рейтинг" }, { num: "1 день", label: "Изготовление" }].map(s => (
                    <div key={s.label}>
                      <div className="font-oswald font-bold text-2xl text-white">{s.num}</div>
                      <div className="text-white/40 text-sm mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero images collage */}
              <div className="relative h-[420px] hidden lg:block">
                <img src={IMG_BONE} alt="Адресник кость" className="absolute top-0 right-10 w-56 h-56 object-cover rounded-3xl border border-white/10 shadow-2xl shadow-violet-500/20 rotate-3" />
                <img src={IMG_3D_DOG} alt="3D собака" className="absolute bottom-0 right-0 w-52 h-52 object-cover rounded-3xl border border-white/10 shadow-2xl shadow-orange-500/15 -rotate-2" />
                <img src={IMG_3D_CAT} alt="3D кот" className="absolute top-16 left-0 w-44 h-44 object-cover rounded-3xl border border-white/10 shadow-2xl shadow-emerald-500/10 rotate-1" />
                <img src={IMG_HEARTS} alt="Адресник сердечко" className="absolute bottom-10 left-10 w-40 h-40 object-cover rounded-3xl border border-white/10 shadow-xl -rotate-3" />
                <div className="absolute top-24 right-4 backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl px-4 py-2.5">
                  <div className="text-sm font-semibold text-white">от 350 ₽</div>
                  <div className="text-xs text-emerald-400 mt-0.5">✓ В наличии</div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="py-14 px-4 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "Zap", label: "Гравировка за 1 день", color: "text-yellow-400" },
                { icon: "Shield", label: "Нержавеющая сталь", color: "text-emerald-400" },
                { icon: "Truck", label: "Доставка по России", color: "text-violet-400" },
                { icon: "Star", label: "4.9 — отзывы покупателей", color: "text-orange-400" },
              ].map(f => (
                <div key={f.label} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex items-center gap-3 hover:border-violet-500/30 hover:bg-white/7 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon name={f.icon} size={20} className={f.color} />
                  </div>
                  <span className="text-sm font-medium text-white/70">{f.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* HITS */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-oswald text-4xl font-bold text-white">Хиты продаж</h2>
                  <p className="text-white/40 mt-1.5">Самые популярные товары этого месяца</p>
                </div>
                <button onClick={() => setSection("catalog")} className="text-violet-400 hover:text-violet-300 flex items-center gap-1 text-sm font-medium transition-colors">
                  Весь каталог <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {hits.map((p, i) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} onOpen={openProduct} delay={i * 100} />
                ))}
                <div onClick={() => setSection("catalog")} className="bg-white/4 border border-white/10 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group">
                  <div className="w-14 h-14 rounded-full bg-violet-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Grid3x3" size={24} className="text-violet-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-oswald text-lg text-white font-bold">Весь каталог</div>
                    <div className="text-white/40 text-sm mt-0.5">{PRODUCTS.length} товаров</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROMO */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/25 via-[#0a0a0f] to-orange-500/15 border border-violet-500/20 p-10 md:p-14">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-5">🔥 Акция апреля</Badge>
                    <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      3D-портрет<br />питомца со<br />скидкой <span className="text-orange-400">24%</span>
                    </h2>
                    <p className="text-white/50 mb-7 leading-relaxed">Укажите особенности питомца — сделаем уникальную модель по фото. Подходит как подарок!</p>
                    <button onClick={() => { setSection("catalog"); setCategoryFilter("3d"); }} className="bg-orange-500 hover:bg-orange-400 text-white h-12 px-8 font-semibold rounded-full transition-all flex items-center gap-2 shadow-xl shadow-orange-500/25">
                      Заказать модель
                      <Icon name="Sparkles" size={18} />
                    </button>
                  </div>
                  <div className="relative flex justify-center">
                    <img src={IMG_3D_DOG} alt="3D-портрет" className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-3xl border border-white/10 shadow-2xl shadow-orange-500/20 rotate-2" />
                    <div className="absolute -bottom-3 -left-3 backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl px-4 py-2">
                      <div className="text-white/50 text-xs line-through">2 500 ₽</div>
                      <div className="text-white font-oswald font-bold text-xl">1 900 ₽</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CATALOG */}
      {section === "catalog" && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="mb-10">
            <h1 className="font-oswald text-5xl font-bold text-white mb-2">Каталог</h1>
            <p className="text-white/40 text-lg">Адресники и 3D-модели для ваших питомцев</p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-sm">
                <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск товаров..."
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                />
              </div>
              <Tabs value={categoryFilter} onValueChange={v => { setCategoryFilter(v as "all" | "addresses" | "3d"); setSubcatFilter("Все"); }}>
                <TabsList className="bg-white/5 border border-white/10">
                  <TabsTrigger value="all" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-white/50">Все</TabsTrigger>
                  <TabsTrigger value="addresses" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-white/50">🏷️ Адресники</TabsTrigger>
                  <TabsTrigger value="3d" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-white/50">🖨️ 3D-модели</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2 flex-wrap">
              {subcategories.map(s => (
                <button
                  key={s}
                  onClick={() => setSubcatFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${subcatFilter === s ? "bg-violet-600/20 border-violet-500 text-violet-400" : "border-white/10 text-white/40 hover:border-violet-500/40 hover:text-white"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Icon name="SearchX" size={48} className="text-white/20" />
              <p className="text-white/40 text-lg">Ничего не найдено</p>
              <button onClick={() => { setSearch(""); setSubcatFilter("Все"); setCategoryFilter("all"); }} className="border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-5 py-2 rounded-full text-sm font-medium transition-all">
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} onOpen={openProduct} delay={i * 50} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRODUCT PAGE */}
      {section === "product" && activeProduct && (() => {
        const details = PRODUCT_DETAILS[activeProduct.id];
        const related = PRODUCTS.filter(p => p.id !== activeProduct.id && p.category === activeProduct.category).slice(0, 4);
        return (
          <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <button onClick={() => { setSection("home"); setActiveProduct(null); }} className="hover:text-white transition-colors">Главная</button>
              <Icon name="ChevronRight" size={14} />
              <button onClick={() => { setSection("catalog"); setActiveProduct(null); }} className="hover:text-white transition-colors">Каталог</button>
              <Icon name="ChevronRight" size={14} />
              <span className="text-white/70 truncate max-w-[200px]">{activeProduct.name}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-violet-600/10 rounded-3xl blur-3xl" />
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="relative w-full aspect-square object-cover rounded-3xl border border-white/10 shadow-2xl"
                />
                {activeProduct.badge && (
                  <span className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-sm font-bold ${BADGE_STYLE[activeProduct.badgeColor || "purple"]}`}>
                    {activeProduct.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="text-violet-400 text-sm font-medium mb-2">{activeProduct.subcategory}</div>
                  <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{activeProduct.name}</h1>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className={i <= Math.round(activeProduct.rating) ? "text-yellow-400" : "text-white/20"}>★</span>
                      ))}
                    </div>
                    <span className="text-white font-semibold">{activeProduct.rating}</span>
                    <span className="text-white/40 text-sm">{activeProduct.reviews} отзывов</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="font-oswald text-5xl font-bold text-white">{activeProduct.price} ₽</span>
                    {activeProduct.oldPrice && (
                      <span className="text-white/30 text-xl line-through pb-1">{activeProduct.oldPrice} ₽</span>
                    )}
                  </div>
                </div>

                {details && (
                  <p className="text-white/60 leading-relaxed text-base">{details.description}</p>
                )}

                {details && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Материал", value: details.material, icon: "Layers" },
                      { label: "Размер", value: details.size, icon: "Ruler" },
                      { label: "Изготовление", value: details.delivery, icon: "Clock" },
                      { label: "Отзывы", value: `${activeProduct.reviews} шт.`, icon: "MessageCircle" },
                    ].map(s => (
                      <div key={s.label} className="bg-white/4 border border-white/8 rounded-xl p-3.5 flex items-start gap-2.5">
                        <Icon name={s.icon} size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white/40 text-xs">{s.label}</div>
                          <div className="text-white text-sm font-medium">{s.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {details && (
                  <div className="flex flex-wrap gap-2">
                    {details.features.map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                        <Icon name="Check" size={13} />
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <AddToCartButton product={activeProduct} onAdd={addToCart} />
                  <button onClick={goBack} className="flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 px-5 py-3 rounded-xl font-medium text-sm transition-all">
                    <Icon name="ArrowLeft" size={16} />
                    Назад
                  </button>
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h2 className="font-oswald text-2xl font-bold text-white mb-6">Похожие товары</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {related.map((p, i) => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} onOpen={openProduct} delay={i * 80} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center text-white text-sm">🐾</div>
            <span className="font-oswald font-bold text-white text-lg">ПетТег</span>
            <span>— адресники и 3D-модели для питомцев</span>
          </div>
          <span>С любовью к животным 🐕 🐈</span>
        </div>
      </footer>
    </div>
  );
}

function AddToCartButton({ product: p, onAdd, full = true }: { product: Product; onAdd: (p: Product) => void; full?: boolean }) {
  const [added, setAdded] = useState(false);
  const handle = () => { onAdd(p); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  return (
    <button
      onClick={handle}
      className={`${full ? "flex-1" : "w-full"} h-12 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${added ? "bg-emerald-500 text-black" : "bg-violet-600 hover:bg-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/25"}`}
    >
      {added ? <><Icon name="Check" size={16} /> Добавлено в корзину</> : <><Icon name="ShoppingCart" size={18} /> В корзину</>}
    </button>
  );
}

function ProductCard({ product: p, onAdd, onOpen, delay }: { product: Product; onAdd: (p: Product) => void; onOpen: (p: Product) => void; delay?: number }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onOpen(p)}
      className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${delay || 0}ms`, opacity: 0, animationFillMode: "forwards" }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        {p.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${BADGE_STYLE[p.badgeColor || "purple"]}`}>
            {p.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 backdrop-blur-xl bg-black/40 rounded-full px-2.5 py-1 text-xs text-white flex items-center gap-1">
          <span className="text-yellow-400">★</span>{p.rating}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="text-xs text-white/30 mb-1">{p.subcategory}</div>
          <h3 className="font-semibold text-white text-base leading-snug">{p.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-oswald font-bold text-xl text-white">{p.price} ₽</span>
          {p.oldPrice && <span className="text-white/30 text-sm line-through">{p.oldPrice} ₽</span>}
        </div>
        <div className="text-xs text-white/30">{p.reviews} отзывов</div>
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex-1 h-10 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${added ? "bg-emerald-500 text-black" : "bg-violet-600 hover:bg-violet-500 text-white"}`}
          >
            {added ? <><Icon name="Check" size={14} /> Добавлено</> : <><Icon name="ShoppingCart" size={14} /> В корзину</>}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onOpen(p); }}
            className="w-10 h-10 rounded-xl border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 flex items-center justify-center text-white/40 hover:text-violet-400 transition-all flex-shrink-0"
          >
            <Icon name="Eye" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}