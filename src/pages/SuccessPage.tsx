import { Link } from 'react-router-dom';
import { Home, FileText, Check, Circle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <>
      {/* Main Content */}
      <main className="flex items-center justify-center px-6 py-[114px]">
        <div className="w-full max-w-[672px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_10px_-6px_rgba(15,189,44,0.05),0_20px_25px_-5px_rgba(15,189,44,0.05)]">
          {/* Success Visual Header */}
          <div className="relative flex items-center justify-center bg-primary-bg py-12 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-[rgba(15,189,44,0.05)]" />
            <div className="absolute right-[-2rem] bottom-[-2rem] h-48 w-48 rounded-full bg-gold-light" />

            {/* Checkmark icon */}
            <div className="relative z-10 flex items-center justify-center rounded-3xl border-4 border-[rgba(15,189,44,0.2)] bg-white p-6 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]">
              <Check className="h-[50px] w-[50px] text-primary" strokeWidth={3} />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-4 px-8 pt-10 pb-12">
            <h1 className="text-4xl font-bold leading-[1.11] tracking-[-0.025em] text-dark text-center">
              Candidatura Recebida com Sucesso!
            </h1>
            <p className="max-w-[448px] text-center text-lg leading-[1.625] text-gray-700">
              Agradecemos o seu interesse em fazer parte da nossa equipe.
              Analisaremos seu perfil e entraremos em contato em breve.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-6 w-full">
              <Link
                to="/"
                className="relative flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-0 h-12 text-base font-semibold leading-[1.5] text-white shadow-[0_4px_6px_-4px_rgba(15,189,44,0.2),0_10px_15px_-3px_rgba(15,189,44,0.2)] hover:brightness-110 active:brightness-95 transition-all"
              >
                <Home className="h-[13px] w-[15px]" />
                <span>Voltar ao Início</span>
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-200 px-8 py-0 h-12 text-base font-semibold leading-[1.5] text-gray-900 hover:bg-gray-300/60 transition-colors">
                <FileText className="h-[13px] w-[17px]" />
                <span>Ver Minhas Candidaturas</span>
              </button>
            </div>
          </div>

          {/* Progress/Timeline Hint */}
          <div className="flex items-center justify-between border-t border-gray-200 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light">
                <Check className="h-3 w-3 text-[#16A34A]" strokeWidth={3} />
              </div>
              <span className="text-sm font-medium leading-[1.43] text-gray-700">
                Currículo Enviado
              </span>
            </div>

            {/* Progress line */}
            <div className="flex-1 px-4">
              <div className="h-0.5 w-full bg-gray-300" />
            </div>

            <div className="flex items-center gap-3 opacity-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <Circle className="h-[15px] w-[15px] text-gray-400" />
              </div>
              <span className="text-sm font-medium leading-[1.43] text-gray-700">
                Entrevista
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 py-8">
        <div className="flex items-center justify-center gap-6">
          {['Política de Privacidade', 'Termos de Uso', 'Suporte'].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-sm leading-[1.43] text-center text-gray-500 hover:text-dark transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>
        <p className="text-center text-sm leading-[1.43] text-gray-500">
          © 2024 DPMG - Defensoria Pública de Minas Gerais. Todos os direitos
          reservados.
        </p>
      </footer>
    </>
  );
}
