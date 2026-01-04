export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-semibold text-primary">
          Energia Fácil
        </span>

        <nav className="flex gap-6 text-sm text-gray-600">
          <a href="/blog">Blog</a>
          <a href="/duvidas">Dúvidas</a>
          <a href="/comercializadoras">Comercializadoras</a>
        </nav>
      </div>
    </header>
  );
}
