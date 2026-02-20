import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  ChevronDown,
  DollarSign,
  Send,
  Users,
  Zap,
  Building2,
  Gift,
  AlertCircle,
  Loader2
} from 'lucide-react';

const jobOptions = [
  'Analista Jurídico',
  'Defensor Público Substituto',
  'Assistente Administrativo',
  'Analista de Sistemas',
  'Assessor de Comunicação',
];

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    job: '',
    salary: '',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação super básica
    if (!form.name || !form.email || !form.job || !form.salary) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/candidaturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          job: form.job,
          salary: form.salary
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com o servidor');
      }

      navigate('/sucesso');
    } catch (err) {
      console.error(err);
      setError('Houve um erro de conexão ao enviar a candidatura. A API está online?');
    } finally {
      setIsLoading(false);
    }
  };

  const formatSalary = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    const number = parseInt(digits, 10) / 100;
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSalary(e.target.value);
    setForm({ ...form, salary: formatted });
  };

  return (
    <>
      {/* Main content */}
      <main className="flex flex-col items-center px-6 py-12">
        {/* Header */}
        <div className="pb-12 text-center">
          <h1 className="text-5xl font-black leading-[1em] tracking-[-0.025em] text-dark">
            Trabalhe na Defensoria
            <br />
            Pública
          </h1>
          <p className="mt-4 text-lg leading-[1.56] text-gray-500 max-w-[656px]">
            Faça parte de uma instituição dedicada a garantir o acesso à justiça.
            Buscamos profissionais comprometidos com a cidadania e os direitos
            humanos.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-[576px] rounded-2xl border border-gray-200 bg-white px-10 pt-10 pb-14 shadow-[0_8px_10px_-6px_rgba(226,232,240,0.5),0_20px_25px_-5px_rgba(226,232,240,0.5)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Nome Completo */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold leading-[1.43] text-gray-900">
                Nome Completo
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 py-3.5 pl-11 pr-4 text-base leading-[1.175] text-dark placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* E-mail Profissional */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold leading-[1.43] text-gray-900">
                E-mail Profissional
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="exemplo@empresa.com.br"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 py-3.5 pl-11 pr-4 text-base leading-[1.175] text-dark placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Vaga de Interesse */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold leading-[1.43] text-gray-900">
                Vaga de Interesse
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-left focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                >
                  <span
                    className={`text-base leading-[1.5] ${form.job ? 'text-dark' : 'text-dark'
                      }`}
                  >
                    {form.job || 'Selecione uma vaga'}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-xl border border-gray-300 bg-white py-1 shadow-lg">
                    {jobOptions.map((job) => (
                      <button
                        type="button"
                        key={job}
                        onClick={() => {
                          setForm({ ...form, job });
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-dark hover:bg-gray-200 transition-colors"
                      >
                        {job}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pretensão Salarial */}
            <div className="flex flex-col gap-2 pb-4">
              <label className="text-sm font-semibold leading-[1.43] text-gray-900">
                Pretensão Salarial
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-base font-medium leading-[1.5] text-gray-400">
                    R$
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="0.000,00"
                  value={form.salary}
                  onChange={handleSalaryChange}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 py-3.5 pl-20 pr-4 text-base leading-[1.175] text-dark placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex w-full items-center justify-center gap-2 rounded-xl border-b-[4px] border-primary-dark bg-primary px-6 py-4 text-base font-bold leading-[1.5] text-white shadow-[0_4px_6px_-4px_rgba(15,189,44,0.2),0_10px_15px_-3px_rgba(15,189,44,0.2)] hover:brightness-110 active:brightness-95 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-[18px] w-[18px] animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar Candidatura</span>
                  <Send className="h-[13px] w-[13px]" />
                </>
              )}
            </button>

            {/* LGPD Notice */}
            <p className="text-center text-xs leading-[1.33] text-gray-400">
              Ao clicar em enviar, você concorda com nossas Políticas de
              Privacidade e processamento de dados conforme a LGPD.
            </p>
          </form>
        </div>

        {/* Footer Decorative Elements */}
        <div className="mt-16 w-full max-w-[896px]">
          <div className="flex gap-8 opacity-60">
            {[
              { icon: Users, label: 'Cultura Inclusiva' },
              { icon: Zap, label: 'Crescimento Ágil' },
              { icon: Building2, label: 'Modelo Híbrido' },
              { icon: Gift, label: 'Benefícios Premium' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] leading-[1.33] text-dark">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6">
          <span className="text-sm leading-[1.43] text-gray-500">
            © 2024 Defensoria Pública de Minas Gerais. Todos os direitos
            reservados.
          </span>
          <div className="flex gap-6">
            {['LinkedIn', 'Instagram', 'Glassdoor'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm leading-[1.43] text-gray-500 hover:text-dark transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
