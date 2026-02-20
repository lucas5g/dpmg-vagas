import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const isFormPage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-300 bg-white/80 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-xl bg-primary p-1.5">
            <Shield className="h-[17px] w-[17px] text-white" />
          </div>
          <span className="text-xl font-bold uppercase tracking-[0.1em] leading-[1.4] text-dark">
            DPMG - Portal de Carreiras
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium leading-[1.43] text-dark hover:text-primary transition-colors"
          >
            Vagas
          </Link>
          <Link
            to="#"
            className="text-sm font-medium leading-[1.43] text-dark hover:text-primary transition-colors"
          >
            Sobre Nós
          </Link>
          <Link
            to="#"
            className="text-sm font-medium leading-[1.43] text-dark hover:text-primary transition-colors"
          >
            {isFormPage ? 'Cultura' : 'Ajuda'}
          </Link>
        </div>

        {/* Right side */}
        {isFormPage ? (
          <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
            <ArrowLeft className="h-[9px] w-[9px]" />
            <span>Voltar para Carreiras</span>
          </button>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 shadow-[0_0_0_2px_rgba(15,189,44,0.1)]">
            <div className="h-full w-full rounded-full bg-gray-400" />
          </div>
        )}
      </div>
    </nav>
  );
}
